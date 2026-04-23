from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import uvicorn

# Importamos tu lógica existente
from lexico import identificar_tokens
from sintactico_ast import Parser, TablaSimbolos, SemanticError

app = FastAPI()

# Configuración de rutas estáticas y plantillas
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class CodigoEntrada(BaseModel):
    codigo: str

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    # Retorna la interfaz web
    return templates.TemplateResponse(request=request, name="index.html")

@app.post("/compilar")
async def compilar(datos: CodigoEntrada):
    try:
        # FASE 1 y 2: Léxico y Sintáctico
        tokens = identificar_tokens(datos.codigo)
        parser = Parser(tokens)
        arbol = parser.parsear()
        
        # FASE 3: Análisis Semántico
        tabla_global = TablaSimbolos()
        arbol.validar_semantica(tabla_global)
        
        # FASE 4: Generación de ASM
        ctx = {'strings': [], 'bss': []}
        codigo_text = arbol.traducirASM(ctx)
        
        asm_final = "section .data\n"
        for s in ctx['strings']: asm_final += f"    {s}\n"
        asm_final += "\nsection .bss\n"
        for v in ctx['bss']: asm_final += f"    {v} resq 1\n"
        asm_final += "\nsection .text\n" + codigo_text

        # Retorno de todas las traducciones
        return {
            "status": "success",
            "tokens": tokens,
            "ast": arbol.to_dict(),
            "python": arbol.traducirPy(),
            "cpp": arbol.traducirCPP(),
            "ruby": arbol.traducirRuby(),
            "asm": asm_final
        }

    except SemanticError as e:
        return {"status": "error", "message": str(e)}
    except Exception as e:
        return {"status": "error", "message": f"Error de Sintaxis/Léxico: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)