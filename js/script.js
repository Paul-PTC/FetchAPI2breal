//URL de la api - EndPoint
const API_URL = "https://retoolapi.dev/NPe0qm/expo";
 
//Función para llamar a la API y traer el JSON
async function ObtenerPersonas(){
    //Obtenemos la respuesta del servidor
    const res = await fetch(API_URL); //Obtener datos de la API
 
    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json();
 
    CrearTabla(data); //Enviamos al JSON a la fúncion "CrearTabla"
}
 
//Función que creará las filas de la tabla en base a los registros que vienen de la API
function CrearTabla(datos){//Datos representa al JSON qeu viene  de la api
    //Se llama al "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");
 
    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Vacíamos el contenido de la tabla
 
    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.edad}</td>
                <td>${persona.correo}</td>
                <td>
                    <button onClick="AbrirModalEditar('${persona.id}', '${persona.nombre}', '${persona.apellido}', '${persona.correo}', ${persona.edad})">Editar</button>
                    <button onClick="EliminarRegistro(${persona.id})">Eliminar</button>
                </td>
            </tr>
        `
    });
}
 
ObtenerPersonas();
 
//Proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar");
const btnAgregar = document.getElementById("btnAbrirModal");
const btnCerrar = document.getElementById("btnCerrarModal");
 
btnAgregar.addEventListener("click", ()=>{
    modal.showModal();
});
 
btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Cerrar Modal
});
 
//Agregar nuevo integrante
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e => {
    e.preventDefault();
 
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("email").value.trim();
 
    if(!nombre || !apellido || !correo || !edad){
        alert("Complete todo los cambios")
        return;
    }
 
    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({nombre, apellido, edad, correo})
    });
 
    if(respuesta.ok){
        alert("El registro fue agregado correctamente");
 
        document.getElementById("frmAgregarIntegrante").reset();
 
        modal.close();
 
        ObtenerPersonas();
    }
    else{
        alert("Hubo un error al agregar")
    }
});
 
 
//Para eliminar registros
async function EliminarRegistro(id) { //Se pide ID para borrar
        if(confirm("¿Estas seguro de que desea borrar el registro?")){
            await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
            ObtenerPersonas(); //Para refrescar
        }
}

//Proceso para editar registros
const modalEditar = document.getElementById("modalEditar");
const btnCerrarEditar = document.getElementById("btnCerrarEditar");

//EventListener para cerrar el modal de editar
btnCerrarEditar.addEventListener("click", ()=>{
    modal.close(); //Cerrar el form
});
function AbrirModalEditar(id, nombre, apellido, correo, edad){
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("apellidoEditar").value = apellido;
    document.getElementById("emailEditar").value = correo;
    document.getElementById("edadEditar").value = edad;
    document.getElementById("idEditar").value = id;

    modalEditar.showModal(); //El modal se abre cuandoya tiene los valores ingresados

}

document.getElementById("frmEditarIntegrante").addEventListener("submit", async e => {
    e.preventDefault();

    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombreEditar").value.trim();
    const apellido = document.getElementById("apellidoEditar").value.trim();
    const edad = document.getElementById("edadEditar").value.trim();
    const correo = document.getElementById("emailEditar").value.trim();

    if(!nombre || !apellido || !edad || !correo){
        alert("Complete todos los campos");
        return;
    }

    const respuesta = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({edad, correo, nombre, apellido})
    });

    if(respuesta.ok){
        alert("Registro actualizado correctamente ");
        modalEditar.close();
        ObtenerPersonas();
    }
    else{
        alert("Error al actualizar");
    }
});