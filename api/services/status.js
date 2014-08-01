module.exports = {
  isAwake: function(date){
    date = date.split("/");
    for (i=0; i<date.length; i++){
      date[i] = parseInt(date[i]);
    }

    var newDate = new Date();
    var currentYear = newDate.getFullYear();
    var currentMonth = newDate.getMonth()+1;
    var currentDay = newDate.getDate();
    

    if ( date[2] > currentYear) {
      return false;
    } else if ( date[0] > currentMonth ) {

      return false;
    } else if ( date[1] > currentDay ) {
      return false;
    } else {
      return true;
    }
  }
}
