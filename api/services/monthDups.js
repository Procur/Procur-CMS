module.exports = {
  run: function ( data ){
    var monthIndicesToCut = [];
    var improvedData = [];
    var counter = 1
    var arrayMonthNum = [];
    for ( i=0; i<data.length; i++){
      arrayMonthNum.push(data[i].slice(0,2));
    }
    var theKeepers = [0];
    for ( i = 1; i<arrayMonthNum.length; i++){
      if ( arrayMonthNum.slice(0,i).indexOf(arrayMonthNum[i]) == -1 ){
        theKeepers.push(i);
      }
    }

    for ( i=0; i<theKeepers.length; i++ ){
      improvedData.push(data[theKeepers[i]]);
    }

    return improvedData;

  }
}
