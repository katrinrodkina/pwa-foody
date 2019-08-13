document.addEventListener('DOMContentLoaded', function() {
    const menus = document.querySelectorAll('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});

    const forms = document.querySelectorAll('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
  });



const recipes = document.querySelector('.recipes')
const showRecipes =(data, id) => {
        const html = `
        <div class="card-panel recipe white row" data-id="${id}">
        <img src="https://4.bp.blogspot.com/-WfRU-DQF8kI/WlErMZ8ADUI/AAAAAAAAGxE/Kx4HED0p1v0jpb6L0MBteyJ958cOsy5JQCLcBGAs/s1600/Sesame%2BGinger%2BEdamame%2BSpaghetti.jpg" 
        alt="recipe thumb">
        <div class="recipe-details">
          <div class="recipe-title">${data.title}</div>
          <div class="recipe-ingredients">${data.ingredients}</div>
        </div>
        <div class="recipe-delete">
          <i class="material-icons"  data-id="${id}">delete_outline</i>
        </div>
        </div>
      `
      recipes.innerHTML += html
}

const removeRecipe = (id) => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`)
  recipe.remove()
}

const form = document.querySelector('form')
form.addEventListener('submit', evt => {
    evt.preventDefault();
    const recipe = {
      title: form.title.value,
      ingredients: form.ingredients.value
    }
   
    db.collection('recipes').add(recipe)
    .catch(err => console.log(err))

    form.title.value = '';
    form.ingredients.value = '';
})

const allRecipes = document.querySelector('.recipes')
allRecipes.addEventListener('click', evt => {
   //console.log(evt.target.tagName)
   if (evt.target.tagName === 'I') {
    // console.log(evt.target.getAttribute('data-id'))
     db.collection('recipes').doc(evt.target.getAttribute('data-id')).delete()
   }
})

