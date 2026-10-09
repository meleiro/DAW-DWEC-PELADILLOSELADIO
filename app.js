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
    */

}