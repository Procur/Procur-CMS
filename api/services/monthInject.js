module.exports = {
  run: function ( data ){
    var dataToSend = { search: data, months: [] };
    var numDates = data.length;
    var arrayDate;
    for ( i=0; i<numDates; i++ ){
      arrayDate = data[i].split('/');
      var monthNum = arrayDate[0];
      var yearNum = arrayDate[2];
      var monthWord = this.getMonth(monthNum);
      var monthyearArray = [monthWord,yearNum,monthNum];
      dataToSend['months'].push(monthyearArray);
    }
    sortedArray = dataToSend['months'].sort(this.Comparator);
    console.log('data.....');
    console.log(dataToSend);
    return dataToSend;
  },

  Comparator: function ( a,b ){
    if (a[2] < b[2]) return -1;
    if (a[2] > b[2]) return 1;
    return 0;
  },

  getMonth: function ( data ){
    switch (parseInt(data)) {

      case 01:
        month = "January";
        return month;
      case 02:
        month = "February";
        return month;
      case 03:
        month = "March";
        return month;
      case 04:
        month = "April";
        return month;
      case 05:
        month = "May";
        return month;
      case 06:
        month = "June";
        return month;
      case 07:
        month = "July";
        return month;
      case 08:
        month = "August";
        return month;
      case 09:
        month = "September";
        return month;
      case 10:
        month = "October";
        return month;
      case 11:
        month = "November";
        return month;
      case 12:
        month = "December";
        return month;
    }
  }
}
