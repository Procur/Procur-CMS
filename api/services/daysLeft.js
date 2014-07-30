module.exports = {
  parseDate: function(str){
    var mdy = str.split('/');
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
  },

  dayDiff: function(first,second){
    return (first-second)/(1000*60*60*24);
  },

  run: function(datetoRelease){
    var today = new Date();
    var timeNow = (today.getMonth()+1)+"/"+(today.getDate())+"/"+(today.getFullYear());
    datetoRelease = this.parseDate(datetoRelease);
    timeNow = this.parseDate(timeNow);
    return this.dayDiff(datetoRelease,timeNow);
  }



}
