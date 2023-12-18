var categoryNumber = 3; // starting number for new categories as 2 form items exist already

const addCategoryBtn = document.getElementById('add-category');
addCategoryBtn.addEventListener('click', addCategory);

function addCategory() {
    // add another category
    var formSubmit = document.getElementById('form-submit');
    var itemForm = document.getElementById('item-form');
    var hr = document.createElement('hr');
    var newCategory = document.createElement('input');
    newCategory.type = 'text';
    newCategory.name = 'category'+categoryNumber;
    newCategory.className = 'input-form category-name';
    newCategory.id = 'category'+categoryNumber;
    newCategory.placeholder = 'Category name';

    var newItems = document.createElement('textarea');
    newItems.name = 'category'+categoryNumber+'-items';
    newItems.className = 'input-form input-items';
    newItems.id = 'category'+categoryNumber+'-items';
    newItems.placeholder = 'Enter each new item on a new line';

    itemForm.insertBefore(hr, formSubmit);
    itemForm.insertBefore(newCategory, formSubmit);
    itemForm.insertBefore(newItems, formSubmit);

    categoryNumber++;
}

document.getElementById('item-form').addEventListener('submit', function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();
    console.log('form submitted');

    // Get the game name
    var gameName = document.getElementById('game-name').value;

    // Get the category names and items
    var categoryNames = Array.from(document.getElementsByClassName('category-name')).map(input => input.value);
    var categoryItems = Array.from(document.getElementsByClassName('input-items')).map(input => input.value.split('\n'));

    // Combine the category names and items into a single array of objects
    var categories = categoryNames.map((name, index) => ({ name: name, items: categoryItems[index] }));

    // Store the game name and categories in local storage
    localStorage.setItem('gameName', gameName);
    localStorage.setItem('categories', JSON.stringify(categories));

    // Redirect to the puzzle page
    window.location.href = 'puzzle.html';
});


// Load quiz settings from a file
document.getElementById('file-input').addEventListener('change', function(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var contents = e.target.result;
        try {
            var gameSettings = JSON.parse(contents);
            console.log(gameSettings);
        } catch (e) {
            console.error("Error parsing file:", e);
        }
        // Now you can use gameSettings to populate your form or initialize your quiz
        console.log(contents);
        
        // Clear existing form fields
    var categoryInputs = document.getElementsByClassName('category-name');
    var itemInputs = document.getElementsByClassName('input-items');
    var formContainer = document.getElementById('item-form');

    // Get a reference to the form
    var form = document.getElementById('item-form').getElementsByTagName('form')[0];

    // Clear the form
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }

    // Add the game name input field
    var gameNameInput = document.createElement('input');
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
            var categoryNameInput = document.createElement('input');
            categoryNameInput.type = 'text';
            categoryNameInput.name = 'category' + (index + 1);
            categoryNameInput.className = 'input-form category-name';
            categoryNameInput.id = 'category' + (index + 1);
            categoryNameInput.placeholder = 'Enter category name';
            categoryNameInput.value = category.name;

            var itemInput = document.createElement('textarea');
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
    var submitButton = document.createElement('button');
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