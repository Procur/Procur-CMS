$('.recentPressRelease').ready(function(){
  $.get('/pressRelease/recent').done(function(data){
    recentPosts = data;
    console.log(recentPosts);
    for (i=0;i<=recentPosts.length;i++) {
      $(".recentPressRelease").append("<div class='newUniquePost'><span class='recentDate'>"+recentPosts[i].date+"</span><span class='recentTitle'><a href='/pressreleases/"+recentPosts[i].slug+"'>"+recentPosts[i].title+"</a></span></div>")
    }
  });
});
