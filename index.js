const timePeriodBtns = document.getElementsByClassName("time-period-button");
let dataArray;


//  function to switch text color of buttons depending on which one is activated
function logButton(e) {
  for(btn of timePeriodBtns) {
    btn.style.color = "hsl(235, 45%, 61%)"
  }  
  let activeBtn = document.getElementById(e.target.id);
  activeBtn.style.color = "white";
}

for (btn of timePeriodBtns) {
  btn.addEventListener("click", logButton);
}

function fetchData() {
    fetch("./data.json")
    .then(res=>res.json())
    .then((data)=>{
        dataArray = data;
        console.log("dataArray:", dataArray);
    })
    .catch((err)=>console.error(err));
}

fetchData();
