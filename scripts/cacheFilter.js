document.getElementById("searchForm").addEventListener("submit", (event) => {
  const searchQuery = document.getElementById("searchBar").value;
  const valueChecked = document.getElementById("valueSwitch").checked;
  const foodChecked = document.getElementById("foodSwitch").checked;
  const serviceChecked = document.getElementById("serviceSwitch").checked;
  const languageChecked = document.getElementById("languageSwitch").checked;
  localStorage.setItem("searchQuery", searchQuery);
  localStorage.setItem("valueChecked", valueChecked);
  localStorage.setItem("foodChecked", foodChecked);
  localStorage.setItem("serviceChecked", serviceChecked);
  localStorage.setItem("languageChecked", languageChecked);
})