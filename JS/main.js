// Clave API proporcionada por Giphy
const api_key = "PAEsLG5YrRyvXFhbOM5uCgc08fMqIxmF"; 


// Función que realiza la llamada a la API de Giphy
// Recibe como parámetros la clave de la API (ak) y el término de búsqueda (termino)
const llamada = (ak, termino) =>{
    // se construye la URL con los valores asignados a los parámetros, aquí también definimos la cantidad de Gifs que se mostrarán
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${ak}&q=${termino}&limit=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    
    // Se devuelve la promesa resultante de la función fetch, que hace la petición a la API
    return fetch(url)
}

//Elementos HTML que necesitamos para manipular el DOM
const boton = document.getElementById("boton") // aquí se obtiene el elemento boton por su id 
const resultados = document.getElementById("resultados") //aquí se obtiene el contenedor que guardará los resultados por si id

// declaración de la función buscarGifs
function buscarGifs(){

    //se obtiene el valor ingresado en el campo de texto
    let valor = document.getElementById("busqueda").value

    //Eliminar imagenes anteriores para no acumular los resultados
    const gif_anteriores = document.querySelectorAll("img");
    gif_anteriores.forEach(img => img.remove());

    //se llama a la API con la clave de la API y el valor buscado
    llamada(api_key, valor)
    .then((response) => {

        //si la respuesta no es la esperada, manda un error
        if (!response.ok) {
            throw new Error("Error en la respuesta de red")
        }
        //se convierte la respuesta en fomati JSON
        return response.json();
    })
    .then((results) => {
        // caso contrario itera sobre los elementos devueltos por la API (hasta 9 por el límite definido en la URL)
        results.data.forEach(element => {
            //En cada iteración:

            // muestra la url de cada imagen por la consola
            console.log(element.images.original.url)

            // se guarda en una constante un elemento img
            const img = document.createElement("img");
            // se modifica el src, haciendo que la imagen sea la url devuelta por la API
            img.setAttribute("src", element.images.original.url);
            // se guarda el resultado como un hijo del contenedor de resultados en el DOM
            resultados.appendChild(img);
        });
    })
    .catch((error) => {
        // Captura y muestra errores en la consola
        console.error("Error en la consulta: " + error.message);
    })
}
// se agrega un escuchador de eventos al botón de buscarGifs para que ejecute la función al hacerle click
boton.addEventListener("click", () => {
    buscarGifs()
})

// se agrega un escuchador de eventos al campo de texto para que al presionar la tecla enter
document.getElementById("busqueda").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { //si la letra presionada es Enter:
        // esta linea previene el comportamiento predeterminado del fomulario al presionar la tecla enter (que es enviar el fomulario o recargar la página)
        event.preventDefault();  
        buscarGifs();  // Llama a la función de búsqueda
    }
});

