document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() { // código de inicialización de eventos
    "uses strict"

    const url = "https://62ae2c6c645d00a28a0597f1.mockapi.io/api/v1/alumnos";

    let promo = "Kundalini Yoga"; //se declara variable para utilizarla en el resaltado de las filas

    async function agregar(event) {
        event.preventDefault();
        try {
            let aviso = document.querySelector("#aviso");
            //obtengo los datos ingresados en el formulario que cada uno corresponde a un campo de la tabla 
            //almaceno en objeto Json llamo alumno
            let alumno = {
                "thing": {
                    "alumno": document.querySelector("#alumno").value,
                    "actividad": document.querySelector("#actividad").value,
                    "telefono": document.querySelector("#telefono").value,
                    "email": document.querySelector("#email").value
                }
            };
            if (alumno.thing.actividad && alumno.thing.alumno && alumno.thing.telefono && alumno.thing.email != "") {
                let response = await fetch(url, {
                    "method": "POST",
                    "mode": 'cors',
                    "headers": { "Content-Type": "application/json" },
                    "body": JSON.stringify(alumno) //guarda el dato del alumno (Json) en la api
                });
                console.log(response);
                if (!response.ok) {
                    aviso.innerHTML = "Error"; //MOSTRAR UN MENSAJE DE ERROR
                } else {
                    mostrarTabla();
                    aviso.innerHTML = "Se agrego con éxito"; //MOSTRAR UN MENSAJE DE EXITO
                };
            }
            else {
                aviso.innerHTML = "Campos Incompletos"; //MOSTRAR UN MENSAJE DE CAMPOS INCOMPLETOS
            }
        } catch (response) {
            aviso.innerHTML = "Sin Conexión";  //MOSTRAR UN MENSAJE DE SIN CONEXION
        }
    }

    function agregarVarios(event) {
        event.preventDefault();

        let varios = document.querySelector("#cantidad").value;
        for (let i = 0; i < varios; i++) {
            agregar(event);
        }
        mostrarTabla();
    }

    function filtrar() {
        let filtro = document.querySelector("#selectFiltro");
        let filas = document.querySelectorAll("#table_body tr");

        for (let i = 0; i < filas.length; i++) {

            if (filtro.value === "conDescuento") {

                if (filas[i].classList.contains('resaltar')) {
                    filas[i].classList.remove("ocultar");
                }
                else {
                    filas[i].classList.add("ocultar");
                }
            }
            else if (filtro.value === "sinDescuento") {

                if (filas[i].classList.contains('resaltar')) {
                    filas[i].classList.add("ocultar");
                }
                else {
                    filas[i].classList.remove("ocultar");
                }
            }
            else if (filtro.value === "tablaCompleta") {
                filas[i].classList.remove("ocultar");
            }
        }
    }
    let page = 1;
    document.querySelector("#prev").addEventListener("click", anterior);
    document.querySelector("#next").addEventListener("click", siguiente);

    function anterior() {
        page--;
        mostrarTabla();
    }

    function siguiente() {
        page++;
        mostrarTabla();
    }

    mostrarTabla();

    async function mostrarTabla() {
        let tabla = document.querySelector("#table_body");
        document.querySelector("#aviso").innerHTML = ""; //para que se borre el mensaje 
        try {
            let response = await fetch(url + "?page=" + page + "&limit=10");
            let json = await response.json();
            if (!response.ok) {
                console.log("Error ");
            } else {
                if (page > 1) {
                    document.querySelector("#prev").classList.remove("ocultar");
                } else {
                    document.querySelector("#prev").classList.add("ocultar");
                }
                if (json.length >= 10) {
                    document.querySelector("#next").classList.remove("ocultar");
                } else {
                    document.querySelector("#next").classList.add("ocultar");
                }

                tabla.innerHTML = ""; // vaciamos la tabla para que no se repitan las filas que ya estaban
                for (let dato of json) {
                    let act = dato.thing.actividad;
                    let tr;
                    if (act == promo) {
                        tr = `<tr class="resaltar">`;
                    } else {
                        tr = `<tr>`;
                    }
                    tabla.innerHTML +=
                        `${tr}
                                <td>${dato.thing.alumno}</td>
                                <td>${dato.thing.actividad}</td>
                                <td>${dato.thing.telefono}</td>   
                                <td class="emailMobile">${dato.thing.email}</td>
                                <td><button class="btnEditar" data-id= ${dato.id}><img src="images/edit.png" /></button></td>
                                <td><button class="btnBorrar" data-id= ${dato.id}><img src="images/delete.png" /></button></td>
                            </tr>`
                }
                obtener_IdBotonBorrar();
                obtener_IdBotonEditar();
            }


        } catch (response) {
            console.log(response);
        };
    }
    function obtener_IdBotonEditar() {
        let botones = document.querySelectorAll(".btnEditar");
        for (let boton of botones) {
            boton.addEventListener("click", function () {
                let id = boton.dataset.id;
                editar(id);
            });
        }
    }
    function obtener_IdBotonBorrar() {
        let botones = document.querySelectorAll(".btnBorrar");
        for (let boton of botones) {

            console.log(boton);
            boton.addEventListener("click", function () {
                console.log(boton.dataset.id);
                let id = boton.dataset.id;
                borrar(id);
            });
        }
    }

    async function editar(id) {
        try {
            let aviso = document.querySelector("#aviso");
            //obtengo los datos ingresados en el formulario que cada uno corresponde a un campo de la tabla 
            //almaceno en objeto Json llamo alumno
            let alumno = {
                "thing": {
                    "alumno": document.querySelector("#alumno").value,
                    "actividad": document.querySelector("#actividad").value,
                    "telefono": document.querySelector("#telefono").value,
                    "email": document.querySelector("#email").value
                }
            }

            if (alumno.thing.actividad && alumno.thing.alumno && alumno.thing.telefono && alumno.thing.email != "") {
                let response = await fetch(url + "/" + id, {
                    "method": "PUT",
                    "mode": "cors",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify(alumno)
                });
                if (!response.ok) {
                    aviso.innerHTML = "Error";
                } else {
                    mostrarTabla();
                    aviso.innerHTML = "Se edito con éxito";
                }

            }
        } catch (response) {
            aviso.innerHTML = "Sin conexión";
        }
    }

    // function vaciarTabla (event){
    //     event.preventDefault();
    //     documentos.splice(0);
    //     mostrarTabla();
    // }

    async function borrar(id) {
        try {
            let aviso = document.querySelector("#aviso");
            let response = await fetch(url + "/" + id, {
                method: "DELETE",
                mode: "cors"
            });
            if (!response.ok) {
                aviso.innerHTML = "Error";
            } else {
                mostrarTabla();
                aviso.innerHTML = "Se borro con éxito";
            }
        } catch (response) {
            aviso.innerHTML = "Sin conexión";
        }
    }


    // Capturo eventos de los 4 botones del formulario (filtrar, agregar, agregar varios, borrar)
    document.querySelector("#selectFiltro").addEventListener("click", filtrar);
    document.querySelector("#add").addEventListener("click", agregar);
    document.querySelector("#add_more").addEventListener("click", agregarVarios);
    document.querySelector("#clean").addEventListener("click", borrar);
}
