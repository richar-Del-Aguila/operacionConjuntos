let conjuntoUniverso = [];
let conjuntos = [];
let nombresConjuntos = [];
let contador = 0;
let limiteElementos = 5; //limite de elementos que se quieren en el conjunto
let limiteConjuntos = 3;
let conjuntosOperar = [];

//funcion para comprobar si un elemento se encuentra en una lista
const comprobar = (valor, lista) => lista.includes(valor);

//funcion para eliminar un elemento de una lista
const eliminar = (valor, lista) => lista.filter(item => item !== valor);

function ocultar(id1, id2) {
  document.getElementById(id1).style.display = "none";
  document.getElementById(id2).style.display = "block";
}

//funcion en donde agrega elementos al conjunto universo
function agregar() {
  let elemento = document.getElementById("elemento").value;
  document.getElementById("msgElemento").value = "";

  if (elemento !== "" && !comprobar(elemento, conjuntoUniverso) && conjuntoUniverso.length < limiteElementos) {
    conjuntoUniverso.push(elemento);
    document.getElementById("elemento").value = "";
    if (conjuntoUniverso.length > 0) {
      document.getElementById("btnNombres").disabled = false;
      document.getElementById("elementosAgregados").innerText = "{" + conjuntoUniverso + "}";
    } else {
      document.getElementById("elementosAgregados").innerText = "Conjunto universo vacio";
    }

    document.getElementById("msgElemento").innerText = "Elemento agregado:" + "{" + elemento + "}";
  } else {
    switch (true) {
      case conjuntoUniverso.length >= limiteElementos:
        document.getElementById("msgElemento").innerText = "limite de elementos alcanzado";
        document.getElementById("elemento").value = "";
        document.getElementById("btnAgregar").disabled = true;
        break;
      case elemento === "":
        document.getElementById("msgElemento").innerText = "Campo vacio, ingrese un dato";
        document.getElementById("elemento").value = "";
        break;
      case comprobar(elemento, conjuntoUniverso):
        document.getElementById("msgElemento").innerText = "Elemento ya agregado, ingrese otro:" + "{" + elemento + "}";
        document.getElementById("elemento").value = "";
        break;
    };
  };
  //Si no se ha alcanzado el limite de elementos habilita el boton, sino lo desabilita
  if (conjuntoUniverso.length < limiteElementos){
    document.getElementById("btnAgregar").disabled = false;
  } else {
    document.getElementById("btnAgregar").disabled = true;
  };
}

//Esta función creara los conjuntos dependiendo de la cantidad de nombres que ingrese
function crearConjuntos() {
  let nombre = document.getElementById("nombreConjunto").value;
  let nombres = nombresConjuntos.map(nombre => nombre.toUpperCase());

  if (nombre !== "" && !comprobar(nombre.toUpperCase(), nombres) && nombresConjuntos.length < limiteConjuntos) {
    nombresConjuntos.push(nombre);
    conjuntos.push([]); // crea sublista
    document.getElementById("msgNombre").innerText = "Conjunto creado: " + nombre;
    document.getElementById("nombreConjunto").value = "";

    // Desactivar botón si se alcanza el límite
    if (nombresConjuntos.length === limiteConjuntos) {
      document.getElementById("btnNombres").disabled = true;
      document.getElementById("msgNombre").innerText = "Límite de conjuntos alcanzado";
    }
  } else {
    if (comprobar(nombre.toUpperCase(), nombres)) {
      document.getElementById("msgNombre").innerText = "Conjunto ya creado: " + nombre;
    } else if (nombre === "") {
      document.getElementById("msgNombre").innerText = "Nombre vacío";
    }
    document.getElementById("nombreConjunto").value = "";
  }

  if (conjuntos.length >= 2){
      document.getElementById("siguienteElementos").disabled = false;
  }

  document.getElementById("nombreConjunto").value = "";
  document.getElementById("conjuntosCreados").innerText = "Conjuntos creados:" + nombresConjuntos;
}

//funcion para eliminar elementos del conjunto universo
function eliminarElemento() {
  let elemento = document.getElementById("elemento").value;
  document.getElementById("elementosAgregados").innerText = "";
  document.getElementById("msgElemento").value = "";
  document.getElementById("elemento").value = "";

  if (comprobar(elemento, conjuntoUniverso)) {
    document.getElementById("msgElemento").innerText = "Elemento eliminado:"  + "{" + elemento + "}";
    conjuntoUniverso = eliminar(elemento, conjuntoUniverso);
  } else {
    document.getElementById("msgElemento").innerText = "Elemento no agregado:"  + "{" + elemento + "}";
  }
  if (conjuntoUniverso.length > 0 && conjuntoUniverso.length <= limiteElementos) {
    document.getElementById("btnNombres").disabled = false;
    document.getElementById("btnAgregar").disabled = false;
    document.getElementById("elementosAgregados").innerText = "{" + conjuntoUniverso + "}";
  } else {
    document.getElementById("elementosAgregados").innerText = "Conjunto universo vacio";
    document.getElementById("btnNombres").disabled = true;
  }
}
//Funcion que eliminara conjuntos y actualizara el estado
function eliminarConjuntos() {
  let conjunto = document.getElementById("nombreConjunto").value;
  let index = nombresConjuntos.indexOf(conjunto);
  document.getElementById("msgNombre").value = "";
  document.getElementById("nombreConjunto").value = "";

  if (comprobar(conjunto, nombresConjuntos)) {
    document.getElementById("msgNombre").innerText = "conjunto eliminado:"  + "{" + conjunto + "}";
    conjuntos.splice(index, 1);
    nombresConjuntos.splice(index, 1);
    document.getElementById("btnNombres").disabled = true;
  } else {
    document.getElementById("msgNombre").innerText = "conjunto no creado:"  + "{" + conjunto + "}";
  }
  document.getElementById("conjuntosCreados").innerText = "Conjuntos creados:" + nombresConjuntos;
  if(conjuntos.length < 2){
    document.getElementById("siguienteElementos").disabled = true;
  };
}

//Avanzara a la siguiente seccion de la edicion de conjuntos
function ingresarElementosConjuntos() {
  document.getElementById("conjunto").innerText = nombresConjuntos[0] + ":{Ø}";
  contador = 0;
  document.getElementById("elementosDisponibles").innerText = "{" + conjuntoUniverso + "}";
  ocultar("creacionConjuntos", "asignarElementos");
}

//botones con funcionalidades
const btn1 = document.getElementById("btnElementoAgregar");
const btn2 = document.getElementById("btnSiguienteConjunto");
const btn3 = document.getElementById("btnAnteriorConjunto");
const btn4 = document.getElementById("btnEliminarElm");

//Agregara elementos a los conjuntos
btn1.addEventListener("click", function () {
  let elementoAgregar = document.getElementById("elementoAgregar").value;
  let texto = "";
  //Comprubea si esta en el conjunto universo, tambien si ya esta en el conjunto y si esta en el rango de elementos permitidos
 if (comprobar(elementoAgregar, conjuntoUniverso) && !conjuntos[contador].includes(elementoAgregar) && conjuntos[contador].length <= limiteElementos) {
   conjuntos[contador].push(elementoAgregar);
   document.getElementById("msgAgregarElemento").innerText = "Elemento {" + elementoAgregar + "}, agregado a conjunto: " + nombresConjuntos[contador];
  }else {
    switch(true){
      case conjuntoUniverso.includes(elementoAgregar) == false:
        document.getElementById("msgAgregarElemento").innerText = "Elemento {"+ elementoAgregar +"} no se ha encontrado en conjunto universo y no se agrego";
      break;

      case comprobar(elementoAgregar, conjuntos[contador]) == true:
        document.getElementById("msgAgregarElemento").innerText = "Elemento {"+ elementoAgregar +"} ya se ha agregado al conjunto";
      break;
    }
  }

  if (conjuntos[contador].length === 0) {
    document.getElementById("conjunto").innerText = nombresConjuntos[contador] + ":{Ø}";
  } else {
    document.getElementById("conjunto").innerText = nombresConjuntos[contador] + ":{" + conjuntos[contador] + "}";
  }

  document.getElementById("elementoAgregar").value = "";

  for (let i = 0; i < nombresConjuntos.length; i++) {
    texto += i + 1 + ": " + nombresConjuntos[i] + ":{" + conjuntos[i] + "}<br>";
  }
  document.getElementById("mostrarConjuntos").innerHTML = texto;
});

//eliminara elementos a los conjuntos
btn4.addEventListener("click", function(){
  let elemento = elementoAgregar = document.getElementById("elementoAgregar").value;
  let texto = "";

  if (comprobar(elemento, conjuntos[contador]) == true){
    let index = conjuntos[contador].indexOf(elemento);
    conjuntos[contador].splice(index, 1);
    document.getElementById("msgAgregarElemento").innerText = "Elemento {" + elemento + "}, eliminado a conjunto: " + nombresConjuntos[contador];
  } else{
    document.getElementById("msgAgregarElemento").innerText = "Elemento {" + elemento + "}, no encontrado en: " + nombresConjuntos[contador];
  }

  if (conjuntos[contador].length === 0) {
    document.getElementById("conjunto").innerText = nombresConjuntos[contador] + ":{Ø}";
  } else {
    document.getElementById("conjunto").innerText = nombresConjuntos[contador] + ":{" + conjuntos[contador] + "}";
  }

  document.getElementById("elementoAgregar").value = "";

  for (let i = 0; i < nombresConjuntos.length; i++) {
    texto += i + 1 + ": " + nombresConjuntos[i] + ":{" + conjuntos[i] + "}<br>";
  }
  document.getElementById("mostrarConjuntos").innerHTML = texto;
});
//avanzara al sguiente conjunto
btn2.addEventListener("click", function () {
  document.getElementById("btnAnteriorConjunto").disabled = false;
  if (contador < conjuntos.length - 1) {
    contador++;
    if (conjuntos[contador].length === 0) {
      document.getElementById("conjunto").innerText = nombresConjuntos[contador] + ":{Ø}";
    } else {
      document.getElementById("conjunto").innerText = nombresConjuntos[contador] + ":{" + conjuntos[contador] + "}";
    }
    if (contador === conjuntos.length - 1) {
      document.getElementById("btnSiguienteConjunto").disabled = true;
    }
  }
});

//retrocedera al anterior conjunto para ingresar elementos
btn3.addEventListener("click", function(){
  document.getElementById("btnSiguienteConjunto").disabled = false;
  contador -= 1;
  if (conjuntos[contador].length === 0) {
    document.getElementById("conjunto").innerText = nombresConjuntos[contador] + ":{Ø}";
  } else {
      document.getElementById("conjunto").innerText = nombresConjuntos[contador] + ":{" + conjuntos[contador] + "}";
  };

  if (contador == 0){
    document.getElementById("btnAnteriorConjunto").disabled = true;
  }
});

const btnOperaciones = document.getElementById("operaciones");

btnOperaciones.addEventListener("click", function () {
  let texto = "";
  for (let j = 0; j < nombresConjuntos.length; j++){
    if (conjuntos[j].length === 0){
      conjuntos[j].push("Ø");
    }
  }
  for (let i = 0; i < nombresConjuntos.length; i++) {
    texto += i + 1 + ": " + nombresConjuntos[i] + ":{" + conjuntos[i] + "}<br>";
  }
  document.getElementById("mostrarTodosConjuntos").innerHTML = texto;
  ocultar("asignarElementos", "realizarOperaciones");
});
//limpiara los campos para que se puedad operar otros conjuntos
const btnLimpiarConjuntos = document.getElementById("btnLimpiarConjuntos");
btnLimpiarConjuntos.addEventListener("click", function(){
  conjuntosOperar = [];
  document.getElementById("conjuntosSeleccionados").innerText = "";
  actualizarBtn(conjuntosOperar, "btnOperar");
  document.getElementById("resultado").innerText = "Resultado de las operaciones";
});

const btnAgregarConjunto = document.getElementById("btnAgregarConjunto");
btnAgregarConjunto.addEventListener("click", function () {
  let nombre = document.getElementById("conjuntosOperar").value;

  if (conjuntosOperar.length >= 2) {
    document.getElementById("conjuntosSeleccionados").innerText = "Solo se pueden seleccionar dos conjuntos.";
    document.getElementById("conjuntosOperar").value = "";
    return;
  }

  if (comprobar(nombre, nombresConjuntos) && !conjuntosOperar.includes(nombre)) {
    conjuntosOperar.push(nombre);
    actualizarBtn(conjuntosOperar, "btnOperar");
    document.getElementById("conjuntosSeleccionados").innerText = "Conjuntos a operar: " + conjuntosOperar;

    // Si ya hay 2 conjuntos seleccionados, desactiva el botón
    if (conjuntosOperar.length === 2) {
      document.getElementById("btnAgregarConjunto").disabled = true;
    }

    document.getElementById("conjuntosOperar").value = "";
  } else {
    document.getElementById("conjuntosSeleccionados").innerText = "⚠️ Conjunto no existe o ya fue seleccionado.";
    document.getElementById("conjuntosOperar").value = "";
  }
});

const btnUnion = document.getElementById("btnUnion");
const btnDiferencia = document.getElementById("btnDiferencia");
const btnDiferenciaS = document.getElementById("btnDiferenciaS");
const btnInterseccion = document.getElementById("btnInterseccion");
const btnConjuntoComplemento = document.getElementById("btnConjuntoComplemento");

const spanOperacion = document.getElementById("operacion");
let operacionSelec = "";

btnUnion.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "Union";
  spanOperacion.innerText = operacionSelec + "(∪)";
  if(conjuntosOperar.length > 0){
    document.getElementById("btnAgregarConjunto").disabled = true;
  } else{
    document.getElementById("btnAgregarConjunto").disabled = false;
  }
});

btnDiferencia.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "Diferencia";
  spanOperacion.innerText = operacionSelec + "(-)";

  if(conjuntosOperar.length > 0){
    document.getElementById("btnAgregarConjunto").disabled = true;
  } else{
    document.getElementById("btnAgregarConjunto").disabled = false;
  }
});

btnDiferenciaS.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "DiferenciaSimetrica";
  spanOperacion.innerText = operacionSelec + "(Δ)";
  
  if(conjuntosOperar.length > 0){
    document.getElementById("btnAgregarConjunto").disabled = true;
  } else{
    document.getElementById("btnAgregarConjunto").disabled = false;
  }
});

btnInterseccion.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "Intersección";
  spanOperacion.innerText = operacionSelec + "(∩)";

  if(conjuntosOperar.length > 0){
    document.getElementById("btnAgregarConjunto").disabled = true;
  } else{
    document.getElementById("btnAgregarConjunto").disabled = false;
  }
});

btnConjuntoComplemento.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "Complemento";
  spanOperacion.innerText = operacionSelec + "(′)";

  if(conjuntosOperar.length > 0){
    document.getElementById("btnAgregarConjunto").disabled = true;
  } else{
    document.getElementById("btnAgregarConjunto").disabled = false;
  }
  
});

function actualizarBtn(lista,iD, limite) {
  if (lista.length === 2) {
    document.getElementById(iD).disabled = false;
  } else {
    document.getElementById(iD).disabled = true;
  }
}

const btnOperar = document.getElementById("btnOperar");

btnOperar.addEventListener("click", function () {
  let idxNom1 = nombresConjuntos.indexOf(conjuntosOperar[0]);
  let idxNom2 = nombresConjuntos.indexOf(conjuntosOperar[1]);
  let res = [];
  switch (operacionSelec) {
    case "Union":
      res = union(conjuntos[idxNom1], conjuntos[idxNom2]);
      document.getElementById("resultado").innerText = "Conjunto " + conjuntosOperar[0] + " union con conjunto "+ conjuntosOperar[1]+ ": " + res;
      break;

    case "Diferencia":
      res = diferencia(conjuntos[idxNom1], conjuntos[idxNom2]);
      document.getElementById("resultado").innerText = "Diferencia de: "+ conjuntosOperar[0] + " con el conjunto: "+ conjuntosOperar[1]+ ": " + res;
      break;

    case "DiferenciaSimetrica":
      res = diferenciaSimetrica(conjuntos[idxNom1], conjuntos[idxNom2]);
      document.getElementById("resultado").innerText = "Diferencia simetrica de ambos conjuntos: " +  res;
      break;

    case "Intersección":
      res = interseccion(conjuntos[idxNom1], conjuntos[idxNom2]);
      document.getElementById("resultado").innerText ="Intersección de " + conjuntosOperar[0] + " con " + conjuntosOperar[1] + ": " + res;
      break;

    case "Complemento":
      res = conjuntoComplemento(conjuntos[idxNom1], conjuntos[idxNom2]);
      document.getElementById("resultado").innerHTML = `conjunto ${conjuntosOperar[0]}′: ${res[0]}<br>conjunto ${conjuntosOperar[1]}′: ${res[1]}`;
      break;
  }
});

//funciones de operaciones
function union(conjuntoA, conjuntoB) {
  let resultado = [...conjuntoA];  //Copia solo los elementos de la lista
  for (let i = 0; i < conjuntoB.length; i++) {
    if (!resultado.includes(conjuntoB[i])) resultado.push(conjuntoB[i]);
  }
  return resultado;
}

//Elementos que estan en A que no estan en B
function diferencia(conjuntoA, conjuntoB) {
  let resultado = [];
  for (let i = 0; i < conjuntoA.length; i++) {
    if (!conjuntoB.includes(conjuntoA[i])) resultado.push(conjuntoA[i]);
  }
  return resultado;
}

//Elementos que son unicos en cada conjunto
function diferenciaSimetrica(conjuntoA, conjuntoB) {
  let resultado = [...conjuntoA]; //Copia solo los elementos de la lista
  for (let i = 0; i < conjuntoB.length; i++) {
    let elemento = conjuntoB[i];
    if (resultado.includes(elemento)) {
      resultado = resultado.filter(e => e !== elemento);
    } else {
      resultado.push(elemento);
    }
  }
  return resultado;
}

//Elementos comunes
function interseccion(conjuntoA, conjuntoB) {
  let resultado = [];
  for (let i = 0; i < conjuntoA.length; i++) {
    for (let j = 0; j < conjuntoB.length; j++) {
      if (conjuntoA[i] === conjuntoB[j]) resultado.push(conjuntoB[j]);
    }
  }
  return resultado;
}
//Elementos que estan en el conjunto universo pero no estan en los conjuntos A o B
function conjuntoComplemento(conjuntoA, conjuntoB) {
  let rsA = []; //Resultado para conjunto A
  let rsB = []; //Resultado para conjunto B
  for (let i = 0; i < conjuntoUniverso.length; i++) {
    let elemento = conjuntoUniverso[i];
    if (!conjuntoA.includes(elemento)) rsA.push(elemento);
    if (!conjuntoB.includes(elemento)) rsB.push(elemento);
  }
  return [rsA, rsB];
};

const btnRegresar1 = document.getElementById("btnRegresar1");
const btnRegresar2 = document.getElementById("btnRegresar2");

btnRegresar1.addEventListener("click", function(){
  ocultar("asignarElementos","creacionConjuntos");
});

btnRegresar2.addEventListener("click", function(){
  ocultar("realizarOperaciones", "asignarElementos");
})