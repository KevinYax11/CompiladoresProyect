// Animación de la notificación de error
function mostrarError(mensaje) {
    const toast = document.getElementById("errorToast");
    toast.innerText = "⚠️ " + mensaje; 
    
    toast.classList.add("show");
    
    // Ocultar automáticamente después de 4.5 segundos
    setTimeout(() => {
        toast.classList.remove("show");
    }, 4500);
}

async function procesar() {
    const code = document.getElementById('sourceCode').value;
    
    if (!code.trim()) {
        mostrarError("Por favor, ingresa el código fuente antes de compilar.");
        return;
    }

    // Poner las pantallas en modo carga
    const boxes = ['outTokens', 'outAST', 'outPy', 'outRuby', 'outCpp', 'outAsm'];
    boxes.forEach(id => document.getElementById(id).innerText = "Procesando...");

    try {
        const res = await fetch('/compilar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ codigo: code })
        });

        const data = await res.json();

        if (data.status === 'success') {
            document.getElementById('outTokens').innerText = data.tokens.map(t => `[${t[0]}: ${t[1]}]`).join('\n');
            document.getElementById('outAST').innerText = JSON.stringify(data.ast, null, 2);
            document.getElementById('outPy').innerText = data.python;
            document.getElementById('outRuby').innerText = data.ruby;
            document.getElementById('outCpp').innerText = data.cpp;
            document.getElementById('outAsm').innerText = data.asm;
        } else {
            // Limpiar las cajas y mostrar la alerta estilizada
            boxes.forEach(id => document.getElementById(id).innerText = "");
            mostrarError(data.message);
        }
    } catch (e) {
        boxes.forEach(id => document.getElementById(id).innerText = "");
        mostrarError("Error crítico de conexión con el servidor FastAPI.");
    }
}