const keys = [
    //1ra fila de nuestro teclado
    [
        ["1", "!"],//Son dos valores por posición por si se presiona el shift
        ["2", "@"],
        ["3", "#"],
        ["4", "$"],
        ["5", "%"],
        ["6", "&"],
        ["7", "/"],
        ["8", "("],
        ["9", ")"],
        ["0", "="],
        ["'", "?"],
        ["¿", "¡"],
        ["BORRAR", "BORRAR"]
    ],
    //2da fila
    [
        ["q", "Q"],
        ["w", "W"],
        ["e", "E"],
        ["r", "R"],
        ["t", "T"],
        ["y", "Y"],
        ["u", "U"],
        ["i", "I"],
        ["o", "O"],
        ["p", "P"],
        ["´", "¨"],
        ["+", "*"]
    ],
    //3ra fila
    [
        ["MAYUS", "MAYUS"],
        ["a", "A"],
        ["s", "S"],
        ["d", "D"],
        ["f", "F"],
        ["g", "G"],
        ["h", "H"],
        ["j", "J"],
        ["k", "K"],
        ["l", "L"],
        ["ñ", "Ñ"],
        ["{", "["],
        ["}", "]"]
    ],
    //4ta fila
    [
        ["SHIFT", "SHIFT"],
        ["<", ">"],
        ["z", "Z"],
        ["x", "X"],
        ["c", "C"],
        ["v", "V"],
        ["b", "B"],
        ["n", "N"],
        ["m", "M"],
        [",", ";"],
        [".", ":"],
        ["-", "_"]
        
    ],
    //5ta fila
    [
        ["SPACE", "SPACE"]
    ]
];

let mayus= false;
let shift= false;
let current=null;
const input= document.querySelector('#input');

renderKeyboard();

function renderKeyboard(){

    console.log("Entramoss a rendetizar");
    const keyboardContainer=document.querySelector('#keyboard-container');
    let empty='<div class="key-empty"></div>'; //Para el espacio vacio que se presenta en algunos renglones

    //El primer map es para las filas y el segundo es para cualquiera de los dos elementos
    const layers = keys.map((layer)=>{
        return layer.map(key => {
             if(key[0]=="SHIFT"){
                return `<button class="key key-shift">${key[0]}</button>`;
             }
             if(key[0]=="MAYUS"){
                return `<button class="key key-mayus">${key[0]}</button>`;
             }
             if(key[0]=="SPACE"){
                return `<button class="key key-space">${key[0]}</button>`;
             }      
             
             //Si es cualquier otra tecla tenemos que ver si "shift" está activado
             //En caso de que no nos metemos a un segundo condicional terniario para ver si MAYUS está activado
             //Mayus solo afecta a las letras
             
             return `
                <button class="key key-normal">
                
                ${
                    shift? 
                        key[1] 
                        : (mayus && key[0].toLowerCase().charCodeAt(0) >= 97 && key[0].toLowerCase().charCodeAt(0) <= 122) ?
                            key[1] 
                            : key[0] 
                }
                </button>
             `;
        });
    });

    //Agregamos los espacios vacios de neustro teclado virtual
    layers[0].push(empty);
    layers[1].unshift(empty);
    
    const htmlLayers = layers.map(layer => {
        return layer.join("");
    });

    keyboardContainer.innerHTML="";
    htmlLayers.forEach(layer=>{
        keyboardContainer.innerHTML+= `<div class="layer">${layer}</div>`;
    });

    Animate();
}

//funcionalidad de los botones
function Animate(){
    document.querySelectorAll('.key').forEach(boton=>{
        boton.addEventListener('click', e=>{
            let tecla=boton.textContent.trim();
            console.log(tecla);    
            if(tecla == "SHIFT" ){
                shift=!shift;
                renderKeyboard();
            }else if (tecla=="MAYUS"){
                mayus=!false;
                console.log(mayus);
                renderKeyboard();
            }else if(tecla=="SPACE"){
                input.value+=" ";
            }else if(tecla=="BORRAR"){
                input.value=input.value.substring(0, input.value.length - 1);
            }else{
                input.value += tecla;
                if(shift){
                    shift=false;
                    renderKeyboard();    
                }
            }
            
        });
    });        
}        
            
        




