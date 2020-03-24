let recipeID=window.location.hash.substr(1);


const recipe=recipes.find(recipe=>{
	return recipe.id===recipeID
})


let recipeName=document.querySelector("#recipe-name");
let recipeBody=document.querySelector("#recipe-description");
let ingredientsContainer=document.querySelector("#ingredients-list");
let ingredientTitle=document.querySelector(".ingredientName");
let addIngredient=document.querySelector("#add-ingredient-button");
let ingredientForm=document.querySelector("#ingredient-form");
let updateRecipe=document.querySelector("#update-recipe");
let deleteRecipeBtn=document.querySelector("#delete-recipe-button");
recipeName.value=recipe.name;
recipeBody.value=recipe.body;

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

renderIngredients(recipe);

ingredientForm.addEventListener("submit" , (e) => {
	e.preventDefault();
	let ingredientID=uuidv4();
	recipe.ingredients.push({
	id:ingredientID,
	name:e.target.elements[0].value,
	completed:false

	});
	e.target.elements[0].value="";
	 localStorage.setItem("recipes", JSON.stringify(recipes));
	 renderIngredients(recipe);
})


updateRecipe.addEventListener("click" ,()=> {

	recipe.id=recipeID;
	recipe.name=document.querySelector("#recipe-name").value;
	recipe.body=document.querySelector("#recipe-description").value;
	 localStorage.setItem("recipes", JSON.stringify(recipes));
	window.location.assign(`index.html`);

})


const deleteRecipe= (id) =>{
		let findIndex=recipes.findIndex(recipe=>{
			recipe.id===id
		})

		recipes.splice(findIndex,1);
		 localStorage.setItem("recipes", JSON.stringify(recipes));
}


deleteRecipeBtn.addEventListener("click", ()=>{
	deleteRecipe(recipeID);
	window.location.assign(`index.html`);
})