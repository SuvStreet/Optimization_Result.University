export function formatDate(dateString) {
  const months = {
    January: 'января',
    February: 'февраля',
    March: 'марта',
    April: 'апреля',
    May: 'мая',
    June: 'июня',
    July: 'июля',
    August: 'августа',
    September: 'сентября',
    October: 'октября',
    November: 'ноября',
    December: 'декабря',
  }

  const date = new Date(dateString)
  const day = date.getDate()
  const month = months[date.toLocaleString('en', { month: 'long' })]
  const year = date.getFullYear()

  return `${day} ${month} ${year} года`
}
