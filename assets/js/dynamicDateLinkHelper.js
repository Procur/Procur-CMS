$('.dynamicDateLinks').ready( function(){
  $.get('/companyPost/dateFetch').done(function(data){
    console.log(data);
  });
});
