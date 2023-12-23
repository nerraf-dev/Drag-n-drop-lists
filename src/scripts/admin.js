document.addEventListener('DOMContentLoaded', function() {
    
    let categoryNumber = 3; // starting number for new categories as 2 form items exist already

    document.getElementById('add-category').addEventListener('click', function() {
        console.log('add category clicked');
        const form = document.getElementById('item-form').getElementsByTagName('form')[0];
        const formSubmit = document.getElementById('form-submit');
    
        // Helper function to create an element with given attributes
        function createElement(type, attributes) {
            const element = document.createElement(type);
            for (let key in attributes) {
                element[key] = attributes[key];
            }
            return element;
        }
    
        const hr = createElement('hr');
        const formElementDiv = createElement('div', {
            className: 'mb-3'
        });
        const newCategory = createElement('input', {
            type: 'text',
            name: 'category' + categoryNumber,
            className: 'form-control category-name',
            id: 'category' + categoryNumber,
            placeholder: 'Enter category name'
        });
        
        formElementDiv.appendChild(newCategory);

        const itemsDiv = createElement('div', {
            className: 'mb-3'
        });

        const newItems = createElement('textarea', {
            name: 'category-' + categoryNumber + '-items',
            className: 'form-control input-form input-items',
            id: 'category-' + categoryNumber + '-items',
            placeholder: 'Enter each new item on a new line'
        });
    
        
        form.insertBefore(hr, formSubmit);
        form.insertBefore(formElementDiv, formSubmit);
        formElementDiv.appendChild(newItems);
        
        form.insertBefore(formElementDiv, formSubmit);
    
        categoryNumber++;
    });

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


    // Load quiz settings from a file
    document.getElementById('file-input').addEventListener('change', function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            let gameSettings;
            try {
                gameSettings = JSON.parse(contents);
                console.log(gameSettings);
            } catch (e) {
                console.error("Error parsing file:", e);
            }
            // Now you can use gameSettings to populate your form or initialize your quiz
            console.log(contents);
            
            // Clear existing form fields
        const categoryInputs = document.getElementsByClassName('category-name');
        const itemInputs = document.getElementsByClassName('input-items');

        // Get a reference to the form
        const form = document.getElementById('item-form').getElementsByTagName('form')[0];

        // Clear the form
        while (form.firstChild) {
            form.removeChild(form.firstChild);
        }

        // Add the game name input field
        const gameNameInput = document.createElement('input');
        gameNameInput.type = 'text';
        gameNameInput.name = 'game-name';
        gameNameInput.className = 'input-form';
        gameNameInput.id = 'game-name';
        gameNameInput.placeholder = 'Name of the game';
        gameNameInput.value = gameSettings.gameName;
        form.appendChild(gameNameInput);


        while (categoryInputs.length > 0) {
            categoryInputs[0].parentNode.removeChild(categoryInputs[0]);
            itemInputs[0].parentNode.removeChild(itemInputs[0]);
        }

            // Loop through categories
            gameSettings.categories.forEach(function(category, index) {
                // Create new input fields
                const categoryNameInput = document.createElement('input');
                categoryNameInput.type = 'text';
                categoryNameInput.name = 'category' + (index + 1);
                categoryNameInput.className = 'input-form category-name';
                categoryNameInput.id = 'category' + (index + 1);
                categoryNameInput.placeholder = 'Enter category name';
                categoryNameInput.value = category.name;

                const itemInput = document.createElement('textarea');
                itemInput.className = 'input-form input-items';
                itemInput.id = 'item-input' + (index + 1);
                itemInput.placeholder = 'Enter items, one per line';
                itemInput.value = category.items.join('\n');

                // Append input fields to form
                
                form.appendChild(categoryNameInput);
                form.appendChild(document.createElement('br'));
                form.appendChild(itemInput);
                form.appendChild(document.createElement('br'));
                form.appendChild(document.createElement('hr'));
        });

        // Add the submit button
        const submitButton = document.createElement('button');
        submitButton.className = 'btn btn-success';
        submitButton.id = 'form-submit';
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);

            };
            reader.readAsText(file);
            reader.onerror = function(e) {
                console.error("Error reading file:", e);
                reader.onerror = function(e) {
                    console.error("Error reading file:", e);
                };
            };
    });
});