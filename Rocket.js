function Rocket(dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    if (dna) {
        this.dna = dna;
    } else {
        this.dna = new DNA();
    }
    this.fitness = 0;
    this.applyForce = function (force) {
        this.acc.add(force);
    };

    this.calcFitness = function () {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y);
        this.fitness = map(d, 0, width, width, 0);
        if (this.completed) {
            this.fitness *= 10;
        }
        if (this.crashed) {
            this.fitness /= 10;
        }
    };

    this.update = function () {
        var d = dist(this.pos.x, this.pos.y, target.x, target.y)
        if (d < 10) {
            this.completed = true;
            this.pos = target.copy();
        }
        if (x1 - x2 < 0) {
            var temp = x1;
            x1 = x2;
            x2 = temp;
        }
        if (y1 - y2 < 0) {
            var temp2 = y1;
            y1 = y2;
            y2 = temp2;
        }
        if (this.pos.x < x1 && this.pos.x > x2 &&
            this.pos.y < y1 && this.pos.y > y2) {
            this.crashed = true;
        }
        if (this.pos.x > width || this.pos.x < 0) {
            this.crashed = true;
        }
        if (this.pos.y < 0) {
            this.crashed = true;
        }
        this.applyForce(this.dna.genes[count]);
        if (!this.completed && !this.crashed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.vel.limit(4);
        }
    };

    this.show = function () {
        push();
        noStroke();
        fill(255, 150);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        rect(0, 0, 5, 5);
        pop();
    };
}
