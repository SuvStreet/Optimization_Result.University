export const Button = (props) => {
  const { text = 'Button' } = props

  return <button className={props.className} {...props}>{text}</button>
}
