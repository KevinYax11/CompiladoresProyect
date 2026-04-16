import json
from lexico import identificar_tokens
from sintactico_ast import Parser

codigo_fuente = """
int main() {
    int x = 2026;
    print("Probando printf con string -> ");
    println("Hola mundo!");
    print("Variable x = ");
    println(x);
    return 0;
}
"""

tokens = identificar_tokens(codigo_fuente)
parser = Parser(tokens)
arbol = parser.parsear()

ctx = {
    'strings': [],
    'bss': [],
}

codigo_text = arbol.traducirASM(ctx)

asm_final = "section .data\n"
for s in ctx['strings']:
    asm_final += f"    {s}\n"

asm_final += "\nsection .bss\n"
for v in ctx['bss']:
    asm_final += f"    {v} resq 1\n"

asm_final += "\nsection .text\n"
asm_final += codigo_text

with open("salida.asm", "w") as f:
    f.write(asm_final)

print("Archivo 'salida.asm' generado con exito.")
print("Comandos para compilar y enlazar (requiere GCC para printf):")
print("1. nasm -f elf64 salida.asm -o salida.o")
print("2. gcc salida.o -no-pie -o programa")
print("3. ./programa")