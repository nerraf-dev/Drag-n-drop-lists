const addCategoryBtn = document.getElementById('add-category');
addCategoryBtn.addEventListener('click', addCategory);

var categoryNumber = 3; // starting number for new categories as 2 form items exist already

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