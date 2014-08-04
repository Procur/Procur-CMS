$('.usersName').ready(function(){
  $.get('/greetUser').done(function(data){
    $('.usersName').append("<p class='welcomeMessage'>Welcome to the CMS "+data.user.firstName+"</p>");
  });
});
