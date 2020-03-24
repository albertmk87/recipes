let recipeID=window.location.hash.substr(1);

let addIngredient=document.querySelector("#add-ingredient-button");
console.log(recipeID);

const recipe = {
    id: '',
    name: '',
    body: '',
    ingredients: []
}


let addRecipe=document.querySelector("#add-recipe");
let ingredientName=document.querySelector("#ingredient-name");
let ingredientsContainer=document.querySelector("#ingredients-list");

addRecipe.addEventListener("click" ,()=> {

	recipe.id=recipeID;
	recipe.name=document.querySelector("#recipe-name").value;
	recipe.body=document.querySelector("#recipe-description").value;
	recipes.push(recipe);

	 localStorage.setItem("recipes", JSON.stringify(recipes));
	window.location.assign(`index.html`);

})


addIngredient.addEventListener("click" , (e) => {
	e.preventDefault();
	let ingredientID=uuidv4();
	recipe.ingredients.push({
			id:ingredientID,
			name:ingredientName.value,
			completed:false

	});
	ingredientName.value="";
	 localStorage.setItem("recipes", JSON.stringify(recipes));
	 renderIngredients(recipe);
})

const deleteIngredient=(id)=>{
	const findIndex=recipe.ingredients.findIndex(ingredient=>{
		return ingredient.id===id;
	})
	recipe.ingredients.splice(findIndex,1);

}

const renderIngredients = (recipe)=>{
	ingredientsContainer.innerHTML="";
		recipe.ingredients.forEach(ingredient => {
			let ingredientElement=document.createElement("p");
			let checkBox=document.createElement("input");
			checkBox.setAttribute('type','checkbox');
			checkBox.checked = ingredient.completed;
            checkBox.classList.add('checkbox');
            checkBox.addEventListener("change", function(e){
            ingredient.completed=e.target.checked;
           	localStorage.setItem("recipes", JSON.stringify(recipes));
            })

            ingredientElement.appendChild(checkBox);
            let ingredientName=document.createElement("span");
            ingredientName.textContent=ingredient.name;
             ingredientName.classList.add('text-element');
              ingredientElement.appendChild(ingredientName);
              let removeBtn=document.createElement("button");
              removeBtn.textContent="X";

              removeBtn.addEventListener("click", ()=>{
              	deleteIngredient(recipeID);
              	localStorage.setItem("recipes", JSON.stringify(recipes));
				renderIngredients(recipe);
              })

              removeBtn.classList.add("remove-element");
               ingredientElement.appendChild(removeBtn);
               ingredientsContainer.appendChild(ingredientElement);

		})

			localStorage.setItem("recipes", JSON.stringify(recipes));

}

