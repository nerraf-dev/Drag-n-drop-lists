// Shuffle function

export function shuffle(containerId) {
    const container = document.getElementById(containerId);
    const elements = Array.from(container.getElementsByClassName('item'));
    let shuffledElements = elements;

    let currentIndex = shuffledElements.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = shuffledElements[currentIndex];
        shuffledElements[currentIndex] = shuffledElements[randomIndex];
        shuffledElements[randomIndex] = temporaryValue;
    }

    // Clear the container
    while (container.firstChild) {
        container.firstChild.remove();
    }

    // Append the shuffled items
    for (let i = 0; i < shuffledElements.length; i++) {
        container.appendChild(shuffledElements[i]);
    }
}

