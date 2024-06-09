from processing import *

ball_x = 300
ball_y = 200
ball_dx = 3
ball_dy = 3
ball_diameter = 20

paddle_width = 10
paddle_height = 60
left_paddle_y = 160
right_paddle_y = 170
paddle_speed = 5

left_score = 0
right_score = 0

round_count = 0
max_rounds = 20

def setup():
    size(600, 400)
    noStroke()

def draw():
    global ball_x, ball_y, ball_dx, ball_dy
    global left_paddle_y, right_paddle_y
    global left_score, right_score
    global round_count

    background(0,0, 255)
    rect(300, 0, 5, 400)
    fill(255)
    
    ellipse(ball_x, ball_y, ball_diameter, ball_diameter)
    
    rect(30, left_paddle_y, paddle_width, paddle_height)
    rect(width - 40, right_paddle_y, paddle_width, paddle_height)
    
    ball_x += ball_dx
    ball_y += ball_dy
    
    # Ball collision with top and bottom
    if ball_y < ball_diameter / 2 or ball_y > height - ball_diameter / 2:
        ball_dy *= -1
        
    # Ball collision with paddles
    if ball_x < 30 + paddle_width and ball_y > left_paddle_y and ball_y < left_paddle_y + paddle_height:
        ball_dx *= -1
        
    if ball_x > width - 40 - paddle_width and ball_y > right_paddle_y and ball_y < right_paddle_y + paddle_height:
        ball_dx *= -1
        
    # Ball out of bounds (left and right)
    if ball_x < 0:
        right_score += 1
        reset_ball()
        round_count += 1
        
    if ball_x > width:
        left_score += 1
        reset_ball()
        round_count += 1
        
    textSize(32)
    fill(255)
    text(str(left_score), width / 4, 50)
    text(str(right_score), 3 * width / 4, 50)
    
    if keyPressed:
        if key == 'a' and left_paddle_y > 0:
            left_paddle_y -= paddle_speed
        if key == 'z' and left_paddle_y < height - paddle_height:
            left_paddle_y += paddle_speed
        if keyCode == UP and right_paddle_y > 0:
            right_paddle_y -= paddle_speed
        if keyCode == DOWN and right_paddle_y < height - paddle_height:
            right_paddle_y += paddle_speed
    
    # Check if max rounds reached
    if round_count >= max_rounds:
        noLoop() 

def reset_ball():
    global ball_x, ball_y, ball_dx, ball_dy
    ball_x = width / 2
    ball_y = height / 2
    ball_dx *= -1
