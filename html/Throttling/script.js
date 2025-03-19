

const normal_div = document.querySelector(".n_count");  
const throttle_div = document.querySelector(".t_count"); 
const debounce_div = document.querySelector(".d_count");
let n_cnt = 0;
let t_cnt = 0;
let d_cnt = 0;
let isScrolling = true;

const normalCount = () => {
  n_cnt++;
  normal_div.innerHTML = `Normal Count: ${n_cnt}`;
};

const throttleCount = () => {
  if (isScrolling === true) {
    t_cnt++;
    throttle_div.innerHTML = `Throttle Count: ${t_cnt}`;
    isScrolling = false;
    setTimeout(() => {
      isScrolling = true;
    }, 1000);
  }
};

let interval;

const debounceCount = () => {
  clearTimeout(interval);

  interval = setTimeout(() => {
    d_cnt++;
    debounce_div.innerHTML = `Debounce Count: ${d_cnt}`;
  }, 1000);
};

const showCount = () => {
  normalCount();
  throttleCount();
  debounceCount();
};
