const totalResponses = data.length;

document.getElementById("totalResponses").textContent =
  totalResponses;

const averageRating =
  data.reduce((sum,row)=>sum + row.rating,0)
  / data.length;

document.getElementById("averageRating").textContent =
  averageRating.toFixed(1);

const counts = {};

data.forEach(row => {
  counts[row.favorite_booth] =
    (counts[row.favorite_booth] || 0) + 1;
});

const winner =
  Object.keys(counts).reduce((a,b)=>
    counts[a] > counts[b] ? a : b
  );

document.getElementById("topBooth").textContent =
  winner;

const latest =
  data.sort(
    (a,b)=>
      new Date(b.created_at)
      - new Date(a.created_at)
  )[0];

document.getElementById("lastResponse").textContent =
  new Date(latest.created_at)
    .toLocaleDateString("cs-CZ");
