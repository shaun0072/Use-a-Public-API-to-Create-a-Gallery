$(document).ready(function() {

	function searchMovies() {
		$('.results_list').remove();
		var title = document.getElementById('title');
		var movie = $('#title').val();
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
			$('#results_container').append(movieHTML).hide().fadeIn();
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
			var overlay = '<div id="overlay"><div class="lightbox"><span class="close">X</span><span class="next">Next</span><div class="poster-container"><img class="poster" src="';
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
	
	function showNext() {
		var $lightbox = $(this).parent(); // Get $(this).parent() which is lightbox
		var $currentTitle = $lightbox.find('.title').text(); // Get decendant .title
		var $movieList = $('#results_container').find('.result_item');
		var $movieListImg = $movieList.find('img');
		$.each($movieListImg, function(i, movieList) {  // Cycle over each result_item
		$movieListItem = $(movieList);
		  if($currentTitle === $movieListItem.attr('data')) {   //if  $currentTitle === $dataAttr
			$nextMovie = $($movieListItem.parent()[0].nextSibling).find('img');  // Call img.attr("data").parent().next().showMovieInfo()
			$nextMovie = $($nextMovie[0]);
			console.log($nextMovie);
			$nextMovie.showMovieInfo();
		  }	//end if
		}); //end each function
	} //end showNext()
	
	/*App*/
	$('#search').click(searchMovies);
	$('#title').keydown(function(e) {
		var key = e.which;
		if(key === 13) {
			searchMovies();
		}
	});
	$('#results_container').on('click', 'img', showMovieInfo);
	/* $('body').on('click', '.next', showNext); */
	$('body').on('click', '.close', function() {
		$('#overlay').fadeOut();		
	});
	
	
	
});//End Ready



