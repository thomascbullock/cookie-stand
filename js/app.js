var hours = ['6am', '7am','8am','9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];
var pike = {
  locationName: '1st and Pike',
  minCustomers: 23,
  maxCustomers: 65,
  averageCookiesPerSale: 6.3,
  calculatedCookiesPerHour: [],
  calculatedDailyCookieTotal: 0 ,
  getCookiesPerHour(inCustomers) {
    return Math.round(inCustomers * this.averageCookiesPerSale);
  },
  getCustomersPerHour(){
    //using the getRandomIntInclusive pattern from
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max-min + 1)) + min;
  },

  loadDailyData(){
    this.calculatedDailyCookieTotal = 0;
    for (var i = 0; i < hours.length; i++) {
      var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
      //no real reason this has to be split into 2 lines except it looked unwieldy as one
      this.calculatedCookiesPerHour.push(calculatedCookies);
      this.calculatedDailyCookieTotal += calculatedCookies;
    }
  },
  renderOutput(){
    this.loadDailyData();
    var hoursAndTotalsHeader = document.getElementById('pike');
    hoursAndTotalsHeader.textContent = this.locationName;
    var hoursAndTotalsList = document.getElementById('pike-hours-and-cookies');
    for (var i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.calculatedCookiesPerHour[i]}`;
      hoursAndTotalsList.appendChild(liEl);
    }
    //add the total element
    var totalLiEl = document.createElement('li');
    totalLiEl.textContent = `Total: ${this.calculatedDailyCookieTotal}`;
    hoursAndTotalsList.appendChild(totalLiEl);
  }
};

var seaTac = {
  locationName: 'SeaTac Airport',
  minCustomers: 3,
  maxCustomers: 24,
  averageCookiesPerSale: 1.2,
  calculatedCookiesPerHour: [],
  calculatedDailyCookieTotal: 0 ,
  getCookiesPerHour(inCustomers) {
    return Math.round(inCustomers * this.averageCookiesPerSale);
  },
  getCustomersPerHour(){
    //using the getRandomIntInclusive pattern from
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max-min + 1)) + min;
  },

  loadDailyData(){
    this.calculatedDailyCookieTotal = 0;
    for (var i = 0; i < hours.length; i++) {
      var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
      //no real reason this has to be split into 2 lines except it looked unwieldy as one
      this.calculatedCookiesPerHour.push(calculatedCookies);
      this.calculatedDailyCookieTotal += calculatedCookies;
    }
  },
  renderOutput(){
    this.loadDailyData();
    var hoursAndTotalsHeader = document.getElementById('seaTac');
    hoursAndTotalsHeader.textContent = this.locationName;
    var hoursAndTotalsList = document.getElementById('seaTac-hours-and-cookies');
    for (var i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.calculatedCookiesPerHour[i]}`;
      hoursAndTotalsList.appendChild(liEl);
    }
    //add the total element
    var totalLiEl = document.createElement('li');
    totalLiEl.textContent = `Total: ${this.calculatedDailyCookieTotal}`;
    hoursAndTotalsList.appendChild(totalLiEl);
  }
};

var seattleCenter = {
  locationName: 'Seattle Center',
  minCustomers: 11,
  maxCustomers: 38,
  averageCookiesPerSale: 3.7,
  calculatedCookiesPerHour: [],
  calculatedDailyCookieTotal: 0 ,
  getCookiesPerHour(inCustomers) {
    return Math.round(inCustomers * this.averageCookiesPerSale);
  },
  getCustomersPerHour(){
    //using the getRandomIntInclusive pattern from
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max-min + 1)) + min;
  },

  loadDailyData(){
    this.calculatedDailyCookieTotal = 0;
    for (var i = 0; i < hours.length; i++) {
      var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
      //no real reason this has to be split into 2 lines except it looked unwieldy as one
      this.calculatedCookiesPerHour.push(calculatedCookies);
      this.calculatedDailyCookieTotal += calculatedCookies;
    }
  },
  renderOutput(){
    this.loadDailyData();
    var hoursAndTotalsHeader = document.getElementById('seattleCenter');
    hoursAndTotalsHeader.textContent = this.locationName;
    var hoursAndTotalsList = document.getElementById('seattleCenter-hours-and-cookies');
    for (var i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.calculatedCookiesPerHour[i]}`;
      hoursAndTotalsList.appendChild(liEl);
    }
    //add the total element
    var totalLiEl = document.createElement('li');
    totalLiEl.textContent = `Total: ${this.calculatedDailyCookieTotal}`;
    hoursAndTotalsList.appendChild(totalLiEl);
  }
};

var capitolHill = {
  locationName: 'Capitol Hill',
  minCustomers: 20,
  maxCustomers: 38,
  averageCookiesPerSale: 2.3,
  calculatedCookiesPerHour: [],
  calculatedDailyCookieTotal: 0 ,
  getCookiesPerHour(inCustomers) {
    return Math.round(inCustomers * this.averageCookiesPerSale);
  },
  getCustomersPerHour(){
    //using the getRandomIntInclusive pattern from
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max-min + 1)) + min;
  },

  loadDailyData(){
    this.calculatedDailyCookieTotal = 0;
    for (var i = 0; i < hours.length; i++) {
      var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
      //no real reason this has to be split into 2 lines except it looked unwieldy as one
      this.calculatedCookiesPerHour.push(calculatedCookies);
      this.calculatedDailyCookieTotal += calculatedCookies;
    }
  },
  renderOutput(){
    this.loadDailyData();
    var hoursAndTotalsHeader = document.getElementById('capitolHill');
    hoursAndTotalsHeader.textContent = this.locationName;
    var hoursAndTotalsList = document.getElementById('capitolHill-hours-and-cookies');
    for (var i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.calculatedCookiesPerHour[i]}`;
      hoursAndTotalsList.appendChild(liEl);
    }
    //add the total element
    var totalLiEl = document.createElement('li');
    totalLiEl.textContent = `Total: ${this.calculatedDailyCookieTotal}`;
    hoursAndTotalsList.appendChild(totalLiEl);
  }
};

var alki = {
  locationName: 'Alki',
  minCustomers: 2,
  maxCustomers: 16,
  averageCookiesPerSale: 4.6,
  calculatedCookiesPerHour: [],
  calculatedDailyCookieTotal: 0 ,
  getCookiesPerHour(inCustomers) {
    return Math.round(inCustomers * this.averageCookiesPerSale);
  },
  getCustomersPerHour(){
    //using the getRandomIntInclusive pattern from
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var min = Math.ceil(this.minCustomers);
    var max = Math.floor(this.maxCustomers);
    return Math.floor(Math.random() * (max-min + 1)) + min;
  },

  loadDailyData(){
    this.calculatedDailyCookieTotal = 0;
    for (var i = 0; i < hours.length; i++) {
      var calculatedCookies = this.getCookiesPerHour(this.getCustomersPerHour());
      //no real reason this has to be split into 2 lines except it looked unwieldy as one
      this.calculatedCookiesPerHour.push(calculatedCookies);
      this.calculatedDailyCookieTotal += calculatedCookies;
    }
  },
  renderOutput(){
    this.loadDailyData();
    var hoursAndTotalsHeader = document.getElementById('alki');
    hoursAndTotalsHeader.textContent = this.locationName;
    var hoursAndTotalsList = document.getElementById('alki-hours-and-cookies');
    for (var i = 0; i < hours.length; i++) {
      var liEl = document.createElement('li');
      liEl.textContent = `${hours[i]}: ${this.calculatedCookiesPerHour[i]}`;
      hoursAndTotalsList.appendChild(liEl);
    }
    //add the total element
    var totalLiEl = document.createElement('li');
    totalLiEl.textContent = `Total: ${this.calculatedDailyCookieTotal}`;
    hoursAndTotalsList.appendChild(totalLiEl);
  }
};

pike.renderOutput();
seaTac.renderOutput();
seattleCenter.renderOutput();
capitolHill.renderOutput();
alki.renderOutput();
