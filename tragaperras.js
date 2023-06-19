

//----- [0] IMPORTACIÓN DE ELEMENTOS HTML A VARIABLES JAVASCRIPT: document.getElementById("x_html")  ------------------------------------------------------------------------------------------------------------------

var palanca_JS = document.getElementById("palanca_html");  
            
var casilla1_JS = document.getElementById("casilla1");                     
var casilla2_JS = document.getElementById("casilla2");
var casilla3_JS = document.getElementById("casilla3");

var introducir_JS = document.getElementById("introducir_html");         
var inputMonedas_JS = document.getElementById("inputMonedas_html");     
var promptOfTotal_JS = document.getElementById("promptOfTotal_html");   
var registroMov_JS = document.getElementById("registroMov_html");       

var salida_JS = document.getElementById("salida_html");



//----- [1] PALANCA ------------------------------------------------------------------------------------------------------------------

let toggle = true;      //con esta estrategia TOGGLE vamos a poder 'hackear' el Evento 'clic' sobre la palanca_JS.

/* Los Event Listeners tienen 2 parámetros: 
    1) el evento en sí (aquí, 'clic'), 
    2) una función, ya sea definida fuera, o definida aquí mismo, en cuyo caso se puede hacer 
        a) con la palabra 'function', o
        b) con la flecha =>. */ 
palanca_JS.addEventListener('click', function() {   
        
    if(totalAcumulado > 0) {
        
        //[1.1]. Accionamos la palanca usando la táctica 'toggle', pero sólo si se cumple la condición del if:
        toggle =! toggle;   // Corrección de error: estabas haciendo 'ifs' igualando [ palanca_JS.src=... ] con las imágenes correspondientes, pero no funcionaba. Tenías que usar la estrategia TOGGLE para alternar entre una imagen y otra al clicar sobre la propia imagen (sobre buttons, es otra historia).
        if(toggle) {
                palanca_JS.src = "img/palancaUP.png";
        } else {
                palanca_JS.src = "img/palancaDOWN.png";
        }

        //[1.2]. Lista de imágenes, y variables que almacenan su elección aleatoria:
        var arrayPics = ["img/aubergine.png", "img/banana.png", "img/carrots.png", "img/cherries.png", "img/dollar.png", "img/lemon.png", "img/orange.png", "img/peach.png", "img/potato.png", "img/tomato.png"];
        var randomImg_1 = Math.floor(Math.random() * arrayPics.length); // Como hay 10 elementos en el array, dará un número de 1 a 10, y lo alamcernará en la variable 'randomNumArray_1'.
        var randomImg_2 = Math.floor(Math.random() * arrayPics.length); // Creamos otro número aleatorio (diferente del anterior, porque si usamos sólo el anterior, las 3 casillas darán el mismo resultado), igual que en la línea anterior, y ahora lo almacenamos en la variable randomNumArray_2 (para la 2a casilla del tragaperras.)
        var randomImg_3 = Math.floor(Math.random() * arrayPics.length); // Lo mismo que las dos líneas anteriores, ahora para randomNumArray_3.
            
        //[1.3]. Asignamos las imágenes obtenidas, y almacenadas en las 3 líneas anteriores, en las casillas del HTML, para el usuario las vea.
        casilla1_JS.src = arrayPics[randomImg_1];
        casilla2_JS.src = arrayPics[randomImg_2];
        casilla3_JS.src = arrayPics[randomImg_3];

        //[1.4]. Invocamos la función 'dollarAppears' que hemos creado más abajo, para evaluar la aparición de Dólares en las imgs. 
        apareceDolar(randomImg_1, randomImg_2, randomImg_3);

        //[1.5]. Invocamos la función de 2 ó 3 figuras iguales (...)
        igualesDosTres(randomImg_1, randomImg_2, randomImg_3);
        
        //[1.6]. Invocamos la función que gasta moneda tras comprobar que ninguna imagen sea un Dólar, y que no haya pareja ni trío. 
        gastoMoneda(randomImg_1, randomImg_2, randomImg_3);

        if (totalAcumulado == 0 || totalAcumulado < 0) {
            alert("¡Te has quedado sin monedas! Introduce monedas para volver a jugar.")
        }

    //Si no hay monedas (si totalAcumulado =< 0), aparece esta alerta. Hasta que no haya monedas, no funcionará. 
    } else {
        alert("Por favor, introduce monedas.");     
    }
})

//Cursor del ratón sobre la palanca:
palanca_JS.style.cursor = "pointer";    //con la propiedad ".style.cursor", elegimos un tipo de cursor (hay varios). Aquí uso 2 tipos, 'pointer', y 'not-allowed'.

casilla1_JS.style.cursor = "not-allowed";
casilla2_JS.style.cursor = "not-allowed";
casilla3_JS.style.cursor = "not-allowed";



//----- [2] INPUT DE MONEDAS, PROMPT DEL TOTAL ACUMULADO, e HISTORIAL DE MOVIMIENTOS  ----------------------------------------------------------------------------------------------------------------

var totalAcumulado = 0;
    
introducir_JS.addEventListener('click', function() {    // Evento para acumular las monedas introducidas, e introducir la cantidad total acumulada. 
    if(totalAcumulado <= 0) {       //Sólo se accionará la palanca si el totalAcumulado es 0 (o menos), para evitar que se puedan introducir más monedas durante la partida. Hasta que no acabe, no podrá volver a introducir monedas (da más emoción al juego).
        var inputEvent = Number(inputMonedas_JS.value);     //cogemos el input económico introducido, con la propiedad '.value'. Lo convertimos en número con 'Number()' (N mayúscula, ojo!). Lo asignamos todo a una variable nueva dentro del Evento, lo he llamado 'InputEvent'.
        totalAcumulado += inputEvent;                       //Acumular el dinero total acumulado: vamos almacenando (acumulando) el input de monedas en una variable muleta. Lo he llamado 'totalAcumulado'.
        promptOfTotal_JS.textContent = totalAcumulado;      // Imprimir el contenido del dinero usando la propiedad '.textContent.': asignamos al contenido del 'promptOfTotal_JS', que es el tag 'html' importado a JS de 'promptOfTotal_html', la variable 'totalAcumulado', para que aparezca impreso en el html.
                                                            // nota: aprendí sobre las propiedades '.value' y '.textContent' con ChatGPT. 

        var nuevoElemento = document.createElement("li");   // creamos nuevo elemento <li> para el HTML, y lo asignamos al valor nuevoElemento.
        nuevoElemento.textContent = "Has insertado " + inputEvent + " monedas."; //Asociamos al valor nuevoElemento un '.textContent' con información sobre la cantidad de monedas introducidas. 
        registroMov_JS.appendChild(nuevoElemento);      //Acoplamos el nuevo elemento html <li>, (que 2 líneas antes hemos asignado a la variable nuevoElemento, y que 1 línea antes hemos asociado a un mensaje gracias a 'text.Content'), al nodo padre <ul> html, que está asociado en JS a la variable registroMov_JS. Es decir: acoplamos el nuevo nodo hijo <li> (nuevoElemento), con texto gracias a .textContent, al nodo padre <ul> (registroMov_JS).
                                                   
    } else if (totalAcumulado > 0) {        // Concordando con el if anterior: si el jugador ya ha metido monedas, no podrá introducir más monedas hasta que no acabe el juego (vamos, hasta que pierda y llegue a 0). Podría haber puesto un 'else', pero pongo 'else if' para que sea más visual el proceso.
            alert("No puedes introducir más monedas hasta que no acabes la partida.");
    }
}); //Observa que, los 'addEventListener' van a terminar con "})".

function incrementoMonedas(winCoins) {
    totalAcumulado += winCoins;   
    promptOfTotal_JS.textContent = totalAcumulado;
}


//----- [3] FUNCIONES SOBRE LAS IMÁGENES ------------------------------------------------------------------------------------------------------------------

    // [3.1] Función que procesa las imágenes de Dólares ($):
    
function apareceDolar(img1, img2, img3) {   //los img1,img2,img3 están importando los randomImg_1,randomImg_2,randomImg_3.
    
    if (img1 === 4 && img2 === 4 && img3 === 4) {   // Aparecen 3 Dólares.
        incrementoMonedas(10);
        // Mensaje para el registro de movimientos:
        var mensajeResultado = "¡TRES DÓLARES! Ganas 10 monedas!"; 
        crearElementosConTexto(mensajeResultado);
    } else if ((img1 === 4 && img2 === 4) || (img1 === 4 && img3 === 4) || (img2 === 4 && img3 === 4)) {  // Aparecen 2 Dólares. 
        incrementoMonedas(4);
        // Mensaje para el registro de movimientos:
        var mensajeResultado = "¡DOS Dólares! Ganas 4 monedas!"; 
        crearElementosConTexto(mensajeResultado);
    } else if (img1 === 4 || img2 === 4 || img3 === 4) {   // Aparece 1 Dólar.
        incrementoMonedas(1);
        // Mensaje para el registro de movimientos:
        var mensajeResultado = "¡UN Dólar! Ganas 1 moneda!"; 
        crearElementosConTexto(mensajeResultado);
    } 
}  

    //[3.2] Función que procesa las parejas y tríos de imágenes:
function igualesDosTres(img1, img2, img3) {            //los img1,img2,img3 están importando los randomImg_1,randomImg_2,randomImg_3. 

    if((img1 === img2 && img1 === img3 && img2 === img3) && (img1 !== 4 && img2 !== 4 && img3 !== 4)) {   // Si las 3 imágenes son iguales (sin contar los Dólares en la comparación).
        incrementoMonedas(5);
        var mensajeResultado = "¡TRÍO! Ganas 5 monedas!";
        crearElementosConTexto(mensajeResultado);
    } else if((img1 === img2 && img1 !== 4 && img2 !== 4) || (img2 === img3 && img2 !== 4 && img3 !== 4) || (img1 === img3 && img1 !== 4 && img3 !== 4)) {  // Si 2 imágenes son iguales (sin contar Dólares en la comparación.)
        incrementoMonedas(2);
        var mensajeResultado = "¡PAREJA! Ganas 2 monedas!";
        crearElementosConTexto(mensajeResultado);
    } else if ((img1 === img2 && img1 !== 4 && img2 !== 4 && img3 === 4) || (img1 === img3 && img1 !== 4 && img3 !== 4 && img2 === 4) || (img2 === img3 && img2 !== 4 && img3 !== 4 && img2 === 4)) {
        incrementoMonedas(3);
        var mensajeResultado = "PAREJA y DÓLAR! Ganas 3 monedas";
        crearElementosConTexto(mensajeResultado);
    }
}

    //[3.3]función que gasta moneda tras comprobar que ninguna imagen sea un Dólar, y que no haya pareja ni trío.
function gastoMoneda(img1, img2, img3) { 
    
    if(img1 !== 4 && img2 !== 4 && img3 !==4 && img1 !== img2 && img1 !== img3 && img2 !== img3) {
        totalAcumulado -= 1;
        promptOfTotal_JS.textContent = totalAcumulado;
            // Mensaje que aparece cuando tiras de la palanca y no obtienes nada: gastas una moneda.
            var nuevoLi = document.createElement("li");
            nuevoLi.textContent = "Has gastado una moneda.";
            registroMov_JS.appendChild(nuevoLi); 
    } else {
        return;
    }
}

// [3.4] Función que crea nuevos elementos HTML "<li><b> blabla </b></li>"", dentro del <ul>, con un mensaje informando del resultado tras tirar la palanca: 1) dólares?, 2) 2 imágenes iguales?, 3) 3 imágenes iguales?
function crearElementosConTexto(mensajeResultado) {
    var nuevoLi = document.createElement("li");
    var nuevoU = document.createElement("u");
    nuevoU.textContent = mensajeResultado;
    nuevoLi.appendChild(nuevoU);
    registroMov_JS.appendChild(nuevoLi);
}


//----- [4] SALIDA ------------------------------------------------------------------------------------------------------------------

salida_JS.addEventListener('click', function() {     // otra opción: [ ('click', => {...}) ] , o sea, usar la flecha => en vez de 'function()'.
    
    alert("Has conseguido un total de " + totalAcumulado + " monedas.");
    totalAcumulado = 0;
    promptOfTotal_JS.textContent = totalAcumulado;

    //Devuelve las 3 casillas a su estado original con los pingüinos:
    document.getElementById("casilla1").src = "img/pingu.png";
    document.getElementById("casilla2").src = "img/pingu.png";
    document.getElementById("casilla3").src = "img/pingu.png";

    //Eliminamos la lista del historial de movimientos (con el Elemento del DOM de JS, remove(), el opuesto del appendChild()). 
    // FUNCIONA: clave, el "fistElementChild()" que no conocía, y el "remove()"

    while (registroMov_JS.firstElementChild) {
        registroMov_JS.firstElementChild.remove();
    }

    //Dejamos un mensaje en el Registro de Movimientos diciendo que vuelvan a echar monedas para volver a jugar. 
    var nuevoLi = document.createElement("li");
    nuevoLi.textContent = "Vuelve a insertar monedas para jugar de nuevo.";
    registroMov_JS.appendChild(nuevoLi);
})




