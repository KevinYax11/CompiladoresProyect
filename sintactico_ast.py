class NodoAST:
    def traducirPy(self): raise NotImplementedError()
    def traducirCPP(self): raise NotImplementedError()
    def traducirGo(self): raise NotImplementedError()
    def traducirRuby(self): raise NotImplementedError()

class NodoString(NodoAST):
    def __init__(self, valor): self.valor = valor
    def traducirPy(self): return self.valor[1]
    def traducirCPP(self): return self.valor[1]
    def traducirGo(self): return self.valor[1]
    def traducirRuby(self): return self.valor[1]

class NodoPrint(NodoAST):
    def __init__(self, expresiones): self.expresiones = expresiones
    def traducirPy(self): return f"print({', '.join(e.traducirPy() for e in self.expresiones)})"
    def traducirCPP(self): return f"std::cout << {' << '.join(e.traducirCPP() for e in self.expresiones)} << std::endl"
    def traducirGo(self): return f"fmt.Println({', '.join(e.traducirGo() for e in self.expresiones)})"
    def traducirRuby(self): return f"puts {', '.join(e.traducirRuby() for e in self.expresiones)}"

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

class NodoParametros(NodoAST):
    def __init__(self, tipo, nombre): self.tipo = tipo; self.nombre = nombre
    def traducirPy(self): return self.nombre[1]
    def traducirCPP(self): return f"{self.tipo[1]} {self.nombre[1]}"
    def traducirGo(self): return f"{self.nombre[1]} {'float64' if self.tipo[1] in ['float', 'double'] else self.tipo[1]}"
    def traducirRuby(self): return self.nombre[1]

class NodoAsignacion(NodoAST):
    def __init__(self, tipo, nombre, expresion): self.tipo = tipo; self.nombre = nombre; self.expresion = expresion
    def traducirPy(self): return f"{self.nombre[1]} = {self.expresion.traducirPy()}"
    def traducirCPP(self): return f"{self.tipo[1]} {self.nombre[1]} = {self.expresion.traducirCPP()}"
    def traducirGo(self): return f"var {self.nombre[1]} {'float64' if self.tipo[1] in ['float', 'double'] else self.tipo[1]} = {self.expresion.traducirGo()}"
    def traducirRuby(self): return f"{self.nombre[1]} = {self.expresion.traducirRuby()}"

class NodoOperacion(NodoAST):
    def __init__(self, izquierda, operador, derecha): self.izquierda = izquierda; self.operador = operador; self.derecha = derecha
    def traducirPy(self): return f"{self.izquierda.traducirPy()} {self.operador[1]} {self.derecha.traducirPy()}"
    def traducirCPP(self): return f"{self.izquierda.traducirCPP()} {self.operador[1]} {self.derecha.traducirCPP()}"
    def traducirGo(self): return f"{self.izquierda.traducirGo()} {self.operador[1]} {self.derecha.traducirGo()}"
    def traducirRuby(self): return f"{self.izquierda.traducirRuby()} {self.operador[1]} {self.derecha.traducirRuby()}"

class NodoRetorno(NodoAST):
    def __init__(self, expresion): self.expresion = expresion
    def traducirPy(self): return f"return {self.expresion.traducirPy()}"
    def traducirCPP(self): return f"return {self.expresion.traducirCPP()}"
    def traducirGo(self): return f"return {self.expresion.traducirGo()}"
    def traducirRuby(self): return f"return {self.expresion.traducirRuby()}"

class NodoIdentificador(NodoAST):
    def __init__(self, nombre): self.nombre = nombre
    def traducirPy(self): return self.nombre[1]
    def traducirCPP(self): return self.nombre[1]
    def traducirGo(self): return self.nombre[1]
    def traducirRuby(self): return self.nombre[1]

class NodoNumero(NodoAST):
    def __init__(self, valor): self.valor = valor
    def traducirPy(self): return str(self.valor[1])
    def traducirCPP(self): return str(self.valor[1])
    def traducirGo(self): return str(self.valor[1])
    def traducirRuby(self): return str(self.valor[1])

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
            else: instrucciones.append(self.asignacion())
        return instrucciones

    def sentencia_imprimir(self):
        self.coincidir('KEYWORD')
        self.coincidir('DELIMITER')
        args = self.lista_argumentos()
        self.coincidir('DELIMITER')
        self.coincidir('DELIMITER')
        return NodoPrint(args)

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