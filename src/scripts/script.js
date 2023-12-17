// Initialize Dragula with the containers you want to make draggable
var drake = dragula([document.getElementById('all-items'), document.getElementById('hardware'), document.getElementById('software')]);

var totalElements = document.getElementById('all-items').childElementCount;

// Shuffle function

export function shuffle(containerId) {
    var container = document.getElementById(containerId);
    var elements = Array.from(container.getElementsByClassName('item'));
    var shuffledElements = shuffleArray(elements);

    // Clear the container
    while (container.firstChild) {
        container.firstChild.remove();
    }

    // Append the shuffled items
    for (var i = 0; i < shuffledElements.length; i++) {
        container.appendChild(shuffledElements[i]);
    }
}

function shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
return array;
}

// Check function
// Assuming your draggable items look something like this:
// <div class="item" data-category="hardware">Item 1</div>
var feedback = document.getElementById('feedback');
var correct = 0;
var incorrect = 0;
drake.on('drop', function(el, target, source, sibling) {
    // Get the correct category from the dropped item
    var correctCategory = el.getAttribute('data-category');

    // Get the ID of the category it was dropped into
    var droppedCategory = target.id;

    // Check if the answer is correct
    if (correctCategory === droppedCategory) {
        console.log('Correct!' + el);
        correct++;
        // feedback.textContent = 'Correct!';
    } else {
        console.log('Incorrect. The correct category is ' + correctCategory);
        // feedback.textContent = 'Incorrect.';
        incorrect++;
    }
    });

// On load, shuffle the items
window.onload = function() {
shuffle('all-items');
};

const checkAnswerBtn = document.getElementById('check-answers');
checkAnswerBtn.addEventListener('click', checkAnswers);

function checkAnswers() {
if (correct === 0 && incorrect === 0) {
    console.log("You haven't answered any questions.");
    feedback.textContent = "You haven't answered any questions.";
} else {
    console.log("You have " + correct + " correct answers.");
    feedback.textContent = "You have " + correct + " out of " + totalElements + " correct answers.";

}

}

