import { formatDate, formatEpisode } from '../../services'

export function Episode({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>
        <span> Дата выхода: </span>
        {formatDate(data.air_date)}
      </p>
      <p>
        <span> Эпизод: </span>
        {formatEpisode(data.episode)}
      </p>
    </div>
  )
}
