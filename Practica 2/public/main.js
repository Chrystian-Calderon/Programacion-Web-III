let modo = document.getElementById('modo').value;
document.getElementById('modo').addEventListener('change', () => {
    modo = document.getElementById('modo').value;
});

async function cargarProductos(modo) {
    try {
        const response = await fetch('/api/productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-db-mode': modo
            }
        });
    
        const data = await response.json();
    } catch (err) {
        document.getElementById('resultados').innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
    }
}

async function categorias() {
    try {
        const response = await fetch('/api/categorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-db-mode': modo
            }
        });

        const data = await response.json();
        document.getElementById('categorias').innerHTML = '<option value="" selected disabled>Seleccione una categoría</option>';
        document.getElementById('categorias').innerHTML += data.results.map(categoria => `<option value="${categoria.id_categoria}">${categoria.nombre}</option>`).join('');
    } catch (err) {
        console.error(err);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    categorias();
});