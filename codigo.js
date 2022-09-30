
// Para leer los AudioParam.Json usaremos los fetch

// DOMContentLoeaded para asegurar que se carga todo bien
document.addEventListener('DOMContentLoaded', () =>{
    fetchData()
})


const fetchData = async() =>{
    try{
        // await va solo con el async y espera a esa promesa desde fuera
        const res = await fetch("api.json")
        const data = await res.json()
        // console.log(data) 
        pintarProductos(data)
    }catch(error){
        console.log(error)
    }

}
const contenedorProductos = document.querySelector("#contenedor-productos")
const pintarProductos = (data) => {
    const template = document.querySelector("#template-productos")
    const fragment = document.createDocumentFragment()

    data.forEach((producto) => {
        console.log(producto)
    })
}

// Cone sto hemos capturado los datos en la consola ,pero no pintados ni tenemos el HTML