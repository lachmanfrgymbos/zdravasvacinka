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
   GET ID FROM URL
========================= */

const params =
  new URLSearchParams(window.location.search);

const recipeId =
  params.get('id');



/* =========================
   ELEMENT
========================= */

const recipeContainer =
  document.getElementById(
    'recipe-container'
  );



/* =========================
   QR MODAL
========================= */

const qrModal =
  document.getElementById(
    'qr-modal'
  );

const qrCode =
  document.getElementById(
    'qr-code'
  );

const qrTitle =
  document.getElementById(
    'qr-title'
  );

const closeQR =
  document.getElementById(
    'close-qr'
  );



window.openQR = function(title, id) {

  qrModal.classList.add('show');

  qrTitle.innerText = title;

  qrCode.innerHTML = '';



  const recipeUrl =
    `${window.location.origin}/recipe.html?id=${id}`;



  new QRCode(qrCode, {

    text: recipeUrl,

    width: 240,

    height: 240

  });

};



/* =========================
   CLOSE QR
========================= */

if (closeQR) {

  closeQR.addEventListener(
    'click',
    () => {

      qrModal.classList.remove(
        'show'
      );

    }
  );

}



if (qrModal) {

  qrModal.addEventListener(
    'click',
    (e) => {

      if (e.target === qrModal) {

        qrModal.classList.remove(
          'show'
        );

      }

    }
  );

}



/* =========================
   LOAD RECIPE
========================= */

async function loadRecipe() {

  if (!recipeId) {

    recipeContainer.innerHTML = `

      <div class="error-card">

        <h2>
          Recept nenalezen 😕
        </h2>

        <p>
          Chybí ID receptu.
        </p>

      </div>

    `;

    return;

  }



  const { data, error } =
    await supabaseClient
      .from('recipes')
      .select('*')
      .eq('id', recipeId)
      .single();



  if (error || !data) {

    console.error(error);

    recipeContainer.innerHTML = `

      <div class="error-card">

        <h2>
          Recept nenalezen 😕
        </h2>

        <p>
          Tento recept neexistuje
          nebo byl odstraněn.
        </p>

      </div>

    `;

    return;

  }



  renderRecipe(data);

}

loadRecipe();



/* =========================
   RENDER RECIPE
========================= */

function renderRecipe(recipe) {



  /* =========================
     CATEGORY EMOJI
  ========================= */

  let emoji = '🥑';

  if (recipe.category === 'Vegan') {
    emoji = '🌱';
  }

  if (recipe.category === 'Proteinové') {
    emoji = '💪';
  }

  if (recipe.category === 'Rychlé') {
    emoji = '⚡';
  }

  if (recipe.category === 'Sladké') {
    emoji = '🍓';
  }



  /* =========================
     INGREDIENTS
  ========================= */

  let ingredientsHTML = '';

  if (
    Array.isArray(recipe.ingredients)
  ) {

    recipe.ingredients.forEach(item => {

      ingredientsHTML += `
        <li>${item}</li>
      `;

    });

  }



  /* =========================
     STEPS
  ========================= */

  let stepsHTML = '';

  if (
    Array.isArray(recipe.steps)
  ) {

    recipe.steps.forEach(step => {

      stepsHTML += `
        <li>${step}</li>
      `;

    });

  }



  /* =========================
     RENDER
  ========================= */

  recipeContainer.innerHTML = `

    <section class="recipe-hero">

      <div class="recipe-top">

        <div class="recipe-emoji">
          ${emoji}
        </div>

        <div class="recipe-category">
          ${recipe.category || 'Recept'}
        </div>

      </div>



      <h1 class="recipe-title">
        ${recipe.title}
      </h1>



      <p class="recipe-description">
        ${recipe.description || ''}
      </p>



      <button
        class="mini-qr-btn"
        onclick="openQR('${recipe.title}', ${recipe.id})"
      >
        🔳
      </button>



      <div class="recipe-stats">

        <div class="stat-card">

          <span class="stat-label">
            Čas přípravy
          </span>

          <span class="stat-value">
            ${recipe.prep_time || 0} min
          </span>

        </div>



        <div class="stat-card">

          <span class="stat-label">
            Ingredience
          </span>

          <span class="stat-value">
            ${recipe.ingredients?.length || 0}
          </span>

        </div>



        <div class="stat-card">

          <span class="stat-label">
            Kalorie
          </span>

          <span class="stat-value">
            ${recipe.kcal || 0} kcal
          </span>

        </div>



        <div class="stat-card">

          <span class="stat-label">
            Proteiny
          </span>

          <span class="stat-value">
            ${recipe.proteins || 0} g
          </span>

        </div>

      </div>

    </section>



    <section class="recipe-content">



      <div class="content-card">

        <h2>
          Ingredience
        </h2>

        <ul class="ingredients-list">
          ${ingredientsHTML}
        </ul>

      </div>



      <div class="content-card">

        <h2>
          Postup
        </h2>

        <ol class="steps-list">
          ${stepsHTML}
        </ol>

      </div>



    </section>

  `;



  /* =========================
     PAGE TITLE
  ========================= */

  document.title =
    `${recipe.title} | Zdravá Svačinka`;

}

/* =========================
   QR MODAL
========================= */

const qrModal =
  document.getElementById(
    'qr-modal'
  );

const qrCode =
  document.getElementById(
    'qr-code'
  );

const qrTitle =
  document.getElementById(
    'qr-title'
  );

const closeQR =
  document.getElementById(
    'close-qr'
  );



window.openQR = function(title, id) {

  qrModal.classList.add(
    'show'
  );

  qrTitle.innerText = title;

  qrCode.innerHTML = '';



  const recipeUrl =
    `${window.location.origin}/recipe.html?id=${id}`;



  new QRCode(qrCode, {

    text: recipeUrl,

    width: 240,

    height: 240

  });

};



/* =========================
   CLOSE QR
========================= */

if (closeQR) {

  closeQR.addEventListener(
    'click',
    () => {

      qrModal.classList.remove(
        'show'
      );

    }
  );

}



if (qrModal) {

  qrModal.addEventListener(
    'click',
    (e) => {

      if (e.target === qrModal) {

        qrModal.classList.remove(
          'show'
        );

      }

    }
  );

}
