//Cuando la longitud de ambos array sea igual, bloquear input del usario. Cuando es el turno de la maquina tambien bloquearlo

let numeroAlAzar = 0;
let arrayUsuario = [];
let arrayMaquina = []
let acumulador = -1;
let cont = 0;
let ronda = 1; 


function comparadorDeArray(arr1,arr2) {
    for(let i = 0; i <= arr1.length; i++) {
        
        if(arr1[i] !== arr2[i]) {
            return false;
        } else {
            continue;
        }    
    
    }    
    return true;
}


function usuarioSigueJugando() {
    numeroAlAzar = Math.ceil(Math.random() * 4);   
    arrayMaquina.push(numeroAlAzar);
    ronda++
    cont = 0
    acumulador = -1
    arrayUsuario.splice(0, arrayUsuario.length);

    setTimeout(function(){
        document.querySelector('#turno-usuario').className = 'ocultar'; 
    }, 1000)

    setTimeout(function(){
        document.querySelector('#turno-maquina').className = '';  
    }, 1000)

    sumarRonda()
    turnoMaquina()
}


function usuarioPierde() {
    document.querySelector('#titulo').innerText = 'Game Over!'
    document.querySelector('#titulo-2').innerText = 'Hacer click en comenzar para volver a jugar'
    document.querySelector('#btn-comenzar').className = 'button-comenzar';
    resetearValores()
    // bloquearInputUsuario();
}


function resetearValores() {
    ronda = 1;
    cont = 0;
    acumulador = -1;
    arrayUsuario.splice(0, arrayUsuario.length);
    arrayMaquina.splice(0, arrayMaquina.length);
    document.querySelector('#turno-usuario').className = 'ocultar'; 
    document.querySelector('#contador-ronda').innerText = ''
}


document.querySelector('.container').onclick = function (e) {
    const $cuadro = e.target.id[5];
    
    i = Number($cuadro)

    arrayUsuario.push(i);
    pulsarBoton(i);
    acumulador++

    if(comparadorDeArray(arrayUsuario, arrayMaquina)) {   
        usuarioSigueJugando()
    } 
    
    if(arrayUsuario[acumulador] !== arrayMaquina[acumulador]) {
        usuarioPierde()
    }

}


function pulsarBoton(indice) {
    document.querySelector(`.item-${indice}`).className = `item${indice}`

    window.setTimeout(function(){
        document.querySelector(`.item${indice}`).className = `item-${indice}`
    }, 400)
}


document.querySelector('#btn-comenzar').onclick = function () {
    document.querySelector('#btn-comenzar').className = 'ocultar';

    numeroAlAzar = Math.ceil(Math.random() * 4);
    arrayMaquina.push(numeroAlAzar);
    document.querySelector('#turno-maquina').className = '';
    document.querySelector('#titulo').innerText = 'Simon Dice'
    document.querySelector('#titulo-2').innerText = ''
    turnoMaquina()
    sumarRonda()   
}
 
function sumarRonda() {
    document.querySelector('#contador-ronda').innerText = ''
    let agregarTexto = document.createTextNode(`Ronda: ${ronda}`);
    let $ronda = document.querySelector('#contador-ronda');
    $ronda.appendChild(agregarTexto);
}


function turnoMaquina() {
let timerId = setTimeout(function maquina() {
    
    pulsarBoton(arrayMaquina[cont])
    console.log(arrayMaquina[cont]); //SACARLO CUANDO LA TAREA ESTE LISTA
    cont++        
    
    timerId = setTimeout(maquina, 1000); 
    
    if(cont === ronda) {
        clearTimeout(timerId);

        setTimeout(function(){
            document.querySelector('#turno-maquina').className = 'ocultar';
        }, 1000)

        setTimeout(function(){
            document.querySelector('#turno-usuario').className = '';
        }, 1000)


        } 
        
    }, 2000);
    
}


//LOGICA DEL JUEGO:
//Cuando le demos click a cualquier de los botones, cada boton tiene asignado un numero, por cada click se va a ejecutar ese boton y se va pushear
//los valores por cada click, hacemos una comparacion de los dos arrays(que deben ser identicos), si los resultados 
// no son iguales se pierde el juego. Si los resultados son iguales se ejecuta otra ronda
//La maquina por cada ronda tiene que ejecutar LOS BOTONES ANTERIORES y UN SOLO BOTON NUEVO

 
