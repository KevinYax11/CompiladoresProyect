from lexico import identificar_tokens
from sintactico_ast import Parser

codigo_fuente = """
int main() {
    int x = 10;
    int y = 5;
    println("El resultado es:", x + y);
    return 0;
}
"""

tokens = identificar_tokens(codigo_fuente)
parser = Parser(tokens)
arbol = parser.parsear()

print("--- TRADUCCIÓN A RUBY ---")
print(arbol.traducirRuby())