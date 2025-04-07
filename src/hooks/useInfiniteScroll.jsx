import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import { BASE_URL, VALID_CATEGORIES } from '../constants'

export function useInfiniteScroll(category) {
  const [pageNumber, setPageNumber] = useState(1)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setData([])
    window.scrollTo(0, 0)
    setPageNumber(1)
  }, [category])

  useEffect(() => {
    if (!VALID_CATEGORIES.includes(category)) {
      return navigate('/', { replace: true })
    }

    let cancel
    setIsLoading(true)
    setError(null)

    axios({
      method: 'GET',
      url: `${BASE_URL}/${category}`,
      params: {
        page: pageNumber,
      },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setData((prev) => [
          ...prev,
          ...response.data.results.map((item) => {
            return { id: item.id, name: item.name }
          }),
        ])
        setHasMore(response.data.info.pages > pageNumber)
        setIsLoading(false)
      })
      .catch((error) => {
        if (axios.isCancel(error)) return
        setError(error)
        setIsLoading(false)
      })

    return () => cancel()
  }, [category, pageNumber])

  return { data, isLoading, error, hasMore, setData, setPageNumber }
}
