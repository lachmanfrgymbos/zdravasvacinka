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
