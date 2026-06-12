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

const optionButtons =
  document.querySelectorAll(
    '.option-btn'
  );

const otherTrigger =
  document.getElementById(
    'other-trigger'
  );

const otherField =
  document.getElementById(
    'other-field'
  );

const allergyForm =
  document.getElementById(
    'allergy-form'
  );

const successModal =
  document.getElementById(
    'success-modal'
  );

const closeModal =
  document.getElementById(
    'close-modal'
  );



/* =========================
   STATE
========================= */

let selectedAllergies = [];



/* =========================
   SELECT OPTIONS
========================= */

optionButtons.forEach(button => {

  button.addEventListener(
    'click',
    () => {

      const value =
        button.dataset.value;



      button.classList.toggle(
        'active'
      );



      if (
        selectedAllergies.includes(
          value
        )
      ) {

        selectedAllergies =
          selectedAllergies.filter(
            item => item !== value
          );

      }

      else {

        selectedAllergies.push(
          value
        );

      }



      /* =========================
         OTHER FIELD
      ========================= */

      if (
        selectedAllergies.includes(
          'Jiné'
        )
      ) {

        otherField.classList.add(
          'show'
        );

      }

      else {

        otherField.classList.remove(
          'show'
        );

      }

    }
  );

});



/* =========================
   SUBMIT FORM
========================= */

allergyForm.addEventListener(
  'submit',
  async (e) => {

    e.preventDefault();



    const contact =
      document.getElementById(
        'contact'
      ).value.trim();



    const note =
      document.getElementById(
        'note'
      ).value.trim();



    const otherAllergy =
      document.getElementById(
        'other-allergy'
      ).value.trim();



    /* =========================
       VALIDATION
    ========================= */

    if (
      selectedAllergies.length === 0
    ) {

      alert(
        'Vyber prosím alespoň jednu možnost 💚'
      );

      return;

    }



    if (!contact) {

      alert(
        'Vyplň prosím kontakt ✨'
      );

      return;

    }



    /* =========================
       INSERT
    ========================= */

    const { error } =
      await supabaseClient
        .from('allergy_forms')
        .insert([

          {

            allergies:
              selectedAllergies,

            other_allergy:
              otherAllergy,

            contact:
              contact,

            note:
              note

          }

        ]);



    /* =========================
       ERROR
    ========================= */

    if (error) {

      console.error(error);

      alert(
        'Něco se nepovedlo 😕'
      );

      return;

    }



    /* =========================
       SUCCESS
    ========================= */

    successModal.classList.add(
      'show'
    );



    allergyForm.reset();



    selectedAllergies = [];



    optionButtons.forEach(button => {

      button.classList.remove(
        'active'
      );

    });



    otherField.classList.remove(
      'show'
    );

  }
);



/* =========================
   CLOSE MODAL
========================= */

closeModal.addEventListener(
  'click',
  () => {

    successModal.classList.remove(
      'show'
    );

  }
);



/* =========================
   CLOSE ON BACKDROP
========================= */

successModal.addEventListener(
  'click',
  (e) => {

    if (
      e.target === successModal
    ) {

      successModal.classList.remove(
        'show'
      );

    }

  }
);
