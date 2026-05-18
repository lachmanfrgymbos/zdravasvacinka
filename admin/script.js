const supabaseUrl = 'https://qtilqibkdouaztehzauj.supabase.co';

const supabaseKey = 'sb_publishable_Jpe7m1sYMWkT7FEsLn2Unw_IR3Joykt';

const supabaseClient = supabase.createClient(
  supabaseUrl,
  supabaseKey
);

const feedbackList = document.getElementById('feedback-list');

async function loadFeedback() {

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

const recipeForm = document.getElementById('recipe-form');

if (recipeForm) {

  recipeForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const title = document.getElementById('title').value;

    const description = document.getElementById('description').value;

    const ingredients = document.getElementById('ingredients').value;

    const steps = document.getElementById('steps').value;

    const category = document.getElementById('category').value;

    const { error } = await supabaseClient
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

    if (error) {
      console.error(error);

      alert('Nepovedlo se uložit recept');
      return;
    }

    alert('Recept uložen 😄');

    recipeForm.reset();

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
      <strong>${recipe.title}</strong>
      <br>
      <small>${recipe.category || 'Bez kategorie'}</small>
    `;

    recipesList.appendChild(div);

  });

}

loadRecipes();

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
      </div>

      <p>${item.message}</p>
    `;

    allFeedback.appendChild(div);

  });

}

loadAllFeedback();
