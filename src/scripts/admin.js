$(document).ready(function() {
    // Variables
       
    let categoryNumber = 3; // starting number for new categories as 2 form items exist already
    const INITIAL_CATEGORIES_COUNT = 2;

    // Event listeners
    $('#add-category').click(function(){addCategory();});
    $('#item-form').submit(submitForm);
    $('#file-input').change(loadGameSettings);

    function addCategory(categoryName = '', categoryItems = []) {
        console.log('add category clicked');
        console.log(`categoryNumber: ${categoryNumber}`);
        console.log(`categoryName: ${categoryName}`);
        
        const items = categoryItems ? categoryItems.join('\n') : '';
        console.log(`categoryItems: ${items}`);
        const catHtml = `
            <div class="accordion-item" id="category-${categoryNumber}">
                <h2 class="accordion-header" id="category-${categoryNumber}-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#category-${categoryNumber}-collapse" aria-expanded="false" aria-controls="category-${categoryNumber}-collapse">Category ${categoryNumber}</button>
                </h2>
                <div class="accordion-collapse collapse show" id="category-${categoryNumber}-collapse" aria-labelledby="category-${categoryNumber}-header" data-bs-parent="#categories">
                    <div class="accordion-body">
                        <div class="mb-3">
                            <input type="text" id="category-${categoryNumber}-name" class="mb-2 form-control category-name" name="category-${categoryNumber}-name" placeholder="Enter category name" value=${categoryName}>
                            <textarea name="category-${categoryNumber}-items" class="form-control input-items" id="category-${categoryNumber}-items" placeholder="Enter each new item on a new line">${items}</textarea>
                        </div>
                    </div>
                </div>
            </div>
        `
        $(`#category-${categoryNumber-1}`).after(catHtml);
        categoryNumber++;
    }

    /**
     * Submits the form and stores the game name and categories in local storage.
     * Redirects to the puzzle page.
     * @param {Event} event - The submit event.
     */
    function submitForm(event) {
        // Prevent the form from being submitted normally
        event.preventDefault();
        // Get the game name
        const gameName = $('#game-name').val();

        // Get the category names and items
        const categoryNames = $('.category-name').map(function() {
            return $(this).val();
        }).get();
        const categoryItems = $('.input-items').map(function() {
            return [$(this).val().split('\n').filter(line => line.trim() !== '')];
        }).get();

        // Combine the category names and items into an array of objects
        const categories = categoryNames.map((name, index) => {
            return {
                name: name,
                items: categoryItems[index]
            };
        }); 

        // Store the game name and categories in local storage
        localStorage.setItem('gameName', gameName);
        localStorage.setItem('categories', JSON.stringify(categories));
        // Redirect to the puzzle page
        window.location.href = 'puzzle.html';
    }


    function loadGameSettings(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
    
        reader.onload = function(e) {
            let gameSettings;
            try {
                gameSettings = JSON.parse(e.target.result);
            } catch (e) {
                console.error("Error parsing file:", e);
                // TODO: Inform the user that there was an error parsing the file
                return;
            }
    
            // Fill in the game name
            $('#game-name').val(gameSettings.gameName);
    
            // Fill in the categories
            for (let i = 0; i < gameSettings.categories.length; i++) {
                if (i < INITIAL_CATEGORIES_COUNT) {
                    $(`#category-${i+1}-name`).val(gameSettings.categories[i].name);
                    $(`#category-${i+1}-items`).val(gameSettings.categories[i].items.join('\n'));
                } else {
                    addCategory(gameSettings.categories[i].name, gameSettings.categories[i].items);
                }
            }
        };
    
        reader.onerror = function(e) {
            console.error("Error reading file:", e);
            // TODO: Inform the user that there was an error reading the file
        };
    
        reader.readAsText(file);
    }
});
