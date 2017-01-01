![Pickles vs. Pears!](images/picklesPearsLogo/picklespearsfinal2.png?raw=true "Pickles vs. Pears!")
## [Click Here To Play](https://datadaveshin.github.io/webgames/)
For my nieces, I decided to make a modified Tic Tac Toe game. It has a dynamic board that allows your to play a traditional 3 x 3 board, on up to 6 x 6, using Pickles and Pears instead of X's and O's. It also has optional wild (flower) squares as well as obstacles (cows). One or two players can play, and there are various skill levels including one that will pretty much let you win!

This is my first JavaScript/Web project, and it is derived from my Telegraph Prep Capstone project. For the artificial intelligence, I went with a Monte Carlo simulation that I learned about through Rice University's Python course, rather than the traditional minimax function used for these types of games.

Why use a Monte Carlo simulation? First, it's much quicker than a minimax, because you aren't loading up the call stack. Second, a Monte Carlo simulation allows for adjusting the skill level readily, you can simply adjust a single variable that accounts for the number of trials to adjust the changes. Currently, the "medium" level only uses 7 random games before the computer "makes its move". The hard level uses 1000, but that is still quicker than a minimax (without other tricks) in a browser.

## Acknowledgements
Thanks to Josh C and Brian J from [Code Self Study](http://www.codeselfstudy.com) for pointers. Thanks to Sara H and Diana P for beta-testing.

### Logo
Thanks to Sara Harmon!

### Images
Images were obtained from [Pixabay](http://www.pixabay.com)

### Telegraph Prep / Hack Reactor
Thanks to Telegraph Prep operated under [Hack Reactor](http://www.hackreactor.com/) through [Telegraph Academy](http://getcoding.hackreactor.com/telegraph-academy/) in the San Francisco Bay Area - They provided the first 3 JS functions (make an 8 x 8 board, render it and a click handler that returns a position), as well as some starter HTML/CSS for this Capstone Project!

### Coursera / Rice University
I learned about Monte Carlo simulations and recursive minimax functions from their [Fundamentals of Computing Specialization course](https://www.coursera.org/specializations/computer-fundamentals).

