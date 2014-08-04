$('.usersName').ready(function(){
  $.get('/greetUser').done(function(data){
    $('.usersName').append(post.firstName);
  })
})
