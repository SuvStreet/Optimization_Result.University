import { useCallback, useRef } from 'react'
import { useParams, Link, useSearchParams } from 'react-router'

import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

export function Category() {
  const { category } = useParams()

  const { data, isLoading, error, hasMore, setData, setPageNumber } =
    useInfiniteScroll(category)

  const observer = useRef()

  const lastNodeRef = useCallback(
    (node) => {
      if (isLoading) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [isLoading, hasMore]
  )

  const [searchParams, setSearchParams] = useSearchParams({ _sort: '' })
  const sort = searchParams.get('_sort')

  const setSortData = (options, data) => {
    if (sort === options) {
      searchParams.delete('_sort')
      setSearchParams(searchParams)
      setData(data)
      return
    }

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

  const sortData = [...data].sort((a, b) => {
    if (sort === 'asc') {
      return a.name.localeCompare(b.name)
    }
    if (sort === 'desc') {
      return b.name.localeCompare(a.name)
    }
    return 0
  })

  if (data.length === 0 && !isLoading) {
    return (
      <>
        <p>Ой, тут пусто...</p>
      </>
    )
  }

  return (
    <>
      <div className="sortGroupButtons">
        <button
          className={sort === 'asc' ? 'activeSort' : ''}
          onClick={() => setSortData('asc', data)}
        >
          Сортировать по А-Я
        </button>
        <button
          className={sort === 'desc' ? 'activeSort' : ''}
          onClick={() => setSortData('desc', data)}
        >
          Сортировать по Я-А
        </button>
      </div>
      <ul style={{ scrollBehavior: 'smooth' }}>
        {sortData.map((item, index) => {
          if (data.length - 10 === index + 1) {
            return (
              <li ref={lastNodeRef} key={item.id}>
                <Link to={item.id.toString()}>{item.name}</Link>
              </li>
            )
          } else {
            return (
              <li key={item.id}>
                <Link to={item.id.toString()}>{item.name}</Link>
              </li>
            )
          }
        })}
        {isLoading && <p>Загрузка данных...</p>}
        {error && <p>Произошла ошибка: {error}</p>}
      </ul>
    </>
  )
}
