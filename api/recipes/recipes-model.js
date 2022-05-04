// model functions here
const { get } = require('express/lib/response')
const db = require('../../data/db-config')

/*
select d.id, d.name, e.id, e.first_name, e.last_name, e.salary
from employees as e
join departments as d
  on e.department_id = d.id
order by d.name, e.last_name

db('employees as e')
  .join('departments as d', 'e.department_id', 'd.id')
  .select('d.id', 'd.name', 'e.first_name', 'e.last_name', 'e.salary')
*/

function getRecipes() {
    /*
    select * from recipes as r
    join ingredients as ing
        on ing.recipe_id = r.recipe_id
    join instructions as inst
        on inst.recipe_id = r.recipe_id
    order by step_number
    */
    return db('recipes')
}

function getRecipeById(recipeId) {
    return db('recipes')
        .where('recipe_id', recipeId)
        .first()
}

function getIngredientsByRecipeId(recipe_id) {
    return db('ingredients')
        .where('recipe_id', recipe_id)
}

function getInstructionsByRecipeId(recipe_id) {
    return db('instructions')
        .where('recipe_id', recipe_id)
        .orderBy('step_number')
}

function addNewRecipe(newRecipe) {
    return db('recipes')
        .insert(newRecipe)
        .then(([recipe_id]) => getRecipeById(recipe_id))
}

function updateRecipe(recipe_id, changes) {
    return db('recipes')
        .where('recipe_id', recipe_id)
        .update(changes)
        .then(count => (count > 0 ? getRecipeById(recipe_id) : null))
}

function deleteRecipe(recipe_id) {
    return db('recipes')
        .where('recipe_id', recipe_id)
        .del()
}

function getIngredientById(recipe_id, ingredient_id) {

}

// function addIngredient(newIngredient) {
//     return null
// }

// function updateIngredient(ingredient_id) {
//     return null
// }

// function deleteIngredient(ingredient_id) {
//     return null
// }

function getInstructionById(recipe_id, step_id) {
    
}

// function addInstruction(instruction) {
//     return null
// }

// function updateInstruction(step_number) {
//     return null
// }

// function deleteInstruction(step_number) {
//     return null
// }

module.exports = {
    getRecipes,
    getRecipeById,
    getIngredientsByRecipeId,
    getInstructionsByRecipeId,
    addNewRecipe,
    updateRecipe,
    deleteRecipe,
    // getIngredientById
    // addIngredient,
    // updateIngredient,
    // deleteIngredient,
    // getInstructionById
    // addInstruction,
    // updateInstruction,
    // deleteInstruction
}