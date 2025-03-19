function handleClick() {
    console.log("Button clicked!");
    // Perform an API request or some action
  }
  
  // Custom throttle function 
  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func(...args);
      }
    };
  }
  
  // Throttle the click handler to run at most once every 2 seconds
  const throttledClickHandler = throttle(handleClick, 2000);
  
  document.getElementById("myButton").addEventListener("click", throttledClickHandler);
  