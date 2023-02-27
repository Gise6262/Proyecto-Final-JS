            class Producto {
                constructor(id, nombre, precio, img){
                    this.id = id;
                    this.nombre = nombre;
                    this.precio = precio;
                    this.img = img;
                    this.cantidad = 1;
                }
            }

            const arcoIris = new Producto(1, "Cinta Arco iris", 560, "img/gomitaArcoIris.jpg");
            const cepilloDientes = new Producto(2, "Cepillo de dientes", 450, "img/gomitaCepilloDientes.jpg");
            const sandia = new Producto(3, "Gomitas Sandía", 680, "img/gomitasAcidasSandia.jpg");
            const gusanitosDulces = new Producto(4, "Gusanitos", 625, "img/gomitasGusanitosDulces.jpg");
            const hamburguesa = new Producto(5, "Hamburguesa", 495, "img/gomitasHamburguesa.jpg");
            const huevosFritos = new Producto(6, "Huevitos Fritos", 690, "img/gomitasHuevosFritos.jpg");
            const ositos= new Producto(7, "Ositos", 850, "img/gomitasOsitosFrutales.jpg");
            const pizza= new Producto(8, "Pizza", 520, "img/gomitasPizza.jpg")
            const redonditas = new Producto(9, "Redonditas", 499, "img/gomitasredondas.jpg");
            const cocaCola = new Producto(10, "Coca-Cola", 720, "img/gomitascocacola.jpg");
            const surtido1 = new Producto(11, "Surtido N°1", 1150, "img/surtido1.jpg");
            const surtido2 = new Producto(12, "Surtido N°2", 1400, "img/surtido2.jpg");
            const surtido3 = new Producto(13, "Surtido N°3", 1220, "img/surtido3.jpg");
            const surtidoLove = new Producto(14, "Surtido Love", 1720, "img/surtido4.jpg");

            //array
            const productos = [arcoIris, cepilloDientes, sandia, gusanitosDulces, hamburguesa, huevosFritos, ositos, pizza, redonditas, cocaCola, surtido1, surtido2, surtido3, surtidoLove]

            console.log(productos);

            let carrito = [];
            console.log(carrito);
            
            if(localStorage.getItem("carrito")){
                carrito = JSON.parse(localStorage.getItem("carrito"));
            }
            
            const contenedorProductos = document.getElementById("contenedorProductos");
            
            const verProductos = () => {
                productos.forEach(producto => {
                    const card = document.createElement("div");
                    card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
                    card.innerHTML = `
                                <div class ="card">
                                    <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                                    <div class ="card-body">
                                        <h5 class ="card-title"> ${producto.nombre} </h5>
                                        <p class ="info">Gomitas dulces sabor multifruta. Bolsa de 100Grs </p>
                                        <p class ="precio">$ ${producto.precio} </p>
                                        <button class = "btn colorBoton" id="boton${producto.id}" > Añadir al Carrito </button>
                                    </div>
                                </div>
                                `
                    contenedorProductos.appendChild(card);
            
                    const boton = document.getElementById(`boton${producto.id}`);
                    boton.addEventListener("click", () => {
                        añadirProducto(producto.id);
                    })
            
                });
            }
            verProductos();
            
            const añadirProducto = (id) => {
                const productInShop = carrito.find(producto => producto.id === id);
                if(productInShop){
                    productInShop.cantidad++;
                } else {
                    const producto = productos.find(producto => producto.id === id);
                    carrito.push(producto);
                }
                
                calcularTotal();
            
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }
            
            const containerCarrito = document.getElementById("containerCarrito");
            const verCarrito = document.getElementById("verCarrito");
            
            verCarrito.addEventListener("click", () => {
                lookCarrito();
            })
            
            const lookCarrito = () => {
                console.log(carrito);
                containerCarrito.innerHTML ="";
                carrito.forEach((producto) => {
                    console.log("Puto")
                    const card = document.createElement("div");
                    card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
                    card.innerHTML = `<div class="card">
                                        <img src= "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}"/>
                                        <div class="card-body">
                                            <h5 class ="card-title"> ${producto.nombre} </h5>
                                            <p class ="info">Gomitas dulces sabor multifruta. Bolsa de 100Grs </p>
                                            <p class ="precio">$ ${producto.precio} </p>
                                            <div class="mas-menos">
                                                <buttton class="btn btn-dark btn-rounded restarCantidad"> - </buttton>
                                                <p class="card-text mydescripcion">CANTIDAD: ${producto.cantidad}</p>
                                                <buttton class="btn btn-dark btn-rounded sumarCantidad"> + </buttton>
                                            </div>
                                                <buttton class="btn myboton" id="eliminar${producto.id}"> <i class="fas fa-cart-arrow-down"></i> Eliminar Producto </button>
                                        </div>
                                    </div>`;
                    containerCarrito.appendChild(card);
            
                    let restarCantidad = card.querySelector(".restarCantidad")
                    restarCantidad.addEventListener("click", () => {
                        if(producto.cantidad !== 1){
                        producto.cantidad --;
                        }else{
                        producto.cantidad = 1;
                        const indice = carrito.indexOf(producto);
                        carrito.splice(indice, 1);
                        }
                        lookCarrito();
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                    })
            
                    let sumarCantidad = card.querySelector(".sumarCantidad")
                    sumarCantidad.addEventListener("click", () => {
                        producto.cantidad++;
                        lookCarrito();
                        localStorage.setItem("carrito", JSON.stringify(carrito));
                    })
            
                    const boton = document.getElementById(`eliminar${producto.id}`);
                    boton.addEventListener("click", () => {
                        eliminarProducto(producto.id);
                    })
            
                })
                calcularTotal();
            }
            
            const eliminarProducto = (id) => {
                const producto = carrito.find(producto => producto.id === id);
                    producto.cantidad = 1;
                const indice = carrito.indexOf(producto);
                carrito.splice(indice, 1);
                lookCarrito();
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }
            
            const total = document.getElementById("total");
            
            const calcularTotal = () => {
                let totalCompra = 0;
                carrito.forEach(producto =>{
                    totalCompra += producto.precio * producto.cantidad;
                    console.log(totalCompra);
                })
                total.innerHTML = `Precio Total: $ ${totalCompra}`;
            }
            
            const vaciarCarrito = document.getElementById("vaciarCarrito");
            
            vaciarCarrito.addEventListener("click", () => {
                deletedAllCarrito();
            })
            
            const deletedAllCarrito = () => {
                console.log(carrito);
                carrito.forEach(producto =>{
                    producto.cantidad = 1;
                })
                carrito = [];
                console.log(carrito);
                lookCarrito();
                localStorage.setItem("carrito", JSON.stringify(carrito));
            }