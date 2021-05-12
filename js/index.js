const ballSpeed = 2;
const ballCount = 50;
const minBallRadius = 3;
const maxBallRadius = 5;


function Canvas (){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let dpi = window.devicePixelRatio;
    this.ctx=ctx
    this.height = ctx.canvas.height;
    this.width = ctx.canvas.width;

}
Canvas.prototype.drawBalls = function (item)     {
    this.ctx.beginPath();
    this.ctx.arc(item.x,item.y,item.radius,0,Math.PI*2);
    this.ctx.closePath();
    this.ctx.fillStyle=item.color;
    this.ctx.fill();
}
 
Canvas.prototype.collision = function (ball1,ball2) {
    let squareDistance = (ball1.x-ball2.x)*(ball1.x-ball2.x) + (ball1.y-ball2.y)*(ball1.y-ball2.y);
    if (squareDistance <= ((ball1.radius + ball2.radius) * (ball1.radius + ball2.radius))){
        var vCollision = {x: ball2.x - ball1.x, y: ball2.y - ball1.y};
        var distance = Math.sqrt((ball2.x-ball1.x)*(ball2.x-ball1.x) + (ball2.y-ball1.y)*(ball2.y-ball1.y));
        var vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
        var vRelativeVelocity = {x: ball1.vx - ball2.vx, y: ball1.vy - ball2.vy};
        var relativeSpeed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;
                if (relativeSpeed > 0){
            ball1.vx -= (relativeSpeed * vCollisionNorm.x);
            ball1.vy -= (relativeSpeed * vCollisionNorm.y);
            ball2.vx += (relativeSpeed * vCollisionNorm.x);
            ball2.vy += (relativeSpeed * vCollisionNorm.y);   
        }
    }
}
const Ball = function  (x,y,radius) {
    this.color='#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.radius=radius;
    this.x=x;
    this.y=y;
    this.direction = Math.random()* Math.PI*2;
    this.speed = Math.random()*ballSpeed+1;
    this.vx=Math.cos(this.direction);
    this.vy=Math.sin(this.direction);
}

Ball.prototype.updatePosition = function(height,width){
        this.x+= this.vx * this.speed;
        this.y += this.vy * this.speed;

        if (this.x - this.radius <0){
            this.x = this.radius;
            this.direction = Math.atan2(this.vy,this.vx* -1);
            this.vx=Math.cos(this.direction);
            this.vy=Math.sin(this.direction);
        }
        else if (this.x + this.radius > height){
            this.x =height- this.radius;
            this.direction = Math.atan2(this.vy,this.vx* -1);
            this.vx=Math.cos(this.direction);
             this.vy=Math.sin(this.direction);
        }
        else if (this.y - this.radius <0){
            this.y = this.radius;
            this.direction = Math.atan2(this.vy* -1,this.vx);
            this.vx=Math.cos(this.direction);
            this.vy=Math.sin(this.direction);
        }
        else if (this.y + this.radius > width){
            this.y = width- this.radius;
            this.direction = Math.atan2(this.vy* -1,this.vx);
            this.vx=Math.cos(this.direction);
            this.vy=Math.sin(this.direction);
        }
    }

const canvas = new Canvas();
var balls = new Array();
for (let i=0; i <ballCount;i++){
    var randomX = Math.floor(Math.random()*canvas.height)
    var randomY = Math.floor(Math.random()*canvas.width)
    var randomR = Math.floor(Math.random()*maxBallRadius) + minBallRadius
    balls.push(new Ball(randomX,randomY,randomR))
}

function loop(){
    window.requestAnimationFrame(loop);
    canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < balls.length;i ++) {
        let ball = balls[i];
        canvas.drawBalls(ball)   
        ball.updatePosition(canvas.width, canvas.height);
    }
    for (var i = 0; i < ballCount; i++){  
        for (var j = 0; j < ballCount; j++) {
            if(i == j) {
                continue;
            }
            else{
                canvas.collision(balls[i],balls[j])
            }
    }}
}
loop();