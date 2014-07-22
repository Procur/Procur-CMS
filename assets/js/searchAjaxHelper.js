
$('.searchInput').keyup(function(e){
  theWord = $(this).val();
  console.log(theWord);
  $('.searchForm').attr('action', '/marketingblogsearch?word='+ theWord);
});
