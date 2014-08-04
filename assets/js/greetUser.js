$('.usersName').ready(function(){
  $.get('/greetUser').done(function(data){
    console.log(data);
    $('.usersName').append("<h3>"+data.firstName+"</h3>");
  });
});
