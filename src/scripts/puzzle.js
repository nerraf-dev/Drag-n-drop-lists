// import { shuffle } from './utils.js';

$(document).ready(function() {
    const gameName = getGameName();
    const categories = getCategories();

    setGameName(gameName);
    createItems(categories);
    createDropZones(categories);
    initializeDragula(categories);
    setupCheckAnswersButton(categories);
    setupDownloadButton();
});

function getGameName() {
    return localStorage.getItem('gameName');
}

function getCategories() {
    let categories;
    try {
        categories = JSON.parse(localStorage.getItem('categories'));
    } catch (error) {
        console.error("Error parsing categories from local storage:", error);
        categories = [];
    }
    return categories;
}

function setGameName(gameName) {
    $('#game-name').text(gameName);
}

function createItems(categories) {
    const allItems = $('#all-items-container');
    categories.forEach(category => {
        category.items.forEach(itemName => {
            const item = $('<div>').addClass('item').attr('data-category', formatId(category.name)).text(itemName);
            allItems.append(item);
        });
    });
    shuffle('all-items-container');
}

function createDropZones(categories) {
    const dropZones = $('#dropzones');
    categories.forEach(category => {
        const dz = $('<div>').addClass('col-sm').html(`
            <h3>${category.name}</h3>
            <div class="dz-area" id="${formatId(category.name)}"></div>
        `);
        dropZones.append(dz);
    });
}

function initializeDragula(categories) {
    const containers = [$('#all-items-container')[0]];
    categories.forEach(category => {
        containers.push(document.getElementById(formatId(category.name)));
    });
    dragula(containers);
}

function setupCheckAnswersButton(categories) {
    $('#check-answers').on('click', () => checkAnswers(categories));
}

function setupDownloadButton() {
    $('#download-button').on('click', downloadGameData);
}

function formatId(name) {
    return name.replace(/\s+/g, '-');
}

function checkAnswers(categories) {
    let correct = 0;
    let incorrect = 0;
    console.log(`categories: ${categories}`);
    for (let i = 0; i < categories.length; i++) {
        let id = formatId(categories[i].name);
        let dropZone = $(`#${id}`);
        let items = dropZone.find('.item');
        for (let j = 0; j < items.length; j++) {
            let item = $(items[j]);
            let category = item.attr('data-category');
            console.log('ITEM: '+category);
            console.log('CATEGORY: '+category);
            console.log('DROPZONE: '+dropZone.attr('id'));
            if (dropZone.attr('id') === category) {
                correct++;
                console.log('Correct! ' + correct);
            } else {
                incorrect++;
                console.log('INCORRECT ' + incorrect);
            }
        }
    }

    updateFeedback(correct, incorrect);
}

function updateFeedback(correct, incorrect) {
    let totalElements = $('.item').length;
    let feedback = $('#feedback');

    if (correct === 0 && incorrect === 0) {
        console.log("You haven't answered any questions.");
        feedback.text("You haven't answered any questions.");
    } else {
        console.log("You have " + correct + " correct answers.");
        feedback.text("You have " + correct + " out of " + totalElements + " correct answers.");
    }
}

function shuffle(containerId) {
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
