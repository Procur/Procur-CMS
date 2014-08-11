
$('.searchInput').keyup(function(e){
  theWord = $(this).val();
  $('.searchForm').attr('action', '/Blogsearch?word='+ theWord);
});
