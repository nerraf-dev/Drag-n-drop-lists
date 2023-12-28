// Helper functions
function createInput(type, name, className, id, placeholder, value) {
    return Object.assign(document.createElement(type), { name, className, id, placeholder, value });
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
const form = document.querySelector('#item-form form');
const formAccordian = document.getElementById('categories');
let categoryNumber = 3; // starting number for new categories as 2 form items exist already

const formSubmit = document.getElementById('form-submit');



document.addEventListener('DOMContentLoaded', function() {    

    // Add a new category to the form - button event listener
    document.getElementById('add-category').addEventListener('click', function() {
        console.log('add category clicked');

        let accordianFragment = document.createDocumentFragment();

        // create accordian item
        const accordianItem = createElement('div', { 
            className: 'accordion-item', 
            id: `category-${categoryNumber}` 
        });
        // create accordian-header
        const accordianHeader = createElement('h2', {
            className: 'accordion-header',
            id: `category-${categoryNumber}-header`
        });
        accordianHeader.innerHTML = `<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#category-${categoryNumber}-collapse" aria-expanded="false" aria-controls="category-${categoryNumber}-collapse">Category ${categoryNumber}</button>`;

        // // create accordian button
        // const accordianButton = createElement('button', {
        //     className: 'accordion-button collapsed',
        //     type: 'button',
        //     'data-bs-toggle': 'collapse',
        //     'data-bs-target': `#category-${categoryNumber}-collapse`,
        //     'aria-expanded': 'false',
        //     'aria-controls': `category-${categoryNumber}-collapse`
        // });

        // create collapse
        const accordianCollapse = createElement('div', {
            className: 'accordion-collapse collapse',
            id: `category-${categoryNumber}-collapse`,
            'aria-labelledby': `category-${categoryNumber}-header`,
            'data-bs-parent': '#categories'
        });

        // create accordian-body
        const accordianBody = createElement('div', {
            className: 'accordion-body'
        });
        

        const formElementDiv = createElement('div', { className: 'mb-3' });
        const newCategory = createElement('input', {
            type: 'text',
            name: `category-${categoryNumber}-name`,
            className: 'mb-2 input-form form-control category-name',
            id: `category-${categoryNumber}-name`,
            placeholder: 'Enter category name'
        });

        

        const itemsDiv = createElement('div', { className: 'mb-3' });
        const newItems = createElement('textarea', {
            name: `category-${categoryNumber}-items`,
            className: 'form-control input-form input-items',
            id: `category-${categoryNumber}-items`,
            placeholder: 'Enter each new item on a new line'
        });


        accordianItem.appendChild(accordianHeader);

        formElementDiv.appendChild(newCategory);
        formElementDiv.appendChild(newItems);
        accordianBody.appendChild(formElementDiv);
        accordianCollapse.appendChild(accordianBody);
        accordianItem.appendChild(accordianCollapse);
        
        accordianFragment.appendChild(accordianItem);

        formAccordian.appendChild(accordianFragment);
        // form.insertBefore(fragment, formSubmit);

        categoryNumber++;
    });

    // Submit the form - button event listener
    document.getElementById('item-form').addEventListener('submit', function(event) {
        // Prevent the form from being submitted normally
        event.preventDefault();
        console.log('form submitted');

        // Get the game name
        const gameName = document.getElementById('game-name').value;

        // Get the category names and items
        const categoryNames = Array.from(document.getElementsByClassName('category-name')).map(input => input.value);
        const categoryItems = Array.from(document.getElementsByClassName('input-items')).map(input => input.value.split('\n'));

        // Combine the category names and items into a single array of objects
        const categories = categoryNames.map((name, index) => ({ name: name, items: categoryItems[index] }));

        // Store the game name and categories in local storage
        localStorage.setItem('gameName', gameName);
        localStorage.setItem('categories', JSON.stringify(categories));

        // Redirect to the puzzle page
        window.location.href = 'puzzle.html';
    });

    // Load a game settings file - file input event listener
    document.getElementById('file-input').addEventListener('change', function(e) {
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
    
            const form = document.getElementById('item-form').getElementsByTagName('form')[0];
            form.innerHTML = ''; // Clear the form
    
            const gameNameDiv = createDiv('mb-3');
            gameNameDiv.appendChild(createInput('input', 'game-name', 'form-control', 'game-name', 'Name of the game', gameSettings.gameName));
            form.appendChild(gameNameDiv);
    
            gameSettings.categories.forEach(function(category, index) {
                const categoryDiv = createDiv('mb-3');
                categoryDiv.appendChild(createInput('input', 'category' + (index + 1), 'mb-2 form-control category-name', 'category' + (index + 1), 'Enter category name', category.name));
                categoryDiv.appendChild(createInput('textarea', '', 'form-control input-form input-items', 'category-' + (index + 1) + '-items', 'Enter items, one per line', category.items.join('\n')));
                form.appendChild(categoryDiv);
                form.appendChild(document.createElement('hr'));
            });
    
            const submitButtonDiv = createDiv('row justify-content-md-center');
            submitButtonDiv.id = 'form-submit';
            const submitButtonCol = createDiv('text-center col-6');
            const submitButton = createElement('button', { className: 'btn btn-success', id: 'create-game', type: 'submit' });
            submitButton.innerHTML = 'Create Game';
            // submitButton.type = 'submit';
            submitButtonCol.appendChild(submitButton);
            submitButtonDiv.appendChild(submitButtonCol);
            form.appendChild(submitButtonDiv);
            submitButton.innerHTML='Create Game';
        };
        reader.readAsText(file);
        reader.onerror = function(e) {
            console.error("Error reading file:", e);
        };
    });
});