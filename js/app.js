//data
var hours = ['6am', '7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

//I'm unsure about this hourly totals piece
//Other approach I considered: building the html without totals and then crawling the table columns and summing them
//That seemed wasteful as I did have all the information in memory once already
//Con: an array 0s to add to just looks silly. Pro: otherwise I would have had to code special 'push' logic for the first time through the array.
//Any feedback appreciated.

var hourlyTotals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var grandTotal = 0;

var form = document.getElementById('sales-form');

var tableBody = document.getElementById('sales-table-body');
var table = document.getElementById('sales-table');

//utility functions

function addTableRow(inRow){
  var newRow = document.createElement('tr');
  newRow.innerHTML = inRow;
  tableBody.appendChild(newRow);
}

function makeHeaderOrFooterRow(inData){
  //headers and footers share a lot of code so making one function
  //for the sake of variable names both types are referred to as a header
  var type = inData.type;
  var firstCol = inData.firstCol;
  var arr = inData.arr;
  var lastCol = inData.lastCol;

  var element;
  switch(type) {
  case 'header':
    element = 'thead';
    table.deleteTHead();
    break;
  case 'footer':
    element = 'tfoot';
    table.deleteTFoot();
    break;
  }
  //start the header with an empty cell
  var headerRow = document.createElement(element);
  var headerData = `<td>${firstCol}</td>`;
  for (var headerCounter = 0; headerCounter < arr.length; headerCounter++) {
    headerData = `${headerData}<td>${arr[headerCounter]}</td>`;
  }
  //the totals get appended to the array at the end
  //therefore the header is short one column
  if (type === 'header') {
    headerData = `${headerData}<td>${lastCol}</td>`;
  }

  headerRow.innerHTML = headerData;

  table.appendChild(headerRow);
}
//main Object

function Store(storeInfo) {
  this.locationName = storeInfo.locationName;
  this.minCustomers = storeInfo.minCustomers;
  this.maxCustomers = storeInfo.maxCustomers;
  this.averageCookiesPerSale = storeInfo.averageCookiesPerSale;
  this.getCookiesPerHour = function(inCustomers){
    return Math.round(inCustomers * this.averageCookiesPerSale);
  };
  this.getCustomersPerHour = function(){
    //using the getRandomIntInclusive pattern from
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max-min + 1)) + min;
  };

  this.makeTableRow = function(){
    var calculatedDailyCookieTotal = 0;
    //start table row with location name
    this.calculatedCookiesTableRow = `<td>${this.locationName}</td>`;
    //now loop through the hours and calculate cookies per hour
    for (var hoursCounter = 0; hoursCounter < hours.length; hoursCounter++) {
      var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
      hourlyTotals[hoursCounter] = hourlyTotals[hoursCounter] + calculatedCookies;
      grandTotal = grandTotal + calculatedCookies;
      this.calculatedCookiesTableRow = `${this.calculatedCookiesTableRow}<td>${calculatedCookies}</td>`;
      calculatedDailyCookieTotal += calculatedCookies;
    }
    this.calculatedCookiesTableRow = `${this.calculatedCookiesTableRow}<td>${calculatedDailyCookieTotal}</td>`;
    return this.calculatedCookiesTableRow;
  },

  this.renderOutput = function(){
    addTableRow(this.makeTableRow());
  };
}

//begin page logic here

function formData(event){
  event.preventDefault();
  makeHeaderOrFooterRow({type: 'header', firstCol: '', lastCol: 'Daily Location Total', arr: hours});
  var storeInfo = {
    locationName: event.target.location_name.value,
    minCustomers: event.target.min_cust.value,
    maxCustomers: event.target.max_cust.value,
    averageCookiesPerSale: event.target.average_cookies_per_sale.value
  };
  var store = new Store(storeInfo);
  store.renderOutput();
  //remove previous grand total if one exists (it won't the first time)
  if (hourlyTotals.length > hours.length) {
    hourlyTotals.pop();
  }
  //add grand total
  hourlyTotals.push(grandTotal);
  makeHeaderOrFooterRow({type: 'footer', firstCol: 'Totals', arr: hourlyTotals});
  form.reset();
}

form.addEventListener('submit',formData);

