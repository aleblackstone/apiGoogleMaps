/**
 * @description Llamámos a los métodos para filtrar la información.
 */
function buscar(){
    /**
     * Creamos el mapa.
     */
    myMap();
    /**
     * Enlazamos dependiendo del tipo de filtrado.
     */
    if(document.getElementById("toggle").checked == false)
        filtrarPorCiclos();
    else   
        filtrarPorPais();    
}

/**
 * @description Creamos el mapa con sus propiedades.
 */
var map;
function myMap() {
    var width = window.innerWidth;
    var _zoom;
    var long;
    var lat;
    /**
     * Dependiendo del ancho del viewport asignamos las propiedades del mapa.
     */
    if(width <= 414){
        _zoom = 3;
        long = 47.6163579;
        lat = 8.8594955;
    }
    else{
        _zoom = 4;
        long = 47.6163579;
        lat = 8.8594955;
    }
    if(width > 1023){
        _zoom = 5;
        long = 52.863259;
        lat = 12.1042182;
    }
    var mapProp= {
        center:new google.maps.LatLng(long,lat),
        zoom:_zoom,
    };
    map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

/**
 * @description Filtramos los resultados dependiendo de los ciclos que haya
 * seleccionado el usuario.
 */
/*ArraglarAAAAAAAAAA*/
function filtrarPorCiclos(){
    var filtroCiclos = document.getElementsByClassName("ciclos");
    var listaFiltros = [];
    var coincidencias = [];
    //var listaCompleta = [];

    for(var i = 0; i < filtroCiclos.length; i++){
        if(filtroCiclos[i].checked == true)
            listaFiltros.push(filtroCiclos[i].value);
    }
    for(var i = 0; i < _data.length; i++){
        var ciclos = [];
        for(var j = 0; j < listaFiltros.length; j++){
            if(_data[i]["ciclo"] == listaFiltros[j]){
                if(coincidencias.includes(_data[i]["ubicacion"]) == false)
                    coincidencias.push(_data[i]["ubicacion"]);
                //ciclos.push(_data[i]["ubicacion"]);
                //ciclos.push(_data[i]["ciclo"]);
            }               
        }   
        //listaCompleta.push(ciclos);  
    } 
    //var listaCiclosCiudad = ordenarLista(coincidencias, listaCompleta);
    for(var i = 0; i < coincidencias.length; i++)
        crearMarcador(coincidencias[i], null);
}

/**
 * @description Filtramos los resultados por el país que selecciono el usuario.
 */
function filtrarPorPais(){
    var pais = document.getElementById("paises").value;
    var tipoMovilidad = document.getElementById("movilidad").value;
    var ciudades = [];
    var ciclos = [];

    for(var i = 0; i < _data.length; i++){
        if(_data[i]["pais"] == pais){
            if(_data[i]["tipo"] == tipoMovilidad){
                if(ciudades.includes(_data[i]["ubicacion"]) == false)
                    ciudades.push(_data[i]["ubicacion"]);
                ciclos.push(_data[i]["ubicacion"]);
                ciclos.push(_data[i]["ciclo"]);
            }
            else if(tipoMovilidad == "todos"){
                if(ciudades.includes(_data[i]["ubicacion"]) == false)
                    ciudades.push(_data[i]["ubicacion"]);    
                ciclos.push(_data[i]["ubicacion"]);
                ciclos.push(_data[i]["ciclo"]);       
            }
        }        
    }
    var listaOrdenada = ordenarLista(ciudades ,ciclos);
    for(var x = 0; x < ciudades.length; x++)
        crearMarcador(ciudades[x], listaOrdenada);
}

/**
 * @description Creamos una lista de los ciclos por ciudad.
 * @param {Array[]} ubicaciones Coordenadas de las ciudades
 * @param {Array[]} ciclos Nombre ciclos de dichas ciudades.
 * @returns Un array[][] con todos los ciclos por ciudad. 
 * Estructura del array:
 *      [][0] --> Coordenadas de la ciudad.
 *      [][1 en adelante] --> Ciclos en dicha ciudad.
 */
function ordenarLista(ubicaciones, ciclos){
    var listaCompleta = [];
    
    for(var i = 0; i < ubicaciones.length; i++){
        var ciudad = [];
        for(var j = 0; j < ciclos.length; j++){
            if(ubicaciones[i] == ciclos[j]){
                if(ciudad.includes(ciclos[j]) == false)
                    ciudad.push(ciclos[j]);
                ciudad.push(ciclos[j+1]);
            }
        }
        listaCompleta.push(ciudad);
    }
    return listaCompleta;
}

/**
 * @description Creamos los marcadores del mapa y las ventanas de información.
 * @param {Array[]} listaUbicaciones Contiene las coordenadas de las ciudades.
 * @param {Array[][]} ciclosPorCiudad Descrita anteriormente.
 */
function crearMarcador(listaUbicaciones, ciclosPorCiudad){
    
            var aux = listaUbicaciones.indexOf(",");
            var lat = parseFloat(listaUbicaciones.substr(0,aux));
            aux++;
            var long = parseFloat(listaUbicaciones.substr(aux, listaUbicaciones.length));
    
            var ubicacion = {lat: lat, lng: long};
            var marker = new google.maps.Marker({
                position: ubicacion,
                map: map,
                animation: google.maps.Animation.DROP,
              });
            if(ciclosPorCiudad != null){
                var cadena = "";
                for(var j = 0; j < ciclosPorCiudad.length; j++){
                    if(ciclosPorCiudad[j][0] == listaUbicaciones){
                        for(var z = 1; z < ciclosPorCiudad[j].length; z++)
                            cadena += "<p>" + ciclosPorCiudad[j][z] + "</p>";
                    }
                }
                var infowindow = new google.maps.InfoWindow({
                    content: cadena
                  });
    
                marker.addListener("click", function(){
                      infowindow.open(map, marker);
                });
            }
              
    }

