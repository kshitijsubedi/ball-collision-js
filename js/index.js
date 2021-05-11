const ballSpeed = 3;
const ballCount = 10;
const minBallRadius = 3;
const maxBallRadius = 7;

function Canvas (){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    this.ctx=ctx
    this.height = ctx.canvas.height;
    this.width = ctx.canvas.width;
}
Canvas.prototype.drawCircle = function (actor)     {
    this.ctx.beginPath();
    this.ctx.arc(actor.x,actor.y,actor.radius,0,Math.PI*2);
    this.ctx.closePath();
    this.ctx.fillStyle=actor.color;
    this.ctx.fill();
}
const Ball = function  (x,y,radius) {
    this.color='#'+(Math.random()*0xFFFFFF<<0).toString(16);
    this.radius=radius;
    this.x=x;
    this.y=y;
    this.direction = Math.random()* Math.PI*2;
    this.speed = Math.random()*ballSpeed+1;
}

Ball.prototype.updatePosition = function(height,width){
        this.x+= Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction)* this.speed;

        if (this.x - this.radius <0){
            this.x = this.radius;
            this.direction = Math.atan2(Math.sin(this.direction),Math.cos(this.direction)* -1);
        }
        else if (this.x + this.radius > height){
            this.x =height- this.radius;
            this.direction = Math.atan2(Math.sin(this.direction),Math.cos(this.direction)* -1);
  
        }
        else if (this.y - this.radius <0){
            this.y = this.radius;
            this.direction = Math.atan2(Math.sin(this.direction)* -1,Math.cos(this.direction));
        }
        else if (this.y + this.radius > width){
            this.y = width- this.radius;
            this.direction = Math.atan2(Math.sin(this.direction)* -1,Math.cos(this.direction));
  
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
        canvas.ctx.fillStyle = ball.color;
        canvas.ctx.beginPath();
        canvas.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        canvas.ctx.fill();    
        ball.updatePosition(canvas.width, canvas.height);
    }
}
loop();