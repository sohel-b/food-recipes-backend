import express from "express";
import cors from "cors"
import { getAllRecipes, getRecipeByName, getRecipesByIngredients } from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/recipes", getAllRecipes);                                 // Get all recipes
app.get("/recipes/:name", getRecipeByName);                         // Get recipe by name 
app.post("/recipes/by-ingredients", getRecipesByIngredients);       // Get recipes by ingredients

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
