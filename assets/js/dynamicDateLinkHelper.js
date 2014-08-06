$('.dynamicDateLinks').ready( function(){
  $.get('/companyPost/dateFetch').done(function(data){
    searchStrings = data["posts"]["search"];
    clientStrings = data["posts"]["months"];
    for ( i=0; i < searchStrings.length; i++) {
      $(".dynamicDateLinks").append("<a class='oneDateLink' href='/companyblogsearch?word="+clientStrings[i][1]+clientStrings[i][0]+"'>"+clientStrings[i][0]+"&nbsp;/&nbsp;</a>");
    }
  });
});
