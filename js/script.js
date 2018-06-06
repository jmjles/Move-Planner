
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $wikiheader = $('#wikipedia-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ address +'';
    $body.append('<img class="bgimg" src="' + streetviewURL + '">"');

    var nytimesUrl ='http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+ cityStr + '&sort=newest&api-key=2952870462684dddb171a8612421ed0d';

    $.getJSON(nytimesUrl, function(data){
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);
        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++){
            var article = articles[i];
            $nytElem.append('<li class="article">'+'<a href = "'+article.web_url +'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
        };
    }).fail(function(e){
            $nytimes-header.text('New York Times Could Not Be Loaded');
        });
    // YOUR CODE GOES HERE!
    var wikiUrl ='http://en.wiki09pedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Failed to get wikipedia recources");
    },8000);
    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function(response){
            var articleList = response[1];

            for(var i = 0; i < articleList.length; i++)
            {
            articleStr = articleList[i];
            var url = 'http://en.wikipedia.org/wiki/' + articleStr;
            $wikiElem.append('<li><a href="' + url +'">' + articleStr + '</a></li>');
        };
        clearTimeout(wikiRequestTimeout);
        }
        });

    return false;
};

$('#form-container').submit(loadData);
