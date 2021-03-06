var dificultad=["FÁCIL","DIFÍCIL","HARCORE"];
var nivel=dificultad[0];
var audio=["Multimedia/audio1.mp3","Multimedia/audio2.mp3","Multimedia/audio3.mp3"];
var contador=0;
var contador2=0;
var incrementoPuntos=0;
var contenedor="";
var puntos=0;
var ele="";
var req1;
var int1;
var cuadroPuntos="";

function crearPuntos(){
    let ele=document.createElement("div");
    ele.style.height="10%";
    ele.innerHTML="0 / 200";
    ele.style.position="absolute";
    ele.style.fontSize="2rem";
    ele.style.left="80%";
    ele.style.top="0%";
    return ele;
}

function modificarPuntos(puntos){
    cuadroPuntos.innerHTML=puntos+" / 150";
    if(puntos>=150){
        cuadroPuntos.style.color="green";
    }
}

function crearPollo(){

    ele=document.createElement("div");
    ele.style.width="10%";
    ele.style.height="20%";
    ele.style.backgroundImage="url(./Multimedia/pollo.png)";
    ele.id="pollot";
    ele.style.backgroundSize="cover";
    ele.style.transition="all 1s ease 1s";
    ele.onclick=function(){
        numero=Math.floor(Math.random()*3);
        var sonido=new Audio(audio[numero]);
        sonido.play();
        this.style.display="none";
        puntos=puntos+(incrementoPuntos*2);
        modificarPuntos(puntos);
        
    }
    return ele;
}

function jugar(){
    if(nivel==dificultad[0]){
        incrementoPuntos=5;
    }else if(nivel==dificultad[1]){
        incrementoPuntos=4;
    }else{
        incrementoPuntos=3;
    }

    contenedor=document.querySelector("#contenedor");
    contenedor.innerHTML="";
    contenedor.style.cursor="url('./Multimedia/target_opt.png'),pointer";

    cuadroPuntos=crearPuntos();
    contenedor.append(cuadroPuntos);

    var ele=new Pollo(true);
    var validador=2;
    contenedor.appendChild(ele.getPollo);
    var posicion=ele.getPosicion;
    
    window.requestAnimationFrame(step);

    function step() {
        posicion=posicion+ele.incremento;
        ele.getPollo.style.left = posicion+"%";
        if (contador2<175) {
                req1=window.requestAnimationFrame(step);
            contador2++;
        }else{
        if(document.getElementById("pollo")){
            contenedor.removeChild(ele.getPollo);
        }else{
            puntos=puntos+incrementoPuntos;
            modificarPuntos(puntos);
        }
        validador++;
        ele=new Pollo(validador%2==0);
        posicion=ele.getPosicion;
        contenedor.appendChild(ele.getPollo);
        req1=window.requestAnimationFrame(step);
        contador2=0; 
        }
    }

    
    c1=tiempo();
    contenedor.append(c1);
    pollo=crearPollo();
    int1=setInterval(function(){
        if((contador%5)==0){
            pollo=crearPollo();
            document.querySelector("#contenedor").append(pollo);
            pollo.style.position="absolute";
            posicion2=Math.random()*80+1;
            pollo.style.top=75+"%";
            pollo.style.left=posicion2+"%";
            setTimeout(function(){
                contenedor.removeChild(pollo);
            },1000);
        }
        contador++;
    },1000);


}

function tiempo(){
    cajatiempo=document.createElement("tiempo-juego");
    return cajatiempo;
}

function mostrarInfo(){
    var texto=document.getElementById("texto");
    texto.innerHTML="";
    var cuadro=crearCuadro();
    texto.append(cuadro);
    cuadro.innerHTML="Hey, soy Eduardo Otayza y tengo 21 años. Estudio en el IES Clara del Rey y espero sacarme este año mi título de técnico de Desarrollo de aplicaciones Web";
}

function crearCuadro(){
    let ele=document.createElement("div");
    ele.style.backgroundImage="url('./Multimedia/madera.jpg')";
    ele.style.position="relative";
    ele.style.top="5%";
    ele.style.left="5%";
    ele.style.width="90%";
    ele.style.height="90%";
    ele.style.fontSize="2.25rem";
    ele.style.textAlign="center";
    ele.style.paddingTop="50px";
    ele.style.color="greenyellow";
    return ele;
}

function seleccionarDificultad(){
    var texto=document.getElementById("texto");
    texto.innerHTML="";
    var cuadro=crearCuadro();
    texto.append(cuadro);
    cuadro.style.display="flex";
    cuadro.style.flexDirection="column";
    cuadro.style.alignItems="center";
    cuadro.style.justifyContent="space-around";
    for(let i=0;i<3;i++){
        cuadro.append(niveles(i));
    }
    
}

function niveles(numero){
    let ele=document.createElement("button");
    ele.style.width="75%";
    ele.innerHTML=dificultad[numero];
    ele.style.backgroundColor="yellow";
    ele.onclick=function(){
        ele.style.backgroundColor="green";
        for(let i=0;i<ele.parentNode.childNodes.length;i++){
            if(i!=numero){
                ele.parentNode.childNodes[i].style.backgroundColor="yellow";
            }
        }
        nivel=dificultad[numero];
    }
    if(numero==2){
        ele.style.color="red";
    }
    return ele;
}

function instrucciones(){
    var texto=document.getElementById("texto");
    texto.innerHTML="";
    var cuadro=crearCuadro();
    texto.append(cuadro);
    cuadro.innerHTML="1. Se juega con RATÓN<br>2. Dispones de un tiempo limitado para disparar a los pollos, ¡consigue la cena para esta noche!<br>3.Cuantos más pollos, más comida";
}

class BotonJugar extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.style.width="50%";
        this.style.height="20%";
        var ele=document.createElement("button");
        ele.innerHTML="Jugar";
        ele.id="jugar";

        this.append(ele);
        var obj=this;
        setInterval(function(){
            if(obj.childNodes[0].getAttribute("style")=="color:green"){
                obj.childNodes[0].setAttribute("style","color:yellow");          
            }else{
                obj.childNodes[0].setAttribute("style","color:green");
            }
        },1000)
    }
}

customElements.define('boton-jugar', BotonJugar);

class TiempoJuego extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML="<div id=tiempo></div>";
        tiempo=document.getElementById("tiempo");
        tiempo.style.width="10%";
        tiempo.style.height="10%";
        tiempo.style.fontSize="2rem";
        tiempo.innerHTML="1:00";
        var segundos=59;
        let int2=setInterval(function(){
            tiempo.innerHTML="0:"+segundos;
            if(segundos<10){
                tiempo.innerHTML="0:0"+segundos;
                tiempo.style.color="red";
            }
            if(segundos==0){
                cancelAnimationFrame(req1);
                clearInterval(int1);
                clearInterval(int2);
                var textoFinal=puntos>150?puntos+"/150. Enhorabuena, ¡has ganado!":puntos+"/150. Vaya, no has ganado";
                window.alert("Se acabó el tiempo. Puntos= "+textoFinal);
                location.reload();
            }
            
            if(segundos==40){
                contenedor.style.backgroundImage="url('Multimedia/paisajetarde.jpg')";
            }else if(segundos==20){
                contenedor.style.backgroundImage="url('Multimedia/paisajenoche.jpg')";
            }

            segundos--;
            
        },1000);
    }
}

customElements.define('tiempo-juego', TiempoJuego);