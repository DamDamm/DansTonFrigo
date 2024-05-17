// Fonction asynchrone pour récupérer les catégories depuis l'API et les afficher dans une liste
async function fetchCategories() {
  try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      const data = await response.json();
      const categories = data.categories;
      const categoriesList = document.getElementById('categories');

      // Parcourir chaque catégorie et créer un élément li pour l'ajouter à la liste
      categories.forEach(category => {
          const li = document.createElement('li');
          li.textContent = category.strCategory;
          li.addEventListener('click', () => {
              fetchMealsByCategory(category.strCategory); // Appel de la fonction pour récupérer les plats par catégorie
          });
          categoriesList.appendChild(li);
      });
  } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des catégories : ', error);
  }
}

// Fonction asynchrone pour récupérer les plats par catégorie
const fetchMealsByCategory = async (category) => {
  try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      const meals = data.meals;
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = ''; // Efface les anciens résultats

      // Parcourir chaque plat et créer un élément div pour l'ajouter à la liste des résultats
      meals.forEach(meal => {
          const mealContainer = document.createElement('div');
          mealContainer.classList.add('searchContainer');
          mealContainer.innerHTML = `
              <h2>${meal.strMeal}</h2>
              <div class="infos">
                  <div>Origine : ${meal.strArea}</div>
                  <div>Catégorie : ${meal.strCategory}</div>
              </div>
              <img src='${meal.strMealThumb}' /></br>
              <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
          `;
          resultsDiv.appendChild(mealContainer);
      });
  } catch (error) {
      console.error('Une erreur s\'est produite lors de la récupération des plats : ', error);
  }
}

// Fonction asynchrone pour effectuer une recherche de plat
let search = "";
const fetchSearch = async () => {
  meals = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
  )
  .then((res) => res.json())
  .then((res) => res.meals);
  console.log(meals);
};

const searchDisplay = async () => {
  await fetchSearch();

  if (meals == null) {
      document.getElementById('results').innerHTML = '<span class="noResult"> Aucun résultat </span>';
  }

  document.getElementById('results').innerHTML = meals.map(
      (meal) =>
          `
          <div class="searchContainer">
              <h2>${meal.strMeal}</h2>
              <div class="infos">
                  <div>Origine : ${meal.strArea}</div>
                  <div>Catégorie : ${meal.strCategory}</div>
              </div>
              <img src='${meal.strMealThumb}' /></br>
              <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
          </div>
          `
  )
  .join("");
};

document.getElementById("searchInput").addEventListener("input", (e) => {
  search = e.target.value;
  searchDisplay();
});

// Fonction asynchrone pour récupérer un plat aléatoire
const fetchRandom = async () => {
  try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();
      document.getElementById('randomResult').innerHTML = JSON.stringify(data.value);

  } catch (error) {
      console.error(error);
  }
}

fetchRandom();

document.getElementById('randomMeal').addEventListener('click', fetchRandom);

// Appeler la fonction pour afficher les catégories au chargement de la page
fetchCategories();
