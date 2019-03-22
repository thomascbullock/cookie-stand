//data
var hours = ['6am', '7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

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
  //the actual the is passed in as var type
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

//Store Constructor

function Store(inStoreInfo) {
  this.locationName = inStoreInfo.locationName;
  this.minCustomers = inStoreInfo.minCustomers;
  this.maxCustomers = inStoreInfo.maxCustomers;
  this.averageCookiesPerSale = inStoreInfo.averageCookiesPerSale;
}

//Store functions

Store.prototype.getCookiesPerHour = function(inCustomers){
  return Math.round(inCustomers * this.averageCookiesPerSale);
};
Store.prototype.getCustomersPerHour = function(){
  //using the getRandomIntInclusive pattern from
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  var min = Math.ceil(this.minCustomers);
  var max = Math.floor(this.maxCustomers);
  return Math.floor(Math.random() * (max-min + 1)) + min;
};

Store.prototype.makeTableRow = function(){
  var calculatedDailyCookieTotal = 0;
  //start table row with location name
  this.calculatedCookiesTableRow = `<td>${this.locationName}</td>`;
  //now loop through the hours and calculate cookies per hour
  for (var hoursCounter = 0; hoursCounter < hours.length; hoursCounter++) {
    var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
    //add the calculated cookie count as table data
    this.calculatedCookiesTableRow = `${this.calculatedCookiesTableRow}<td>${calculatedCookies}</td>`;
    //also add the calculated cookie count to the hourly, daily by location and daily grand totals
    hourlyTotals[hoursCounter] = hourlyTotals[hoursCounter] + calculatedCookies;
    calculatedDailyCookieTotal += calculatedCookies;
    grandTotal = grandTotal + calculatedCookies;
  }
  //add the daily location total to the end of the table row
  this.calculatedCookiesTableRow = `${this.calculatedCookiesTableRow}<td>${calculatedDailyCookieTotal}</td>`;
  //return the table row
  return this.calculatedCookiesTableRow;
};

Store.prototype.renderOutput = function(){
  addTableRow(this.makeTableRow());
};

//form handler

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

//begin page logic here

form.addEventListener('submit',formData);

