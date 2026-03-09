import json
from lexico import identificar_tokens
from sintactico_ast import Parser

codigo_fuente = """
int main() {
    int x = 10;
    int y = 5;
    
    if (x > y) {
        println("x es mayor");
    } else {
        println("y es mayor o igual");
    }
    
    return 0;
}
"""

tokens = identificar_tokens(codigo_fuente)
parser = Parser(tokens)
arbol = parser.parsear()

print("--- TRADUCCIÓN A RUBY ---")
print(arbol.traducirRuby())
print("\n")

print("--- ÁRBOL AST (JSON) ---")
ast_json = json.dumps(arbol.to_dict(), indent=2)
print(ast_json)