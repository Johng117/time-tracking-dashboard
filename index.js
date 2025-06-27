const timePeriodBtns = document.getElementsByClassName("time-period-button");
const daily = document.getElementById("daily");
let dataArray;

function fetchData() {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      dataArray = data;
      console.log("dataArray:", dataArray);
    })
    .catch((err) => console.error(err));
}

// function that fetches the data once the DOM has loaded
document.addEventListener("DOMContentLoaded", (e) => {
  console.log("DOM fully loaded and parsed");
  daily.style.color = "white";
  fetchData();
});

//  function to switch text color of buttons
function timePeriodHighlight(timeSpan) {
  console.log("timeSpan", timeSpan);
  for (btn of timePeriodBtns) {
    btn.style.color = "hsl(235, 45%, 61%)";
  }
  let activeBtn = document.getElementById(timeSpan);
  console.log("activeBtn", activeBtn);
  activeBtn.style.color = "white";
}

function dataFilter(data) {
   
  for (obj of dataArray) {
    console.log(obj["timeframes"][data]);
  }
  console.log("data", data);
}

function switchTimeData(e) {
  let newTimePeriod = e.target.id;
  timePeriodHighlight(newTimePeriod);
  dataFilter(newTimePeriod);
}

for (btn of timePeriodBtns) {
  btn.addEventListener("click", switchTimeData);
}
console.log("dataArray", dataArray);
