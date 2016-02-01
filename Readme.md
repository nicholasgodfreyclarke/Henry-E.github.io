
# A mod of hardmaru's Neural Slime Volleyball

HTML5-JS Slime Volleyball clone.  AI agent is a trained recurrent neural network, trained using basic conventional neuroevolution techniques.  Neural network implemented using the [convnetjs](http://cs.stanford.edu/people/karpathy/convnetjs/) library.

See the blog post at [blog.otoro.net](http://blog.otoro.net/2015/03/28/neural-slime-volleyball/) for more information, or [otoro.net](http://otoro.net/slimevolley/) to actually play the game.

## online demo
- [Neural Slime Volleyball](http://otoro.net/slimevolley)

## The mod
[Currently here](Henry-E.github.io)
Whenever the ball is within a certain distance of the player the AI takes back control of the slime. It then hands back control automatically to the player after the ball exceeds that distance.

Changes were also made to the opposing AI. Rather than updating the information given to the opposing AI every frame, this only happens whenever the frame number is prime relative to 2 and 3. Simply restricting the updates to every N frames wasn't sufficient to induce interesting mistakes.

The idea was to try and make a game using a reinforcment learner that made the player feel like they were good by setting it up that they win just over half of the time. Fortunately both the reinforcement learner and an accompanying game were already developed by Hardmaru and it was reasonably straight forward to augment their, very well written, code to achieve this.


## License
GNU GPL v3
