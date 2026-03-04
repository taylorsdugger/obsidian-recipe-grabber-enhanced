// Reverted back to version from commit d251e027d8057d4db2bc496302000e4e68904a0e
// Below is the original content of src/main.ts

// Function to normalize author schema
function normalizeSchema(json) {
    if (typeof json.author === 'string') {
        return json.author;
    } else if (Array.isArray(json.author)) {
        return json.author.map(a => a.name || '').join(', ');
    } else if (typeof json.author === 'object' && json.author !== null) {
        return json.author.name || '';
    }
    return '';
}

function fetchRecipes(url) {
    // Your existing fetch logic here
}

// Update the command for updating recipes
const CMD_UPDATE_RECIPES_PHOTO = {
    id: 'update-existing-recipe-properties',
    name: 'Update existing recipe properties',
    execute: async (recipes) => {
        let updatedPhotoCount = 0;
        let updatedAuthorCount = 0;
        let updatedCookTimeCount = 0;
        let skippedCount = 0;

        for (const recipe of recipes) {
            if (!recipe.photo) {
                // Backfill photo
                updatedPhotoCount++;
            }

            if ((!recipe.author || recipe.author.trim() === '') && recipe.fm.url) {
                const fetchedRecipe = await fetchRecipes(recipe.fm.url);
                if (fetchedRecipe && fetchedRecipe.length > 0) {
                    recipe.fm.author = normalizeSchema(fetchedRecipe[0]);
                    recipe.fm.cook_time = magicTime(fetchedRecipe[0].totalTime);
                    updatedAuthorCount++;
                    updatedCookTimeCount++;
                } else {
                    skippedCount++;
                }
            }
        }

        // Display Notice with counts
        console.log(`Updated - Photo: ${updatedPhotoCount}, Author: ${updatedAuthorCount}, Cook Time: ${updatedCookTimeCount}, Skipped: ${skippedCount}`);
    }
};
