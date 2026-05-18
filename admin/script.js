const supabaseUrl = 'https://qtilqibkdouaztehzauj.supabase.co';

const supabaseKey = 'sb_publishable_Jpe7m1sYMWkT7FEsLn2Unw_IR3Joykt';

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

let editingRecipeId = null;



/* =========================
   DASHBOARD FEEDBACK
========================= */

const feedbackList = document.getElementById('feedback-list');

async function loadFeedback() {

  if (!feedbackList) return;

  const { data, error } = await supabaseClient
    .from('feedback')
    .select('*')
    .order('id', { ascending: false })
    .limit(5);

  if (error) {
    console.error(error);
    return;
  }

  feedbackList.innerHTML = '';

  data.forEach(item => {

    const div = document.createElement('div');

    div.classList.add('feedback-item');

    div.innerText = `„${item.message}”`;

    feedbackList.appendChild(div);

  });

}

loadFeedback();



/* =========================
   RECIPES
========================= */

const recipeForm = document.getElementById('recipe-form');

if (recipeForm) {

  recipeForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const title =
      document.getElementById('title').value;

    const description =
      document.getElementById('description').value;

    const ingredients =
      document.getElementById('ingredients').value;

    const steps =
      document.getElementById('steps').value;

    const category =
      document.getElementById('category').value;

    let error;

    if (editingRecipeId) {

      const response = await supabaseClient
        .from('recipes')
        .update({
          title,
          description,
          ingredients,
          steps,
          category
        })
        .eq('id', editingRecipeId);

      error = response.error;

    } else {

      const response = await supabaseClient
        .from('recipes')
        .insert([
          {
            title,
            description,
            ingredients,
            steps,
            category
          }
        ]);

      error = response.error;

    }

    if (error) {
      console.error(error);

      alert('Nepovedlo se uložit recept');
      return;
    }

    alert('Recept uložen 😄');

    recipeForm.reset();

    editingRecipeId = null;

    loadRecipes();

  });

}



const recipesList = document.getElementById('recipes-list');

async function loadRecipes() {

  if (!recipesList) return;

  const { data, error } = await supabaseClient
    .from('recipes')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  recipesList.innerHTML = '';

  data.forEach(recipe => {

    const div = document.createElement('div');

    div.classList.add('feedback-item');

    div.innerHTML = `

      <div class="recipe-top">

        <div>
          <strong>${recipe.title}</strong>
          <br>
          <small>${recipe.category || 'Bez kategorie'}</small>
        </div>

        <div class="recipe-actions">

          <button
            class="edit-btn"
            onclick="editRecipe(${recipe.id})"
          >
            Upravit
          </button>

          <button
            class="delete-btn"
            onclick="deleteRecipe(${recipe.id})"
          >
            Smazat
          </button>

        </div>

      </div>

    `;

    recipesList.appendChild(div);

  });

}

loadRecipes();



async function deleteRecipe(id) {

  const confirmed = confirm(
    'Opravdu chceš smazat recept?'
  );

  if (!confirmed) return;

  const { error } = await supabaseClient
    .from('recipes')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);

    alert('Nepovedlo se smazat recept');
    return;
  }

  loadRecipes();

}



async function editRecipe(id) {

  const { data, error } = await supabaseClient
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  document.getElementById('title').value =
    data.title || '';

  document.getElementById('description').value =
    data.description || '';

  document.getElementById('ingredients').value =
    data.ingredients || '';

  document.getElementById('steps').value =
    data.steps || '';

  document.getElementById('category').value =
    data.category || '';

  editingRecipeId = id;

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}



/* =========================
   FEEDBACK PAGE
========================= */

const allFeedback = document.getElementById('all-feedback');

async function loadAllFeedback() {

  if (!allFeedback) return;

  const { data, error } = await supabaseClient
    .from('feedback')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  allFeedback.innerHTML = '';

  data.forEach(item => {

    const div = document.createElement('div');

    div.classList.add('feedback-box');

    div.innerHTML = `
      <div class="feedback-top">

        <span>#${item.id}</span>

        <button
          class="delete-btn"
          onclick="deleteFeedback(${item.id})"
        >
          Smazat
        </button>

      </div>

      <p>${item.message}</p>
    `;

    allFeedback.appendChild(div);

  });

}

loadAllFeedback();



async function deleteFeedback(id) {

  const confirmed = confirm(
    'Opravdu chceš smazat feedback?'
  );

  if (!confirmed) return;

  const { error } = await supabaseClient
    .from('feedback')
    .delete()
    .eq('id', id);

  if (error) {
    console.error(error);

    alert('Nepovedlo se smazat feedback');
    return;
  }

  loadAllFeedback();
  loadFeedback();

}

const feedbackCount =
  document.getElementById('feedback-count');

const recipesCount =
  document.getElementById('recipes-count');

async function loadStats() {

  if (!feedbackCount || !recipesCount) return;

  const feedbackResponse = await supabaseClient
    .from('feedback')
    .select('*', { count: 'exact', head: true });

  const recipesResponse = await supabaseClient
    .from('recipes')
    .select('*', { count: 'exact', head: true });

  feedbackCount.innerText =
    feedbackResponse.count || 0;

  recipesCount.innerText =
    recipesResponse.count || 0;

}

loadStats();

async function loadVisits() {
  const { count, error } = await supabaseClient
    .from('visits')
    .select('*', { count: 'exact', head: true });

  if (!error) {
    document.querySelector('.card h2').innerText =
      count.toLocaleString('cs-CZ');
  }
}

loadVisits();
