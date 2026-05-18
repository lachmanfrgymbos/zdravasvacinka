const supabaseUrl =
  'https://qtilqibkdouaztehzauj.supabase.co';

const supabaseKey =
  'sb_publishable_Jpe7m1sYMWkT7FEsLn2Unw_IR3Joykt';

const supabaseClient =
  supabase.createClient(
    supabaseUrl,
    supabaseKey
  );



/* =========================
   ELEMENTS
========================= */

const recipesGrid =
  document.getElementById('recipes-grid');

const searchInput =
  document.getElementById('search-input');

const filtersContainer =
  document.getElementById('filters');



/* =========================
   STATE
========================= */

let allRecipes = [];

let currentCategory = 'Vše';



/* =========================
   LOAD RECIPES
========================= */

async function loadRecipes() {

  const { data, error } =
    await supabaseClient
      .from('recipes')
      .select('*')
      .order('created_at', {
        ascending: false
      });

  if (error) {
    console.error(error);
    return;
  }

  allRecipes = data || [];

  renderFilters();

  renderRecipes(allRecipes);

}

loadRecipes();



/* =========================
   RENDER FILTERS
========================= */

function renderFilters() {

  const categories = [

    'Vše',

    ...new Set(

      allRecipes
        .flatMap(
          recipe => recipe.category || []
        )
        .filter(Boolean)

    )

  ];



  filtersContainer.innerHTML = '';



  categories.forEach(category => {

    const button =
      document.createElement('button');

    button.classList.add('filter-btn');



    if (category === currentCategory) {

      button.classList.add('active');

    }



    button.innerText = category;



    button.addEventListener(
      'click',
      () => {

        currentCategory = category;

        renderFilters();

        filterRecipes();

      }
    );



    filtersContainer.appendChild(button);

  });

}



/* =========================
   RENDER RECIPES
========================= */

function renderRecipes(recipes) {

  recipesGrid.innerHTML = '';



  if (recipes.length === 0) {

    recipesGrid.innerHTML = `

      <div class="empty-state">

        <h2>
          Žádné recepty 😕
        </h2>

        <p>
          Zkus jiné vyhledávání nebo kategorii.
        </p>

      </div>

    `;

    return;

  }



  recipes.forEach(recipe => {

    const card =
      document.createElement('div');

    card.classList.add('recipe-card');



    card.addEventListener('click', () => {

      window.location.href =
        `recipe.html?id=${recipe.id}`;

    });



    /* =========================
       INGREDIENTS COUNT
    ========================= */

    const ingredientsCount =
      Array.isArray(recipe.ingredients)
        ? recipe.ingredients.length
        : 0;



    /* =========================
       CATEGORY EMOJI
    ========================= */

    let emoji = '🥑';



    if (
      recipe.category?.includes('Vegan')
    ) {
      emoji = '🌱';
    }

    if (
      recipe.category?.includes('Proteinové')
    ) {
      emoji = '💪';
    }

    if (
      recipe.category?.includes('Rychlé')
    ) {
      emoji = '⚡';
    }

    if (
      recipe.category?.includes('Sladké')
    ) {
      emoji = '🍓';
    }



    card.innerHTML = `

      <div class="recipe-top">

        <div class="recipe-emoji">
          ${emoji}
        </div>

        <div class="recipe-category">
          ${
            recipe.category?.join(' • ')
            || 'Recept'
          }
        </div>

      </div>



      <h2 class="recipe-title">
        ${recipe.title}
      </h2>



      <p class="recipe-description">
        ${recipe.description || ''}
      </p>



      <div class="recipe-stats">

        <div class="stat-box">

          <span class="stat-label">
            Čas
          </span>

          <span class="stat-value">
            ${recipe.prep_time || 0} min
          </span>

        </div>



        <div class="stat-box">

          <span class="stat-label">
            Ingredience
          </span>

          <span class="stat-value">
            ${ingredientsCount}
          </span>

        </div>

      </div>



      <div class="recipe-nutrition">

        <div class="nutrition-pill">
          ${recipe.kcal || 0} kcal
        </div>

        <div class="nutrition-pill">
          ${recipe.proteins || 0}g proteinů
        </div>

        <div class="nutrition-pill">
          ${recipe.carbs || 0}g sacharidů
        </div>

        <div class="nutrition-pill">
          ${recipe.fats || 0}g tuků
        </div>

      </div>

    `;



    recipesGrid.appendChild(card);

  });

}



/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
  'input',
  filterRecipes
);



/* =========================
   FILTER RECIPES
========================= */

function filterRecipes() {

  const searchValue =
    searchInput.value
      .toLowerCase()
      .trim();



  let filteredRecipes =
    [...allRecipes];



  /* =========================
     CATEGORY FILTER
  ========================= */

  if (currentCategory !== 'Vše') {

    filteredRecipes =
      filteredRecipes.filter(recipe =>

        Array.isArray(recipe.category)
        &&
        recipe.category.includes(
          currentCategory
        )

      );

  }



  /* =========================
     SEARCH FILTER
  ========================= */

  if (searchValue !== '') {

    filteredRecipes =
      filteredRecipes.filter(recipe => {

        const title =
          recipe.title
            ?.toLowerCase() || '';



        const description =
          recipe.description
            ?.toLowerCase() || '';



        const ingredients =
          Array.isArray(recipe.ingredients)
            ? recipe.ingredients
                .join(' ')
                .toLowerCase()
            : '';



        const categories =
          Array.isArray(recipe.category)
            ? recipe.category
                .join(' ')
                .toLowerCase()
            : '';



        return (

          title.includes(searchValue)

          ||

          description.includes(searchValue)

          ||

          ingredients.includes(searchValue)

          ||

          categories.includes(searchValue)

        );

      });

  }



  renderRecipes(filteredRecipes);

}
