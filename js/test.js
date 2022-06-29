// fetch(baseURL + grupo + "/" + coleccion, {
fetch(baseURL, {
    method: "GET",
    mode: "cors"
 })
   .then(function(response){
   if( ! response.ok ){
    //   document.querySelector("#infoGroup").innerHTML = "Error " + response.status
    console.log("Error ");
   } else {
     return response.json();
   }
 }).then(function(resultData){
    //al ser tipo JSON resultData es un objeto listo para usar
    //   var html = "";
    //   for (var i = 0; i < resultData[coleccion].length; i++) {
    //     html += "Id: " + resultData[coleccion][i]['_id'] + "<br />";
    //     html += "Informacion: " + JSON.stringify(resultData[coleccion][i]['thing']) + "<br />";
    //     html += "--------------------- <br />";
    //   }
    //   document.querySelector("#infoGroup").innerHTML = html;
    console.log(resultData);
    })
   .catch(function(e){
      console.log(e);
    })