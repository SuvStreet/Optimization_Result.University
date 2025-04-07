import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError', error)
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.log('error', error)
    console.log('info', info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ой, что-то пошло не так.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
