document.addEventListener("DOMContentLoaded", function() {
    const gameContainer = document.querySelector("#game");
    let card1 = null;
    let card2 = null;
    let flippedCards = 0;
    let noClicking = false;

    const COLORS = [
        "#fa03a3",
        "#5fc8fc",
        "#17eb8c",
        "#ebfa03",
        "#c28beb",
        "#fa03a3",
        "#5fc8fc",
        "#17eb8c",
        "#ebfa03",
        "#c28beb"
    ];

    function shuffle(array) {
        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    let shuffledColors = shuffle(COLORS);

    // This creates a new div and gives it a class with the value of the color
    function createDivsForColors(colorArray) {
        for (let color of colorArray) {
            const newDiv = document.createElement("div");
            newDiv.classList.add(color);
            newDiv.addEventListener("click", handleCardClick);
            gameContainer.append(newDiv);
        }
    }

    function handleCardClick(e) {
        if (noClicking) return;
        if (e.target.classList.contains("flip")) return;
        
        let currentCard = e.target;
        currentCard.style.backgroundColor = currentCard.classList[0];

        if (!card1 || !card2) {
            currentCard.classList.add("flip");
            card1 = card1 || currentCard;
            card2 = currentCard === card1 ? null : currentCard;
        }

        if (card1 && card2) {
            noClicking = true;
            let playCard1 = card1.className;
            let playCard2 = card2.className;

            if (playCard1 === playCard2) {
                flippedCards += 2;
                card1.removeEventListener("click", handleCardClick);
                card2.removeEventListener("click", handleCardClick);
                card1 = null;
                card2 = null;
                noClicking = false;
            }
            else {
                setTimeout(function() {
                    card1.style.backgroundColor = "";
                    card2.style.backgroundColor = "";
                    card1.classList.remove("flip");
                    card2.classList.remove("flip");
                    card1 = null;
                    card2 = null;
                    noClicking = false;
                }, 1000);
            }
        }
        
        if (flippedCards === COLORS.length) alert("YOU'RE A WINNER!");
    }
    
    createDivsForColors(shuffledColors);
})