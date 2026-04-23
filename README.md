# Analizador Léxico, Sintáctico y Traductor Multi-Lenguaje

**Datos del Estudiante:**  
**Nombre:** Kevin Miguel Yax Puác  
**Carné:** 1529422  
**Curso:** Compiladores  
**Carrera:** Ingeniería en Informática y Sistemas  
**Universidad:** Universidad Rafael Landívar, Campus Quetzaltenango  

---

## Descripción del Proyecto
Este proyecto es un compilador experimental que procesa un lenguaje de alto nivel (Pseudo-C) a través de todas las fases del proceso de compilación: análisis léxico, sintáctico (AST), semántico y generación de código. El sistema cuenta con una interfaz web moderna que permite visualizar en tiempo real la tokenización, el árbol de sintaxis (JSON) y las traducciones a **Python, C++, Ruby y Ensamblador (x86-64)**.

## Características Implementadas
- **Análisis Léxico:** Identificación de tokens mediante expresiones regulares, incluyendo palabras reservadas, identificadores, números, cadenas y operadores relacionales (`==`, `<=`, `>=`).
- **Análisis Sintáctico (AST):** Generación de un Árbol de Sintaxis Abstracta jerárquico que organiza funciones, parámetros, variables y estructuras de control.
- **Validación Semántica:** Gestión de una **Tabla de Símbolos** para el control de declaración de variables, ámbitos (scopes) y validación de tipos.
- **Traducción Multi-Lenguaje:**
  - **Alto Nivel (1 a 1):** Python, C++, Go y Ruby.
  - **Bajo Nivel (Arquitectónica):** Ensamblador NASM x86-64 para Linux, con manejo de secciones `.data` y `.bss`.
- **Interfaz Web:** Dashboard interactivo desarrollado con **FastAPI**, diseñado con colores institucionales y notificaciones de error dinámicas.

## Requisitos del Sistema
- **Python 3.10+**
- **FastAPI** y **Uvicorn** (para el servidor web)
- **Jinja2** (para el renderizado de plantillas)
- **NASM** (Netwide Assembler) y **LD** (GNU Linker) para ensamblar el código objeto generado

## Estructura del Proyecto
```text
.
├── main.py              # Servidor FastAPI y orquestador del proceso
├── lexico.py            # Analizador Léxico basado en Regex
├── sintactico_ast.py    # Parser, Nodos del AST y Tabla de Símbolos
├── static/
│   └── script.js        # Lógica frontend y manejo de respuestas asíncronas
└── templates/
    └── index.html       # Interfaz gráfica (HTML/CSS) con colores institucionales

## Guía de Instalación y Ejecución

### 1. Instalar dependencias
Asegúrate de tener instalados los paquetes necesarios para el servidor web:
```bash
pip install fastapi uvicorn jinja2
```

### 2. Ejecutar la Interfaz Web
Para iniciar el compilador, ejecuta el archivo principal:
```bash
python main.py
```
Luego, accede desde tu navegador a: `http://127.0.0.1:8000`

### 3. Uso del Compilador
1. Escribe el código en Pseudo-C en el panel **"Entrada de Lógica"**.
2. Presiona el botón **"COMPILAR Y TRADUCIR"**.
3. Revisa los resultados en los paneles de **Tokens**, **AST (JSON)** y las pestañas de traducción.
4. Si el código tiene errores de declaración o sintaxis, recibirás una notificación tipo *toast* indicando el problema exacto.

```
