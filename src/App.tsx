import React, {useEffect, useState} from 'react'
import {useSpring, animated as a} from 'react-spring'
import styled from '@emotion/styled'

const deck = [
  {textOne: 'una gota', textTwo: 'a drop'},
  {textOne: 'un chorro', textTwo: 'a stream'},
  {textOne: 'un percance', textTwo: 'a mishap'},
  {textOne: 'destacar', textTwo: 'to emphasize, to stand out'},
  {textOne: 'contraer', textTwo: 'to contract'},
  {textOne: 'reanudar', textTwo: 'to resume'},
  {textOne: 'el afiche', textTwo: 'the poster'},
  {textOne: 'el chubasco', textTwo: 'the heavy shower (weather)'},
  {textOne: 'el telón', textTwo: 'the curtain'},
  {textOne: 'atrapar', textTwo: 'to catch, capture'},
  {textOne: 'manchar', textTwo: 'to stain'}
]

const Wrapper = styled('div')({
  height: '100vh',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  width: '100%',
  position: 'relative'
})

const Card = styled('div')<{isVisible: boolean}>(({isVisible}) => ({
  display: isVisible ? 'flex' : 'none',
  justifyContent: 'center',
  alignItems: 'center',
  height: 480,
  width: 600,
  background: '#0E2539',
  overflow: 'scroll',
  '&:hover': {
    cursor: 'pointer'
  }
}))

const Title = styled('h1')<{isVisible: boolean}>(({isVisible}) => ({
  display: isVisible ? 'flex' : 'none',
  textAlign: 'center',
  fontSize: 32,
  color: '#FFFF',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  maxWidth: 240
}))

const initialCard = deck[Math.floor(Math.random() * deck.length)]

interface Animation {
  opacity: number
  transition: string
}

function App() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showTitle, setShowTitle] = useState(true)
  const [card, setCard] = useState(initialCard)
  const {transform, opacity} = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${isFlipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
    onFrame: (animatiom: Animation) => {
      if (animatiom.opacity.toFixed(1) === '0.5') {
        setShowTitle(true)
      }
    }
  })

  useEffect(() => {
    if (!isFlipped) {
      const newCard = deck[Math.floor(Math.random() * deck.length)]
      setCard(newCard)
    }
  }, [isFlipped])

  const toggleisFlipped = () => {
    setShowTitle(false)
    setIsFlipped(!isFlipped)
  }

  return (
    <Wrapper>
      <a.div
        className="c"
        style={{
          opacity: opacity.interpolate((o: any) => (1 - o) as any),
          transform
        }}
      >
        <Card onClick={toggleisFlipped} isVisible={!isFlipped}>
          <Title isVisible={showTitle}>{card.textOne}</Title>
        </Card>
      </a.div>
      <a.div
        className="c"
        style={{
          opacity,
          transform: transform.interpolate((t) => `${t} rotateX(180deg)`)
        }}
      >
        <Card onClick={toggleisFlipped} isVisible={isFlipped}>
          <Title isVisible={showTitle}>{card.textTwo}</Title>
        </Card>
      </a.div>
    </Wrapper>
  )
}

export default App
