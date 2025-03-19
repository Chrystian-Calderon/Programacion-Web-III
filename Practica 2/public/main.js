let modo = document.getElementById('modo').value;
document.getElementById('modo').addEventListener('change', () => {
    modo = document.getElementById('modo').value;
    cargarProductos();
    categorias();
});

async function cargarProductos(filter = 0) {
    try {
        const response = await fetch('/api/productos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-db-mode': modo
            }
        });
    
        const data = await response.json();
        let productos = data.results;
        console.log(productos);
        if (filter !== 0) {
            productos = productos.filter(producto => producto.id_categoria === filter);
        }
        document.getElementById('productos').innerHTML = productos.map(producto => `<tr><td>${producto.nombre}</td><td>${producto.categoria}</td><td>${producto.precio}</td><td>${producto.stock}</td><td><a href="productos.html?title=editar&id=${producto.id_producto}" class="btn btn-success">Editar</a><button type="button" class="btn btn-danger" onclick="eliminarProducto(${producto.id_producto});">Eliminar</button></td></tr>`);
    } catch (err) {
        // document.getElementById('resultados').innerHTML = `<div class="alert alert-danger">Error: ${err.message}</div>`;
        console.error(err.message);
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

async function eliminarProducto(id) {
    try {
        const response = await fetch(`/api/productos/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-db-mode': modo
            }
        });

        const data = await response.json();
        if (data.success) {
            cargarProductos();
        } else {
            alert('No se pudo eliminar el producto');
        }
    } catch (err) {
        console.error(err);
    }
}

document.getElementById('categorias').addEventListener('change', () => {
    const filter = document.getElementById('categorias').value;
    cargarProductos(filter);
});

document.addEventListener('DOMContentLoaded', () => {
    categorias();
    cargarProductos();
});