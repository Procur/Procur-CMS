$('.topTagWrapper').ready(function(){
  $.get('/companyPost/TopTags').done(function(data){
    topFiveTags = data["posts"]["topPosts"];
    for (i=0; i <= topFiveTags.length-1; i++) {
      $(".topTagWrapper").append("<a class='oneTopTag' href='/companyblogsearch?word="+topFiveTags[i]+"'>"+topFiveTags[i]+"</a>")
    }
  });
});
