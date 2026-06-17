const SUPABASE_URL = "https://qtilqibkdouaztehzauj.supabase.co";
const SUPABASE_KEY = "sb_publishable_Jpe7m1sYMWkT7FEsLn2Unw_IR3Joykt";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const ratingValues = {
  "😳": 1,
  "🙂": 2,
  "😍": 3,
  "🔥": 4
};

let allLiked = [];
let allImprove = [];

loadData();

async function loadData() {

  const { data, error } = await supabase
    .from("feedback_after")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  updateStats(data);
  updateRatings(data);
  updateBooths(data);
  updateComments(data);
}

function updateStats(data) {

  document.getElementById("total-feedbacks").textContent =
    data.length;

  let totalRating = 0;

  const emojiCounts = {};

  data.forEach(item => {

    totalRating += ratingValues[item.rating] || 0;

    emojiCounts[item.rating] =
      (emojiCounts[item.rating] || 0) + 1;
  });

  const average =
    data.length > 0
      ? (totalRating / data.length).toFixed(1)
      : 0;

const stars = Math.round(average);

document.getElementById(
  "average-rating"
).innerHTML =
  "★".repeat(stars) +
  "<br><small>" +
  average +
  "/4</small>";

  let topEmoji = "-";
  let maxCount = 0;

  Object.entries(emojiCounts).forEach(([emoji, count]) => {

    if (count > maxCount) {

      maxCount = count;
      topEmoji = emoji;
    }
  });

  document.getElementById(
    "top-emoji"
  ).textContent = topEmoji;
}

function updateRatings(data) {

  const counts = {
    "😳": 0,
    "🙂": 0,
    "😍": 0,
    "🔥": 0
  };

  data.forEach(item => {

    if (counts[item.rating] !== undefined) {
      counts[item.rating]++;
    }
  });

  const total = data.length || 1;

  setBar(
    counts["😳"],
    total,
    "count-shocked",
    "bar-shocked"
  );

  setBar(
    counts["🙂"],
    total,
    "count-happy",
    "bar-happy"
  );

  setBar(
    counts["😍"],
    total,
    "count-love",
    "bar-love"
  );

  setBar(
    counts["🔥"],
    total,
    "count-fire",
    "bar-fire"
  );
}

function setBar(
  count,
  total,
  countId,
  barId
) {

  document.getElementById(
    countId
  ).textContent = count;

  const percentage =
    (count / total) * 100;

  document.getElementById(
    barId
  ).style.width = percentage + "%";
}

function updateBooths(data) {

  const booths = {};

  data.forEach(item => {

    if (!item.favorite_booth) return;

    booths[item.favorite_booth] =
      (booths[item.favorite_booth] || 0) + 1;
  });

  const sorted =
    Object.entries(booths)
      .sort((a, b) => b[1] - a[1]);

  if (!sorted.length) return;

  document.getElementById(
    "winner-booth"
  ).textContent = sorted[0][0];

  if (sorted[0]) {
    document.getElementById(
      "first-place"
    ).textContent = sorted[0][0];

    document.getElementById(
      "first-votes"
    ).textContent =
      sorted[0][1] + " hlasů";
  }

  if (sorted[1]) {
    document.getElementById(
      "second-place"
    ).textContent = sorted[1][0];

    document.getElementById(
      "second-votes"
    ).textContent =
      sorted[1][1] + " hlasů";
  }

  if (sorted[2]) {
    document.getElementById(
      "third-place"
    ).textContent = sorted[2][0];

    document.getElementById(
      "third-votes"
    ).textContent =
      sorted[2][1] + " hlasů";
  }
}

function updateComments(data) {

  const likedContainer =
    document.getElementById(
      "liked-preview"
    );

  const improveContainer =
    document.getElementById(
      "improve-preview"
    );

  allLiked = data
    .filter(item => item.best_part)
    .map(item => item.best_part);

  allImprove = data
    .filter(item => item.improve)
    .map(item => item.improve);

  const lastLiked =
    allLiked.slice(0, 5);

  const lastImprove =
    allImprove.slice(0, 5);

  likedContainer.innerHTML =
    lastLiked
      .map(text =>
        `<div class="comment">${text}</div>`
      )
      .join("");

  improveContainer.innerHTML =
    lastImprove
      .map(text =>
        `<div class="comment">${text}</div>`
      )
      .join("");
}

/* MODAL */

const modal =
  document.getElementById("modal");

const modalTitle =
  document.getElementById("modal-title");

const modalList =
  document.getElementById("modal-list");

document
  .getElementById("open-liked")
  .addEventListener("click", () => {

    modalTitle.textContent =
      "Všechny pochvaly";

    modalList.innerHTML =
      allLiked
        .map(
          text =>
            `<div class="comment">${text}</div>`
        )
        .join("");

    modal.classList.add("show");
  });

document
  .getElementById("open-improve")
  .addEventListener("click", () => {

    modalTitle.textContent =
      "Všechna doporučení";

    modalList.innerHTML =
      allImprove
        .map(
          text =>
            `<div class="comment">${text}</div>`
        )
        .join("");

    modal.classList.add("show");
  });

document
  .getElementById("close-modal")
  .addEventListener("click", () => {

    modal.classList.remove("show");
  });

modal.addEventListener("click", e => {

  if (e.target === modal) {
    modal.classList.remove("show");
  }
});
