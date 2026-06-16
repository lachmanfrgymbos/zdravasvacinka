document.addEventListener("DOMContentLoaded", () => {

  console.log("JS loaded");

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

});

const supabaseUrl =
  'https://qtilqibkdouaztehzauj.supabase.co';

const supabaseKey =
  'https://qtilqibkdouaztehzauj.supabase.co';

const supabaseClient =
  supabase.createClient(
    supabaseUrl,
    supabaseKey
  );


/* =========================
   ELEMENTS
========================= */

const form =
  document.getElementById(
    'feedback-form'
  );

const successCard =
  document.getElementById(
    'success-card'
  );

const feedbackCard =
  document.querySelector(
    '.feedback-card'
  );

const ratingButtons =
  document.querySelectorAll(
    '.rating-btn'
  );



/* =========================
   RATING
========================= */

let selectedRating = null;



ratingButtons.forEach(button => {

  button.addEventListener(
    'click',
    () => {

      ratingButtons.forEach(btn => {

        btn.classList.remove(
          'active'
        );

      });



      button.classList.add(
        'active'
      );



      selectedRating =
        Number(
          button.dataset.value
        );

    }
  );

});



/* =========================
   SUBMIT
========================= */

form.addEventListener(
  'submit',
  async (e) => {

    e.preventDefault();



    const favoriteBooth =
      document.getElementById(
        'favorite-booth'
      ).value;



    const bestPart =
      document.getElementById(
        'best-part'
      ).value;



    const improve =
      document.getElementById(
        'improve'
      ).value;



    /* =========================
       VALIDATION
    ========================= */

    if (!selectedRating) {

      alert(
        'Vyber prosím hodnocení ✨'
      );

      return;

    }



    /* =========================
       INSERT
    ========================= */

    const { error } =
      await supabaseClient
        .from('feedback_after')
        .insert([
          {
            rating:
              selectedRating,

            favorite_booth:
              favoriteBooth,

            best_part:
              bestPart,

            improve:
              improve
          }
        ]);



    /* =========================
       ERROR
    ========================= */

    if (error) {

      console.error(error);

      alert(
        'Nepodařilo se odeslat feedback 😕'
      );

      return;

    }



    /* =========================
       SUCCESS
    ========================= */

    feedbackCard.classList.add(
      'hidden'
    );

    successCard.classList.remove(
      'hidden'
    );



    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }
);
