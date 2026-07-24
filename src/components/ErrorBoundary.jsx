import { Component } from 'react'

// Beklenmedik bir hata olursa siyah ekran yerine bir mesaj gösterir.
// Kullanıcı "Yeniden dene" ile sayfayı, uygulamayı baştan yüklemeden toparlayabilir.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {
    // Çeviri kaynaklı DOM bozulmalarında bir sonraki render'da toparlanmayı dene
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 40, textAlign: 'center' }}>
          <p style={{ color: 'var(--muted)' }}>Bir şeyler ters gitti. Lütfen tekrar deneyin.</p>
          <button className="btn btn-gold" onClick={() => this.setState({ hasError: false })}>
            Yeniden dene
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
