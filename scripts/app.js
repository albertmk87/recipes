let recipes=[];

// localStorage.clear();
const recipesJSON=localStorage.getItem("recipes")

if(recipesJSON!==null) {
	recipes=JSON.parse(recipesJSON);
}

let searchInput=document.querySelector("#search-bar");
let recipeContainer=document.querySelector("#recipes-div");
let addRecipeBtn=document.querySelector("#add-recipe-button");
let filters={
	searchText:""
}

const completedIngredient = (recipe) => {
		let count=0;
		let ingredientLength=recipe.ingredients.length;
		recipe.ingredients.forEach(ingredient => {
			if(ingredient.completed===true){
				count++;
				}

		})
		if(count===0){
			return "You have NONE of the ingredients";
		}else if(count>0 && count<ingredientLength){
			return "You have SOME of the ingredients";
		}else if(count===ingredientLength){
			return "You have ALL of the ingredients";
		}
}

const renderRecipes=(recipes,filters) => {
		recipeContainer.innerHTML="";
		const filteredRecipes=recipes.filter(recipe =>{
			return recipe.name.toLowerCase().includes(filters.searchText.toLowerCase());
		})

		filteredRecipes.forEach(recipe => {
			let paragraph=document.createElement("a");
			let countIngredients=document.createElement("h5");
			paragraph.setAttribute("href",`editrecipe.html#${recipe.id}`)
			paragraph.classList.add("list-item");
			paragraph.textContent=recipe.name;
			
			countIngredients.textContent=completedIngredient(recipe);
			 countIngredients.classList.add('list-item__title');
			recipeContainer.appendChild(paragraph);
			recipeContainer.appendChild(countIngredients);
		})


}

renderRecipes(recipes,filters);

searchInput.addEventListener("input", (e)=>{ 
	filters.searchText=e.target.value;
	renderRecipes(recipes,filters);

})


addRecipeBtn.addEventListener("click", () =>{
	const id=uuidv4();
	window.location.assign(`addrecipe.html#${id}`);
});

