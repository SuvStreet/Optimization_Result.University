import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link, useSearchParams } from 'react-router'
import axios from 'axios'

import { BASE_URL, VALID_CATEGORIES } from '../constants'

export function Category() {
  const { category } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams({ _sort: '' })
  const sort = searchParams.get('_sort')

  useEffect(() => {
    if (!VALID_CATEGORIES.includes(category)) {
      return navigate('/', { replace: true })
    }

    categoryData()
  }, [category])

  const categoryData = async () => {
    setIsLoading(true)

    try {
      const { data } = await axios.get(`${BASE_URL}/${category}`)

      setData(data)

      if (sort) {
        sortData(sort, data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const sortData = (options, data) => {
    switch (options) {
      case 'asc':
        setSearchParams({ _sort: 'asc' })
        setData(data.sort((a, b) => a.name.localeCompare(b.name)))
        break
      case 'desc':
        setSearchParams({ _sort: 'desc' })
        setData(data.sort((a, b) => b.name.localeCompare(a.name)))
        break
      default:
        break
    }
  }

  if (isLoading) {
    return (
      <>
        <p>Загрузка данных...</p>
      </>
    )
  }

  if (data.length === 0 && !isLoading) {
    return (
      <>
        <p>Ой, тут пусто...</p>
      </>
    )
  }

  return (
    <>
      <div>
        <button onClick={() => sortData('asc', data)} disabled={sort === 'asc'}>
          Сортировать по А-Я
        </button>
        <button
          onClick={() => sortData('desc', data)}
          disabled={sort === 'desc'}
        >
          Сортировать по Я-А
        </button>
      </div>
      {
        <ul>
          {data.map((item) => (
            <li key={item.id}>
              <Link to={item.id}>{item.name}</Link>
            </li>
          ))}
        </ul>
      }
    </>
  )
}
