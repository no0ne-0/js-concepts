const users = document.querySelector(".user-list");
const userName = document.querySelector("#user");
const errorMessage = document.createElement("p"); // Create error message element
errorMessage.style.color = "red";
errorMessage.style.display = "none"; // Hide initially
userName.parentElement.appendChild(errorMessage); // Append to input field's parent

const userArr = [];

const getUserData = async () => {
  try {
    const res = await fetch("https://api.github.com/users");
    const data = await res.json();

    if (data) {
      users.innerHTML = "";
      userArr.length = 0; // Clear existing references
    }

    data.forEach((user) => {
      const li = document.createElement("li");

      li.insertAdjacentHTML(
        "afterbegin",
        `
          <div class="user-data">
              <img src="${user.avatar_url}" alt="${user.login}">
              <div>
                  <p>${user.login}</p>
                  <a href="${user.html_url}" target="_blank">${user.html_url}</a>
              </div>
          </div>
        `
      );

      users.appendChild(li);
      userArr.push(li); // Store reference for filtering
    });
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

const debounce = (func, timeout = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
};

const getUser = (query) => {
  userArr.forEach((curElem) => {
    const username = curElem.querySelector("p").innerText.toLowerCase();
    if (username.includes(query.toLowerCase())) {
      curElem.classList.remove("hide");
    } else {
      curElem.classList.add("hide");
    }
  });
};

const debouncedGetData = debounce(getUser, 500);

userName.addEventListener("input", (event) => {
  const query = event.target.value;

  if (/\d/.test(query)) {
    errorMessage.textContent = "Numbers are not allowed!";
    errorMessage.style.display = "block";
    return; // Stop execution
  } else {
    errorMessage.style.display = "none"; // Hide error message
  }

  debouncedGetData(query);
  console.log(debouncedGetData);
  
});

getUserData();
