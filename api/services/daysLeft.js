module.exports = {
  parseDate: function(str){
    var mdy = str.split('/');
    console.log('mdy :'+new Date(mdy[2], mdy[0]-1, mdy[1]))
    return new Date(mdy[2], mdy[0]-1, mdy[1]);
  },

  dayDiff: function(first,second){
    return (second-first)/(1000*60*60*24);
  },

  run: function(datetoRelease){
    var timeNow = datetoRelease;
    console.log('timeNow :'+timeNow);
    this.parseDate(timeNow);

  }



}
