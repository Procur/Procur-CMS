$('.usersName').ready(function(){
  $.get('/greetUser').done(function(data){
    console.log(data);
    $('.usersName').append(post.firstName);
  })
})
