const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
const btnPause = document.querySelector("#pause");
const btnContinue = document.querySelector("#continue");

const myCar = new Image();
myCar.src = 'https://i.pinimg.com/originals/f4/7d/e7/f47de7fd81202f36e8fc39bf2a5f296f.png';

const car2 = new Image();
car2.src = 'https://www.seekpng.com/png/full/54-546605_lambo-transparent-top-view-lamborghini-murcielago-lp-670.png';

const car3 = new Image();
car3.src = 'https://www.pngkey.com/png/full/834-8342413_bus-top-view-png-free-van-vector.png';

const boom = new Image();
boom.src = 'https://freepngimg.com/thumb/explosion/81313-sound-sonic-flower-explosion-symmetry-boom-thumb.png';

const audioElement = new Audio('https://dight310.byu.edu/media/audio/FreeLoops.com/2/2/Crash%20Auto%20Car-19545-Free-Loops.com.mp3');


let cars = [car2, car3];
let index = 0;
let score = 0;
let scoreSpeed = 2;
let scoreTextUpdate = false;
let gameover = false;
let pause = false;
let boomX = 0;
let boomY = 0;

let data = {

  myCar: {
    xDelta: 0,
    yDelta: 0,
    width: 40,
    height: 70,
    xCar: canvas.width / 2 - 15,
    yCar: canvas.height - 70
  },

  //other cars
  cars: {
    xDelta: 0,
    yDelta: 2,
    width: 40,
    height: 70,
    xCar: Math.floor(Math.random() * canvas.width),
    yCar: -canvas.height / 2

  },
  //dash line data
  x: canvas.width / 2,
  y: 0,
  yDelta: 3.5,
  width: 10,
  height: 40,
  fillStyle: "white"
};

btnPause.addEventListener('click', function() {
  pause = true;
});
btnContinue.addEventListener('click', function() {
  pause = false;
});

function update() {
  if (pause != true) {

    if (gameover != true) {
      //dash line update
      if (data.y > 0) {
        data.y = -canvas.height + canvas.height / 5 * 4;
      }
      data.y += data.yDelta;


      data.myCar.xCar += data.myCar.xDelta;

      //cars speed
      data.cars.yCar += scoreSpeed;

      if (data.cars.yCar > canvas.height) {
        data.cars.yCar = -50;
        index++;
        score++;

        //by score update speed
        if (score % 5 === 0) {
          scoreSpeed += 1;
          scoreTextUpdate = true;
        } else {
          scoreTextUpdate = false;
        }

        if (index >= cars.length) {
          index = 0;
        }
        //draw cars inside the canvas
        data.cars.xCar = Math.random() * (canvas.width - data.cars.width) + 10;
        if (data.cars.xCar < 0 || data.cars.xCar >= canvas.width - 50) {
          data.cars.xCar = Math.random() * (canvas.width - data.cars.width) + 10;
        }
      }

      //Collision 
      if (data.cars.xCar <= data.myCar.xCar + data.myCar.width && data.cars.xCar >= data.myCar.xCar && data.cars.yCar >= data.myCar.yCar - data.myCar.height) {
        gameover = true;

        boomX = (data.cars.xCar + data.myCar.xCar) / 2 - data.myCar.width;
        boomY = (data.cars.yCar + data.myCar.yCar) / 2 - data.myCar.width;
        
        audioElement.currentTime = 0;
        audioElement.play();
      }
      if (data.cars.xCar + data.myCar.width <= data.myCar.xCar + data.myCar.width && data.cars.xCar + data.myCar.width >= data.myCar.xCar && data.cars.yCar >= data.myCar.yCar - data.myCar.height) {
        gameover = true;

        boomX = (data.cars.xCar + data.myCar.xCar) / 2 - data.myCar.width;
        boomY = (data.cars.yCar + data.myCar.yCar) / 2 - data.myCar.width;

        audioElement.currentTime = 0;
        audioElement.play();
      }
    }
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  //draw dash line
  context.fillStyle = data.fillStyle;
  context.fillRect(data.x, data.y, data.width, data.height);
  context.fillRect(data.x, data.y + canvas.height / 5, data.width, data.height);
  context.fillRect(data.x, data.y + canvas.height / 5 * 2, data.width, data.height);
  context.fillRect(data.x, data.y + canvas.height / 5 * 3, data.width, data.height);
  context.fillRect(data.x, data.y + canvas.height / 5 * 4, data.width, data.height);

  //draw cars
  context.drawImage(myCar, data.myCar.xCar, data.myCar.yCar, data.myCar.width, data.myCar.height);
  context.drawImage(cars[index], data.cars.xCar, data.cars.yCar, data.cars.width, data.cars.height);

  //display score by highlighting every 5 score
  if (scoreTextUpdate === true) {
    context.fillStyle = '#FFDB00';
    context.font = '20px Verdana';
    context.fillText('Score: ' + score, 10, 25);
  } else {
    context.fillStyle = 'white';
    context.font = '15px Verdana';
    context.fillText('Score: ' + score, 10, 20);
  }


  if (gameover === true) {
    context.fillStyle = '#FFDB00';
    context.font = '30px Arial';
    context.fillText('GAME OVER', 35, 80);
    context.font = '20px Arial';
    context.fillText('Your Score : ' + score, 60, 100);
    context.drawImage(boom, boomX, boomY, data.cars.width * 3, data.cars.height * 2);
  }

  if (pause === true) {
    context.fillStyle = 'white';
    context.font = '25px Arial';
    context.fillText('PAUSE', 10, 50);
  }
}

//control myCar
document.addEventListener("keydown", function(evt) {
  if (evt.code === "ArrowRight") {
    data.myCar.xDelta = 1;
  } else if (evt.code === "ArrowLeft") {
    data.myCar.xDelta = -1;
  }
});
document.addEventListener("keyup", function(evt) {
  data.myCar.xDelta = 0;
});

function loop() {
  requestAnimationFrame(loop);
  update();
  draw();
}

loop();
