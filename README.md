# Analizador Léxico, Sintáctico y Traductor (AST a Ensamblador)

**Datos del Estudiante:**
* **Nombre:** Kevin Miguel Yax Puác
* **Carné:** 1529422
* **Curso:** Compiladores
* **Carrera:** Ingeniería en Informática y Sistemas
* **Universidad:** Universidad Rafael Landívar, Campus Quetzaltenango

---

## Descripción del Proyecto
Este proyecto consiste en un analizador léxico y sintáctico construido en Python que procesa código fuente con una sintaxis similar a C. El analizador genera un Árbol de Sintaxis Abstracta (AST) que posteriormente es capaz de traducir el código fuente original a múltiples lenguajes de alto nivel y, finalmente, a código máquina (Ensamblador NASM x86-64).

## Características Implementadas
* **Análisis Léxico:** Reconocimiento de palabras reservadas, identificadores, números, cadenas de texto y operadores (incluyendo relacionales como `==`, `<=`, `>=`).
* **Análisis Sintáctico y AST:** Construcción de nodos para funciones, parámetros, variables, operaciones matemáticas y estructuras de control.
* **Estructuras de Control Soportadas:** Sentencias condicionales (`if` y `else`) y ciclos iterativos (`while` y `for`).
* **Traducción a Múltiples Lenguajes:** Traducción de las estructuras a Ruby, Python, C++ y Go, incluyendo soporte nativo para las instrucciones de impresión `print` y `println`.
* **Generación de Código Objeto (Ensamblador):** Traducción del AST a código ensamblador puro compatible con la arquitectura de 64 bits de Linux, manejo de la sección `.data` para cadenas, manejo de la sección `.bss` para variables, y subrutinas nativas integradas para conversión de enteros (algoritmo *itoa*) e impresión estándar.

## Requisitos del Sistema
* **Python 3.x:** Para ejecutar el analizador y generar las traducciones y el archivo `.asm`.
* **NASM (Netwide Assembler):** Para ensamblar el código generado.
* **LD (GNU Linker):** Para enlazar el código objeto en un archivo ejecutable (requiere entorno Linux/WSL).
