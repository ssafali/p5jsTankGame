# p5jsTankGame

With P5JS library I created a 2 player game, in which two tanks try to shoot each other. The tanks
are constantly in motion and the players steer them using keys. The shells that come out of the tanks
have a limited range and a player can only fire 4 of them consecutively.

## Controls

- Blue: A / D to steer, W / S to speed up and slow down, Space to shoot
- Red: Left / Right arrows to steer, Up / Down to speed up and slow down, Enter to shoot
- First to 3 hits wins, R restarts, M mutes

## Running locally

The images need to be served over HTTP, so open the game through a local server:

```bash
npx http-server -p 5500
```

Then visit http://localhost:5500.
