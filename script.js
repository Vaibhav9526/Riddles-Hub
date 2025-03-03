const preloader = document.querySelector('.brain-loader');
const Page = document.querySelector('.Main');
const setup = document.querySelector('.setup');
const answer = document.querySelector('.showAns');
const delivery = document.querySelector('.delivery');
const nextbtn = document.querySelector('.nextmeme');
const translateBtn = document.querySelector('.translateBtn');
var apiurl = "./data.json";
var isEnglish = true;
var AnsShow = false;

translateBtn.addEventListener("click", () => {
  isEnglish = !isEnglish;
  apiurl = isEnglish ? './data.json' : './Paheli.json';
  translateBtn.textContent = isEnglish ? 'हिंदी' : 'English';
  riddles();
});

window.addEventListener('load' , ()=>{
  setTimeout(()=>{
    preloader.style.display = 'none';
    Page.style.display = 'block';
   } , 1500)
});

let usedIndices = new Set();

async function riddles() {
  const response = await fetch(apiurl);
  var data = await response.json();
  
  if (usedIndices.size === data.length) {
    console.error("No more unique riddles left!");
    return; 
  }
  
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * data.length);
    // Keep trying until we find either a short enough riddle or have tried all riddles
  } while (usedIndices.has(randomIndex) || 
           (data[randomIndex].riddle.length > 300 && usedIndices.size < data.length - 1));
  
  usedIndices.add(randomIndex);

  // If we couldn't find a short enough riddle, use this one anyway
  setup.innerHTML = data[randomIndex].riddle;
  answer.style.display = "block";
  delivery.style.display = "none";
  
  answer.addEventListener("click", () => {
    answer.style.display = "none";
    delivery.style.display = "block";
    delivery.innerHTML = data[randomIndex].answer;
  });
}


nextbtn.addEventListener("click", () => {
  riddles(); 
});

window.addEventListener("load", () => {
  riddles(); 
});
