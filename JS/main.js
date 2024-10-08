const api_key = "PAEsLG5YrRyvXFhbOM5uCgc08fMqIxmF";  //codigo proporcionado por la API 


// esta funcion llama a la API
const llamada = (ak, termino) =>{
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${ak}&q=${termino}&limit=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    return fetch(url)
}

const boton = document.getElementById("boton")
const resultados = document.getElementById("resultados")


function buscarGifs(){
    let valor = document.getElementById("busqueda").value

    //Eliminar imagenes anteriores:
    const gif_anteriores = document.querySelectorAll("img");
    gif_anteriores.forEach(img => img.remove());

    llamada(api_key, valor)
    .then((response) => {
        if (!response.ok) {
            throw new Error("Error en la respuesta de red")
        }
        return response.json();
    })
    .then((results) => {
        results.data.forEach(element => {
            console.log(element.images.original.url)
            const img = document.createElement("img");
            img.setAttribute("src", element.images.original.url);
            resultados.appendChild(img);
        });
    })
    .catch((error) => {
        console.error("Error en la consulta: " + error.message);
    })
}

boton.addEventListener("click", () => {
    buscarGifs()
})

document.getElementById("busqueda").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevenir el comportamiento predeterminado
        buscarGifs();  // Llamar a la función de búsqueda
    }
});

