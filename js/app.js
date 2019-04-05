'use strict';

//data
var hours = ['6am', '7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var hourlyTotals = [];
var grandTotal = 0;

//initial stores
var pikeInfo = {
  locationName: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  averageCookiesPerSale: 6.3,
  hours: '9am to 3pm',
  img: 'cutter.jpg'

};

var seaTacInfo = {
  locationName: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 23,
  averageCookiesPerSale: 1.2,
  hours: '5am to 10pm',
  img: 'family.jpg'
};

var seattleCenterInfo = {
  locationName: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  averageCookiesPerSale: 3.7,
  hours: '8am to 3pm',
  img: 'fish.jpg'
};

var capitolHillInfo = {
  locationName: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  averageCookiesPerSale: 2.3,
  hours: '4pm to 2am',
  img: 'frosted-cookie.jpg'
};

var alkiInfo = {
  locationName: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  averageCookiesPerSale: 4.6,
  hours: '6am to 12pm',
  img: 'salmon.png'};



var form = document.getElementById('sales-form');

var salesTableBody = document.getElementById('sales-table-body');
var salesTable = document.getElementById('sales-table');
var storesTable = document.getElementById('stores-table-body');
var whichPage = document.getElementById('title').innerText;

//utility functions

function addTableRow(inRowType, inRow){
  var newRow = document.createElement('tr');
  newRow.innerHTML = inRow;
  if (inRowType === 'sales') {
    salesTableBody.appendChild(newRow);
  }
  if (inRowType === 'stores') {
    storesTable.appendChild(newRow);
  }
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
    salesTable.deleteTHead();
    break;
  case 'footer':
    element = 'tfoot';
    salesTable.deleteTFoot();
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

  salesTable.appendChild(headerRow);
}

//Store Constructor

function Store(inStoreInfo) {
  this.locationName = inStoreInfo.locationName;
  this.minCustomers = inStoreInfo.minCustomers;
  this.maxCustomers = inStoreInfo.maxCustomers;
  this.averageCookiesPerSale = inStoreInfo.averageCookiesPerSale;
  this.hours = inStoreInfo.hours;
  this.img = inStoreInfo.img;
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

Store.prototype.makeSalesTableRow = function(){
  var calculatedDailyCookieTotal = 0;
  //start table row with location name
  this.calculatedCookiesTableRow = `<td>${this.locationName}</td>`;
  //now loop through the hours and calculate cookies per hour
  for (var hoursCounter = 0; hoursCounter < hours.length; hoursCounter++) {
    var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
    //add the calculated cookie count as table data
    this.calculatedCookiesTableRow = `${this.calculatedCookiesTableRow}<td>${calculatedCookies}</td>`;
    //also add the calculated cookie count to the hourly, daily by location and daily grand totals
    if (hourlyTotals[hoursCounter]){
      hourlyTotals[hoursCounter] += calculatedCookies;
    } else {
      hourlyTotals.push(calculatedCookies);
    }
    calculatedDailyCookieTotal += calculatedCookies;
    grandTotal = grandTotal + calculatedCookies;
  }
  //add the daily location total to the end of the table row
  this.calculatedCookiesTableRow = `${this.calculatedCookiesTableRow}<td>${calculatedDailyCookieTotal}</td>`;
  //return the table row
  return this.calculatedCookiesTableRow;
};

Store.prototype.makeStoresTableRow = function(){
  this.storeInfoTableRow = `<td style="background-image: url(./img/${this.img}); background-repeat: no-repeat; background-size: cover;">${this.locationName}<br/> Hours: ${this.hours}</td>`;
  return this.storeInfoTableRow;
};

Store.prototype.renderSalesOutput = function(){
  addTableRow('sales',this.makeSalesTableRow());
};

Store.prototype.renderStoreInfoOutput = function(){
  addTableRow('stores',this.makeStoresTableRow());
};

//adding a process function because we have some stores to be loaded with the page, and some from the form
//and both should use the same code

function process(inStoreInfo){
  var store = new Store(inStoreInfo);
  if (whichPage === 'Store Sales Calculator') {
    makeHeaderOrFooterRow({type: 'header', firstCol: '', lastCol: 'Daily Location Total', arr: hours});
    store.renderSalesOutput();
    //remove previous grand total if one exists (it won't the first time)
    if (hourlyTotals.length > hours.length) {
      hourlyTotals.pop();
    }
    //add updated grand total
    hourlyTotals.push(grandTotal);
    makeHeaderOrFooterRow({type: 'footer', firstCol: 'Totals', arr: hourlyTotals});
  }

  if (whichPage === 'Salmon Cookies, by Pat') {
    store.renderStoreInfoOutput();
  }
}
//form handler

function formHandler(event){
  event.preventDefault();

  var storeInfo = {
    locationName: event.target.location_name.value,
    minCustomers: event.target.min_cust.value,
    maxCustomers: event.target.max_cust.value,
    averageCookiesPerSale: event.target.average_cookies_per_sale.value
  };

  process(storeInfo);

  form.reset();
}

//begin page logic here
console.log(whichPage);
//load initial stores

process(pikeInfo);
process(seattleCenterInfo);
process(seaTacInfo);
process(capitolHillInfo);
process(alkiInfo);

//listen for more stores
if (whichPage === 'Store Sales Calculator') {
  form.addEventListener('submit',formHandler);
}
