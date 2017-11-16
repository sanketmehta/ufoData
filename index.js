
// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");
var $datetimeInput = document.querySelector("#datetime");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $countryInput = document.querySelector("#country");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $loadMoreBtn = document.querySelector("#load-btn");
var $backBtn = document.querySelector("#back-btn");

// Add an event listener to the $searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

var startingIndex = 0;
var resultsPerPage = 10;

// Set filteredAddresses to addressData initially
// var filteredAddresses = addressData;
var filteredData = ufoData;

function hasWhiteSpace(s) {
  return s.indexOf(' ') >= 0;
}

function capitalizeFirstLetter(string) {
  string = string.trim();
  var1 = string.charAt(0).toUpperCase() + string.slice(1);
  // return string.charAt(0).toUpperCase() + string.slice(1);
  if(hasWhiteSpace(var1)){
    var subStr = var1.split(' ');
    var modStr = capitalizeFirstLetter(subStr[1]);
    // console.log(subStr[1]);
    var1 = subStr[0] +' '+ modStr;
  }
  
  return var1;
}
// renderTable renders the filteredData to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  var endingIndex = startingIndex + resultsPerPage;
  console.log(endingIndex)
  var filteredDataSubset = filteredData.slice(startingIndex, endingIndex);
  
  for (var i = 0; i < filteredDataSubset.length; i++) {
    // Get the current address object and its fields
    
    var address = filteredDataSubset[i];
    var fields = Object.keys(address);
    console.log("hello", i, " ", startingIndex)
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell and set its inner text to be the current value at the current address's field
      var field = fields[j];
      // console.log(field)
      var $cell = $row.insertCell(j);
      if (field == 'state' || field == 'country'){
        $cell.innerText = address[field].toUpperCase();
      }
      else if(field == 'city' || field == 'shape'){
        add = capitalizeFirstLetter(address[field]);
        $cell.innerText = add;
        // $cell.innerText = address[field];
      }
      else{
        $cell.innerText = address[field];
      }
    }
  }

  if (endingIndex == 10) {
    $backBtn.classList.add("disabled");
  $backBtn.innerText = "First Page";
  $backBtn.removeEventListener("click", handleBackButtonClick);
}else{
  $backBtn.classList.remove("disabled");
  $backBtn.innerText = "Back";
  $backBtn.addEventListener("click", handleBackButtonClick);

  if (startingIndex + resultsPerPage >= filteredData.length) {
    $loadMoreBtn.classList.add("disabled");
  $loadMoreBtn.innerText = "Last Page";
  $loadMoreBtn.removeEventListener("click", handleButtonClick);
}else{
  $loadMoreBtn.classList.remove("disabled");
  $loadMoreBtn.innerText = "Next";
  $loadMoreBtn.addEventListener("click", handleButtonClick);
  
}

}

}

$loadMoreBtn.addEventListener("click", handleButtonClick);
// $backBtn.addEventListener("click", handleBackButtonClick);

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterDateTime = $datetimeInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCountry = $countryInput.value.trim().toLowerCase();
  var filterShape = $shapeInput.value.trim().toLowerCase();

  // Set filteredData to an array of all addresses who's "state" matches the filter
  filteredData = ufoData.filter(function(address) {
    var searchDateTime = address.datetime.substring(0, filterDateTime.length).toLowerCase();
    var searchCity = address.city.substring(0, filterCity.length).toLowerCase();
    var searchState = address.state.substring(0, filterState.length).toLowerCase();
    var searchCountry = address.country.substring(0, filterCountry.length).toLowerCase();
    var searchShape = address.shape.substring(0, filterShape.length).toLowerCase();
    // if (addressState === filterState && addressCity === filterCity) {
    if (searchDateTime === filterDateTime && searchCity === filterCity && searchState === filterState && searchCountry === filterCountry && searchShape === filterShape) {
        return true;
    }
    return false;
  });
  renderTable();
}

function handleButtonClick() {
  // Increase startingIndex by resultsPerPage, render the next section of the table
  startingIndex += resultsPerPage;
  console.log(startingIndex)
  renderTable();
  // Check to see if there are any more results to render
  // if (startingIndex + resultsPerPage >= ufoData.length) {
  // if (startingIndex + resultsPerPage >= filteredData.length) {
  //     $loadMoreBtn.classList.add("disabled");
  //   $loadMoreBtn.innerText = "All Addresses Loaded";
  //   $loadMoreBtn.removeEventListener("click", handleButtonClick);
  // }
}

function handleBackButtonClick() {
  // Increase startingIndex by resultsPerPage, render the next section of the table
  startingIndex -= resultsPerPage;
  console.log(startingIndex)
  renderTable();
  // Check to see if there are any more results to render
  // if (startingIndex + resultsPerPage >= ufoData.length) {
  // if (endingIndex == resultsPerPage) {
  //     $backBtn.classList.add("disabled");
  //   $backBtn.innerText = "Starting Page";
  //   $backBtn.removeEventListener("click", handleBackButtonClick);
  // }
}

// Render the table for the first time on page load
renderTable();
