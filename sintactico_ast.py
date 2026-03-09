class NodoAST:
    def traducirPy(self): raise NotImplementedError()
    def traducirCPP(self): raise NotImplementedError()
    def traducirGo(self): raise NotImplementedError()
    def traducirRuby(self): raise NotImplementedError()
    def to_dict(self): raise NotImplementedError()
    def traducirASM(self, ctx): return "" # Método base para Ensamblador

class NodoString(NodoAST):
    def __init__(self, valor): self.valor = valor
    def traducirPy(self): return self.valor[1]
    def traducirCPP(self): return self.valor[1]
    def traducirGo(self): return self.valor[1]
    def traducirRuby(self): return self.valor[1]
    def to_dict(self): return {"Tipo": "String", "Valor": self.valor[1]}
    
    def traducirASM(self, ctx):
        # Crear variable en .data para el string
        str_id = f"str_{len(ctx['strings'])}"
        valor_limpio = self.valor[1].replace('"', '')
        ctx['strings'].append(f"{str_id} db '{valor_limpio}', 0")
        ctx['strings'].append(f"{str_id}_len equ $ - {str_id}")
        
        # Generar sys_write
        asm = f"    mov rax, 1\n"
        asm += f"    mov rdi, 1\n"
        asm += f"    mov rsi, {str_id}\n"
        asm += f"    mov rdx, {str_id}_len\n"
        asm += f"    syscall\n"
        return asm

class NodoPrint(NodoAST):
    def __init__(self, expresiones, is_println=True): 
        self.expresiones = expresiones
        self.is_println = is_println

    def traducirPy(self): return f"print({', '.join(e.traducirPy() for e in self.expresiones)})"
    def traducirCPP(self): return f"std::cout << {' << '.join(e.traducirCPP() for e in self.expresiones)} << std::endl"
    def traducirGo(self): return f"fmt.Println({', '.join(e.traducirGo() for e in self.expresiones)})"
    def traducirRuby(self): return f"puts {', '.join(e.traducirRuby() for e in self.expresiones)}"
    def to_dict(self): return {"Tipo": "SentenciaPrint", "IsPrintln": self.is_println, "Expresiones": [e.to_dict() for e in self.expresiones]}

    def traducirASM(self, ctx):
        asm = ""
        for e in self.expresiones:
            if isinstance(e, NodoString):
                asm += e.traducirASM(ctx)
            elif isinstance(e, NodoNumero) or isinstance(e, NodoIdentificador):
                asm += e.traducirASM(ctx)
                asm += "    call print_int\n"
        
        if self.is_println:
            asm += "    call print_newline\n"
        return asm

class NodoIf(NodoAST):
    def __init__(self, condicion, cuerpo_if, cuerpo_else=None):
        self.condicion = condicion
        self.cuerpo_if = cuerpo_if
        self.cuerpo_else = cuerpo_else

    def traducirPy(self):
        res = f"if {self.condicion.traducirPy()}:\n"
        res += "    " + "\n    ".join(c.traducirPy() for c in self.cuerpo_if)
        if self.cuerpo_else:
            res += "\nelse:\n"
            res += "    " + "\n    ".join(c.traducirPy() for c in self.cuerpo_else)
        return res

    def traducirCPP(self):
        res = f"if ({self.condicion.traducirCPP()}) {{\n"
        res += "    " + ";\n    ".join(c.traducirCPP() for c in self.cuerpo_if) + ";\n}"
        if self.cuerpo_else:
            res += " else {\n"
            res += "    " + ";\n    ".join(c.traducirCPP() for c in self.cuerpo_else) + ";\n}"
        return res

    def traducirGo(self):
        res = f"if {self.condicion.traducirGo()} {{\n"
        res += "    " + "\n    ".join(c.traducirGo() for c in self.cuerpo_if) + "\n}"
        if self.cuerpo_else:
            res += " else {\n"
            res += "    " + "\n    ".join(c.traducirGo() for c in self.cuerpo_else) + "\n}"
        return res

    def traducirRuby(self):
        res = f"if {self.condicion.traducirRuby()}\n"
        res += "    " + "\n    ".join(c.traducirRuby() for c in self.cuerpo_if)
        if self.cuerpo_else:
            res += "\nelse\n"
            res += "    " + "\n    ".join(c.traducirRuby() for c in self.cuerpo_else)
        res += "\nend"
        return res

    def to_dict(self):
        res = {
            "Tipo": "SentenciaIf",
            "Condicion": self.condicion.to_dict(),
            "CuerpoIf": [c.to_dict() for c in self.cuerpo_if]
        }
        if self.cuerpo_else:
            res["CuerpoElse"] = [c.to_dict() for c in self.cuerpo_else]
        return res
        
    def traducirASM(self, ctx):
        # Implementación simplificada para enfocar en print/println
        asm = ""
        for c in self.cuerpo_if: asm += c.traducirASM(ctx)
        return asm

class NodoWhile(NodoAST):
    def __init__(self, condicion, cuerpo):
        self.condicion = condicion
        self.cuerpo = cuerpo

    def traducirPy(self):
        res = f"while {self.condicion.traducirPy()}:\n"
        res += "    " + "\n    ".join(c.traducirPy() for c in self.cuerpo)
        return res

    def traducirCPP(self):
        res = f"while ({self.condicion.traducirCPP()}) {{\n"
        res += "    " + ";\n    ".join(c.traducirCPP() for c in self.cuerpo) + ";\n}"
        return res

    def traducirGo(self):
        res = f"for {self.condicion.traducirGo()} {{\n"
        res += "    " + "\n    ".join(c.traducirGo() for c in self.cuerpo) + "\n}"
        return res

    def traducirRuby(self):
        res = f"while {self.condicion.traducirRuby()}\n"
        res += "    " + "\n    ".join(c.traducirRuby() for c in self.cuerpo)
        res += "\nend"
        return res

    def to_dict(self):
        return {
            "Tipo": "SentenciaWhile",
            "Condicion": self.condicion.to_dict(),
            "Cuerpo": [c.to_dict() for c in self.cuerpo]
        }
        
    def traducirASM(self, ctx):
        # Implementación simplificada para enfocar en print/println
        asm = ""
        for c in self.cuerpo: asm += c.traducirASM(ctx)
        return asm

class NodoFor(NodoAST):
    def __init__(self, inicializacion, condicion, incremento, cuerpo):
        self.inicializacion = inicializacion
        self.condicion = condicion
        self.incremento = incremento
        self.cuerpo = cuerpo

    def traducirPy(self):
        res = f"{self.inicializacion.traducirPy()}\n"
        res += f"while {self.condicion.traducirPy()}:\n"
        cuerpo_str = "\n    ".join(c.traducirPy() for c in self.cuerpo)
        if cuerpo_str: res += "    " + cuerpo_str + "\n"
        res += "    " + self.incremento.traducirPy()
        return res

    def traducirCPP(self):
        init = self.inicializacion.traducirCPP()
        cond = self.condicion.traducirCPP()
        inc = self.incremento.traducirCPP()
        res = f"for ({init}; {cond}; {inc}) {{\n"
        res += "    " + ";\n    ".join(c.traducirCPP() for c in self.cuerpo) + ";\n}"
        return res

    def traducirGo(self):
        init = self.inicializacion.traducirGo()
        cond = self.condicion.traducirGo()
        inc = self.incremento.traducirGo()
        res = f"for {init}; {cond}; {inc} {{\n"
        res += "    " + "\n    ".join(c.traducirGo() for c in self.cuerpo) + "\n}"
        return res

    def traducirRuby(self):
        res = f"{self.inicializacion.traducirRuby()}\n"
        res += f"while {self.condicion.traducirRuby()}\n"
        cuerpo_str = "\n    ".join(c.traducirRuby() for c in self.cuerpo)
        if cuerpo_str: res += "    " + cuerpo_str + "\n"
        res += "    " + self.incremento.traducirRuby() + "\nend"
        return res

    def to_dict(self):
        return {
            "Tipo": "SentenciaFor",
            "Inicializacion": self.inicializacion.to_dict(),
            "Condicion": self.condicion.to_dict(),
            "Incremento": self.incremento.to_dict(),
            "Cuerpo": [c.to_dict() for c in self.cuerpo]
        }
        
    def traducirASM(self, ctx):
        asm = self.inicializacion.traducirASM(ctx)
        for c in self.cuerpo: asm += c.traducirASM(ctx)
        return asm

class NodoFuncion(NodoAST):
    def __init__(self, tipo, nombre, parametros, cuerpo):
        self.tipo = tipo; self.nombre = nombre; self.parametros = parametros; self.cuerpo = cuerpo

    def traducirPy(self):
        return f"def {self.nombre[1]}({', '.join(p.traducirPy() for p in self.parametros)}):\n    " + "\n    ".join(c.traducirPy() for c in self.cuerpo)

    def traducirCPP(self):
        return f"{self.tipo[1]} {self.nombre[1]}({', '.join(p.traducirCPP() for p in self.parametros)}) {{\n    " + ";\n    ".join(c.traducirCPP() for c in self.cuerpo) + ";\n}"
    
    def traducirGo(self):
        tipo_go = self.tipo[1]
        if tipo_go in ['float', 'double']: tipo_go = 'float64'
        if tipo_go == 'void': tipo_go = ''
        retorno_str = f" {tipo_go}" if tipo_go else ""
        return f"func {self.nombre[1]}({', '.join(p.traducirGo() for p in self.parametros)}){retorno_str} {{\n    " + "\n    ".join(c.traducirGo() for c in self.cuerpo) + "\n}"

    def traducirRuby(self):
        return f"def {self.nombre[1]}({', '.join(p.traducirRuby() for p in self.parametros)})\n    " + "\n    ".join(c.traducirRuby() for c in self.cuerpo) + "\nend"
    
    def to_dict(self):
        return {
            "Tipo": "Funcion",
            "Nombre": self.nombre[1],
            "Retorno": self.tipo[1],
            "Parametros": [p.to_dict() for p in self.parametros],
            "Cuerpo": [c.to_dict() for c in self.cuerpo]
        }
        
    def traducirASM(self, ctx):
        asm = f"global _start\n"
        asm += f"_start:\n"
        for c in self.cuerpo:
            asm += c.traducirASM(ctx)
        # Salida del programa
        asm += "    mov rax, 60\n    xor rdi, rdi\n    syscall\n"
        return asm

class NodoParametros(NodoAST):
    def __init__(self, tipo, nombre): self.tipo = tipo; self.nombre = nombre
    def traducirPy(self): return self.nombre[1]
    def traducirCPP(self): return f"{self.tipo[1]} {self.nombre[1]}"
    def traducirGo(self): return f"{self.nombre[1]} {'float64' if self.tipo[1] in ['float', 'double'] else self.tipo[1]}"
    def traducirRuby(self): return self.nombre[1]
    def to_dict(self): return {"Tipo": "Parametro", "Nombre": self.nombre[1], "Dato": self.tipo[1]}

class NodoAsignacion(NodoAST):
    def __init__(self, tipo, nombre, expresion): self.tipo = tipo; self.nombre = nombre; self.expresion = expresion
    def traducirPy(self): return f"{self.nombre[1]} = {self.expresion.traducirPy()}"
    def traducirCPP(self): return f"{self.tipo[1]} {self.nombre[1]} = {self.expresion.traducirCPP()}"
    def traducirGo(self): return f"var {self.nombre[1]} {'float64' if self.tipo[1] in ['float', 'double'] else self.tipo[1]} = {self.expresion.traducirGo()}"
    def traducirRuby(self): return f"{self.nombre[1]} = {self.expresion.traducirRuby()}"
    def to_dict(self): return {"Tipo": "Asignacion", "Variable": self.nombre[1], "Expresion": self.expresion.to_dict()}
    
    def traducirASM(self, ctx):
        var_name = f"var_{self.nombre[1]}"
        if var_name not in ctx['bss']: ctx['bss'].append(var_name)
        asm = self.expresion.traducirASM(ctx)
        asm += f"    mov [{var_name}], rax\n"
        return asm

class NodoReasignacion(NodoAST):
    def __init__(self, nombre, expresion): self.nombre = nombre; self.expresion = expresion
    def traducirPy(self): return f"{self.nombre[1]} = {self.expresion.traducirPy()}"
    def traducirCPP(self): return f"{self.nombre[1]} = {self.expresion.traducirCPP()}"
    def traducirGo(self): return f"{self.nombre[1]} = {self.expresion.traducirGo()}"
    def traducirRuby(self): return f"{self.nombre[1]} = {self.expresion.traducirRuby()}"
    def to_dict(self): return {"Tipo": "Reasignacion", "Variable": self.nombre[1], "Expresion": self.expresion.to_dict()}

    def traducirASM(self, ctx):
        var_name = f"var_{self.nombre[1]}"
        asm = self.expresion.traducirASM(ctx)
        asm += f"    mov [{var_name}], rax\n"
        return asm

class NodoOperacion(NodoAST):
    def __init__(self, izquierda, operador, derecha): self.izquierda = izquierda; self.operador = operador; self.derecha = derecha
    def traducirPy(self): return f"{self.izquierda.traducirPy()} {self.operador[1]} {self.derecha.traducirPy()}"
    def traducirCPP(self): return f"{self.izquierda.traducirCPP()} {self.operador[1]} {self.derecha.traducirCPP()}"
    def traducirGo(self): return f"{self.izquierda.traducirGo()} {self.operador[1]} {self.derecha.traducirGo()}"
    def traducirRuby(self): return f"{self.izquierda.traducirRuby()} {self.operador[1]} {self.derecha.traducirRuby()}"
    def to_dict(self): return {"Tipo": "Operacion", "Operador": self.operador[1], "Izquierda": self.izquierda.to_dict(), "Derecha": self.derecha.to_dict()}
    
    def traducirASM(self, ctx):
        asm = self.izquierda.traducirASM(ctx)
        asm += "    push rax\n"
        asm += self.derecha.traducirASM(ctx)
        asm += "    mov rbx, rax\n"
        asm += "    pop rax\n"
        if self.operador[1] == '+': asm += "    add rax, rbx\n"
        elif self.operador[1] == '-': asm += "    sub rax, rbx\n"
        elif self.operador[1] == '*': asm += "    imul rax, rbx\n"
        return asm

class NodoRetorno(NodoAST):
    def __init__(self, expresion): self.expresion = expresion
    def traducirPy(self): return f"return {self.expresion.traducirPy()}"
    def traducirCPP(self): return f"return {self.expresion.traducirCPP()}"
    def traducirGo(self): return f"return {self.expresion.traducirGo()}"
    def traducirRuby(self): return f"return {self.expresion.traducirRuby()}"
    def to_dict(self): return {"Tipo": "Retorno", "Valor": self.expresion.to_dict()}
    def traducirASM(self, ctx): return "" 

class NodoIdentificador(NodoAST):
    def __init__(self, nombre): self.nombre = nombre
    def traducirPy(self): return self.nombre[1]
    def traducirCPP(self): return self.nombre[1]
    def traducirGo(self): return self.nombre[1]
    def traducirRuby(self): return self.nombre[1]
    def to_dict(self): return {"Identificador": self.nombre[1]}
    
    def traducirASM(self, ctx):
        var_name = f"var_{self.nombre[1]}"
        return f"    mov rax, [{var_name}]\n"

class NodoNumero(NodoAST):
    def __init__(self, valor): self.valor = valor
    def traducirPy(self): return str(self.valor[1])
    def traducirCPP(self): return str(self.valor[1])
    def traducirGo(self): return str(self.valor[1])
    def traducirRuby(self): return str(self.valor[1])
    def to_dict(self): return {"Numero": str(self.valor[1])}
    
    def traducirASM(self, ctx):
        return f"    mov rax, {self.valor[1]}\n"


class Parser:
    def __init__(self, tokens): self.tokens = tokens; self.pos = 0
    def obtener_token_actual(self): return self.tokens[self.pos] if self.pos < len(self.tokens) else None
    
    def coincidir(self, tipo_esperado):
        token = self.obtener_token_actual()
        if token and token[0] == tipo_esperado: 
            self.pos += 1
            return token
        else: 
            raise SyntaxError(f'Error sintactico: se esperaba {tipo_esperado}, pero se encontro: {token}')

    def parsear(self): return self.funcion()

    def funcion(self):
        tipo = self.coincidir('KEYWORD')
        nombre = self.coincidir('IDENTIFIER')
        self.coincidir('DELIMITER')
        parametros = self.parametros()
        self.coincidir('DELIMITER')
        self.coincidir('DELIMITER')
        cuerpo = self.cuerpo()
        self.coincidir('DELIMITER')
        return NodoFuncion(tipo, nombre, parametros, cuerpo)

    def parametros(self):
        lista = []
        token = self.obtener_token_actual()
        if token and token[1] == ')': return lista
        
        tipo = self.coincidir('KEYWORD')
        nombre = self.coincidir('IDENTIFIER')
        lista.append(NodoParametros(tipo, nombre))
        while self.obtener_token_actual() and self.obtener_token_actual()[1] == ',':
            self.coincidir('DELIMITER')
            tipo = self.coincidir('KEYWORD')
            nombre = self.coincidir('IDENTIFIER')
            lista.append(NodoParametros(tipo, nombre))
        return lista

    def cuerpo(self):
        instrucciones = []
        while self.obtener_token_actual() and self.obtener_token_actual()[1] != '}':
            token = self.obtener_token_actual()
            if token[1] == 'return': instrucciones.append(self.retorno())
            elif token[1] in ['print', 'printf', 'println']: instrucciones.append(self.sentencia_imprimir())
            elif token[1] == 'if': instrucciones.append(self.sentencia_if())
            elif token[1] == 'while': instrucciones.append(self.sentencia_while())
            elif token[1] == 'for': instrucciones.append(self.sentencia_for())
            elif token[0] == 'KEYWORD': 
                instrucciones.append(self.asignacion())
            elif token[0] == 'IDENTIFIER':
                reasig = self.reasignacion()
                self.coincidir('DELIMITER') 
                instrucciones.append(reasig)
            else:
                raise SyntaxError(f"Instruccion no reconocida: {token}")
        return instrucciones

    def sentencia_if(self):
        self.coincidir('KEYWORD')
        self.coincidir('DELIMITER')
        condicion = self.expresion()
        self.coincidir('DELIMITER')
        self.coincidir('DELIMITER')
        cuerpo_if = self.cuerpo()
        self.coincidir('DELIMITER')
        
        cuerpo_else = None
        token = self.obtener_token_actual()
        if token and token[1] == 'else':
            self.coincidir('KEYWORD')
            self.coincidir('DELIMITER')
            cuerpo_else = self.cuerpo()
            self.coincidir('DELIMITER')
            
        return NodoIf(condicion, cuerpo_if, cuerpo_else)

    def sentencia_while(self):
        self.coincidir('KEYWORD')
        self.coincidir('DELIMITER')
        condicion = self.expresion()
        self.coincidir('DELIMITER')
        self.coincidir('DELIMITER')
        cuerpo = self.cuerpo()
        self.coincidir('DELIMITER')
        return NodoWhile(condicion, cuerpo)

    def sentencia_for(self):
        self.coincidir('KEYWORD') 
        self.coincidir('DELIMITER') 
        inicializacion = self.asignacion() 
        condicion = self.expresion()
        self.coincidir('DELIMITER') 
        incremento = self.reasignacion() 
        self.coincidir('DELIMITER') 
        self.coincidir('DELIMITER') 
        cuerpo = self.cuerpo()
        self.coincidir('DELIMITER') 
        return NodoFor(inicializacion, condicion, incremento, cuerpo)

    def sentencia_imprimir(self):
        # AQUI es donde diferenciamos print de println
        comando = self.coincidir('KEYWORD')[1]
        is_println = (comando == 'println')
        
        self.coincidir('DELIMITER')
        args = self.lista_argumentos()
        self.coincidir('DELIMITER')
        self.coincidir('DELIMITER')
        return NodoPrint(args, is_println)

    def lista_argumentos(self):
        args = []
        if self.obtener_token_actual()[1] != ')':
            sigue = True
            while sigue:
                args.append(self.expresion())
                if self.obtener_token_actual()[1] == ',': 
                    self.coincidir('DELIMITER')
                else: 
                    sigue = False
        return args

    def asignacion(self):
        tipo = self.coincidir('KEYWORD')
        nombre = self.coincidir('IDENTIFIER')
        self.coincidir('OPERATOR')
        exp = self.expresion()
        self.coincidir('DELIMITER')
        return NodoAsignacion(tipo, nombre, exp)

    def reasignacion(self):
        nombre = self.coincidir('IDENTIFIER')
        self.coincidir('OPERATOR')
        exp = self.expresion()
        return NodoReasignacion(nombre, exp)

    def retorno(self):
        self.coincidir('KEYWORD')
        exp = self.expresion()
        self.coincidir('DELIMITER')
        return NodoRetorno(exp)

    def expresion(self):
        izq = self.termino()
        while self.obtener_token_actual() and self.obtener_token_actual()[0] == 'OPERATOR':
            op = self.coincidir('OPERATOR')
            der = self.termino()
            izq = NodoOperacion(izq, op, der)
        return izq

    def termino(self):
        token = self.obtener_token_actual()
        if token[0] == 'NUMBER': return NodoNumero(self.coincidir('NUMBER'))
        elif token[0] == 'STRING': return NodoString(self.coincidir('STRING'))
        elif token[0] == 'IDENTIFIER': return NodoIdentificador(self.coincidir('IDENTIFIER'))
        raise SyntaxError(f"Token inesperado: {token}")