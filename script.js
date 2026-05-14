    const supabaseUrl = 'https://qtilqibkdouaztehzauj.supabase.co';
    const supabaseKey = 'sb_publishable_Jpe7m1sYMWkT7FEsLn2Unw_IR3Joykt';

    const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

    const feedbackForm = document.querySelector('.card form');
    const feedbackTextarea = feedbackForm.querySelector('textarea');

    feedbackForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const message = feedbackTextarea.value;

      if (!message.trim()) return;

      const button = feedbackForm.querySelector('button');
      button.innerText = 'Odesílání...';
      button.disabled = true;

      const { error } = await supabaseClient
        .from('feedback')
        .insert([
          {
            message: message
          }
        ]);

      if (error) {
        alert('Něco se nepovedlo 😕');
        console.error(error);
        button.innerText = 'Odeslat návrh';
        button.disabled = false;
        return;
      }

      feedbackTextarea.value = '';
      button.innerText = 'Uloženo ✓';

      setTimeout(() => {
        button.innerText = 'Odeslat návrh';
        button.disabled = false;
      }, 2500);
    });
