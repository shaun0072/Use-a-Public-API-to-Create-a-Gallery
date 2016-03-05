$(document).ready(function() {

var title = document.getElementById('title');

	function searchMovies() {		
		var movie = $(title).val();
		var year  = $('#year').val();
		var API = "http://www.omdbapi.com/?";
		var movieData = {
			s        :  movie,
			y        :  year,
			type     :  "movie",
			r        :  "json"
		};
		function displayMovie(data) {
			var movieArray = data.Search;
			var movieHTML = '<ul class="results_list">';
			$.each(movieArray, function(i, movie) {
				if(movie.Poster !== "N/A") {
					movieHTML += '<li class="result_item"> <img src="';
					movieHTML += movie.Poster;
					movieHTML += '" data="';
					movieHTML += movie.Title;
					movieHTML += '" /></li>';
				}	
			});//End .each()
			movieHTML += '</ul>';
			$('.results_list').remove(); //Clear current results
			$('#results_container').append(movieHTML).hide().fadeIn(); //Append Results to #results_container
		}
		$.getJSON(API, movieData, displayMovie);
		title.value = "";
	}//End searchMovies
		
	function showMovieInfo() {
		console.log($(this));
		var movie = $(this).attr("data");
		var API = "http://www.omdbapi.com/?";
		API += 't=';
		API += movie;
		API += '&plot=full&tomatoes=true&r=json';
		function displayMovie(data) {
			$('#overlay').remove();
			var overlay = '<div id="overlay"><div class="lightbox"><span class="close">X</span><div class="poster-container"><img class="poster" src="';
				overlay += data.Poster;
				overlay += '" /></div><div class="movie-info-container"><div class="title-container"><span class="label">Title: </span><span class="title">';
				overlay += data.Title;
				overlay += '</span></div><div class="year-container"><span class="label">Year: </span><span class="year">';
				overlay += data.Year;
				overlay += '</span></div><div class="rated-container"><span class="label">Rated: </span><span class="rating">';
				overlay += data.Rated;
				overlay += '</span></div><div class="runtime-container"><span class="label">Runtime: </span><span class="runtime">';
				overlay += data.Runtime;
				overlay += '</span></div><div class="critic-review-container"><span class="label">Crtic Review: </span><span class="critic-review">';
				overlay += data.tomatoMeter + '%';
				overlay += '</span></div><div class="user-review-container"><span class="label">User Review: </span><span class="user-review">';
				overlay += data.tomatoUserMeter + '%';
				overlay += '</span></div></div><div class="plot-container"><p class="plot">';
				overlay += data.Plot;
				overlay += '</p></div></div></div>';
				$('body').append(overlay);
				$('#overlay').fadeIn();
		}
		$.getJSON(API, displayMovie);
	} //End showMovieInfo

	
	/*App*/
	$('#search').click(searchMovies); //Call searhMovies() on click of search button
	$('#title').keydown(function(e) { //Call searchMovies() on Enter keydown
		var key = e.which;
		if(key === 13) {
			searchMovies();
		}
	});
	$('#results_container').on('click', 'img', showMovieInfo); //Call showMovieInfo on click of img
	$('body').on('click', '.close', function() { //Hide lightbox on click of .close
		$('#overlay').fadeOut();		
	});
	
	
	
});//End Ready



