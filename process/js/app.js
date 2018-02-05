var Handlebars = require('handlebars');
var $ = require ('jquery');

$(function() {

  $.getJSON('/data/zenyatta.json', function(data){
    var headerTemplate = $('#headerTemplate').html();
    var headerScript = Handlebars.compile(headerTemplate);
    $('header').append(headerScript(data));
    $('#headerTemplate').remove();

    var tabTemplate = $('#tabTemplate').html();
    // console.log(tabTemplate);
    var tabScript = Handlebars.compile(tabTemplate);
    $('.tab').append(tabScript(data));
    $('#tabTemplate').remove();
  });
}); // Page Ready
