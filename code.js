/*
Things Done
1. 2D bricks added
2. Making Ball bounce from top of paddle
3. Displaying Score and number of lives left on the top of the canvas
4. Given different colors to bricks column
5. Colar based scoring red->1 green->2 blue->3 yellow->4 orange->5 pink->6
6. Making ball bounce when it collides with bricks;
*/
let paddle_x, paddle_y, paddle_width, paddle_height, paddle_dx;
let ball_x, ball_y, ball_diameter, ball_dx, ball_dy;
let rowCount,colCount,brick_width,brick_height,brick_padding;
let bricks,bricks_status;
let colors,scores;
let score,lives;
let game;
let ball_horizontal,ball_vertical;

function setup() {
  createCanvas(500, 500);
  background("black");

  // Paddle Characteristics
  paddle_width = 100;
  paddle_x = (width / 2) - (paddle_width / 2);
  paddle_y = height - 25;
  paddle_height = 15;

  // Ball Characteristics
  ball_diameter = 20;
  ball_dx =1;
  ball_dy = 2;
  paddle_dx = 3;
  ball_x = (width / 2) - (ball_diameter / 2);
  ball_y = (height / 2) - (ball_diameter / 2);

  //Brick Characteristics
  rowCount=6;
  colCount=4;
  brick_width=60;
  brick_height=30;
  brick_padding=20;

  // for color based scoring
  colors=['red','springgreen','skyblue','yellow','orange','orchid'];
  scores=[1,2,3,4,5,6];

  bricks=[];
  bricks_status=[];
  for(let r=0;r<colCount;r++)
  {
    bricks[r]=[];
    bricks_status[r]=[];
    for(let c=0;c<rowCount;c++)
    {
      bricks[r][c]=rect(0,0,brick_width,brick_height);
      bricks_status[r][c]=true;
    }
  }

  game=true;
  score=0;
  lives=3;

}

function draw () {
  background("black");

  if(ball_x + (ball_diameter / 2) > width) {
    ball_dx = -ball_dx;
  }

  if(ball_x - (ball_diameter / 2) < 0) {
    ball_dx = -ball_dx;
  }

  if(ball_y + (ball_diameter / 2) > height) {

    if(lives-1===0)
    {
      ball_dy = 0;
      ball_dx = 0;
      game=false;
      lives-=1;
    }
    if(game===true)
      {
        lives-=1;
        ball_x = (width / 2) - (ball_diameter / 2);
        ball_y = (height / 2) - (ball_diameter / 2);
      }


  }
   if(ball_y - (ball_diameter / 2) < 0) {
    ball_dy = -ball_dy;
  }

  ball_x = ball_x + ball_dx;
  ball_y = ball_y + ball_dy;

  if (keyIsDown(LEFT_ARROW)) {
    if(paddle_x>0)
    {
      paddle_x = paddle_x - paddle_dx;
    }
  }

  if (keyIsDown(RIGHT_ARROW)) {
    if(paddle_x+paddle_width<width)
    {
      paddle_x = paddle_x + paddle_dx;
    }
  }

 if((ball_x<=paddle_x+paddle_width) &&
    (ball_x>=paddle_x) &&
    (ball_y+(ball_diameter/2)>paddle_y)){
   ball_dy=-ball_dy;
 }

  for(let r=0;r<colCount;r++)
  {

    for(let c=0;c<rowCount;c++)
    {
      let x=c*(brick_width+brick_padding)+25;
      let y=r*(brick_height+brick_padding)+25;
      ball_horizontal=ball_x+ball_diameter;
      ball_vertical=ball_y+ball_diameter;

      if(bricks_status[r][c]===true)
        {
          if((ball_x<x+brick_width) &&
              (ball_x>x) &&
              (ball_y<y+(brick_height / 2))  &&
              (ball_y>y))
          {
            score+=scores[c];
            bricks_status[r][c]=false;
            ball_dy=-ball_dy;
          }
        }
      if(bricks_status[r][c]===true)
      {
          fill(colors[c]);
          bricks[r][c]=rect(x,y,brick_width,brick_height);
      }
    }
  }




   //rect(brick_x, brick_y, brick_width, brick_height);
  fill('silver');
  circle(ball_x, ball_y, ball_diameter);
  fill('white');
  rect(paddle_x, paddle_y, paddle_width, paddle_height);
  textSize(16);
  fill('white');
  text("Score : " + score, 20,20);
  textSize(16);
  fill('white');
  text("Lives : " + lives, 400,20);
}
