import { tmdbData, TmdbResponse } from "../config/tmdbConfig"

export async function getTmdbData(tmdbId: string) {
  const url: string = `https://api.themoviedb.org/3/movie/${tmdbId}?api_key=${tmdbData.apiKey}`
  const tmdbResponse = await fetch(url).then((response) => {
    if (!response.ok) {
      throw {
        status: response.status,
        statusText: "TMDB ERROR: " + response.statusText,
      }
    }
    return response.json()
  })

  return formatTmdbResponse(tmdbResponse)
}

export function formatTmdbResponse(response: any): TmdbResponse {
  return {
    genres: response.genres
      .map((genre: { id: number; name: string }) => genre.name)
      .join(", "),
    homepage: response.homepage,
    id: response.id,
    overview: response.overview,
    posterPath: `${tmdbData.posterUrl}${response.poster_path}`,
    releaseDate: response.release_date,
    runtime: response.runtime,
    tagline: response.tagline,
    title: response.title,
    movieUrl: `${tmdbData.movieUrl}${response.id}`,
    imdbUrl: `${tmdbData.imdbUrl}${response.imdb_id}`,
  }
}
