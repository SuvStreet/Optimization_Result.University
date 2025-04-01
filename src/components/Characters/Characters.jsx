import s from './style.module.css'

export function Characters({ data }) {
  return (
    <div className={s.character}>
      <div className={s.image}>
        <img src={data.image} alt={data.name} />
      </div>
      <div>
        <h1>{data.name}</h1>
        <p>
          <span>Статус: </span>
          {data.status}
        </p>
        <p>
          <span>Вид: </span>
          {data.species}
        </p>
        <p>
          <span>Гендер: </span>
          {data.gender}
        </p>
        {data.type !== '' && (
          <p>
            <span>Тип: </span>
            {data.type}
          </p>
        )}
      </div>
    </div>
  )
}
