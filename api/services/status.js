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
    console.log('Now: '+currentYear+'/'+currentMonth+'/'+currentDay);

    if ( currentYear > date[2] ) {
      console.log('a');
      return true;
    } else if ( currentMonth > date[0] ) {
      console.log('b');
      return true;
    } else if ( currentDay > date[1] ) {
      console.log('c');
      return true;
    } else {
      return false;
    }
  }
}
