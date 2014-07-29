
$('.searchInput').keyup(function(e){
  theWord = $(this).val();
  $('.searchForm').attr('action', '/companyblogsearch?word='+ theWord);
});
