import json
from lexico import identificar_tokens
from sintactico_ast import Parser

codigo_fuente = """
int main() {
    int contador = 0;
    
    while (contador < 3) {
        println("Contador es:", contador);
        contador = contador + 1;
    }

    for (int i = 0; i < 2; i = i + 1) {
        println("For index:", i);
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