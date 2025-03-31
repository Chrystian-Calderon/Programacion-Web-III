function getAll() {
    fetch('http://localhost:3000/usuario')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const tableBody = document.getElementById('result');
                tableBody.innerHTML = "";
                data.data.forEach(usuario => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${usuario.id_usuario}</td>
                        <td>${usuario.nombre}</td>
                        <td>${usuario.correo}</td>
                        <td>${usuario.rol}</td>
                        <td>${usuario.estado}</td>
                        <td class="d-flex gap-2"><button class="btn btn-warning" onclick="editar(${usuario.id_usuario})">Editar</button><button class="btn btn-danger" onclick="eliminar(${usuario.id_usuario})">Eliminar</button></td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        })
        .catch(error => console.error('Error:', error));
}

function editar(id) {
    fetch('http://localhost:3000/usuario/' + id)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const usuario = data.data[0];
                document.getElementById('title-form').innerHTML = "Editar Usuario";
                document.getElementById('btn-form').innerHTML = "Actualizar";
                document.getElementById('btn-add').style.display = "block";
                document.getElementById('_method').value = "PUT";
                document.getElementById('id_usuario').value = usuario.id_usuario;
                document.getElementById('nombre').value = usuario.nombre;
                document.getElementById('correo').value = usuario.correo;
                document.getElementById('password').value = usuario.password;
                document.getElementById('rol').value = usuario.rol;
                document.getElementById('estado').value = usuario.estado;
            }
        })
        .catch(error => console.error('Error:', error));
}

function crear() {
    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            password: document.getElementById('password').value,
            rol: document.getElementById('rol').value,
            estado: document.getElementById('estado').value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Usuario creado correctamente');
                getAll();
            } else {
                alert('Error al crear el usuario');
            }
        })
        .catch(error => console.error('Error:', error));
}

function update(id) {
    fetch('http://localhost:3000/usuario/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: document.getElementById('nombre').value,
            correo: document.getElementById('correo').value,
            password: document.getElementById('password').value,
            rol: document.getElementById('rol').value,
            estado: document.getElementById('estado').value
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                document.querySelector('form').reset();
                getAll();
            } else {
                alert(data.message);
            }
        })
}

function eliminar(id) {
    if (confirm("Desea eliminar el registro")) {

        fetch('http://localhost:3000/usuario/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: document.getElementById('nombre').value,
                correo: document.getElementById('correo').value,
                password: document.getElementById('password').value,
                rol: document.getElementById('rol').value,
                estado: document.getElementById('estado').value
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(data.message);
                    getAll();
                } else {
                    alert(data.message);
                }
            })
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('btn-add').style.display = "none";
    getAll();
});

document.getElementById('btn-add').addEventListener('click', () => {
    document.getElementById('btn-add').style.display = "none";
    document.getElementById('title-form').innerHTML = "Agregar Usuario";
    document.getElementById('btn-form').innerHTML = "Agregar Usuario";
    document.getElementById('_method').value = "POST";
    document.querySelector('form').reset();
});

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (document.getElementById("_method").value === "POST") {
        crear();
    } else {
        const id = document.getElementById("id_usuario").value;
        update(id);
    }
})