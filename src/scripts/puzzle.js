import { shuffle } from './utils.js';
// Get the game name and categories from local storage
var gameName = localStorage.getItem('gameName');
var categories = JSON.parse(localStorage.getItem('categories'));

console.log(gameName);
console.log(categories);
// TODO: Use the game name and categories to create the game

// Set the game name
document.getElementById('game-name').textContent = gameName;

// Create list of all draggable items
var allItems = document.getElementById('all-items-container');
for (var i = 0; i < categories.length; i++){
    for (var j = 0; j < categories[i].items.length; j++){
        var item = document.createElement('div');
        item.className = 'item';
        var id = categories[i].name.replace(/\s+/g, '-') + '-container';
        item.setAttribute('data-category', id);
        item.textContent = categories[i].items[j];
        allItems.appendChild(item);
    }
}
shuffle('all-items-container');


// Create the category titles and drop zones
var dropZones = document.getElementById('dropzones');
var html = `
    <div class="col-sm">
        <h3>Hardware</h3>
        <div id="hardware"></div>
    </div>
`;
for (var i=0; i < categories.length; i++){
    var dz = document.createElement('div');
    var id = categories[i].name.replace(/\s+/g, '-');
    dz.className = 'col-sm';
    dz.innerHTML = `
        <h3>${categories[i].name}</h3>
        <div class="dz-area" id="${id}-container"></div>
    `;
    dropZones.appendChild(dz);
}


// Create the draggable items
// Initialize Dragula with the containers you want to make draggable
var containers = [document.getElementById('all-items-container')];
categories.forEach(function(category){
    var id = category.name.replace(/\s+/g, '-') + '-container';
    containers.push(document.getElementById(id));
});
var drake = dragula(containers);
var totalElements = document.getElementById('all-items-container').childElementCount;

// Check function
// Assuming your draggable items look something like this:
// <div class="item" data-category="hardware">Item 1</div>
var feedback = document.getElementById('feedback');

const checkAnswerBtn = document.getElementById('check-answers');
checkAnswerBtn.addEventListener('click', checkAnswers);

function checkAnswers() {
    var correct = 0;
    var incorrect = 0;
    for (var i = 0; i < categories.length; i++) {
        var id = categories[i].name.replace(/\s+/g, '-');
        var dropZone = document.getElementById(id + '-container');
        var items = dropZone.getElementsByClassName('item');
        for (var j = 0; j < items.length; j++) {
            var item = items[j];
            var category = item.getAttribute('data-category');
            console.log('ITEM: '+category);
            console.log('CATEGORY: '+category);
            console.log('DROPZONE: '+dropZone.id);
            if (dropZone.id === category) {
                correct++;
                console.log('Correct! ' + correct);
            } else {
                incorrect++;
                console.log('INCORRECT ' + incorrect);
            }
        }
    }

    if (correct === 0 && incorrect === 0) {
        console.log("You haven't answered any questions.");
        feedback.textContent = "You haven't answered any questions.";
    } else {
        console.log("You have " + correct + " correct answers.");
        feedback.textContent = "You have " + correct + " out of " + totalElements + " correct answers.";
    }
}

document.getElementById('download-button').addEventListener('click', function() {
    console.log('Download button clicked');
    // Create an object to hold the game data
    var gameData = {};

    // Get the game name and categories from local storage
    gameData.gameName = localStorage.getItem('gameName');
    gameData.categories = JSON.parse(localStorage.getItem('categories'));

    // Convert the object to a JSON string
    var jsonString = JSON.stringify(gameData, null, 2);

    // Create a new Blob object from the JSON string
    var blob = new Blob([jsonString], {type: "application/json"});

    // Create a URL for the Blob object
    var url = URL.createObjectURL(blob);

    // Create a link element
    var downloadLink = document.createElement('a');

    // Set the download attribute of the link element to the desired file name
    downloadLink.download = 'game-data.json';

    // Set the href attribute of the link element to the blob URL
    downloadLink.href = url;

    // Append the link element to the body
    document.body.appendChild(downloadLink);

    // Programmatically click the link to start the download
    downloadLink.click();

    // Remove the link element from the body
    document.body.removeChild(downloadLink);
});