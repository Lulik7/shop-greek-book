import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import PurchasePage from './pages/PurchasePage'

function App() {
    return (
        <BrowserRouter>
            <Helmet>
                <title>ΕΛΛΗΝΙΚΑ · Зоя Павловская</title>
                <meta name="description" content="Курсы греческого языка онлайн с Зоей Павловской" />
            </Helmet>
            <Navbar />
            <Routes>
                <Route path="/"          element={<HomePage />} />
                <Route path="/contact"   element={<ContactPage />} />
                <Route path="/login"     element={<PurchasePage />} />
                <Route path="/purchase"  element={<PurchasePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App