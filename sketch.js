var population;
var lifespan = 400;
var lifeP;
var count = 0;
var target;
var maxForce = 0.4;
var popsize = 25;
var mutationRate = 0.01;

var x1, x2, y1, y2;
var pressed, done = false;

function setup() {
  cnv = createCanvas(640, 480);
  population = new Population();
  rocket = new Rocket();
  lifeP = createP();
  popP = createP();
  mutP = createP();
  genP = createP();
  lifespanP = createP();
  target = createVector(width / 2, 50);
  htmlInit();
}

function draw() {
  background(0);
  population.run();
  //display stuff

  genP.html("Generation: " + population.generations + "<br>");
  lifeP.html("Life Timer: " + count + "<br>");
  popP.html("Population Size: " + popsize + "<br>");
  mutP.html("Mutation Rate: " + mutationRate + "<br>");

  count++;
  if (count == lifespan) {
    count = 0;
    population.evaluate();
    population.selection();
  }
    if (pressed && !done) {
      fill(200);
      rect(x1, y1, mouseX - x1, mouseY - y1);
    }
    if (!pressed && done) {
      done = false;
    }
    if (!pressed && !done) {
      fill(200);
      rect(x1, y1, x2 - x1, y2 - y1);
    }

  fill(255);
  ellipse(target.x, target.y, 15, 15);
}

function mousePressed() {
  x2 = 0;
  y2 = 0;
  x1 = mouseX;
  y1 = mouseY;
  pressed = true;
}

function mouseReleased() {
  x2 = mouseX;
  y2 = mouseY;
  pressed = false;
  done = true;
}

function htmlInit() {
  createElement("h2", "Parameters");


  createP("Population Size");
  popDec = createButton("-");
  popInc = createButton("+");

  popDec.mousePressed(decPop)
  
  function decPop() {
    popsize -=10;
  }
  popInc.mousePressed(incPop)
  
  function incPop() {
    popsize += 10;
  }

  createP("Mutation Rate");
  mutDec = createButton("-");
  mutInc = createButton("+");

  mutDec.mousePressed(decMut)
  
  function decMut() {
    if(mutationRate >= 0.01)
      mutationRate -= 0.01;
  }
  mutInc.mousePressed(incMut)
  
  function incMut() {
    mutationRate += 0.01;
  };
}
