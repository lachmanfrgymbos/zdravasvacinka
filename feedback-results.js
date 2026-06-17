const SUPABASE_URL = "https://qtilqibkdouaztehzauj.supabase.co";
const SUPABASE_KEY = "sb_publishable_Jpe7m1sYMWkT7FEsLn2Unw_IR3Joykt";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


const ratingEmoji = {
  1: "😳",
  2: "🙂",
  3: "😍",
  4: "🔥"
};


let allLiked = [];
let allImprove = [];


loadData();



async function loadData() {

  const { data, error } = await supabaseClient
    .from("feedback_after")
    .select("*")
    .order("created_at", { ascending:false });


  if(error){
    console.error("SUPABASE ERROR:", error);
    return;
  }


  if(!data){
    return;
  }


  updateStats(data);
  updateRatings(data);
  updateBooths(data);
  updateComments(data);

}





function updateStats(data){


  document.getElementById("total-feedbacks").textContent =
    data.length;


  let totalRating = 0;


  const emojiCounts = {};



  data.forEach(item => {


    const rating = Number(item.rating);


    totalRating += rating || 0;


    const emoji = ratingEmoji[rating];


    if(emoji){
      emojiCounts[emoji] =
      (emojiCounts[emoji] || 0) + 1;
    }


  });



  const average =
    data.length
    ? (totalRating / data.length).toFixed(1)
    : 0;



  const stars = Math.round(average);



  document.getElementById("average-rating").innerHTML =
    "★".repeat(stars) +
    "<br><small>" +
    average +
    "/4</small>";





  let topEmoji = "-";
  let maxCount = 0;



  Object.entries(emojiCounts)
  .forEach(([emoji,count])=>{


    if(count > maxCount){

      maxCount = count;
      topEmoji = emoji;

    }

  });



  document.getElementById("top-emoji").textContent =
    topEmoji;



}







function updateRatings(data){


const counts = {

  "😳":0,
  "🙂":0,
  "😍":0,
  "🔥":0

};



data.forEach(item=>{


  const emoji =
    ratingEmoji[Number(item.rating)];



  if(emoji){

    counts[emoji]++;

  }


});



const total =
  data.length || 1;



setBar(counts["😳"], total,
"count-shocked",
"bar-shocked");



setBar(counts["🙂"], total,
"count-happy",
"bar-happy");



setBar(counts["😍"], total,
"count-love",
"bar-love");



setBar(counts["🔥"], total,
"count-fire",
"bar-fire");



}







function setBar(count,total,countId,barId){


document.getElementById(countId)
.textContent = count;



document.getElementById(barId)
.style.width =
(count / total * 100) + "%";


}







function updateBooths(data){


const booths = {};



data.forEach(item=>{


if(!item.favorite_booth)
return;



booths[item.favorite_booth] =
(booths[item.favorite_booth] || 0) + 1;


});



const sorted =
Object.entries(booths)
.sort((a,b)=>b[1]-a[1]);



if(!sorted.length)
return;




document.getElementById("winner-booth")
.textContent = sorted[0][0];




const places = [
["first-place","first-votes"],
["second-place","second-votes"],
["third-place","third-votes"]
];



places.forEach((p,index)=>{


if(sorted[index]){


document.getElementById(p[0])
.textContent =
sorted[index][0];



document.getElementById(p[1])
.textContent =
sorted[index][1] + " hlasů";


}


});


}







function updateComments(data){


const likedContainer =
document.getElementById("liked-preview");


const improveContainer =
document.getElementById("improve-preview");



allLiked =
data
.filter(x=>x.best_part)
.map(x=>x.best_part);



allImprove =
data
.filter(x=>x.improve)
.map(x=>x.improve);




likedContainer.innerHTML =
allLiked
.slice(0,5)
.map(t=>`<div class="comment">${t}</div>`)
.join("");




improveContainer.innerHTML =
allImprove
.slice(0,5)
.map(t=>`<div class="comment">${t}</div>`)
.join("");

}









const modal =
document.getElementById("modal");


const modalTitle =
document.getElementById("modal-title");


const modalList =
document.getElementById("modal-list");





document.getElementById("open-liked")
.onclick = ()=>{


modalTitle.textContent =
"Všechny pochvaly";


modalList.innerHTML =
allLiked
.map(t=>`<div class="comment">${t}</div>`)
.join("");


modal.classList.add("show");


};





document.getElementById("open-improve")
.onclick = ()=>{


modalTitle.textContent =
"Všechna doporučení";


modalList.innerHTML =
allImprove
.map(t=>`<div class="comment">${t}</div>`)
.join("");


modal.classList.add("show");


};






document.getElementById("close-modal")
.onclick = ()=>{

modal.classList.remove("show");

};





modal.onclick = e=>{


if(e.target===modal){

modal.classList.remove("show");

}

};

// AUTO OBNOVOVÁNÍ DAT KAŽDÝCH 10 SEKUND
setInterval(() => {
  loadData();
}, 10000);
