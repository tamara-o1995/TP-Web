document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() { // código de inicialización de eventos
    "uses strict"

    let random; // genero una variable para usarla en 2 funciones distintas
    document.querySelector('#send').addEventListener("click", verificarFormulario);//capturo el evento con addEventListener 
    //del boton enviar del formulario, y llama a la funcion verificarFormulario que verifica que los campos esten completos
    //y que el captcha este bien ingresado

    generarCaptcha(); //ni bien carga la pagina llama a la funcion que genera un numero aleatorio (captcha) de 6 digitos

    function generarCaptcha() {
        random = Math.floor(Math.random() * (900000) + 100000);//se genera un numero random de 6 digitos 
        //entre 100.000 y 999.999 

        document.querySelector('#captcha').innerHTML = random; 
        // muestro en la etiqueta label con id #captcha el numero random generado

    }

    function verificarFormulario(event) {
        event.preventDefault()

        let error = 0;
    // obtengo los elementos del formulario input llamados por id
        let name = document.querySelector('#name');
        let lastName = document.querySelector('#lastName');
        let email = document.querySelector('#email');
        let query = document.querySelector('#query');
        let msg = document.querySelector('#msg');
        let age = document.querySelector('#age');
        let adress = document.querySelector('#adress');
        let type = document.querySelector('#type');
        let msgSend = document.querySelector('#msgSend');
        let captchaInput = document.querySelector('#captchaInput');
        msgSend.innerHTML = ''; //vacio el mensaje mostrado en ejecuciones anteriores 
        // verifica que los campos obligatorios (nombre, apellido, correo, consulta) no esten vacios 
        // y si encuentra algun vacio le agrega la clase error que le aplica border rojo al imput incompleto
        //y a su vez convierte la variable error en 1 para mas adelante en caso de que la misma sea 1 emita un mensaje
        //de error. 

        if (name.value == "") {
            name.classList.add("error");
            error = 1;
        } else { // en caso de que verifique que este completo, remueve la clase error para quitar el borde rojo, 
            //(en caso de que se le haya aplicado en un intento previo)
            name.classList.remove("error");
        }
        if (lastName.value == "") {
            lastName.classList.add("error");
            error = 1;
        } else {
            lastName.classList.remove("error");
        }
        if (email.value == "") {
            email.classList.add("error");
            error = 1;
        } else {
            email.classList.remove("error");
        }
        if (query.value == "") {
            query.classList.add("error");
            error = 1;
        } else {
            query.classList.remove("error");
        }

        if (error == 1) { // si el error es 1 quiere decir que hay al menos un campo incompleto, en ese caso se dispara 
            //un mensaje de error y generamos un nuevo captcha
            generarCaptcha();
            msg.innerHTML = "Campos incompletos";
        }
        else if (captchaInput.value != random) { //en caso de que los campos no esten incompletos, 
            //pero el captcha este mal ingresado, remueve todas las clases de error de los imput, 
            //dispara el mensaje de captcha incorrecto y genera un nuevo valor de captcha

            name.classList.remove("error");
            lastName.classList.remove("error");
            email.classList.remove("error");
            query.classList.remove("error");
            captchaInput.classList.add("error");
            msg.innerHTML = "Captcha incorrecto";
            generarCaptcha();
        } else {
    // si los campos y el capcha son correctos se remueven todas las clases de error y se convierten en vacio los campos
    //(input) y se dispara mensaje para indicar que se envio y se vuelve a generar un nuevo captcha, 
    //por si se quiere hacer una nueva consulta.
            name.classList.remove("error");
            lastName.classList.remove("error");
            email.classList.remove("error");
            query.classList.remove("error");
            captchaInput.classList.remove("error");
            name.value = '';
            lastName.value = '';
            email.value = '';
            query.value = '';
            captchaInput.value = '';
            msg.innerHTML = '';
            age.value = '';
            adress.value = '';
            type.value = '';
            msgSend.innerHTML = "¡Gracias por su consulta!";
            generarCaptcha();
        }
    }
}
