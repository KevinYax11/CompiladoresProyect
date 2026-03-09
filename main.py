import json
from lexico import identificar_tokens
from sintactico_ast import Parser

# Código fuente enfocado en probar print y println como pide la tarea
codigo_fuente = """
int main() {
    int x = 2026;
    print("Probando print (sin salto de linea) -> ");
    println("Hola desde NASM!");
    print("El valor de la variable x es: ");
    println(x);
    
    return 0;
}
"""

tokens = identificar_tokens(codigo_fuente)
parser = Parser(tokens)
arbol = parser.parsear()

# 1. Imprimir traducciones existentes para no perderlas de vista
print("--- TRADUCCIÓN A RUBY ---")
print(arbol.traducirRuby())
print("\n--- TRADUCCIÓN A PYTHON ---")
print(arbol.traducirPy())
print("\n")

# 2. Generar código Ensamblador (NASM)
ctx = {
    'strings': [], # Para la sección .data
    'bss': [],     # Para la sección .bss (variables)
}

codigo_text = arbol.traducirASM(ctx)

asm_final = "section .data\n"
asm_final += "    newline db 10\n" # Salto de línea estándar
for s in ctx['strings']:
    asm_final += f"    {s}\n"

asm_final += "\nsection .bss\n"
asm_final += "    digit_space resb 100\n"
asm_final += "    digit_space_pos resb 8\n"
for v in ctx['bss']:
    asm_final += f"    {v} resq 1\n" # Reserva de memoria para variables

asm_final += "\nsection .text\n"
asm_final += codigo_text

# Subrutina para imprimir saltos de línea
asm_final += """
print_newline:
    mov rax, 1
    mov rdi, 1
    mov rsi, newline
    mov rdx, 1
    syscall
    ret
"""

# Subrutina para convertir y imprimir enteros
asm_final += """
print_int:
    mov rcx, digit_space
    mov rbx, 10
    mov [rcx], rbx
    inc rcx
    mov [digit_space_pos], rcx
print_int_loop:
    mov rdx, 0
    div rbx
    push rax
    add rdx, 48
    mov rcx, [digit_space_pos]
    mov [rcx], dl
    inc rcx
    mov [digit_space_pos], rcx
    pop rax
    cmp rax, 0
    jne print_int_loop
print_int_print:
    mov rcx, [digit_space_pos]
    mov rax, 1
    mov rdi, 1
    mov rsi, rcx
    mov rdx, 1
    syscall
    mov rcx, [digit_space_pos]
    dec rcx
    mov [digit_space_pos], rcx
    cmp rcx, digit_space
    jge print_int_print
    ret
"""

with open("salida.asm", "w") as f:
    f.write(asm_final)

print("--- ÁRBOL AST (JSON) ---")
print(json.dumps(arbol.to_dict(), indent=2))
print("\n")

print("--- CÓDIGO ENSAMBLADOR GENERADO ---")
print("El archivo 'salida.asm' ha sido creado en este directorio.\n")

print("--- MÉTODO DE COMPILACIÓN CON NASM Y LD ---")
print("Para compilar en ensamblador de 64 bits (Linux), usa los siguientes comandos:")
print("1. nasm -f elf64 salida.asm -o salida.o")
print("2. ld salida.o -o programa")
print("3. ./programa\n")