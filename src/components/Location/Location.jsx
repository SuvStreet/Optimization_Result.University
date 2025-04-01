export function Location({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <ul className="list">
        <li>
          <span style={{ fontWeight: 'bold' }}>Тип:</span> {data.type}
        </li>
        <li>
          <span style={{ fontWeight: 'bold' }}>Расположение:</span> {data.dimension}
        </li>
      </ul>
    </div>
  )
}
