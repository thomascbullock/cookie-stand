var hours = ['6am', '7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];

function Store(storeInfo) {
  this.locationName = storeInfo.locationName;
  this.displayName = storeInfo.displayName;
  this.minCustomers = storeInfo.minCustomers;
  this.maxCustomers = storeInfo.maxCustomers;
  this.averageCookiesPerSale = storeInfo.averageCookiesPerSale;
  this.calculatedCookiesPerHour = [];
  this.calculatedDailyCookieTotal = 0;
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

  this.loadDailyData = function(){
    this.calculatedDailyCookieTotal = 0;
    for (var i = 0; i < hours.length; i++) {
      var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
      //no real reason this has to be split into 2 lines except it looked unwieldy as one
      this.calculatedCookiesPerHour.push(calculatedCookies);
      this.calculatedDailyCookieTotal += calculatedCookies;
    }
  },
  this.renderOutput = function(){
    this.loadDailyData();
    var hoursAndTotalsHeader = document.getElementById(this.locationName);
    hoursAndTotalsHeader.textContent = this.displayName;
    var hoursAndTotalsList = document.getElementById(`${this.locationName}-hours-and-cookies`);
    for (var i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.calculatedCookiesPerHour[i]}`;
      hoursAndTotalsList.appendChild(liEl);
    }
    //add the total element
    var totalLiEl = document.createElement('li');
    totalLiEl.textContent = `Total: ${this.calculatedDailyCookieTotal}`;
    hoursAndTotalsList.appendChild(totalLiEl);
  };
}

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
