/*
export const getPopularMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json();
    return data.results
};

export const getTopRatedMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`)
    const data = await response.json();
    return data.results
};

export const getUpcomingMovies = async () => {
    const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`)
    const data = await response.json();
    return data.results
};

export const searchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data = await response.json();
    return data.results
};
*/

// param and query if needed

export const getWeatherData = async () => {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=-37.8136&longitude=144.9631&daily=sunrise,sunset,uv_index_max&hourly=temperature_2m,precipitation_probability,precipitation&timezone=Australia%2FSydney&past_days=7")
    const data = await response.json();
    return data
};
/*
export const getRecords = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json();
    return data.results
};

export const getForecast = async () => {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
    const data = await response.json();
    return data.results
};*/