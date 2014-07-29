module.exports = {
  isAwake: function(date){
    date = date.split("/");
    console.log(date);
    for (i=0; i<date.length; i++){
      date[i] = parseInt(date[i]);
    }

    var newDate = new Date();
    var currentYear = newDate.getFullYear();
    var currentMonth = newDate.getMonth()+1;
    var currentDay = newDate.getDate();
    console.log(currentDay);
    /*switch (month) {
      case 1:
        month = "January";
        break;
      case 2:
        month = "February";
        break;
      case 3:
        month = "March";
        break;
      case 4:
        month = "April";
        break;
      case 5:
        month = "May";
        break;
      case 6:
        month = "June";
        break;
      case 7:
        month = "July";
        break;
      case 8:
        month = "August";
        break;
      case 9:
        month = "September";
        break;
      case 10:
        month = "October";
        break;
      case 11:
        month = "November";
        break;
      case 12:
        month = "December";
        break;
    }*/

    if ( date[2] < currentYear) {
      console.log('a');
      return true;
    } else if ( date[0] < currentMonth ) {
      console.log('b');
      return true;
    } else if ( date[1] < currentDay ) {
      console.log('c');
      return true;
    } else {
      return false;
    }
  }
}
