module.exports = {
  cleanMe: function(uncleanArray){
    var cleanArray = [];
    var delimitedString = '';
    var lengthString = uncleanArray[0].length;
    for (i=0;i<lengthString;i++) {
      if(uncleanArray[0][i] != (','))  {
        delimitedString = delimitedString + uncleanArray[0][i];
        if (i == lengthString-1) {
          cleanArray.push(delimitedString);
        }
      } else {
        cleanArray.push(delimitedString);
        delimitedString = '';
      }
    }
    return cleanArray;
  }
};
