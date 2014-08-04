$('.usersName').ready(function(){
  $.get('/greetUser').done(function(data){
    console.log(data.user.firstName);
    $('.usersName').append("<h3>"+data.firstName+"</h3>");
  });
});
