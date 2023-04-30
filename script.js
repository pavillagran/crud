// VARIABLES
const formularioUI = document.querySelector('#formulario');
const listaTareasUI = document.querySelector('#lista');

let arrayLista = [];   // array vacio


//FUNCIONES
const CrearItem = (actividad, descripcion) => {   // CREA EL OBJETO Y LO CARGA AL ARRAY
  let item ={
    id: Date.now(),   // se genera un ID único usando la fecha actual
    actividad: actividad,
    descripcion: descripcion,
    estado: false
  }

  arrayLista.push(item);
  //console.log(arrayLista)  

  return item;
}

// guardar db
const GuardarDB = () => {
  localStorage.setItem('tarea', JSON.stringify(arrayLista));
  PintarDB();
}

const PintarDB  = () =>{
  listaTareasUI.innerHTML = '';

  arrayLista = JSON.parse(localStorage.getItem('tarea'));

  if(arrayLista === null){
    arrayLista = [];    // se vacia si esta nulo
  }else{
    arrayLista.forEach(element => {
      listaTareasUI.innerHTML += `<li id="${element.id}"><b>${element.actividad} </b><br> ${element.descripcion}  </li><button class="btn-editar" data-id="${element.id}">Editar</button><button class="btn-borrar" data-id="${element.id}">Eliminar</button>`;
    });
 //LISTENERS

    // Agrega el evento "click" a cada botón "Editar"
    listaTareasUI.querySelectorAll('.btn-editar').forEach(boton => {
      boton.addEventListener('click', () => {
        const id = boton.dataset.id;
        const li = document.querySelector(`li[id="${id}"]`);
        const actividadUI = li.querySelector('b').textContent;
        const descripcionUI = li.textContent.trim().replace(actividadUI, '');
        //INGRESA DATOS MODIFICADOS CON PROMPT
        const nuevaActividad = prompt('Ingrese la nueva actividad:', actividadUI);
        const nuevaDescripcion = prompt('Ingrese la nueva descripción:', descripcionUI);

        if (nuevaActividad !== null && nuevaDescripcion !== null) {
          // Modifica el objeto correspondiente en el array
          const index = arrayLista.findIndex(item => item.id === parseInt(id));
          arrayLista[index].actividad = nuevaActividad;
          arrayLista[index].descripcion = nuevaDescripcion;

          // Guarda el array actualizado en el localStorage
          GuardarDB();
        }
      });
    });

    // Agrega el evento "click" a cada botón "Eliminar"
    listaTareasUI.querySelectorAll('.btn-borrar').forEach(boton => {
      boton.addEventListener('click', () => {
        const id = boton.dataset.id;

        // Elimina el elemento correspondiente del array
        arrayLista = arrayLista.filter(item => item.id !== parseInt(id));

        // Guarda el array actualizado en el localStorage
        GuardarDB();
      });
    });
  }
}


//EVENT LISTENERS 
formularioUI.addEventListener('submit', (e) => {
  e.preventDefault();
  let actividadUI = document.querySelector('#actividad').value;
  let descripcionUI = document.querySelector('#descripcion').value;
  CrearItem(actividadUI, descripcionUI); 
  GuardarDB();          
  formularioUI.reset();            // resetea el formulario cada vez que apreta el btn
});

document.addEventListener('DOMContentLoaded', PintarDB);
