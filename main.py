import json
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

# 1. Tokenizar y Parsear
tokens = identificar_tokens(codigo_fuente)
parser = Parser(tokens)
arbol = parser.parsear()

# 2. Imprimir Traducción a Ruby
print("--- TRADUCCIÓN A RUBY ---")
print(arbol.traducirRuby())
print("\n")

# 3. Imprimir el AST en formato JSON
print("--- ÁRBOL AST (JSON) ---")
ast_json = json.dumps(arbol.to_dict(), indent=2)
print(ast_json)