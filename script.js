let conjuntoUniverso = [];
let conjuntos = [];
let nombresConjuntos = [];
let contador = 0;
let limiteElementos = 5; //limite de elementos que se quieren en el conjunto
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

  if (nombre !== "" && !comprobar(nombre.toUpperCase(), nombres)) {
    nombresConjuntos.push(nombre);
    conjuntos.push([]); // crea una sublista en donde se guardaran los elementos de cada conjunto
    document.getElementById("msgNombre").innerText = "conjunto creado:" + nombre;
    document.getElementById("nombreConjunto").value = "";
  } else {
    switch (true) {
      case comprobar(nombre.toUpperCase(), nombres):
        document.getElementById("msgNombre").innerText = "conjunto ya creado:" + nombre;
        document.getElementById("nombreConjunto").value = "";
        break;
      case nombre === "":
        document.getElementById("msgNombre").innerText = "nombre vacio";
        document.getElementById("nombreConjunto").value = "";
    }
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
  } else {
    document.getElementById("msgNombre").innerText = "conjunto no creado:"  + "{" + conjunto + "}";
  }
  document.getElementById("conjuntosCreados").innerText = "Conjuntos creados:" + nombresConjuntos;
  if(conjuntos.length < 2){
    document.getElementById("siguienteElementos").disabled = true;
  };
}

function ingresarElementosConjuntos() {
  document.getElementById("conjunto").innerText = nombresConjuntos[0] + ":{Ø}";
  contador = 0;
  document.getElementById("elementosDisponibles").innerText = "{" + conjuntoUniverso + "}";
  //ocultar("creacionConjuntos", "asignarElementos");
}

const btn1 = document.getElementById("btnElementoAgregar");
const btn2 = document.getElementById("btnSiguienteConjunto");

btn1.addEventListener("click", function () {
  let elementoAgregar = document.getElementById("elementoAgregar").value;
  let texto = "";
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

btn2.addEventListener("click", function () {
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

const btnOperaciones = document.getElementById("operaciones");

btnOperaciones.addEventListener("click", function () {
  let texto = "";
  for (let i = 0; i < nombresConjuntos.length; i++) {
    texto += i + 1 + ": " + nombresConjuntos[i] + ":{" + conjuntos[i] + "}<br>";
  }
  document.getElementById("mostrarTodosConjuntos").innerHTML = texto;
  //ocultar("asignarElementos", "realizarOperaciones");
});
const btnLimpiarConjuntos = document.getElementById("btnLimpiarConjuntos");
btnLimpiarConjuntos.addEventListener("click", function(){
  conjuntosOperar = [];
  document.getElementById("conjuntosSeleccionados").innerText = "";
  actualizarBtn(conjuntosOperar, "btnOperar");
  document.getElementById("resultado").innerText = res;
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
  document.getElementById("btnAgregarConjunto").disabled = false;
});

btnDiferencia.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "Diferencia";
  spanOperacion.innerText = operacionSelec + "(-)";
  document.getElementById("btnAgregarConjunto").disabled = false;
});

btnDiferenciaS.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "DiferenciaSimetrica";
  spanOperacion.innerText = operacionSelec + "(Δ)";
  document.getElementById("btnAgregarConjunto").disabled = false;
});

btnInterseccion.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "Intersección";
  spanOperacion.innerText = operacionSelec + "(∩)";
  document.getElementById("btnAgregarConjunto").disabled = false;
});

btnConjuntoComplemento.addEventListener("click", function () {
  spanOperacion.innerText = "";
  operacionSelec = "Complemento";
  spanOperacion.innerText = operacionSelec + "(′)";
  document.getElementById("btnAgregarConjunto").disabled = false;
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
      document.getElementById("resultado").innerText = res;
      break;

    case "Diferencia":
      res = diferencia(conjuntos[idxNom1], conjuntos[idxNom2]);
      document.getElementById("resultado").innerText = res;
      break;

    case "DiferenciaSimetrica":
      res = diferenciaSimetrica(conjuntos[idxNom1], conjuntos[idxNom2]);
      document.getElementById("resultado").innerText = res;
      break;

    case "Intersección":
      res = interseccion(conjuntos[idxNom1], conjuntos[idxNom2]);
      document.getElementById("resultado").innerText = res;
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

function diferencia(conjuntoA, conjuntoB) {
  let resultado = [];
  for (let i = 0; i < conjuntoA.length; i++) {
    if (!conjuntoB.includes(conjuntoA[i])) resultado.push(conjuntoA[i]);
  }
  return resultado;
}

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

function interseccion(conjuntoA, conjuntoB) {
  let resultado = [];
  for (let i = 0; i < conjuntoA.length; i++) {
    for (let j = 0; j < conjuntoB.length; j++) {
      if (conjuntoA[i] === conjuntoB[j]) resultado.push(conjuntoB[j]);
    }
  }
  return resultado;
}

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