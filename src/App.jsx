import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const photos = [
  {
    src: '/public/images/nosso-primeiro-encontro.jpeg',
    alt: 'Casal segurando flores',
    caption: 'Nosso primeiro encontro',
  },
  {
    src: '/public/images/dia-do-presente.jpeg',
    alt: 'Casal abraçado em um momento feliz',
    caption: 'O dia que eu ganhei uns presentes seuu',
  },
  {
    src: '/public/images/flores.jpeg',
    alt: 'Mãos juntas com aliança',
    caption: 'A primeira vez que dei flores pra você!',
  },
  {
    src: '/public/images/melhor-dia.jpeg',
    alt: 'Casal caminhando ao pôr do sol',
    caption: 'Um dos melhores dia com você',
  },
  {
    src: '/public/images/ano-novo.jpeg',
    alt: 'Casal caminhando ao pôr do sol',
    caption: 'Nosso primeiro ano juntinhos, amo você',
  },
]

const timeline = [
  {
    title: 'O dia que nos conhecemos',
    date: 'Fevereiro de 2025',
    description: 'Tudo ficou mais bonito no instante em que nossos caminhos se cruzaram.',
  },
  {
    title: 'Nosso primeiro encontro',
    date: 'Março de 2025',
    description: 'Risos tímidos, olhos brilhando e uma conexão que parecia destino.',
  },
  {
    title: 'Inicio do nosso namoro',
    date: 'Junho de 2025',
    description: 'Um dia simples que virou memória eterna.',
  },
  {
    title: 'Momentos inesquecíveis',
    date: 'Hoje e sempre',
    description: 'Cada capítulo com você é o meu favorito.',
  },
]

const reasons = [
  'Seu sorriso ilumina meus dias.',
  'Seu carinho me faz sentir em casa.',
  'Você me inspira a ser melhor.',
  'Com você, tudo ganha mais cor.',
  'Seu abraço acalma meu mundo.',
  'Nós rimos até das coisas mais simples.',
  'Você cuida de mim com amor de verdade.',
  'Seu olhar diz mais do que mil palavras.',
  'Cada momento com você vira lembrança especial.',
  'Eu amo você por inteiro, todos os dias.',
]

function App() {
  const photosRef = useRef(null)
  const [showSurprise, setShowSurprise] = useState(false)
  const [heartBurst, setHeartBurst] = useState(0)

  const sparkles = useMemo(
    () =>
      Array.from({ length: 18 }, (_, index) => ({
        id: index,
        left: `${5 + Math.random() * 90}%`,
        top: `${5 + Math.random() * 85}%`,
        duration: `${4 + Math.random() * 6}s`,
        delay: `${Math.random() * 3}s`,
      })),
    [],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.16 },
    )

    const elements = document.querySelectorAll('.reveal')
    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) => observer.unobserve(element))
      observer.disconnect()
    }
  }, [])

  const scrollToPhotos = () => {
    photosRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSurprise = () => {
    setShowSurprise(true)
    setHeartBurst((value) => value + 1)
  }

  return (
    <main className="romantic-site">
      <section className="hero">
        <div className="glow glow-one" />
        <div className="glow glow-two" />

        {sparkles.map((sparkle) => (
          <span
            key={sparkle.id}
            className="sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              animationDuration: sparkle.duration,
              animationDelay: sparkle.delay,
            }}
            aria-hidden="true"
          />
        ))}

        <div className="hero-content reveal">
          <p className="hero-tag">Feliz Dia das Mulheres, meu amor</p>
          <h1>
            Você é o verso mais bonito
            <br />
            da minha vida.
          </h1>
          <p className="hero-subtitle">
            Hoje é sobre celebrar sua força, sua delicadeza e tudo o que torna você simplesmente inesquecível.
          </p>
          <button type="button" className="primary-btn" onClick={scrollToPhotos}>
            Abrir nossa história ❤️
          </button>
        </div>
      </section>

      <section ref={photosRef} className="section reveal">
        <h2>Nossas memórias</h2>
        <p className="section-subtitle">Troque as imagens pelos nossos momentos favoritos.</p>
        <div className="photo-carousel" role="list" aria-label="Galeria de fotos do casal">
          {photos.map((photo) => (
            <article key={photo.src} className="photo-card" role="listitem">
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <p>{photo.caption}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <h2>Nossa linha do tempo</h2>
        <div className="timeline">
          {timeline.map((event) => (
            <article key={event.title} className="timeline-item">
              <span className="dot" aria-hidden="true" />
              <p className="timeline-date">{event.date}</p>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section reveal">
        <h2>Uma carta para você</h2>
        <article className="love-letter">
          <p>
            Meu amor, hoje eu só quero te lembrar de algo que talvez você já saiba, mas que merece ser repetido:
            você é extraordinária. Em cada detalhe seu, mora uma força linda, um coração gigante e uma luz que
            transforma tudo ao redor.
          </p>
          <p>
            Obrigado por existir na minha vida, por me ensinar amor nos gestos simples e por caminhar comigo com tanta
            verdade. Que essa seja apenas mais uma página de uma história incrível que ainda vamos escrever juntos.
          </p>
          <p>Com todo meu amor, hoje e sempre.</p>
        </article>
      </section>

      <section className="section reveal">
        <h2>10 motivos pelos quais eu amo você</h2>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <article key={reason} className="reason-card">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{reason}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section surprise reveal">
        <h2>Última surpresa</h2>
        <p className="section-subtitle">Tem mais um recadinho esperando por você.</p>

        <button type="button" className="primary-btn" onClick={handleSurprise}>
          Clique para uma surpresa
        </button>

        {showSurprise && (
          <article className="surprise-message">
            <p>
              Em qualquer estação, em qualquer fase, em qualquer lugar: minha escolha continua sendo você.
              Feliz Dia das Mulheres, meu amor.
            </p>
          </article>
        )}

        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={`${heartBurst}-${index}`}
            className="burst-heart"
            style={{
              left: `${8 + Math.random() * 84}%`,
              animationDelay: `${Math.random() * 0.35}s`,
            }}
            aria-hidden="true"
          >
            ❤
          </span>
        ))}
      </section>
    </main>
  )
}

export default App
