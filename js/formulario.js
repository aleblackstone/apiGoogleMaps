
var _data;
/**
 * @description Leemos el contenido del Json.
 */
window.onload = function(){ 
    readTextFile("/js/datos.json", function(text){
        _data = JSON.parse(text);
    }); 
    var _aux = setTimeout(cargarCheckboxCiclos, 50);
 };


 function cargarFormulario(){
    if(document.getElementById("toggle").checked == true){
        crearComboBox();
    }
        
    else
        cargarCheckboxCiclos();
}

/**
 * @description Creamos el ComboBox con los países en los cuales hay ciclos.
 */
function crearComboBox(){
    var condicionFiltrado = document.getElementById("movilidad").value;

    //Llamamos a este método para que nos devuelva un array con los paises.
    var listaPaises = leerPropiedadesJson("pais",condicionFiltrado);
    document.getElementById("filtrado").innerHTML=" ";
    var comboBox = document.createElement("select");
    comboBox.id = "paises";

    for(var i = 0; i < listaPaises.length; i++){
        var auxOption = document.createElement("option");
        auxOption.value = listaPaises[i];
        auxOption.textContent = listaPaises[i];
        comboBox.appendChild(auxOption);
    }
    document.getElementById("filtrado").appendChild(comboBox);
}


/**
 * @description Filtramos los datos del Json.
 * @param {String} campo Campo sobre el que vamos a aplicar las condiciones de búsqueda.
 * @param {Array} arrayComprobaciones Contiene las condiciones a buscar.
*/
function filtrarporCampos(campo, arrayComprobaciones){
    var numPropiedades = arrayComprobaciones.length;

    switch(numPropiedades){
        /**
         * Si el length es 1 filtramos por país.
         * Si es 2 filtramos por país y tipo de movilidad.
         */
        case 1:
            if(campo.pais == arrayComprobaciones[0])
                return true;
        case 2:
            if(campo.tipo == arrayComprobaciones[0] && campo.pais == arrayComprobaciones[1])
                return true;
    }
}

/**
 * @description Creamos los checkBox con los ciclos.
 */
function cargarCheckboxCiclos(){
    if(document.getElementById("toggle").checked == true){
        document.getElementById("toggle").checked = false;
    }

    var contenedor =  document.getElementById("filtrado");
    contenedor.innerHTML=" ";
   
    var condicionFiltrado = document.getElementById("movilidad").value;

    /**
     * Llamamos a este método para filtras los ciclos por movilidad.
     */
    var listaCiclos = leerPropiedadesJson("ciclo", condicionFiltrado);

    for(var i = 0; i < listaCiclos.length; i++){
        var auxCheckbox = document.createElement("input");
        auxCheckbox.type = "checkbox";
        auxCheckbox.value = listaCiclos[i];
        auxCheckbox.id = "ciclos";
        auxCheckbox.className = "ciclos";

        var label = document.createElement("label");
        label.textContent = listaCiclos[i];

        var br = document.createElement("br");
        contenedor.appendChild(auxCheckbox);
        contenedor.appendChild(label);
        contenedor.appendChild(br);
    }

    var marcar = document.createElement("a");
    marcar.href = "#";
    marcar.innerHTML = "Marcar todos";
    marcar.onclick = marcarTodos;

    var desmarcar = document.createElement("a");
    desmarcar.href = "#";
    desmarcar.innerHTML = "Desmarcar todos";
    desmarcar.onclick = desmarcarTodos;

    contenedor.appendChild(marcar);
    contenedor.appendChild(desmarcar);
    
}

/**
 * @description Marcamos todos los checkBox.
 */
function marcarTodos(){
    var checkbox = document.getElementsByClassName("ciclos");
    
    for(var i = 0; i < checkbox.length; i++)
        checkbox[i].checked = true;
}

/**
 * Desmarcamos todos los checkBox.
 */
function desmarcarTodos(){
    var checkbox = document.getElementsByClassName("ciclos");
    
    for(var i = 0; i < checkbox.length; i++)
        checkbox[i].checked = false;
}

/**
 * @description Filtramos del json con una condicion.
 * @param {String} propiedad Propiedad a filtrar.
 * @param {String} condicion Condición del filtrado.
 */
function leerPropiedadesJson(propiedad, condicion){
    var aux = new Array() ; 
    for(var i = 0; i < _data.length ; i++){
        if(condicion == "" || condicion == "todos"){
            if(aux.includes(_data[i][propiedad]) == false)
            aux.push(_data[i][propiedad]);
        }
        else{
            if(_data[i]["tipo"] == condicion){
                if(aux.includes(_data[i][propiedad]) == false)
                aux.push(_data[i][propiedad]);
            }
        }
        
    }
    return aux;
}

/**
 * @description Leemos del Json
 * @param {*} file Ruta del archivo Json
 * @param {*} callback 
 */
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    };
    rawFile.send(null);
}

