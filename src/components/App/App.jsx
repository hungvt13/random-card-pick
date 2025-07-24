import { useState, useEffect, useRef } from 'react'
import styled from '@emotion/styled'

import CorgiImage from '../../assets/corgi.png'

import { Box, Container, Card, CardContent, Typography, CardMedia } from '@mui/material'

import numberGenerator from '../../utils/numberGenerator'

const StyledBox = styled(Box)`
  background: #141E30;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #243B55, #141E30);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #243B55, #141E30); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

`

function App() {
  const timer = useRef(null)
  const [preset, setPreset] = useState([])
  const [selected, setSelected] = useState(null)
  const [animate, setAnimate] = useState(false)
  const [reveal, setReveal] = useState(false)

  const cards = Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    number: preset?.[index] || 0
  }))

  const handleClickCard = (number) => {
    if (selected) return

    setAnimate(true)

    setSelected(number)
  }

  const getSelectedCard = (number) => {
    return selected === null || selected === number
  }

  useEffect(() => {
    const randomPreset = numberGenerator(1, 10, 9)

    setPreset(randomPreset)
  }, [])

  useEffect(() => {
    if (selected) {
      timer.current = setTimeout(() => {
        setAnimate(false)
        setReveal(true)
      }, 5000)
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer)
      }
    }
  }, [selected])


  console.log('asdasd', preset, cards)

  return (
    <StyledBox
      className
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 1, sm: 2, md: 4 }
      }}
    >

      <Container maxWidth="lg">

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(3, 1fr)",
            gap: { xs: 1, sm: 2, md: 3 },
            width: "100%",
            height: { xs: "80vh", sm: "85vh", md: "80vh" },
            maxWidth: { xs: "95vw", sm: "90vw", md: "100%" }
          }}
        >
          {
            cards.map((card) => (
              <Card
                elevation={5}
                key={card.id}
                sx={{
                  display: "flex",
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: 0
                }}
                onClick={
                  () => handleClickCard(card.number)
                }
              >
                <CardMedia
                  component={'img'}
                  // height={'50%'}
                  image={CorgiImage}
                  className={`${animate || selected === card.number ? 'animate__animated' : ''}  ${reveal ? 'animate__bounce' : 'animate__jello'} animate__infinite animate__slow`}
                  sx={{
                    filter: `${getSelectedCard(card.number) ? 'grayscale(0)' : 'grayscale(1)'}`,
                    width: 'auto',
                    height: '50%'
                  }}
                />
                {
                  reveal && (
                    <CardContent
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: "center",
                        justifyContent: 'center',
                        p: { xs: 1, sm: 2, md: 3 },
                        minHeight: 0
                      }}
                    >
                      <Typography
                        variant={`${getSelectedCard(card.number) ? 'h3' : 'h4'}`}
                      >
                        {card.number}
                      </Typography>
                    </CardContent>
                  )
                }
              </Card>
            ))
          }
        </Box>
      </Container>
    </StyledBox>
  )
}

export default App
