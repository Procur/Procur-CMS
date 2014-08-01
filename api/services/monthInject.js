module.exports = {
  run: function ( data ){
    var dataToSend = { search: data, months: [] };
    var numDates = data.length;
    var arrayDate;
    for ( i=0; i<numDates; i++ ){
      arrayDate = data[0].split('/');
      var monthNum = arrayDate[0];
      var yearNum = arrayDate[2];
      var monthWord = this.getMonth(monthNum);
      var monthyearArray = [monthWord,yearNum];
      //console.log(i);
      //if ( dataToSend['months'].indexOf('monthyearArray')  ){
        dataToSend['months'].push(monthyearArray);
      //}
    }
    return dataToSend;
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
