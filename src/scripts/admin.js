// Helper functions

function createInput(type, name, className, id, placeholder, value) {
    const input = document.createElement(type);
    input.name = name;
    input.className = className;
    input.id = id;
    input.placeholder = placeholder;
    input.value = value;
    return input;
}

function createDiv(className, attributes = {}) {
    const div = document.createElement('div');
    div.className = className;

    // Set attributes
    for (let key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            div.setAttribute(key, attributes[key]);
        }
    }

    return div;
}

function createElement(type, attributes) {
    const element = document.createElement(type);
    for (let key in attributes) {
        element[key] = attributes[key];
    }
    return element;
}

document.addEventListener('DOMContentLoaded', function() {
    let categoryNumber = 3; // starting number for new categories as 2 form items exist already

    // Add a new category to the form - button event listener
    document.getElementById('add-category').addEventListener('click', function() {
        console.log('add category clicked');
        const form = document.getElementById('item-form').getElementsByTagName('form')[0];
        const formSubmit = document.getElementById('form-submit');

        const hr = createElement('hr');
        const formElementDiv = createElement('div', { className: 'mb-3' });
        const newCategory = createElement('input', {
            type: 'text',
            name: 'category' + categoryNumber,
            className: 'form-control category-name',
            id: 'category' + categoryNumber,
            placeholder: 'Enter category name'
        });

        formElementDiv.appendChild(newCategory);

        const itemsDiv = createElement('div', { className: 'mb-3' });
        const newItems = createElement('textarea', {
            name: 'category-' + categoryNumber + '-items',
            className: 'form-control input-form input-items',
            id: 'category-' + categoryNumber + '-items',
            placeholder: 'Enter each new item on a new line'
        });

        formElementDiv.appendChild(newItems);
        form.insertBefore(hr, formSubmit);
        form.insertBefore(formElementDiv, formSubmit);

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