const tmdbKey = '0fe48572e53d126d1535df28216844dc';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  let genreRequestEndpoint = '/genre/movie/list';
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  
  try{
     const response =  await fetch(urlToFetch)
     if (response.ok) {
        let jsonResponse = await response.json();
      
        const genres = jsonResponse.genres;
        return genres;
     } else {

     };

  } catch(error){
    console.log(error);

  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = '/discover/movie';
  let requestParams = `?api_key=${tmdbKey}&with_genre=${selectedGenre}`;
  let urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

  try {
    let response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    }
  } catch(error) {
    console.log(error);
  }

};

const getMovieInfo = async (movie) => {
  let movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  let requestParams = `?api_key=${tmdbKey}`;
  let urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

  try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const movieInfo = await response.json();
    return movieInfo;
  }
  } catch(error) {
    console.log(error);
  }
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  };
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;