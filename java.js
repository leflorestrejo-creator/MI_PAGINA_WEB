document.addEventListener('DOMContentLoaded', () => {

  // ==== CARRITO ====
  const productos = [
    {id: 'producto-card', nombre: 'Peluche exotico', precio: 150},
    {id: 'producto2', nombre: 'gato lol', precio: 100},
    {id: 'producto3', nombre: 'Amongass', precio: 200},
  ];

  const carrito = [];
  const carritoLista = document.getElementById('carrito-lista');
  const carritoTotal = document.getElementById('carrito-total');

  function actualizarCarrito() {
    carritoLista.innerHTML = '';
    let total = 0;
    carrito.forEach(item => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.textContent = item.nombre;
      const span = document.createElement('span');
      span.textContent = `$${item.precio} MXN`;
      li.appendChild(span);
      carritoLista.appendChild(li);
      total += item.precio;
    });
    carritoTotal.textContent = total;
  }

  productos.forEach(prod => {
    const card = document.getElementById(prod.id);
    const btnSeleccionar = card.querySelector('button.btn-primary');
    const btnRetirar = card.querySelector('button.btn-danger');

    btnSeleccionar.addEventListener('click', () => {
      if (!carrito.find(p => p.id === prod.id)) {
        carrito.push(prod);
        card.classList.add('border', 'border-success', 'shadow');
        actualizarCarrito();
      }
    });

    btnRetirar.addEventListener('click', () => {
      const index = carrito.findIndex(p => p.id === prod.id);
      if (index !== -1) {
        carrito.splice(index, 1);
        card.classList.remove('border', 'border-success', 'shadow');
        actualizarCarrito();
      }
    });
  });

  document.getElementById('finalizar-compra').addEventListener('click', () => {
    if(carrito.length === 0){
      alert('No hay productos en el carrito 😅');
    } else {
      alert('Compra finalizada ✅ Total: ' + carritoTotal.textContent + ' MXN');
      carrito.splice(0, carrito.length);
      actualizarCarrito();
      productos.forEach(p => document.getElementById(p.id).classList.remove('border', 'border-success', 'shadow'));
    }
  });

  // ==== LISTA DE TAREAS ====
  const lista = document.getElementById('lista-tareas');
  const btnEliminar = document.getElementById('btn-eliminar');
  const btnAgregar = document.getElementById('btn-agregar');
  const inputTarea = document.getElementById('input-tarea');

  btnEliminar.addEventListener('click', () => {
    const primerTarea = lista.querySelector('li');
    if(primerTarea){
      primerTarea.remove();
    } else {
      alert('No hay más tareas para eliminar 😅');
    }
  });

  btnAgregar.addEventListener('click', () => {
    const valor = inputTarea.value.trim();
    if(valor){
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = valor;
      li.id = 'tarea-' + (lista.children.length + 1);
      lista.appendChild(li);
      inputTarea.value = '';
    } else {
      alert('Escribe algo para agregar 😎');
    }
  });

  // ==== FONDO DINAMICO ====
  document.body.addEventListener('mousemove', e => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    const hue = Math.round(x * 360);
    const light = Math.round(60 + y * 20);
    document.body.style.background = `hsl(${hue}, 70%, ${light}%)`;
  });

});



