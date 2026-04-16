import json
from lexico import identificar_tokens
from sintactico_ast import Parser

codigo_fuente = """
float main() {
    float a = 10.5;
    float b = 2.0;
    float res = a * b + 5.75;
    print("Resultado flotante: ");
    println(res);
    return res;
}
"""

tokens = identificar_tokens(codigo_fuente)
parser = Parser(tokens)
arbol = parser.parsear()

ctx = {'strings': [], 'bss': []}
codigo_text = arbol.traducirASM(ctx)

asm_final = "section .data\n"
for s in ctx['strings']: asm_final += f"    {s}\n"
asm_final += "\nsection .bss\n"
for v in ctx['bss']: asm_final += f"    {v} resq 1\n"
asm_final += "\nsection .text\n" + codigo_text

with open("salida.asm", "w") as f: f.write(asm_final)

print("Compilacion finalizada. 'salida.asm' generado.")
print("Comandos: nasm -f elf64 salida.asm -o salida.o && gcc salida.o -no-pie -o programa")