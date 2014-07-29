$('#nowCheckbox').click( function(){
  if ( this.checked) {
    $('#futureCheckbox').prop('disabled', true);
  } else {
    $('#futureCheckbox').prop('disabled', false);
  }
});

$('#futureCheckbox').click( function(){
  if ( this.checked) {
    $('#nowCheckbox').prop('disabled', true);
  } else {
    $('#nowCheckbox').prop('disabled', false);
  }
});

$('#futureCheckbox').click( function(){
    $('#futureDate').slideToggle("slow");
});
