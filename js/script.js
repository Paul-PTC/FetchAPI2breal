//URL de la API - Endpoint
const API_URL = "https://retoolapi.dev/NPe0qm/expo";

//Función para llamar a la API y traer el JSON
async function ObtenerPersonas() {
    
    //Obtenemos la respuesta del servidor
    const res = await fetch(API_URL);

    //Convertir la respuesta del servidor a formato JSON
    const data = await res.json(); //Esto es un JSON

    CrearTabla(data); //Enviamos el JSON a la función "CrearTabla".
}

//Función que creará las filas de la tabla en base a los registros que vienen de la API

function CrearTabla(datos){ //"Datos" representa al JSON que viene de la API

    //Se llama al "tbody" dentro de la tabla con id "tabla"
    const tabla = document.querySelector("#tabla tbody");

    //Para inyectar código HTML usamos "innerHTML"
    tabla.innerHTML = ""; //Variamos el contenido de la tabla

    datos.forEach(persona => {
        tabla.innerHTML += `
        <tr>
            <td>${persona.id}</td>
            <td>${persona.nombre}</td>
            <td>${persona.apellido}</td>
            <td>${persona.edad}</td> 
            <td>${persona.correo}</td>
            <td>
                <button>Editar</button>
                <button>Eliminar</button>
            </td>
        </tr>
        `
    });
}

ObtenerPersonas();




//Proceso para agregar un nuevo registro
const modal = document.getElementById("modalAgregar"); //Cuadro de diálogo
const btnAgregar = document.getElementById("btnAbrirModal"); //+ para abrir
const btnCerrar = document.getElementById("btnCerrarModal"); //x para cerrar


btnAgregar.addEventListener("click", ()=>{
    modal.showModal(); //Abrir Modal
});

btnCerrar.addEventListener("click", ()=>{
    modal.close(); //Cerrar Modal
});

//Agregar nuevo integrante desde el formulario
document.getElementById("frmAgregarIntegrante").addEventListener("submit", async e => {
    e.preventDefault(); //"e" representa el evento Submit - Evita que el formulario se envie

    //Capturamos los valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("email").value.trim();

    //Validación básica
    if(!nombre || !apellido || !correo || !edad){
        alert("Complete todos los campos");
        return; //Evita que el código siga ejecutándose
    }

    //Llamar a la API para enviar el usuario
    const respuesta = await fetch(API_URL,{
        method: "POST",
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({nombre, apellido, edad, correo}),
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente");

        //Limpiar el formulario
        document.getElementById("frmAgregarIntegrante").reset();

        //Cerrar el formulario
        modal.close();

        //Recargar la tabal
        ObtenerPersonas();
    }
    else{
        alert("Hubo un error al agregar");
    }


}); //Fin del fortmulario 