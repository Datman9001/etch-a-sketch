 
// select the elements on the page-canvas, shake button

const canvas = document.querySelector('#etch-a-sketch');

const ctx = canvas.getContext('2d');

const shakeButton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// setup our canvas for drawing  
// create height and width starting points
const {width, height} = canvas;
 
//  create random starting points to begin
let sp = Math.floor(Math.random() * width);
let sh = Math.floor(Math.random() * height);


ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 40;
let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath();

ctx.moveTo(sp, sh);
ctx.lineTo(sp, sh);
ctx.stroke();

// write a draw function
function draw({key}){
    // change color
    hue += 5;  
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    // start the path
      ctx.beginPath();
      ctx.moveTo(sp, sh);
    //   where to move
    switch (key) {
        case 'ArrowUp':
           sh -= MOVE_AMOUNT
          break;
        
        case 'ArrowDown':
           sh += MOVE_AMOUNT;
          
          break;
          case 'ArrowRight':
            sp += MOVE_AMOUNT;
          
          break;
          case 'ArrowLeft':
            sp -= MOVE_AMOUNT;
          break;
        default:
          console.log('Nothing is working');
      }
    // move our x and y values
       
      ctx.lineTo(sp, sh);
      ctx.stroke();
}




// write handler for keys
function handleKey(e){
    if(e.key.includes('Arrow')){
         e.preventDefault();
         draw({key: e.key})

    }
    
}

// clear/shake functiong
function clearCanvas(){
    canvas.classList.add('shake');
    ctx.clearRect(0,0,width,height);
    canvas.addEventListener("animationend",function(){
        canvas.classList.remove('shake');
    }, {once: true})
}

// listen for arrow
window.addEventListener('keydown', handleKey);
document.querySelector('.shake').addEventListener('click', clearCanvas)