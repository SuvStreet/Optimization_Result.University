import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import axios from 'axios'

import { Location, Characters, Episode } from '../components'

import { BASE_URL } from '../constants'

export function Detail() {
  const { id, category } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    detailData()
  }, [id, category])

  const detailData = async () => {
    setIsLoading(true)

    try {
      const { data } = await axios.get(`${BASE_URL}/${category}/${id}`)

      setData(data)
    } catch (error) {
      if (error.response?.status === 404) {
        return navigate(`/${category}`, { replace: true })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const render = () => {
    switch (category) {
      case 'characters':
        return <Characters data={data} />
      case 'location':
        return <Location data={data} />
      case 'episode':
        return <Episode data={data} />
      default:
        return null
    }
  }

  if (Object.keys(data).length === 0) return <p>Ой, тут пусто...</p>

  return <>{isLoading ? <p>Загрузка данных...</p> : <>{render()}</>}</>
}
