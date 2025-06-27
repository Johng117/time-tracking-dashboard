const timePeriodBtns = document.getElementsByClassName("time-period-button");
const currentValues = document.getElementsByClassName("current");
const previousValues = document.getElementsByClassName("previous");
const daily = document.getElementById("daily");
let dataArray;

// function fetches data and assigns it to dataArray variable 
// I then calls dataFilter function to set the initial data as the daily stats
function fetchData() {
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => {
      dataArray = data;
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
  for (btn of timePeriodBtns) {
    btn.style.color = "hsl(235, 45%, 61%)";
  }
  let activeBtn = document.getElementById(timeSpan);
  activeBtn.style.color = "white";
}

function dataFilter(data) {
  let amountsArr = [];
  let contextObj = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
  };
  for (obj of dataArray) {
    amountsArr.push(obj["timeframes"][data]);
  }

  for (let i = 0; i < currentValues.length; i++) {
    currentValues[i].innerText = 
      amountsArr[i].current === 1
        ? `${amountsArr[i].current}hr`
        : `${amountsArr[i].current}hrs`;


    previousValues[i].innerText =
      amountsArr[i].previous === 1
        ? `${contextObj[data]} - ${amountsArr[i].previous}hr`
        : `${contextObj[data]} - ${amountsArr[i].previous}hrs`;
  }
}

function switchTimeData(e) {
  let newTimePeriod = e.target.id;
  timePeriodHighlight(newTimePeriod);
  dataFilter(newTimePeriod);
}

for (btn of timePeriodBtns) {
  btn.addEventListener("click", switchTimeData);
}
