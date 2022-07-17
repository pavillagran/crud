      // VARIABLES
      const formularioUI = document.querySelector('#formulario');
      const listaTareasUI = document.querySelector('#lista');
      
      let arrayLista = [];   // array vacio
      
      //FUNCIONES
      const CrearItem = (actividad) => {
        let item ={
        actividad: actividad,
        descripcion: description,
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
         console.log(arrayLista);
        if(arrayLista === null){
          arrayLista = [];    // se vacia si esta nulo
        }else{
          arrayLista.forEach(element => {
            //console.log(element);  ver si es persistente
            listaTareasUI.innerHTML +=    `<li>${element.actividad} - ${element.descripcion} </li> <button  id="btn-editar">Editar</button><button id="btn-borrar">Eliminar</button>`
          });
        }
      }
      //EVENT LISTENERS 
      formularioUI.addEventListener('submit', (e) => {
        e.preventDefault();
        let actividadUI = document.querySelector('#actividad').value;
        let descripcionUI = document.querySelector('#description').value;
        console.log(actividadUI);
       
        CrearItem(actividadUI); 
        GuardarDB();          
        formularioUI.reset();            // resetea el formulario cada vez que apreta el btn
      });
      
      document.addEventListener('DOMContentLoaded', PintarDB)
      