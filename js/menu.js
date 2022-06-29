document.addEventListener("DOMContentLoaded", iniciarPagina);

function iniciarPagina() { // código de inicialización de eventos

    "uses strict"
    
    document.querySelector(".btn_menu").addEventListener("click", toggleMenu);  //cuando hago click en el icono llama a la funcion toggleMenu

    function toggleMenu() { 
        document.querySelector(".navigation").classList.toggle("show");//oculta y muestra, agrega y quita con cada click la clase show a la ul navigation
    }
}
