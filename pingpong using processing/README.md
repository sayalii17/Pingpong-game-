# Ping Pong Game in Processing

This is a simple Ping Pong game implemented using the Processing library. The game features a moving ball, player-controlled paddles, and a scoring system.

## Controls

- **Left Paddle**:
  - Move Up: Press `A`
  - Move Down: Press `Z`
- **Right Paddle**:
  - Move Up: Press `UP ARROW`
  - Move Down: Press `DOWN ARROW`

## Getting Started

1. Download and install Processing from [processing.org](https://processing.org/).
2. Copy the code into a new Processing sketch.
3. Run the sketch.

## Game Logic

- The ball starts in the center and moves diagonally.
- The ball bounces off the top and bottom edges of the window.
- The ball bounces off the paddles when it collides with them.
- If the ball goes off the left or right edge of the window, the opposing player scores a point, and the ball resets.
- The game stops when the number of rounds reaches the maximum limit.