let recipes=[];



let recipesContainer=document.querySelector(".recipes");
let searchRecipes=document.querySelector("#searchRecipes");
let addBtn=document.querySelector("#addBtn");
let addRecipe=document.querySelector("#addRecipe");

let filters=
{
	searchText:""
}

// localStorage.clear();

const recipeJSON=localStorage.getItem("recipes")

if(recipeJSON!==null) {
	recipes=JSON.parse(recipeJSON);
}


const remoteRecipe = (id) => {
	const index=recipes.findIndex(recipe => {
		return recipe.id===id
	})

	if(index>-1) {
		recipes.splice(index, 1);
	}	
}




const renderRecipes = (recipes,filters) => {
	recipesContainer.innerHTML="";
	const filteredRecipes=recipes.filter(recipe => {
		return recipe.name.toLowerCase().includes(filters.searchText.toLowerCase());
	})
			filteredRecipes.forEach(recipe => {
			let para=document.createElement("a");
			let text=document.createElement("p");
			
		
	
			para.setAttribute("href", `/edit.html#${recipe.id}`);
			let btn=document.createElement("button");
			btn.classList.add("sameLine");
			btn.textContent="X";

			btn.addEventListener("click", () => {
				remoteRecipe(recipe.id);
				renderRecipes(recipes,filters);
				localStorage.setItem("recipes", JSON.stringify(recipes));
			})	

			para.textContent=recipe.name;
			
			recipesContainer.appendChild(para);
			recipesContainer.appendChild(btn);
		
		})

}

renderRecipes(recipes,filters);

searchRecipes.addEventListener("input", (e) => {
	filters.searchText=e.target.value;
	renderRecipes(recipes,filters);
})



addBtn.addEventListener("click" , (e) => {
	let id=uuidv4();
	e.preventDefault();
	recipes.push({
		id:id,
		name:addRecipe.value,
		body:"",
		ingredients:[]

	})
	localStorage.setItem("recipes", JSON.stringify(recipes));
 
	addRecipe.value="";
	location.assign(`/edit.html#${id}`);


})



// checkBoxes(recipes);

	