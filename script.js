const barsContainer = document.getElementById("bars");
let array = [];
const SIZE = 30;

generateArray();

function generateArray() {
  barsContainer.innerHTML = "";
  array = [];

  for (let i = 0; i < SIZE; i++) {
    const value = Math.floor(Math.random() * 250) + 20;
    array.push(value);

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = value + "px";
    barsContainer.appendChild(bar);
  }
}

function sort() {
  const algo = document.getElementById("algorithm").value;
  if (algo === "bubble") bubbleSort();
  if (algo === "selection") selectionSort();
  if (algo === "insertion") insertionSort();
}

async function bubbleSort() {
  const bars = document.querySelectorAll(".bar");

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].classList.add("active");
      bars[j + 1].classList.add("active");

      if (array[j] > array[j + 1]) {
        swap(j, j + 1, bars);
      }

      await sleep(40);
      bars[j].classList.remove("active");
      bars[j + 1].classList.remove("active");
    }
    bars[array.length - i - 1].classList.add("sorted");
  }
}

async function selectionSort() {
  const bars = document.querySelectorAll(".bar");

  for (let i = 0; i < array.length; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      bars[j].classList.add("active");
      await sleep(30);

      if (array[j] < array[min]) min = j;
      bars[j].classList.remove("active");
    }
    swap(i, min, bars);
    bars[i].classList.add("sorted");
  }
}

async function insertionSort() {
  const bars = document.querySelectorAll(".bar");

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].classList.add("active");
    await sleep(40);

    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      bars[j + 1].style.height = array[j] + "px";
      j--;
      await sleep(40);
    }

    array[j + 1] = key;
    bars[j + 1].style.height = key + "px";
    bars[i].classList.remove("active");
  }

  bars.forEach(bar => bar.classList.add("sorted"));
}

function swap(i, j, bars) {
  [array[i], array[j]] = [array[j], array[i]];
  bars[i].style.height = array[i] + "px";
  bars[j].style.height = array[j] + "px";
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
