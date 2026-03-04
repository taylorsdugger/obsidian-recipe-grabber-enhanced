// Update src/main.ts

// Normalize the author
function normalizeSchema(recipe) {
    const normalizedAuthor = normalizeAuthor(recipe.author);
    // other normalization code...
}

function normalizeAuthor(author) {
    if (typeof author === 'string') {
        return author;
    } else if (Array.isArray(author)) {
        return author.join(', ');
    } else if (typeof author === 'object' && author !== null) {
        return author.name || 'Unknown';
    }
    return 'Unknown';
}

// Update the command to rename and backfill
const CMD_UPDATE_RECIPES_PHOTO = 'Update existing recipe properties';

// Function to backfill the missing fields
function backfillRecipeFields(recipe) {
    const url = recipe.frontmatter.url;
    // Fetch the recipe using the URL
    const fetchedRecipe = fetchRecipeByUrl(url);
    recipe.author = normalizeAuthor(fetchedRecipe.author);
    recipe.cook_time = formatCookTime(fetchedRecipe.cook_time);
    // other backfill code...
    return recipe;
}

function formatCookTime(cookTime) {
    // Convert totalTime PT into 'xh ym zs' string format...
}

// Final Notice counts
function generateNotice(counts) {
    return `Processed ${counts.processed} recipes, updated ${counts.updated} recipes.`;
}