//data
var hours = ['6am', '7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

//I'm unsure about this hourly totals piece
//Other approach I considered: building the html without totals and then crawling the table columns and summing them
//That seemed wasteful as I did have all the information in memory once already
//Con: an array 0s to add to just looks silly. Pro: otherwise I would have had to code special 'push' logic for the first time through the array. 
//Any feedback appreciated.

var hourlyTotals = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var grandTotal = 0;

var pikeInfo = {
  locationName: 'pike',
  displayName: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  averageCookiesPerSale: 6.3
};

var seaTacInfo = {
  locationName: 'seaTac',
  displayName: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 23,
  averageCookiesPerSale: 1.2
};

var seattleCenterInfo = {
  locationName: 'seattleCenter',
  displayName: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  averageCookiesPerSale: 3.7
};

var capitolHillInfo = {
  locationName: 'capitolHill',
  displayName: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  averageCookiesPerSale: 2.3
};

var alkiInfo = {
  locationName: 'alki',
  displayName: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  averageCookiesPerSale: 4.6};



var tableBody = document.getElementById('sales-table-body');

//utility functions

function addTableRow(inRow){
  var newRow = document.createElement('tr');
  newRow.innerHTML = inRow;
  tableBody.appendChild(newRow);
}

function makeHeaderOrFooterRow(inData){
  var firstCol = inData.firstCol;
  var arr = inData.arr;
  var lastCol = inData.lastCol;
  var table = document.getElementById('sales-table');
  //start the header with an empty cell
  var headerRow = document.createElement('thead');
  var headerData = `<td>${firstCol}</td>`;
  for (var headerCounter = 0; headerCounter < arr.length; headerCounter++) {
    headerData = `${headerData}<td>${arr[headerCounter]}</td>`;
  }
  //the totals get appended to the array at the end
  //therefore the header is short one column
  //forcing a lastColumn if one is passed in
  if (lastCol) {
    headerData = `${headerData}<td>${inData.lastCol}</td>`;
  }

  headerRow.innerHTML = headerData;

  table.appendChild(headerRow);
}
//main Object

function Store(storeInfo) {
  this.locationName = storeInfo.locationName;
  this.displayName = storeInfo.displayName;
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
    //start table row with display name
    this.calculatedCookiesTableRow = `<td>${this.displayName}</td>`;
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

//make the header
makeHeaderOrFooterRow({firstCol: '', lastCol: 'Daily Location Total', arr: hours});

//create and add store rows
var pike = new Store(pikeInfo);
pike.renderOutput();
var seaTac = new Store(seaTacInfo);
seaTac.renderOutput();
var seattleCenter = new Store(seattleCenterInfo);
seattleCenter.renderOutput();
var capitolHill = new Store(capitolHillInfo);
capitolHill.renderOutput();
var alki = new Store(alkiInfo);
alki.renderOutput();

//Add grandTotal to hourly totals array
hourlyTotals.push(grandTotal);

//make the footer
makeHeaderOrFooterRow({firstCol: 'Totals', arr: hourlyTotals});

//profit
