import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Footer from './footer/footer.jsx'
import Header from './Header/header.jsx'
import Body from './body/body.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Body />
    <Footer />
  </StrictMode>,
)
