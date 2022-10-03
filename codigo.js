
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
        detectarBotones(data)
    }catch(error){
        console.log(error)
    }

}
const contenedorProductos = document.querySelector("#contenedor-productos")
const pintarProductos = (data) => {
    const template = document.querySelector("#template-productos").content
    const fragment = document.createDocumentFragment()
    
    data.forEach((producto) => {
        // despues de seleccionar la Image, le añadimos el atributo src con setAttribute si ya existe dicho atributo no pasa nada sino lo crea y luego le ponemos de donde viene dicha direccion que seria una propiedad de dicho objeto por eso ponemos el objeto y luego punto y la propedad con el link del
        template.querySelector("img").setAttribute("src", producto.thumbnailUrl)
        template.querySelector("h5").textContent = (producto.title)
        template.querySelector("p span").textContent = producto.precio
        template.querySelector("button").dataset.id = producto.id
        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenedorProductos.appendChild(fragment)
}

let carrito ={}

const detectarBotones = (data) =>{
    const  botones = document.querySelectorAll(".card button")


    botones.forEach(btn => {
        btn.addEventListener("click",() =>{
            // con los 2 signos iguales pero con el triple igual no funciona ya que tienen que ser totalmente iguales y uo es string y el otro es interge par aeso hay que usar parseINT para que dejemos el triple igual
         
            const producto = data.find(item => item.id === parseInt(btn.dataset.id))
            // console.log(producto)
            producto.cantidad = 1
            if (carrito.hasOwnProperty(producto.id)) {
                producto.cantidad = carrito[producto.id].cantidad + 1
            }
            // splite operator
            carrito[producto.id] = { ...producto }

            console.log(carrito)
            pintarCarrito()
        })
    })
}

const items =document.querySelector("#items")

const pintarCarrito=()=> {
    items.innerHTML = ""
    const template = document.querySelector("#template-carrito").content
    const fragment= document.createDocumentFragment()
    // trasformamos el objeto en un array para estudaiarlo 

Object.values(carrito).forEach(producto=>{
     console.log(producto)
     
     template.querySelector("th").textContent =producto.id
    //  El entre corchetes significa el primer ,segundo ohata el numero total de elementos de la misma clase con query selector all
     template.querySelectorAll("td")[0].textContent = producto.title
     template.querySelectorAll("td")[1].textContent = producto.cantidad
     template.querySelector("span").textContent =  producto.precio * producto.cantidad

     template.querySelector(".btn-info").dataset.id = producto.id
     template.querySelector(".btn-danger").dataset.id = producto.id
     const clone = template.cloneNode(true)
     fragment.appendChild(clone)
})
    //pediente innnerHTML
    items.appendChild(fragment)
    pintarFooter()
    accionBotones()
}
const footer = document.querySelector("#footer-carrito")
const pintarFooter = () =>{

    footer.innerHTML = ""
    // las keys nos dicen el indice del objeto
    if(Object.keys(carrito).length === 0){
        footer.innerHTML = `    <th scope="row" colspan="5">Carrito vacío con innerHTML</th>` 
        return
    } 
    const template = document.querySelector("#template-footer").content
    const fragment = document.createDocumentFragment()

    // Las acciones que queremos en dicho footer es sumar cantidad y sumar los totales usaremos reduce para sumar el total para eso tendremos que trasformar en un array el objeto con object

    const nCantidad = Object.values(carrito).reduce((acc, {cantidad})=> acc + cantidad, 0)
    const nPrecio = Object.values(carrito).reduce((acc,{cantidad,precio}) => acc + cantidad * precio ,0)
    console.log(nCantidad)

    template.querySelectorAll("td")[0].textContent = nCantidad
    template.querySelector("span").textContent = nPrecio
    const clone = template.cloneNode(true)
    fragment.appendChild(clone)
    footer.appendChild(fragment)

    const boton = document.querySelector("#vaciar-carrito")
    boton.addEventListener("click", () =>{
        
        carrito ={}
        pintarCarrito()
        
    })
}
const accionBotones = () =>{
    const botonesAgregar = document.querySelectorAll("#items .btn-info")
    const botonesEliminar = document.querySelectorAll("#items .btn-danger")

    botonesAgregar.forEach(btn =>{
        btn.addEventListener("click",()=> {
            console.log(btn.dataset.id)
             const producto = carrito[btn.dataset.id]
             producto.cantidad ++
             carrito[btn.dataset.id] = {...producto}
             pintarCarrito()
        })
    })
    botonesEliminar.forEach(btn =>{
        btn.addEventListener("click",()=> {
            console.log("eliminando..")
            const producto = carrito[btn.dataset.id]
            producto.cantidad --
            if (producto.cantidad === 0){
                // El delete borra el objeto o la propeidad de este y estamos cconsiderando un objeto como let con muchas propeidades dentro de este  slo sirve para objetos
                delete carrito[btn.dataset.id]
                
            }else{
                carrito[btn.dataset.id] = {...producto}
             
            }
            pintarCarrito()
        })
    })
}
// Cone sto hemos capturado los datos en la consola ,pero no pintados ni tenemos el HTML


// let carritoEjemplo ={}
// carritoEjemplo ={
//     1:{id:1,titulo:"cafe",precio:500, cantidad: 3},
//     2:{id:2,titulo:"pizza",precio:100, cantidad: 2}
// }
// carritoEjemplo[1]
// console.log(carritoEjemplo[1])