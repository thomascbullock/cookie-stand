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
    var hoursAndTotalsList = document.getElementById('hours-and-cookies');
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
