import fs from 'fs'

const getRecipes = () => {
  const data = fs.readFileSync("./recipe.json", "utf8");
  return JSON.parse(data);
};

// Get all recipes
export const  getAllRecipes = (req, res) => {
  const recipes = getRecipes();
  res.json(recipes);
}

// Getting a recipe by name
export const getRecipeByName = (req, res) => {
  try {
    const { name } = req.params;
    const recipes = getRecipes();
    const found = recipes.find((r) => r.name.toLowerCase() === name.toLowerCase());
  
    if (found) {
      res.json(found);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

// Get recipes based on ingredients
export const getRecipesByIngredients = (req, res) => {
  try {

    const { ingredients } = req.body;
  
    // Check if ingredients is an array
    if (!ingredients || !Array.isArray(ingredients)) {
      return res.status(400).json({ error: "Ingredients must be an array" });
    }
  
    const allRecipes = getRecipes()
  
    const selectedSet = new Set(ingredients.map(i => i.toLowerCase()));
    const matchedRecipes = allRecipes.filter(recipe => {
      const recipeIngredients = recipe.ingredients.split(",").map(i => i.trim().toLowerCase());
  
      // All recipe ingredients must be in selectedSet
      return recipeIngredients.every(ing => selectedSet.has(ing));
    });
  
    res.json(matchedRecipes);
  } catch (error) {
    console.log("Error fetching recipes by ingredients:", error);
  }
};


// module.exports = { getAllRecipes, getRecipeByName, getRecipesByIngredients };
