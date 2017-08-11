$(document).ready(function() {
  //Variables
  search = "";
  //Watch
  $('#formSearch').on('submit', doSearch);
  //Execute
  $("#wikiText").hide();
});

function doSearch(event) {
  event.preventDefault();
  search = document.getElementById("inputSearch").value;
  // Make API call
  $.getJSON("https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=" + search + "&limit=5&namespace=0&format=json").done(gotWiki).fail(console.log("error " + textStatus));}

function gotWiki(data) {
  $('#wikiText').empty();
  $("#wikiText").show();
  var hits = data[2].length;
  //Build Header
  $('#wikiText').append("<div style='text-align: center; font-size: calc(100% + 1vw);'>Showing top " + hits + " Wikipedia results for <span style='font-size: calc(100% + 1vw); font-variant: small-caps;'>" + search + "</span></div><br>");
  for (i = 0; i < hits; i++) {
    // Build link
    $('#wikiText').append("<a id='wikiLink' style='text-decoration: none; color: black;' href='" + data[3][i] + "' target='_blank'>" + data[2][i] + "</a><br><br>");
  }
}

function getRandom() {
  $.getJSON("https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exchars=500&format=json&exintro=").done(update).fail(console.log("error " + textStatus));}

function update(data) {
  $('#formSearch').children('input').val('');
  $('#wikiText').empty();
  $("#wikiText").show();
  // Build header
  $('#wikiText').append("<div style='text-align: center; font-size: calc(100% + .8vw);'>Your randomly selected entry<br>click link for the full article.</div><br>");
  var results = data.query.pages;
    for (var oneResult in results) {
      //Stip unwanted info/html
      results[oneResult].extract = results[oneResult].extract.replace(/<(?:.|\n)*?>/gm, '');
      // Build link
      $('#wikiText').append("<a id='wikiLink' style='text-decoration: none; color: black;' href='https://en.wikipedia.org/?curid=" + results[oneResult].pageid + " target='_blank'><b>" + results[oneResult].title + "</b> -- " + results[oneResult].extract + "</a>");
    }
}
