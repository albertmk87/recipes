let recipeID=location.hash.substring(1);

console.log(recipeID);


const recipe=recipes.find(recipe => {
	return recipe.id===recipeID
})


let recipeName=document.querySelector("#recipeName");
let recipeBody=document.querySelector("#recipeBody");

let addIngridient=document.querySelector("#addIngridient");
let addInput=document.querySelector("#addInput");
let ingredientsContainer=document.querySelector("#formm");
let paraInfo=document.querySelector("#info");
let containerRecipe=document.querySelector("#containerRecipe");

recipeName.value=recipe.name;
recipeBody.value=recipe.body;




const renderIngredients= (recipe) => {
	ingredientsContainer.innerHTML="";
	recipe.ingredients.forEach(el => {
		let label=document.createElement("p");
		let removeBtn=document.createElement("button");
		removeBtn.textContent="remove";

		removeBtn.addEventListener("click", ()=> {
			 removeBtn.parentNode.remove()
			
		    let index=recipe.ingredients.indexOf(this);
		    recipe.ingredients.splice(index,1);
		    localStorage.setItem("recipes", JSON.stringify(recipes));

		})

		label.textContent=el.ingredient;
		let checkbox=document.createElement("input");
		checkbox.type="checkbox";
		checkbox.setAttribute("id", "box");


		checkbox.checked=el.isAvailable;
		checkbox.addEventListener("change", () => {

		el.isAvailable=!el.isAvailable;
		checkBoxes(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));
        renderRecipes(recipes,filters);
      })
		label.appendChild(checkbox);
		label.appendChild(removeBtn);
		ingredientsContainer.appendChild(label);



	})


}

renderIngredients(recipe);

let checkboxes=document.querySelectorAll("#box");

recipeName.addEventListener("input", (e) => {
		recipe.name=e.target.value;
		localStorage.setItem("recipes", JSON.stringify(recipes));
})



recipeBody.addEventListener("input", (e) => {
		recipe.body=e.target.value;
		localStorage.setItem("recipes", JSON.stringify(recipes));
})






addIngridient.addEventListener("click", (e) => {

	recipe.ingredients.push(
			{
				ingredient:addInput.value,
				isAvailable:false
			}	
	);

	localStorage.setItem("recipes", JSON.stringify(recipes));
	addInput.value="";
	renderIngredients(recipe);
	checkBoxes(recipe);

	
})





const checkBoxes = (recipe) => {
		if(recipe.ingredients.length>0) {
			const checker=recipe.ingredients.every(el => {
			return el.isAvailable===true
	})
		
		if(checker){
				 paraInfo.textContent="You have all the ingredients";
		}else {
			 paraInfo.textContent="You are missing some of the ingredients";
		}
		
}else{
			 paraInfo.textContent="You dont have ingredients yet";
}		

		containerRecipe.appendChild(paraInfo);
		localStorage.setItem("recipes", JSON.stringify(recipes));
		renderRecipes(recipes,filters);
		}
	


checkBoxes(recipe);


