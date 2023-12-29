// Helper functions
function createInput(type, name, className, id, placeholder) {
    return Object.assign(document.createElement('input'), {type, name, className, id, placeholder });
}

function createDiv(className, attributes = {}) {
    const div = document.createElement('div');
    div.className = className;
    Object.assign(div, attributes);
    return div;
}

function createElement(type, attributes) {
    return Object.assign(document.createElement(type), attributes);
}

// Variables
const form = document.querySelector('#item-form');
const formAccordian = document.getElementById('categories');
let categoryNumber = 3; // starting number for new categories as 2 form items exist already

// Event listeners
document.getElementById('add-category').addEventListener('click', addCategory);
document.getElementById('item-form').addEventListener('submit', submitForm);
document.getElementById('file-input').addEventListener('change', loadGameSettings);

function addCategory() {
    console.log('add category clicked');

    const accordianItem = createElement('div', { 
        className: 'accordion-item', 
        id: `category-${categoryNumber}` 
    });

    const accordianHeader = createElement('h2', {
        className: 'accordion-header',
        id: `category-${categoryNumber}-header`,
        innerHTML: `<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#category-${categoryNumber}-collapse" aria-expanded="false" aria-controls="category-${categoryNumber}-collapse">Category ${categoryNumber}</button>`
    });

    const accordianCollapse = createElement('div', {
        className: 'accordion-collapse collapse',
        id: `category-${categoryNumber}-collapse`,
        'aria-labelledby': `category-${categoryNumber}-header`,
        'data-bs-parent': '#categories'
    });

    const accordianBody = createElement('div', { className: 'accordion-body' });
    const formElementDiv = createElement('div', { className: 'mb-3' });
    const newCategory = createInput('text', `category-${categoryNumber}-name`, 'mb-2 form-control category-name', `category-${categoryNumber}-name`, 'Enter category name');
    const newItems = createElement('textarea', {
        name: `category-${categoryNumber}-items`,
        className: 'form-control input-items',
        id: `category-${categoryNumber}-items`,
        placeholder: 'Enter each new item on a new line'
    });

    formElementDiv.append(newCategory, newItems);
    accordianBody.appendChild(formElementDiv);
    accordianCollapse.appendChild(accordianBody);
    accordianItem.append(accordianHeader, accordianCollapse);
    formAccordian.appendChild(accordianItem);

    categoryNumber++;
}

function submitForm(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();
    console.log('form submitted');

    // Get the game name
    const gameName = document.getElementById('game-name').value;

    // Get the category names and items
    const categoryNames = Array.from(document.getElementsByClassName('category-name')).map(input => input.value);
    const categoryItems = Array.from(document.getElementsByClassName('input-items')).map(input => input.value.split('\n').filter(line => line.trim() !== ''));

    // Combine the category names and items into a single array of objects
    const categories = categoryNames.map((name, index) => ({ name: name, items: categoryItems[index] }));

    // Store the game name and categories in local storage
    localStorage.setItem('gameName', gameName);
    localStorage.setItem('categories', JSON.stringify(categories));

    // Redirect to the puzzle page
    window.location.href = 'puzzle.html';
}

function addCategoryWithData(categoryName, categoryItems) {
    // similar to addCategory, but also sets the values of the new form elements

    const accordianItem = createElement('div', { 
        className: 'accordion-item', 
        id: `category-${categoryNumber}` 
    });

    const accordianHeader = createElement('h2', {
        className: 'accordion-header',
        id: `category-${categoryNumber}-header`,
        innerHTML: `<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#category-${categoryNumber}-collapse" aria-expanded="false" aria-controls="category-${categoryNumber}-collapse">Category ${categoryNumber}</button>`
    });

    const accordianCollapse = createElement('div', {
        className: 'accordion-collapse collapse',
        id: `category-${categoryNumber}-collapse`,
        'aria-labelledby': `category-${categoryNumber}-header`,
        'data-bs-parent': '#categories'
    });

    const accordianBody = createElement('div', { className: 'accordion-body' });
    const formElementDiv = createElement('div', { className: 'mb-3' });
    const newCategory = createInput('text', `category-${categoryNumber}-name`, 'mb-2 form-control category-name', `category-${categoryNumber}-name`, 'Enter category name');
    newCategory.value = categoryName; // set the value
    const newItems = createElement('textarea', {
        name: `category-${categoryNumber}-items`,
        className: 'form-control input-items',
        id: `category-${categoryNumber}-items`,
        placeholder: 'Enter each new item on a new line'
    });
    newItems.value = categoryItems.join('\n'); // set the value

    formElementDiv.append(newCategory, newItems);
    accordianBody.appendChild(formElementDiv);
    accordianCollapse.appendChild(accordianBody);
    accordianItem.append(accordianHeader, accordianCollapse);
    formAccordian.appendChild(accordianItem);

    categoryNumber++;
}

function loadGameSettings(e) {
    categoryNumber = 1; // reset the category number
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        let gameSettings;
        try {
            gameSettings = JSON.parse(e.target.result);
        } catch (e) {
            console.error("Error parsing file:", e);
            return;
        }

        form.innerHTML = ''; // Clear the form
        let formFragment = new DocumentFragment();
        const formElementDiv = createElement('div', { className: 'mb-3' });
        const gameName = createInput('text', 'game-name', 'mb-2 form-control', 'game-name', 'Enter game name');

        formElementDiv.appendChild(gameName);
        formFragment.appendChild(formElementDiv);
        form.appendChild(formFragment);

        // Set the game name
        document.getElementById('game-name').value = gameSettings.gameName;

        // Create accordion
        const accordion = createElement('div', { id: 'categories', className: 'accordion' });
        form.appendChild(accordion);


        // create accordion item, append to accordion
        // create accordion header with button innerHTML, append to accordion item
        // create accordion collapse, append to accordion item
        // create accordion body, append to accordion collapse
        // create form element div, append to accordion body
        // create category name input, append to form element div
        // create category items input, append to form element div


        // Add each category
        gameSettings.categories.forEach(function(category) {
            addCategoryWithData(category.name, category.items);
        });
    };
    reader.readAsText(file);
    reader.onerror = function(e) {
        console.error("Error reading file:", e);
    };
}