module.exports = {
  rake: function(data){
    dateList = [];
    var numPosts = data.length;
    var oneDate;
    for ( i=0; i< numPosts-1; i++ ){
      oneDate = data[i]['date'];
      oneDate = oneDate.split('/');
      dateList.push(oneDate);
    }
    console.log(dateList);

  },

  run: function(data){
    console.log(data);
    dateList = [];
    var numPosts = data.length;
    var oneDate;
    for ( i=0; i<numPosts; i++){
      oneDate = data[i]['date'];
      dateList.push(oneDate);
    }

    dateList = dateList.filter( function( item, index, inputArray ){
      return inputArray.indexOf(item) == index;
    });

    return dateList;
  }
}
