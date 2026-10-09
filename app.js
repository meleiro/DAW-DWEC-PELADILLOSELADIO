'use strict';

/*
|--------------------------------------------------------------------------
| PELADILLOS ELADIO - RESERVA DE SERVICIOS
|--------------------------------------------------------------------------
|
| Este archivo JavaScript contiene la lógica de una pequeña aplicación
| para gestionar servicios de una peluquería/barbería.
|
| En este código vamos a trabajar varios conceptos fundamentales de
| JavaScript:
|
|   1. Modo estricto: 'use strict'
|   2. Constantes y objetos
|   3. Arrays de objetos
|   4. Acceso a propiedades de objetos
|   5. Selección de elementos del DOM
|   6. Funciones
|   7. Intl.NumberFormat para formatear dinero
|   8. Escape de caracteres HTML
|   9. Métodos de arrays como find()
|  10. Funciones flecha
|  11. Bucles for...of
|  12. Template literals (plantillas de texto con ` `)
|  13. Generación dinámica de HTML
|
|
| IDEA GENERAL DE LA APLICACIÓN
| --------------------------------
|
| Tenemos unos DATOS en JavaScript:
|
|     TIENDA
|     SERVICIOS
|     EXTRAS
|     DESCUENTOS
|
|              |
|              v
|
| JavaScript utiliza esos datos
|
|              |
|              v
|
| Las funciones procesan la información
|
|     formatMoney()
|     escapeHtml()
|     buscarServicio()
|     renderizarServicios()
|
|              |
|              v
|
| JavaScript puede generar/modificar HTML
|
|              |
|              v
|
| El usuario ve el resultado en el navegador.
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| 1. MODO ESTRICTO
|--------------------------------------------------------------------------
|
| 'use strict' activa el modo estricto de JavaScript.
|
| Hace que JavaScript sea menos permisivo con determinados errores.
|
| Por ejemplo, sin modo estricto podríamos cometer accidentalmente
| ciertos errores que JavaScript intentaría tolerar.
|
| Es recomendable utilizarlo para detectar errores más fácilmente
| y escribir código más controlado.
|
*/

'use strict';


/*
|--------------------------------------------------------------------------
| 2. DATOS GENERALES DE LA TIENDA
|--------------------------------------------------------------------------
|
| Creamos una constante llamada TIENDA.
|
| Su valor es un OBJETO.
|
| Un objeto permite agrupar varios datos relacionados utilizando
| propiedades:
|
|     propiedad: valor
|
| En este caso:
|
|     nombre
|     divisa
|     idioma
|     edadMinima
|
| Podemos acceder a sus propiedades utilizando el punto:
|
|     TIENDA.nombre
|     TIENDA.divisa
|     TIENDA.idioma
|
| Ejemplo:
|
|     console.log(TIENDA.nombre);
|
| mostraría:
|
|     Peladillos Eladio
|
| IMPORTANTE:
|
| const significa que no podemos reasignar TIENDA:
|
|     TIENDA = otroObjeto;   // ERROR
|
| Pero las propiedades internas del objeto sí podrían modificarse.
|
*/

const TIENDA = {
    nombre: 'Peladillos Eladio',
    divisa: 'EUR',
    idioma: 'es-ES',
    edadMinima: 16
};


/*
|--------------------------------------------------------------------------
| 3. ARRAY DE SERVICIOS
|--------------------------------------------------------------------------
|
| SERVICIOS es un ARRAY.
|
| Los corchetes [] indican que estamos creando un array:
|
|     const SERVICIOS = [ ... ];
|
| Cada elemento del array es, a su vez, un OBJETO.
|
| Por tanto tenemos:
|
|     ARRAY
|       |
|       +-- OBJETO servicio 1
|       +-- OBJETO servicio 2
|       +-- OBJETO servicio 3
|
| Cada servicio tiene:
|
|     id        -> identificador del servicio
|     name      -> nombre que verá el usuario
|     precio    -> precio del servicio
|     duracion  -> duración en minutos
|
*/

const SERVICIOS = [

    {
        id: 'clasico',
        name: 'Corte clásico',
        precio: 12,
        duracion: 25,
    },

    {
        id: 'Tupper fade',
        name: 'Corte fade',
        precio: 15,
        duracion: 35,
    },

    {
        id: 'Brocoli',
        name: 'Corte brocoli',
        precio: 20,
        duracion: 15,
    },

];


/*
|--------------------------------------------------------------------------
| ACCEDER A UN ELEMENTO DEL ARRAY
|--------------------------------------------------------------------------
|
| Los arrays comienzan en la posición 0.
|
| Por tanto:
|
|     SERVICIOS[0]
|
| obtiene el primer objeto.
|
| Y:
|
|     SERVICIOS[0].name
|
| obtiene la propiedad "name" del primer servicio.
|
| Ejemplo:
|
|     SERVICIOS[0].name
|
| resultado:
|
|     "Corte clásico"
|
*/

// SERVICIOS[0].name


/*
|--------------------------------------------------------------------------
| 4. OBJETO DE EXTRAS
|--------------------------------------------------------------------------
|
| EXTRAS también es un objeto.
|
| Pero aquí tenemos objetos dentro de otro objeto:
|
|     EXTRAS
|       |
|       +-- lavado
|       |     |
|       |     +-- nombre
|       |     +-- precio
|       |
|       +-- cejas
|             |
|             +-- nombre
|             +-- precio
|
| Para obtener el nombre del lavado podemos utilizar:
|
|     EXTRAS.lavado.nombre
|
| JavaScript también permite acceder a propiedades utilizando []:
|
|     EXTRAS['lavado'].nombre
|
| Incluso podemos combinar ambas formas:
|
|     EXTRAS.lavado["nombre"]
|
| Las tres expresiones acceden al mismo dato.
|
*/

const EXTRAS = {

    lavado: {
        nombre: 'Lavado gostoso',
        precio: 100
    },

    cejas: {
        nombre: 'Pulido de cejas',
        precio: 3
    },

};


// Diferentes formas de acceder a las propiedades:

// EXTRAS.lavado.nombre
// EXTRAS['lavado'].nombre
// EXTRAS.lavado["nombre"]


/*
|--------------------------------------------------------------------------
| 5. CONSTANTES DE DESCUENTOS
|--------------------------------------------------------------------------
|
| Guardamos valores que utilizaremos posteriormente para realizar
| cálculos.
|
| 0.05 representa un 5 %:
|
|     5 / 100 = 0.05
|
| 0.10 representa un 10 %:
|
|     10 / 100 = 0.10
|
| Al utilizar constantes evitamos escribir directamente números
| "mágicos" en diferentes lugares del programa.
|
| Es mucho más comprensible escribir:
|
|     DESCUENTO_MIEMBROS
|
| que encontrar simplemente:
|
|     0.05
|
| sin saber qué representa.
|
*/

const DESCUENTO_MIEMBROS = 0.05;

const CODIGO_CUPON = 'ELADIO10';

const CUPON_DESCUENTO = 0.10;


/*
|--------------------------------------------------------------------------
| 6. OBTENEMOS ELEMENTOS DEL HTML (DOM)
|--------------------------------------------------------------------------
|
| document representa el documento HTML cargado en el navegador.
|
| querySelector() permite buscar un elemento dentro de ese documento.
|
| Cuando escribimos:
|
|     document.querySelector('#servicesGrid')
|
| estamos buscando el elemento cuyo atributo id sea:
|
|     id="servicesGrid"
|
| El símbolo # significa que estamos buscando por ID.
|
| Una vez encontrado, guardamos el elemento en una constante para
| poder utilizarlo posteriormente desde JavaScript.
|
| Es decir:
|
|     HTML
|      |
|      v
| document.querySelector(...)
|      |
|      v
| constante JavaScript
|
*/

const servicesGrid = document.querySelector('#servicesGrid');

const serviceSelect = document.querySelector('#serviceSelect');

const bookingForm = document.querySelector('#bookingForm');

const ticketContent = document.querySelector('#ticketContent');

const formMessage = document.querySelector('#formMessage');


/*
|--------------------------------------------------------------------------
| 7. FUNCIÓN formatMoney()
|--------------------------------------------------------------------------
|
| Esta función recibe un número y devuelve ese número formateado
| como una cantidad monetaria.
|
| Ejemplo:
|
|     formatMoney(10)
|
| podría devolver:
|
|     "10,00 €"
|
| dependiendo del idioma y la divisa configurados.
|
| La función recibe:
|
|     importe
|
| y devuelve un STRING.
|
*/

function formatMoney(importe) {

    /*
     * Intl.NumberFormat es una herramienta incluida en JavaScript
     * para dar formato a números.
     *
     * Creamos un objeto "formatter".
     *
     * TIENDA.idioma contiene:
     *
     *     'es-ES'
     *
     * Esto indica que queremos utilizar el formato habitual de España.
     *
     * Después indicamos:
     *
     *     style: 'currency'
     *
     * para decir que queremos mostrar una moneda.
     *
     * Y:
     *
     *     currency: TIENDA.divisa
     *
     * utiliza:
     *
     *     'EUR'
     */

    const formatter = new Intl.NumberFormat(
        TIENDA.idioma,
        {
            style: 'currency',
            currency: TIENDA.divisa
        }
    );

    /*
     * format() transforma el número al formato correspondiente.
     *
     * Por ejemplo:
     *
     *     formatter.format(10)
     *
     * puede producir:
     *
     *     "10,00 €"
     *
     * return devuelve ese resultado al lugar desde el que se llamó
     * a la función.
     */

    return formatter.format(importe);
}


/*
|--------------------------------------------------------------------------
| 8. FUNCIÓN escapeHtml()
|--------------------------------------------------------------------------
|
| Esta función recibe un valor y prepara determinados caracteres
| especiales para poder mostrarlos como texto dentro de HTML.
|
| Primero utilizamos:
|
|     String(value)
|
| para convertir el valor recibido a una cadena.
|
| Después utilizamos replaceAll() para sustituir caracteres especiales
| por entidades HTML.
|
| Por ejemplo:
|
|     <   ->   &lt;
|     >   ->   &gt;
|     &   ->   &amp;
|
| Esto es importante cuando vamos a insertar texto dentro de HTML.
|
| Por ejemplo, queremos que:
|
|     <h1>Hola</h1>
|
| pueda mostrarse como texto y no sea interpretado como etiquetas HTML.
|
| IMPORTANTE:
|
| Reemplazamos & PRIMERO.
|
| Las entidades HTML que generamos posteriormente también contienen &:
|
|     &lt;
|     &gt;
|     &quot;
|
| Si reemplazáramos & al final podríamos volver a modificar las
| entidades que acabamos de crear.
|
*/

function escapeHtml(value) {

    return String(value)

        // & se convierte en &amp;
        .replaceAll('&', '&amp;')

        // < se convierte en &lt;
        .replaceAll('<', '&lt;')

        // > se convierte en &gt;
        .replaceAll('>', '&gt;')

        // " se convierte en &quot;
        .replaceAll('"', '&quot;')

        // ' se convierte en &#039;
        .replaceAll("'", '&#039;');

}


/*
|--------------------------------------------------------------------------
| 9. FUNCIÓN buscarServicio()
|--------------------------------------------------------------------------
|
| Esta función recibe el ID de un servicio:
|
|     buscarServicio('clasico')
|
| y busca dentro del array SERVICIOS.
|
| Para realizar la búsqueda utilizamos:
|
|     find()
|
| find() recorre el array buscando un elemento que cumpla una condición.
|
| En cuanto encuentra uno que cumple la condición, lo devuelve.
|
*/

function buscarServicio(id) {

    return SERVICIOS.find(

        /*
         * "servicio" representa temporalmente cada objeto del array.
         *
         * Esta función flecha:
         *
         *     (servicio) => servicio.id === id
         *
         * pregunta:
         *
         *     ¿el ID de este servicio es igual al ID que estoy buscando?
         *
         * Por ejemplo:
         *
         *     servicio.id === 'clasico'
         *
         * Si devuelve true, find() ha encontrado el servicio.
         */

        (servicio) => servicio.id === id

    );

}


/*
|--------------------------------------------------------------------------
| 10. FUNCIÓN renderizarServicios()
|--------------------------------------------------------------------------
|
| Esta función se encargará de recorrer los servicios disponibles
| y construir HTML dinámicamente.
|
| Es decir:
|
|     SERVICIOS
|         |
|         v
|     for...of
|         |
|         v
|   cada servicio
|         |
|         v
| generamos HTML
|         |
|         v
|   tarjetas HTML
|
*/

function renderizarServicios() {

    /*
     * Creamos inicialmente dos cadenas vacías.
     *
     * En ellas iremos acumulando HTML.
     *
     * cardsHtml:
     *     almacenará las tarjetas de los servicios.
     *
     * optionHtml:
     *     podrá utilizarse posteriormente para generar opciones
     *     de un <select>.
     */

    let cardsHtml = '';
    let optionHtml = '';


    /*
     * for...of permite recorrer los elementos de un array.
     *
     * SERVICIOS contiene varios objetos.
     *
     * En cada vuelta del bucle:
     *
     *     servicio
     *
     * contiene UNO de esos objetos.
     *
     * Primera vuelta:
     *
     *     servicio = {
     *         id: 'clasico',
     *         name: 'Corte clásico',
     *         precio: 12,
     *         duracion: 25
     *     }
     *
     * Segunda vuelta:
     *
     *     servicio = {
     *         ...
     *     }
     *
     * Y así sucesivamente.
     */

    for (const servicio of SERVICIOS) {

        /*
         * += significa:
         *
         *     "añade esto a lo que ya había".
         *
         * Por tanto NO sustituimos cardsHtml.
         *
         * Vamos acumulando una tarjeta detrás de otra.
         *
         *
         * Utilizamos TEMPLATE LITERALS:
         *
         *     ` ... `
         *
         * Las comillas invertidas permiten escribir texto en varias
         * líneas e introducir expresiones JavaScript mediante:
         *
         *     ${ ... }
         *
         * Por ejemplo:
         *
         *     ${servicio.name}
         *
         * introduce el nombre del servicio dentro del HTML.
         */

        

        cardsHtml += `
          <article class="article">

              <h3>${servicio.name}</h3>

              <p>${servicio.duracion} min</p>

              <span class="price">
                  ${formatMoney(servicio.precio)}
              </span>

          </article>
        `;

        optionHtml += `
            <option value="${servicio.id}">
                ${servicio.name} - ${formatMoney(servicio.precio)}
            </option>
        `;

        


    }

        servicesGrid.innerHTML = cardsHtml;
        serviceSelect.innerHTML = optionHtml;

}

/*
===============================================================================
FUNCIÓN: renderizarServiciosCreate()
===============================================================================

OBJETIVO:

Esta función toma los datos almacenados en el array SERVICIOS y crea
dinámicamente elementos HTML para mostrar cada servicio en la página.

En lugar de construir un string con HTML y utilizar innerHTML, vamos a
crear directamente NODOS DEL DOM mediante:

    document.createElement()

Después modificaremos esos nodos utilizando propiedades y métodos como:

    classList.add()
    textContent
    append()

Finalmente los introduciremos dentro del documento.

El proceso general será:

    SERVICIOS
        ↓
    recorrer array
        ↓
    obtener un servicio
        ↓
    crear <article>
        ↓
    crear <h3>
    crear <p>
    crear <span>
        ↓
    introducirlos dentro del <article>
        ↓
    introducir el <article> dentro de servicesGrid
===============================================================================
*/

function renderizarServiciosCreate() {


    /*
    ---------------------------------------------------------------------------
    RECORRER EL ARRAY CON for...of
    ---------------------------------------------------------------------------

    SERVICIOS es un array que contiene objetos.

    Por ejemplo:

        const SERVICIOS = [
            {
                id: 'clasico',
                name: 'Corte clásico',
                precio: 12,
                duracion: 25
            },
            {
                id: 'barba',
                name: 'Barba',
                precio: 9,
                duracion: 20
            }
        ];


    for...of
    ---------

    La estructura:

        for (const elemento of array) {

        }

    permite recorrer los VALORES contenidos en un elemento iterable,
    como un array.


    En nuestro caso:

        for (const servicio of SERVICIOS)

    puede leerse como:

        "Para cada servicio contenido en SERVICIOS,
         ejecuta el siguiente bloque de código."


    En cada vuelta del bucle, la variable:

        servicio

    contendrá UNO de los objetos del array.


    PRIMERA VUELTA:

        servicio = {
            id: 'clasico',
            name: 'Corte clásico',
            precio: 12,
            duracion: 25
        }


    SEGUNDA VUELTA:

        servicio = {
            id: 'barba',
            name: 'Barba',
            precio: 9,
            duracion: 20
        }


    Y así sucesivamente hasta recorrer todo el array.


    ¿POR QUÉ usamos const servicio?

    Porque en cada iteración NO necesitamos reasignar manualmente
    la variable servicio.

    No vamos a hacer:

        servicio = otraCosa;

    JavaScript se encarga de proporcionar automáticamente el siguiente
    elemento en cada vuelta del bucle.
    */

    for (const servicio of SERVICIOS) {


        /*
        =======================================================================
        1. CREAR EL <article>
        =======================================================================

        document
        --------

        document es un objeto proporcionado por el navegador.

        Representa el documento HTML que actualmente está cargado.

        Gracias a document podemos acceder al DOM y realizar operaciones como:

            document.querySelector()
            document.querySelectorAll()
            document.createElement()


        createElement()
        ---------------

        El método:

            document.createElement('article')

        le pide al navegador que cree un nuevo nodo HTML de tipo:

            <article>


        IMPORTANTE:

        En este momento el <article> EXISTE como objeto JavaScript/DOM,
        pero TODAVÍA NO aparece en la página.

        Es decir:

            const article = document.createElement('article');

        crea conceptualmente:

            <article></article>

        pero todavía está "desconectado" del documento.


        Guardamos una referencia al nodo creado dentro de:

            article

        Gracias a esa variable podremos modificar posteriormente el elemento.
        */

        const article = document.createElement('article');


        /*
        -----------------------------------------------------------------------
        classList
        -----------------------------------------------------------------------

        Los elementos del DOM disponen de la propiedad:

            classList

        que permite trabajar con sus clases CSS.


        add()
        -----

        El método:

            classList.add()

        añade una o varias clases al elemento.


        Por tanto:

            article.classList.add('card');

        transforma conceptualmente:

            <article></article>

        en:

            <article class="card"></article>


        Esto permitirá que las reglas CSS asociadas a:

            .card

        se apliquen al elemento.


        Podríamos añadir varias clases:

            article.classList.add('card', 'destacado');

        obteniendo:

            <article class="card destacado"></article>
        */

        article.classList.add('card');



        /*
        =======================================================================
        2. CREAR EL TÍTULO <h3>
        =======================================================================

        Creamos otro nodo del DOM.

            document.createElement('h3')

        produce:

            <h3></h3>

        Todavía no está dentro del article ni dentro de la página.
        */

        const title = document.createElement('h3');


        /*
        -----------------------------------------------------------------------
        textContent
        -----------------------------------------------------------------------

        La propiedad:

            textContent

        permite establecer el CONTENIDO DE TEXTO de un nodo.


        servicio.name
        ---------------

        "servicio" es el objeto correspondiente a la vuelta actual del bucle.

        Si tenemos:

            servicio = {
                id: 'clasico',
                name: 'Corte clásico',
                precio: 12,
                duracion: 25
            }

        entonces:

            servicio.name

        devuelve:

            'Corte clásico'


        Por tanto:

            title.textContent = servicio.name;

        produce conceptualmente:

            <h3>Corte clásico</h3>


        IMPORTANTE:

        textContent introduce TEXTO.

        NO interpreta el contenido como código HTML.


        Por ejemplo, si tuviéramos:

            servicio.name = '<strong>Corte</strong>';

        con:

            title.textContent = servicio.name;

        el navegador mostraría literalmente:

            <strong>Corte</strong>

        No crearía una etiqueta <strong>.


        Esta es una diferencia importante respecto a innerHTML.
        */

        title.textContent = servicio.name;



        /*
        =======================================================================
        3. CREAR EL PÁRRAFO DE DURACIÓN
        =======================================================================

        Creamos:

            <p></p>

        y almacenamos la referencia en la variable "duracion".
        */

        const duracion = document.createElement('p');


        /*
        Utilizamos nuevamente textContent.

        En este caso queremos combinar el valor:

            servicio.duracion

        con el texto:

            min


        TEMPLATE LITERAL
        ----------------

        Las comillas invertidas:

            ` `

        permiten crear un template literal.

        Dentro podemos introducir expresiones JavaScript utilizando:

            ${expresion}


        Si:

            servicio.duracion === 25

        entonces:

            `${servicio.duracion} min`

        produce el string:

            "25 min"


        Finalmente:

            duracion.textContent = "25 min";

        producirá:

            <p>25 min</p>
        */

        duracion.textContent = `${servicio.duracion} min`;



        /*
        =======================================================================
        4. CREAR EL ELEMENTO QUE MUESTRA EL PRECIO
        =======================================================================

        Creamos:

            <span></span>

        Un <span> es un elemento HTML genérico en línea que resulta útil
        para envolver pequeñas cantidades de contenido.
        */

        const precio = document.createElement('span');


        /*
        Añadimos:

            class="price"

        al elemento.

        Antes:

            <span></span>

        Después:

            <span class="price"></span>
        */

        precio.classList.add('price');


        /*
        -----------------------------------------------------------------------
        formatMoney()
        -----------------------------------------------------------------------

        formatMoney() NO es una función incorporada de JavaScript.

        Es una función que hemos definido nosotros en nuestro programa.

        Recibe un número:

            formatMoney(servicio.precio)

        Por ejemplo:

            formatMoney(12)

        y devuelve un STRING con formato monetario.

        Por ejemplo:

            "12,00 €"


        servicio.precio
        ----------------

        Accedemos a la propiedad "precio" del objeto servicio actual.


        Si:

            servicio.precio === 12

        hacemos:

            formatMoney(12)

        y obtenemos algo similar a:

            "12,00 €"


        Finalmente:

            precio.textContent = "12,00 €";

        produce:

            <span class="price">12,00 €</span>
        */

        precio.textContent = formatMoney(servicio.precio);



        /*
        =======================================================================
        5. INTRODUCIR LOS ELEMENTOS DENTRO DEL <article>
        =======================================================================

        Hasta este momento tenemos CUATRO nodos independientes:

            article
            title
            duracion
            precio


        Conceptualmente:

            <article class="card"></article>

            <h3>Corte clásico</h3>

            <p>25 min</p>

            <span class="price">12,00 €</span>


        Todavía title, duracion y precio NO están dentro de article.


        append()
        --------

        append() es un método del DOM que permite introducir uno o varios
        nodos dentro de otro elemento.

        Cuando hacemos:

            article.append(
                title,
                duracion,
                precio
            );

        estamos diciendo:

            "Añade estos tres nodos como hijos de article."


        El orden de los argumentos importa.

        El resultado será:

            <article class="card">

                <h3>Corte clásico</h3>

                <p>25 min</p>

                <span class="price">
                    12,00 €
                </span>

            </article>


        Los elementos:

            title
            duracion
            precio

        pasan a ser HIJOS de:

            article
        */

        article.append(
            title,
            duracion,
            precio
        );



        /*
        =======================================================================
        6. INTRODUCIR EL <article> EN LA PÁGINA
        =======================================================================

        Ahora tenemos el article completamente construido.

        Sin embargo, todavía falta conectarlo al DOM visible.


        servicesGrid
        ------------

        Anteriormente habremos obtenido una referencia a un elemento HTML,
        por ejemplo:

            const servicesGrid =
                document.querySelector('#servicesGrid');


        Si nuestro HTML contiene:

            <section id="servicesGrid"></section>

        entonces servicesGrid representa ese <section>.


        Al hacer:

            servicesGrid.append(article);

        introducimos el article como hijo del section.


        Antes:

            <section id="servicesGrid">

            </section>


        Después de la primera iteración:

            <section id="servicesGrid">

                <article class="card">
                    <h3>Corte clásico</h3>
                    <p>25 min</p>
                    <span class="price">12,00 €</span>
                </article>

            </section>


        Después de la segunda iteración tendremos otro article:

            <section id="servicesGrid">

                <article class="card">
                    ...
                </article>

                <article class="card">
                    ...
                </article>

            </section>


        Por tanto, en cada vuelta del for...of:

            1. Creamos una tarjeta.
            2. Creamos sus elementos interiores.
            3. Los introducimos en la tarjeta.
            4. Introducimos la tarjeta en la página.
        */

        servicesGrid.append(article);

    }

}



/*
===============================================================================
FUNCIÓN: leerFormulario()
===============================================================================

OBJETIVO:

Esta función obtiene los datos introducidos por el usuario en el formulario
y los transforma a tipos de datos que podamos utilizar cómodamente desde
JavaScript.

El proceso será:

    FORMULARIO HTML
          ↓
       FormData
          ↓
       get()
          ↓
    obtener valores
          ↓
    convertir / limpiar
          ↓
    variables JavaScript

Por ejemplo:

    <input name="clientName">

            ↓

    datos.get('clientName')

            ↓

    "  Antonio  "

            ↓

    String(...).trim()

            ↓

    "Antonio"
===============================================================================
*/

function leerFormulario() {


    /*
    =======================================================================
    1. FormData
    =======================================================================

    FormData es una clase proporcionada por el navegador para trabajar
    con los datos de un formulario HTML.


    new
    ---

    La palabra:

        new

    se utiliza para crear una nueva instancia de determinados objetos.

    En este caso:

        new FormData(bookingForm)

    crea un objeto FormData utilizando nuestro formulario.


    bookingForm
    -----------

    bookingForm contiene una referencia al formulario.

    Probablemente la hemos obtenido anteriormente mediante:

        const bookingForm =
            document.querySelector('#bookingForm');


    Supongamos que tenemos:

        <form id="bookingForm">

            <input
                name="clientName"
                value="Antonio"
            >

            <input
                name="age"
                value="25"
            >

        </form>


    Después de:

        const datos = new FormData(bookingForm);

    "datos" contiene una representación de los valores del formulario.


    IMPORTANTE:

    FormData utiliza principalmente el atributo:

        name

    de los controles.

    Es decir:

        name="clientName"

    es lo que nos permitirá posteriormente hacer:

        datos.get('clientName')
    */

    const datos = new FormData(bookingForm);



    /*
    =======================================================================
    2. LEER Y LIMPIAR EL NOMBRE
    =======================================================================

    Esta línea realiza VARIAS operaciones:

        const nombre =
            String(datos.get('clientName') ?? '').trim();

    Vamos a leerla desde DENTRO HACIA FUERA.
    */


    /*
    PASO 1:

        datos.get('clientName')


    get()
    -----

    Es un método del objeto FormData.

    Busca el valor asociado al campo cuyo atributo name sea:

        clientName


    Si tenemos:

        <input
            name="clientName"
            value="Antonio"
        >

    entonces:

        datos.get('clientName')

    devuelve aproximadamente:

        "Antonio"


    Si no existe ningún campo con ese name, get() puede devolver:

        null
    */


    /*
    PASO 2:

        datos.get('clientName') ?? ''


    ??
    --

    Este operador se denomina:

        nullish coalescing

    o:

        operador de coalescencia nula.


    Su estructura es:

        valor ?? alternativa


    Funciona así:

        Si "valor" NO es null ni undefined:
            utiliza valor.

        Si "valor" ES null o undefined:
            utiliza alternativa.


    Ejemplo:

        'Antonio' ?? ''

    resultado:

        'Antonio'


    Pero:

        null ?? ''

    resultado:

        ''


    Lo utilizamos porque:

        datos.get('clientName')

    podría devolver null.


    De esta manera garantizamos que, como mínimo, tendremos:

        ''

    y no null.


    IMPORTANTE:

    ?? NO es exactamente lo mismo que ||.

    ?? solo sustituye:

        null
        undefined

    mientras que || también considera falsy otros valores como:

        ''
        0
        false
        NaN
    */


    /*
    PASO 3:

        String(...)


    String()
    --------

    Es una función incorporada de JavaScript.

    Convierte un valor a tipo:

        string


    Ejemplos:

        String(25)
            → "25"

        String(true)
            → "true"

        String(3.14)
            → "3.14"


    Después de utilizar String() sabemos que podemos aplicar
    métodos propios de los strings.
    */


    /*
    PASO 4:

        .trim()


    trim()
    ------

    Es un método de los strings.

    Elimina espacios en blanco del PRINCIPIO y del FINAL de una cadena.


    Ejemplo:

        '    Antonio    '.trim()

    devuelve:

        'Antonio'


    IMPORTANTE:

    NO elimina los espacios interiores.

        'Antonio García'.trim()

    continúa siendo:

        'Antonio García'


    Tampoco modifica el string original.

    Los strings son inmutables en JavaScript.

    trim() devuelve un NUEVO string.
    */

    const nombre = String(
        datos.get('clientName') ?? ''
    ).trim();



    /*
    =======================================================================
    3. LEER Y CONVERTIR LA EDAD
    =======================================================================

    Ahora obtenemos la edad:

        const edad = Number(datos.get('age'));


    De nuevo conviene leer la expresión desde dentro hacia fuera.
    */


    /*
    PASO 1:

        datos.get('age')

    Obtiene el valor del campo:

        name="age"


    Aunque en HTML tengamos:

        <input type="number" name="age">

    al trabajar con formularios debemos prestar especial atención al
    tipo del dato recibido.

    Queremos que nuestra aplicación trabaje con la edad como un número.
    */


    /*
    PASO 2:

        Number(...)


    Number()
    --------

    Es una función incorporada de JavaScript que intenta convertir
    un valor al tipo:

        number


    Ejemplo:

        Number('25')

    devuelve:

        25


    Observa la diferencia:

        '25'   → string
        25     → number


    Podemos comprobarlo:

        typeof '25'
        // "string"

        typeof Number('25')
        // "number"


    Esto es fundamental si posteriormente queremos hacer operaciones:

        edad + 1


    Si edad fuese:

        '25'

    entonces:

        '25' + 1

    produciría:

        '251'

    porque + también puede concatenar strings.


    Después de convertir:

        Number('25') + 1

    obtenemos:

        26
    */


    /*
    ¿QUÉ OCURRE SI EL TEXTO NO REPRESENTA UN NÚMERO?

        Number('Eladio')

    devuelve:

        NaN


    NaN significa:

        Not a Number


    Es un valor especial del tipo number que indica que una operación
    numérica no ha podido producir un número válido.


    Curiosamente:

        typeof NaN

    devuelve:

        "number"


    Para comprobar posteriormente si la conversión ha producido NaN
    utilizaremos:

        Number.isNaN(edad)


    Ejemplo:

        Number.isNaN(Number('Eladio'))

    devuelve:

        true
    */

    const edad = Number(
        datos.get('age')
    );



    /*
    =======================================================================
    DE MOMENTO TENEMOS DOS VARIABLES
    =======================================================================

    Si el usuario escribió:

        Nombre: "  Antonio  "
        Edad:   "25"

    después de nuestro tratamiento tendremos:

        nombre
            → "Antonio"
            → string

        edad
            → 25
            → number


    Podemos comprobarlo temporalmente durante el aprendizaje:

        console.log(nombre);
        console.log(typeof nombre);

        console.log(edad);
        console.log(typeof edad);


    Salida aproximada:

        Antonio
        string
        25
        number
    */


    /*
    En el siguiente paso de la aplicación podríamos continuar obteniendo:

        servicio
        día
        extras
        cupón
        socio

    y finalmente devolver todos esos datos agrupados dentro de un objeto.

    Por ejemplo:

        return {
            nombre,
            edad
        };

    Esto permitiría hacer posteriormente:

        const reserva = leerFormulario();

        console.log(reserva.nombre);
        console.log(reserva.edad);

    Pero podemos añadir esa parte cuando avancemos con el formulario.
    */    /*
    ===========================================================================
    4. OBTENER LOS EXTRAS SELECCIONADOS
    ===========================================================================

    En el formulario tenemos varios checkbox que permiten seleccionar
    servicios adicionales.

    Por ejemplo:

        <input
            type="checkbox"
            name="extras"
            value="lavado"
        >

        <input
            type="checkbox"
            name="extras"
            value="cejas"
        >


    IMPORTANTE:

    Ambos checkbox tienen el mismo atributo:

        name="extras"

    Esto es perfectamente válido.

    De hecho, nos permite agrupar varios controles bajo un mismo nombre.


    ¿QUÉ OCURRE SI EL USUARIO MARCA LOS DOS?

    El formulario contiene dos valores asociados a "extras":

        lavado
        cejas


    ---------------------------------------------------------------------------
    getAll()
    ---------------------------------------------------------------------------

    getAll() es un método del objeto FormData.

    Su función es obtener TODOS los valores asociados a un nombre de campo.

    Sintaxis:

        datos.getAll('nombreDelCampo')


    En nuestro caso:

        datos.getAll('extras')


    Si el usuario ha seleccionado los dos extras, devuelve un array:

        ['lavado', 'cejas']


    Si solamente selecciona el lavado:

        ['lavado']


    Si no selecciona ningún extra:

        []


    DIFERENCIA ENTRE get() Y getAll()

    get():

        datos.get('extras')

    devuelve solamente el PRIMER valor asociado al nombre.

    getAll():

        datos.getAll('extras')

    devuelve TODOS los valores en un array.


    ---------------------------------------------------------------------------
    map()
    ---------------------------------------------------------------------------

    map() es un método incorporado de los arrays de JavaScript.

    Sirve para recorrer los elementos de un array y crear un NUEVO array
    con los resultados de aplicar una función a cada elemento.

    Su estructura habitual es:

        array.map(funcion)


    Por ejemplo:

        const numeros = [1, 2, 3];

        const dobles = numeros.map(numero => numero * 2);

    Resultado:

        [2, 4, 6]


    IMPORTANTE:

    map() NO modifica el array original.

    Devuelve un array nuevo.


    ---------------------------------------------------------------------------
    .map(String)
    ---------------------------------------------------------------------------

    String() es una función incorporada de JavaScript que permite
    convertir un valor a texto.

    Por ejemplo:

        String(25)

    devuelve:

        '25'


    Cuando escribimos:

        .map(String)

    estamos pasando la función String como argumento de map().

    JavaScript aplicará String a cada elemento del array.

    Por ejemplo:

        [10, 20, 30].map(String)

    devuelve:

        ['10', '20', '30']


    OBSERVACIÓN:

    Los valores habituales de los checkbox ya son strings.

    Por tanto, en este formulario .map(String) no suele cambiar
    sus valores, pero nos sirve para practicar map() y dejar
    explícito que queremos trabajar con identificadores de texto.


    ---------------------------------------------------------------------------
    RESULTADO FINAL
    ---------------------------------------------------------------------------

    Si el usuario seleccionó lavado y cejas:

        extras = ['lavado', 'cejas']

    Si no seleccionó ninguno:

        extras = []

    Este array nos servirá posteriormente para recorrer los extras
    y sumar sus precios al importe de la reserva.
    */

    const extras = datos
        .getAll('extras')
        .map(String);


    /*
    ===========================================================================
    5. OBTENER Y NORMALIZAR EL CÓDIGO DE DESCUENTO
    ===========================================================================

    En el formulario tenemos un campo donde el usuario puede introducir
    un código de descuento.

    Por ejemplo:

        <input
            name="coupon"
            placeholder="ELADIO10"
        >


    El usuario podría escribir:

        ELADIO10

    Pero también:

        eladio10

    O incluso:

        "  eladio10  "


    Queremos que todas esas variantes se transformen en:

        'ELADIO10'


    Para conseguirlo utilizamos varios métodos encadenados.


    ---------------------------------------------------------------------------
    PASO 1: datos.get('coupon')
    ---------------------------------------------------------------------------

    get() obtiene el valor asociado al campo cuyo atributo name sea:

        coupon


    Si el usuario escribe:

        eladio10

    obtenemos:

        'eladio10'


    Si no existe un campo con ese nombre, get() devuelve null.


    ---------------------------------------------------------------------------
    PASO 2: OPERADOR ??
    ---------------------------------------------------------------------------

    El operador ?? se llama operador de coalescencia nula.

    Su sintaxis es:

        valor ?? alternativa


    Si valor es null o undefined, utiliza alternativa.

    En nuestro caso:

        datos.get('coupon') ?? ''


    significa:

        "Obtén el cupón y, si el resultado es null o undefined,
         utiliza un string vacío".


    ---------------------------------------------------------------------------
    PASO 3: String()
    ---------------------------------------------------------------------------

    String() convierte el resultado a texto.

    Esto nos permite aplicar posteriormente métodos de strings.


    ---------------------------------------------------------------------------
    PASO 4: trim()
    ---------------------------------------------------------------------------

    trim() es un método incorporado de los strings.

    Elimina los espacios en blanco del principio y del final.

    Ejemplo:

        '  eladio10  '.trim()

    devuelve:

        'eladio10'


    IMPORTANTE:

    trim() no elimina los espacios interiores.

    Ejemplo:

        'eladio 10'.trim()

    sigue devolviendo:

        'eladio 10'


    ---------------------------------------------------------------------------
    PASO 5: toUpperCase()
    ---------------------------------------------------------------------------

    toUpperCase() es un método de los strings.

    Devuelve un nuevo string con las letras convertidas a mayúsculas.

    Ejemplo:

        'eladio10'.toUpperCase()

    devuelve:

        'ELADIO10'


    Los strings son inmutables.

    Esto significa que trim() y toUpperCase() no modifican el string
    original, sino que devuelven nuevos strings.


    ---------------------------------------------------------------------------
    RESULTADO FINAL
    ---------------------------------------------------------------------------

    Si el usuario escribe:

        '  eladio10  '

    después de todas las operaciones:

        coupon = 'ELADIO10'


    Esto nos permitirá comparar posteriormente:

        coupon === CODIGO_CUPON

    sin preocuparnos de que el usuario haya escrito letras minúsculas
    o espacios al principio y al final.
    */

    const coupon = String(
        datos.get('coupon') ?? ''
    )
        .trim()
        .toUpperCase();


    /*
    ===========================================================================
    6. OBTENER EL IDENTIFICADOR DEL SERVICIO
    ===========================================================================

    En el HTML tenemos un select donde el usuario elige un servicio.

    Por ejemplo:

        <select name="service">

            <option value="">
                Elige corte
            </option>

            <option value="clasico">
                Corte clásico
            </option>

            <option value="Tupper fade">
                Corte fade
            </option>

        </select>


    IMPORTANTE:

    El texto que ve el usuario NO tiene por qué coincidir con
    el valor que recibe JavaScript.

    Por ejemplo:

        <option value="clasico">
            Corte clásico
        </option>


    El usuario ve:

        Corte clásico

    Pero FormData obtiene:

        'clasico'


    ---------------------------------------------------------------------------
    datos.get('service')
    ---------------------------------------------------------------------------

    Obtiene el value de la opción seleccionada.

    Por ejemplo:

        'clasico'


    ---------------------------------------------------------------------------
    ?? ''
    ---------------------------------------------------------------------------

    Si el campo no existe, utilizamos un string vacío.


    ---------------------------------------------------------------------------
    String()
    ---------------------------------------------------------------------------

    Convertimos el valor a string.


    ---------------------------------------------------------------------------
    ¿POR QUÉ GUARDAMOS EL ID Y NO EL PRECIO?
    ---------------------------------------------------------------------------

    Porque el precio ya está almacenado en nuestro array SERVICIOS.

    Ejemplo:

        {
            id: 'clasico',
            name: 'Corte clásico',
            precio: 12,
            duracion: 25
        }


    Posteriormente podremos utilizar:

        buscarServicio(servicioId)

    para recuperar el objeto completo.

    Así evitamos duplicar los precios en el HTML y en JavaScript.


    Si el usuario todavía no ha seleccionado ningún servicio:

        servicioId = ''

    */

    const servicioId = String(
        datos.get('service') ?? ''
    );


    /*
    ===========================================================================
    7. OBTENER EL DÍA SELECCIONADO
    ===========================================================================

    El procedimiento es similar al utilizado para obtener el servicio.


    Supongamos que tenemos:

        <select name="day">

            <option value="">
                Selecciona un día
            </option>

            <option value="Lunes">
                Lunes
            </option>

            <option value="Martes">
                Martes
            </option>

        </select>


    Si el usuario selecciona lunes:

        datos.get('day')

    devuelve:

        'Lunes'


    Si todavía no ha seleccionado ningún día y la opción inicial
    tiene value="", obtendremos:

        ''


    Más adelante podremos comprobar:

        if (!reserva.dia)

    para detectar que no se ha seleccionado un día.
    */

    const dia = String(
        datos.get('day') ?? ''
    );


    /*
    ===========================================================================
    8. COMPROBAR SI EL CLIENTE ES MIEMBRO
    ===========================================================================

    En el formulario tenemos un checkbox similar a:

        <input
            type="checkbox"
            name="member"
        >


    Un checkbox puede estar:

        Marcado
        No marcado


    ---------------------------------------------------------------------------
    ¿QUÉ DEVUELVE FormData?
    ---------------------------------------------------------------------------

    Si el checkbox está marcado y no hemos definido otro value:

        datos.get('member')

    devuelve:

        'on'


    Si el checkbox NO está marcado:

        datos.get('member')

    devuelve:

        null


    IMPORTANTE:

    FormData no devuelve directamente true o false para este checkbox.


    ---------------------------------------------------------------------------
    OPERADOR ===
    ---------------------------------------------------------------------------

    === es el operador de igualdad estricta.

    Compara tanto el valor como el tipo.


    Ejemplo:

        'on' === 'on'

    devuelve:

        true


    Pero:

        null === 'on'

    devuelve:

        false


    ---------------------------------------------------------------------------
    RESULTADO FINAL
    ---------------------------------------------------------------------------

    Si el usuario es miembro:

        esMiembro = true


    Si no es miembro:

        esMiembro = false


    De esta manera transformamos el valor del formulario
    en un booleano que podremos utilizar directamente:

        if (reserva.esMiembro) {
            // Aplicar descuento
        }
    */

    const esMiembro = datos.get('member') === 'on';


    /*
    ===========================================================================
    9. DEVOLVER LOS DATOS DE LA RESERVA
    ===========================================================================

    Hasta ahora hemos obtenido y preparado diferentes valores:

        nombre      -> string
        edad        -> number
        servicioId  -> string
        dia         -> string
        extras      -> array
        coupon      -> string
        esMiembro   -> boolean


    Queremos devolverlos todos juntos.


    ---------------------------------------------------------------------------
    return
    ---------------------------------------------------------------------------

    return es una palabra reservada de JavaScript.

    Sirve para devolver un resultado desde una función.

    Cuando se ejecuta return:

        1. La función termina.
        2. Devuelve el valor indicado.
        3. La ejecución continúa donde se había llamado a la función.


    ---------------------------------------------------------------------------
    OBJETO LITERAL
    ---------------------------------------------------------------------------

    Utilizamos llaves para crear un objeto:

        {
            propiedad: valor
        }


    En JavaScript existe una sintaxis abreviada para crear objetos
    cuando la propiedad y la variable tienen el mismo nombre.

    Por ejemplo:

        return {
            nombre: nombre,
            edad: edad
        };

    puede escribirse:

        return {
            nombre,
            edad
        };


    Ambas formas producen el mismo resultado.


    ---------------------------------------------------------------------------
    EJEMPLO DEL OBJETO DEVUELTO
    ---------------------------------------------------------------------------

    Supongamos que el usuario introduce:

        Nombre: Antonio
        Edad: 25
        Servicio: Corte clásico
        Día: Lunes
        Extras: Lavado
        Cupón: eladio10
        Miembro: Sí


    leerFormulario() podría devolver:

        {
            nombre: 'Antonio',
            edad: 25,
            servicioId: 'clasico',
            dia: 'Lunes',
            extras: ['lavado'],
            coupon: 'ELADIO10',
            esMiembro: true
        }


    Posteriormente podremos hacer:

        const reserva = leerFormulario();

        console.log(reserva.nombre);

    Resultado:

        'Antonio'


    También:

        console.log(reserva.extras);

    Resultado:

        ['lavado']


    IMPORTANTE:

    Esta función solamente LEE y PREPARA los datos.

    Todavía no comprueba si son válidos ni calcula el precio.

    Esas responsabilidades corresponderán a otras funciones.
    */

    return {
        nombre,
        edad,
        servicioId,
        dia,
        extras,
        coupon,
        esMiembro
    };

}

/*
===============================================================================
FUNCIÓN: validarReserva()
===============================================================================

OBJETIVO:

Comprobar si los datos de una reserva cumplen las condiciones
establecidas por nuestra aplicación.


RECIBE:

    reserva

Es un objeto que normalmente habremos obtenido mediante:

    const reserva = leerFormulario();


Por ejemplo:

    {
        nombre: 'Antonio',
        edad: 25,
        servicioId: 'clasico',
        dia: 'Lunes',
        extras: ['lavado'],
        coupon: 'ELADIO10',
        esMiembro: true
    }


DEVUELVE:

Un ARRAY de mensajes de error.


Si todo es correcto:

    []


Si hay errores:

    [
        'Escribe tu nombre',
        'Selecciona un día'
    ]


¿POR QUÉ DEVOLVEMOS UN ARRAY?

Porque una reserva puede contener varios errores al mismo tiempo.

Por ejemplo:

    El usuario no escribe su nombre.

    Además, no selecciona un servicio.

    Además, no selecciona un día.


Queremos detectar todos esos errores y devolverlos juntos,
en lugar de detenernos en el primero.
===============================================================================
*/

function validarReserva(reserva) {

    /*
    ===========================================================================
    1. CREAR UN ARRAY PARA ALMACENAR LOS ERRORES
    ===========================================================================

    [] es un array vacío.

    Al principio suponemos que no hay errores.

    A medida que realicemos comprobaciones, iremos añadiendo
    mensajes al array cuando encontremos problemas.


    Ejemplo:

        const errores = [];

    Inicialmente:

        errores.length === 0

    */

    const errores = [];


    /*
    ===========================================================================
    2. COMPROBAR EL NOMBRE
    ===========================================================================

    Queremos impedir que se confirme una reserva sin nombre.


    ---------------------------------------------------------------------------
    if
    ---------------------------------------------------------------------------

    if es una estructura condicional.

    Ejecuta un bloque de código cuando una expresión
    produce un resultado verdadero.


    ---------------------------------------------------------------------------
    OPERADOR !
    ---------------------------------------------------------------------------

    ! es el operador de negación lógica.

    Invierte el valor booleano de una expresión.


    Por ejemplo:

        !true

    devuelve:

        false


    Y:

        !false

    devuelve:

        true


    ---------------------------------------------------------------------------
    STRINGS VACÍOS Y VALORES FALSY
    ---------------------------------------------------------------------------

    En JavaScript, un string vacío:

        ''

    es un valor falsy.

    Eso significa que, al evaluarlo como condición,
    se considera falso.


    Por tanto:

        !''

    devuelve:

        true


    Como en leerFormulario() hemos utilizado trim(),
    un nombre compuesto únicamente por espacios también
    se convierte en un string vacío.


    ---------------------------------------------------------------------------
    EJEMPLO
    ---------------------------------------------------------------------------

    Si:

        reserva.nombre = ''

    entonces:

        !reserva.nombre

    es true y entramos en el if.


    ---------------------------------------------------------------------------
    push()
    ---------------------------------------------------------------------------

    push() es un método de los arrays.

    Añade uno o varios elementos al FINAL del array.

    Modifica el array original.

    Devuelve su nueva longitud.


    Ejemplo:

        const mensajes = [];

        mensajes.push('Error 1');

    Ahora mensajes contiene:

        ['Error 1']


    Si hacemos:

        mensajes.push('Error 2');

    obtenemos:

        ['Error 1', 'Error 2']


    En nuestro caso, utilizamos push() para guardar
    cada mensaje de error.
    */

    if (!reserva.nombre) {

        errores.push('Escribe tu nombre');

    }


    /*
    ===========================================================================
    3. COMPROBAR LA EDAD
    ===========================================================================

    La edad debe cumplir dos condiciones:

        1. Ser un número válido.

        2. Estar dentro del intervalo permitido.


    ---------------------------------------------------------------------------
    Number.isNaN()
    ---------------------------------------------------------------------------

    Number.isNaN() es un método incorporado de JavaScript.

    Comprueba si un valor es exactamente NaN.


    NaN significa:

        Not a Number


    Por ejemplo:

        Number('Eladio')

    devuelve:

        NaN


    Para comprobarlo:

        Number.isNaN(NaN)

    devuelve:

        true


    Mientras que:

        Number.isNaN(25)

    devuelve:

        false


    IMPORTANTE:

    No debemos comprobar NaN utilizando:

        valor === NaN

    porque NaN no es igual a sí mismo.


    ---------------------------------------------------------------------------
    else if
    ---------------------------------------------------------------------------

    else if permite comprobar otra condición cuando
    la condición del if anterior no se ha cumplido.


    En nuestro caso:

        Si la edad es NaN:
            mostramos un error.

        En caso contrario:
            comprobamos si está dentro del intervalo permitido.


    ---------------------------------------------------------------------------
    OPERADOR ||
    ---------------------------------------------------------------------------

    || es el operador OR lógico.

    La condición será verdadera si al menos una
    de las expresiones resulta verdadera.


    ---------------------------------------------------------------------------
    TIENDA.edadMinima
    ---------------------------------------------------------------------------

    Accedemos a una propiedad del objeto TIENDA.

    En nuestro proyecto:

        TIENDA.edadMinima

    contiene:

        16


    Por tanto, comprobamos si la edad es inferior a 16
    o superior a 120.


    ---------------------------------------------------------------------------
    TEMPLATE LITERAL
    ---------------------------------------------------------------------------

    Utilizamos comillas invertidas para introducir el valor
    de TIENDA.edadMinima dentro del mensaje.

    Ejemplo:

        `La edad debe estar entre ${TIENDA.edadMinima} y 120`

    produce:

        'La edad debe estar entre 16 y 120'
    */

    if (Number.isNaN(reserva.edad)) {

        errores.push('La edad debe de ser un número');

    } else if (
        reserva.edad < TIENDA.edadMinima ||
        reserva.edad > 120
    ) {

        errores.push(
            `La edad debe de estar entre ${TIENDA.edadMinima} y 120`
        );

    }


    /*
    ===========================================================================
    4. COMPROBAR QUE EL SERVICIO EXISTE
    ===========================================================================

    En leerFormulario() guardamos:

        servicioId


    Ejemplo:

        reserva.servicioId = 'clasico'


    Queremos comprobar que ese identificador corresponde
    a un servicio que realmente exista en el array SERVICIOS.


    ---------------------------------------------------------------------------
    buscarServicio()
    ---------------------------------------------------------------------------

    Es una función que hemos creado anteriormente.

    Utiliza find() para buscar un servicio por su identificador.


    Ejemplo:

        buscarServicio('clasico')

    devuelve un objeto similar a:

        {
            id: 'clasico',
            name: 'Corte clásico',
            precio: 12,
            duracion: 25
        }


    Si no encuentra ningún servicio:

        buscarServicio('inexistente')

    devuelve:

        undefined


    ---------------------------------------------------------------------------
    OPERADOR !
    ---------------------------------------------------------------------------

    Como undefined es falsy:

        !undefined

    devuelve:

        true


    Por tanto:

        !buscarServicio(reserva.servicioId)

    será true cuando no exista un servicio con ese identificador.


        buscarServicio(reserva.servicioId)
    */

    if (!buscarServicio(reserva.servicioId)) {

        errores.push('El servicio no existe');

    }


    /*
    ===========================================================================
    5. COMPROBAR QUE SE HA SELECCIONADO UN DÍA
    ===========================================================================

    Si el usuario todavía no ha seleccionado un día:

        reserva.dia = ''


    Como el string vacío es falsy:

        !reserva.dia

    será true.


    En ese caso añadimos un mensaje al array de errores.
    */

    if (!reserva.dia) {

        errores.push('Selecciona un día');

    }


    /*
    ===========================================================================
    6. DEVOLVER EL ARRAY DE ERRORES
    ===========================================================================

    return devuelve el resultado de la función.


    EJEMPLO 1:

    Si todos los datos son válidos:

        return [];

    El array estará vacío.


    EJEMPLO 2:

    Si faltan el nombre y el día:

        return [
            'Escribe tu nombre',
            'Selecciona un día'
        ];


    Posteriormente podremos comprobar:

        const errores = validarReserva(reserva);

        if (errores.length > 0) {
            // Hay errores.
        }


    IMPORTANTE:

    validarReserva() no muestra los mensajes en el HTML.

    Solamente devuelve la información para que otra
    parte del programa decida cómo mostrarla.
    */

    return errores;

}

/*
===============================================================================
FUNCIÓN: calcularReserva()
===============================================================================

EJERCICIO PRÁCTICO: CALCULADORA DE RESERVAS
PELADILLOS ELADIO
===============================================================================

OBJETIVO:

Crear una función que calcule el precio final de una reserva.

La función recibirá un objeto con los datos del formulario.


EJEMPLO DE ENTRADA:

    {
        nombre: 'Antonio',
        edad: 25,
        servicioId: 'clasico',
        dia: 'Lunes',
        extras: ['lavado', 'cejas'],
        coupon: 'ELADIO10',
        esMiembro: true
    }


DATOS DISPONIBLES:

    SERVICIOS

    EXTRAS

    DESCUENTO_MIEMBROS

    CODIGO_CUPON

    CUPON_DESCUENTO


LA FUNCIÓN DEBE:

    1. Buscar el servicio seleccionado.

    2. Obtener el precio inicial del servicio.

    3. Recorrer los extras seleccionados.

    4. Sumar al subtotal el precio de cada extra válido.

    5. Comprobar si el cliente es miembro.

    6. Comprobar si ha introducido un cupón válido.

    7. Calcular el descuento correspondiente.

    8. Calcular el precio final.

    9. Devolver los resultados agrupados en un objeto.


IMPORTANTE:

No debemos modificar el array SERVICIOS ni el objeto EXTRAS.

Tampoco debemos modificar los datos originales de la reserva.

La función se encargará exclusivamente de calcular
y devolver resultados.
===============================================================================
*/

function calcularReserva(reserva) {

    /*
    ===========================================================================
    PASO 1. BUSCAR EL SERVICIO SELECCIONADO
    ===========================================================================

    ESTA PARTE YA ESTÁ RESUELTA.


    En el objeto reserva tenemos:

        reserva.servicioId


    Por ejemplo:

        'clasico'


    Utilizamos nuestra función:

        buscarServicio()


    para obtener el objeto completo.


    Si el servicio existe, podríamos obtener:

        {
            id: 'clasico',
            name: 'Corte clásico',
            precio: 12,
            duracion: 25
        }


    Si no existe, buscarServicio() devuelve undefined.
    */

    const servicio = buscarServicio(reserva.servicioId);


    /*
    ===========================================================================
    PASO 2. OBTENER EL PRECIO INICIAL
    ===========================================================================

    ESTA PARTE YA ESTÁ RESUELTA.


    Queremos que subtotal comience con el precio
    del servicio seleccionado.


    ---------------------------------------------------------------------------
    ENCADENAMIENTO OPCIONAL ?.
    ---------------------------------------------------------------------------

    El operador ?. permite acceder a una propiedad solamente
    si el valor anterior no es null ni undefined.


    Ejemplo:

        servicio?.precio


    Si servicio existe:

        devuelve su precio.


    Si servicio es undefined:

        devuelve undefined sin producir un error.


    ---------------------------------------------------------------------------
    COALESCENCIA NULA ??
    ---------------------------------------------------------------------------

    Utilizamos:

        ?? 0


    para indicar que, si no encontramos un precio,
    el subtotal debe comenzar en 0.


    Ejemplo:

        servicio?.precio ?? 0


    Si el servicio cuesta 12:

        subtotal = 12


    Si el servicio no existe:

        subtotal = 0


    ---------------------------------------------------------------------------
    ¿POR QUÉ UTILIZAMOS let?
    ---------------------------------------------------------------------------

    Porque más adelante tendremos que MODIFICAR el subtotal
    para añadir los precios de los extras.

    */

    let subtotal = servicio?.precio ?? 0;


    /*
    ===========================================================================
    PASO 3. RECORRER LOS EXTRAS SELECCIONADOS
    ===========================================================================

    AHORA COMIENZA EL EJERCICIO.


    En el objeto reserva tenemos una propiedad:

        reserva.extras


    Su valor es un ARRAY.


    Por ejemplo:

        ['lavado', 'cejas']


    Cada string representa la clave de un extra
    dentro del objeto EXTRAS.


    Recordemos nuestra estructura:

        const EXTRAS = {

            lavado: {
                nombre: 'Lavado gostoso',
                precio: 100
            },

            cejas: {
                nombre: 'Pulido de cejas',
                precio: 3
            }

        };


    ---------------------------------------------------------------------------
    ACTIVIDAD 1
    ---------------------------------------------------------------------------

    Recorre el array:

        reserva.extras


    utilizando un bucle for...of.


    PISTA:

    Recordad la estructura:

        for (const elemento of array) {

            // Instrucciones
        }


    PREGUNTAS:

    - ¿Qué variable representará cada extra seleccionado?

    - ¿Cuántas veces se ejecutará el bucle si el usuario
      selecciona dos extras?

    - ¿Qué ocurrirá si el array está vacío?


    ---------------------------------------------------------------------------
    ACTIVIDAD 2
    ---------------------------------------------------------------------------

    Dentro del bucle, busca el objeto correspondiente
    al identificador del extra.


    PISTA:

    Para acceder a una propiedad de un objeto utilizando
    el contenido de una variable, utilizamos corchetes.


    Ejemplo:

        const clave = 'lavado';

        EXTRAS[clave]


    Esto permite obtener:

        {
            nombre: 'Lavado gostoso',
            precio: 100
        }


    PREGUNTA:

    ¿Por qué no sería adecuado utilizar EXTRAS.clave?


    ---------------------------------------------------------------------------
    ACTIVIDAD 3
    ---------------------------------------------------------------------------

    Comprueba que el extra realmente existe.


    PISTA:

    Si intentamos acceder a una propiedad inexistente:

        EXTRAS['inexistente']

    obtenemos:

        undefined


    Utiliza una estructura condicional para evitar
    sumar el precio de un extra inexistente.


    ---------------------------------------------------------------------------
    ACTIVIDAD 4
    ---------------------------------------------------------------------------

    Si el extra existe, suma su precio al subtotal.


    PISTA:

    Recordad el operador:

        +=


    Ejemplo:

        let total = 10;

        total += 5;

    Resultado:

        total === 15


    PREGUNTA:

    ¿Qué propiedad del objeto extra contiene el precio?


    ---------------------------------------------------------------------------
    COMPROBACIÓN
    ---------------------------------------------------------------------------

    Si el servicio cuesta:

        12 €


    Y el usuario selecciona:

        Lavado: 100 €
        Cejas:    3 €


    El subtotal debería ser:

        115 €


    Si no selecciona extras:

        12 €


    ESCRIBE AQUÍ EL CÓDIGO DE LAS ACTIVIDADES 1, 2, 3 Y 4.
    */



    /*
    ===========================================================================
    PASO 4. CALCULAR LOS DESCUENTOS
    ===========================================================================

    En nuestra aplicación existen dos descuentos:

        DESCUENTO_MIEMBROS = 0.05

        CUPON_DESCUENTO = 0.10


    También tenemos:

        CODIGO_CUPON = 'ELADIO10'


    ---------------------------------------------------------------------------
    ACTIVIDAD 5
    ---------------------------------------------------------------------------

    Declara una variable para almacenar el porcentaje
    total de descuento.

    Al principio no debe existir ningún descuento.

    PREGUNTAS:

    - ¿Qué valor inicial debería tener?

    - ¿Utilizarías let o const?

    - ¿Por qué?


    ---------------------------------------------------------------------------
    ACTIVIDAD 6
    ---------------------------------------------------------------------------

    Comprueba si el cliente es miembro.


    PISTA:

    En el objeto reserva tenemos:

        reserva.esMiembro


    Esta propiedad contiene un booleano:

        true

    o:

        false


    Si el cliente es miembro, añade el descuento
    indicado en:

        DESCUENTO_MIEMBROS


    PREGUNTA:

    ¿Qué estructura condicional utilizarías?


    ---------------------------------------------------------------------------
    ACTIVIDAD 7
    ---------------------------------------------------------------------------

    Comprueba si el código de descuento introducido
    coincide con:

        CODIGO_CUPON


    Recuerda que en leerFormulario() ya utilizamos:

        trim()

    y:

        toUpperCase()


    Por tanto, el código recibido ya está normalizado.


    PISTA:

    Utiliza el operador de igualdad estricta:

        ===


    Si el cupón es correcto, añade:

        CUPON_DESCUENTO


    ---------------------------------------------------------------------------
    IMPORTANTE: CRITERIO DE ESTE EJERCICIO
    ---------------------------------------------------------------------------

    Vamos a considerar que los descuentos se SUMAN.

    Es decir:

        Miembro: 5 %

        Cupón:  10 %

        Total:  15 %


    No vamos a aplicar un descuento y después otro
    sobre el resultado reducido.

    Son dos formas diferentes de calcular descuentos.

    En este ejercicio utilizaremos la primera.


    ESCRIBE AQUÍ EL CÓDIGO DE LAS ACTIVIDADES 5, 6 Y 7.
    */



    /*
    ===========================================================================
    PASO 5. CALCULAR EL IMPORTE DEL DESCUENTO
    ===========================================================================

    ---------------------------------------------------------------------------
    ACTIVIDAD 8
    ---------------------------------------------------------------------------

    Una vez calculado el porcentaje total de descuento,
    necesitamos saber cuánto dinero representa.


    EJEMPLO:

        subtotal = 100

        porcentajeDescuento = 0.15


    El descuento sería:

        15 €


    PISTA:

    Para calcular un porcentaje de una cantidad,
    multiplicamos la cantidad por el porcentaje.


    PREGUNTA:

    ¿Qué operación matemática necesitamos realizar?


    Crea una constante para almacenar el importe del descuento.


    ESCRIBE AQUÍ TU CÓDIGO.
    */



    /*
    ===========================================================================
    PASO 6. CALCULAR EL PRECIO FINAL
    ===========================================================================

    ---------------------------------------------------------------------------
    ACTIVIDAD 9
    ---------------------------------------------------------------------------

    Ahora tenemos que obtener el total que debe pagar el cliente.


    EJEMPLO:

        subtotal = 100 €

        descuento = 15 €


    El cliente debe pagar:

        85 €


    PREGUNTA:

    ¿Qué operación debemos realizar?


    Crea una constante llamada total
    y guarda en ella el resultado.


    ESCRIBE AQUÍ TU CÓDIGO.
    */



    /*
    ===========================================================================
    PASO 7. DEVOLVER LOS RESULTADOS
    ===========================================================================

    ---------------------------------------------------------------------------
    ACTIVIDAD 10
    ---------------------------------------------------------------------------

    La función debe devolver un objeto con los resultados.


    Como mínimo, queremos devolver:

        subtotal
        descuento
        total


    También sería útil devolver el servicio seleccionado
    para poder mostrar su nombre en el resumen.


    PREGUNTAS:

    - ¿Qué palabra reservada permite devolver un valor
      desde una función?

    - ¿Cómo se crea un objeto literal?

    - ¿Cómo podemos utilizar la sintaxis abreviada
      de propiedades?


    OBJETIVO:

    Poder escribir posteriormente:

        const resultado = calcularReserva(reserva);


    Y acceder a:

        resultado.subtotal

        resultado.descuento

        resultado.total


    ESCRIBE AQUÍ EL RETURN.
    */



}
