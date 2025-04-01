import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Icon = ({ className, iconCode }) => {
  return <FontAwesomeIcon className={className} icon={iconCode} />
}
