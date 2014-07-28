$('.topTagWrapper').ready(function(){
  $.get('/companyPost/TopTags').done(function(data){
    allTruePosts = data;
    console.log(allTruePosts);
    for (i=0;i<=recentPosts.length;i++) {
      $(".recentPressRelease").append("<div class='newUniquePost'><span class='recentDate'>"+recentPosts[i].date+"</span><span class='recentTitle'><a href='/pressreleases/"+recentPosts[i].slug+"'>"+recentPosts[i].title+"</a></span></div>")
    }
  });
});
