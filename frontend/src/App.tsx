import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import PurchasePage from './pages/PurchasePage'


function App() {
    return (
        <BrowserRouter>
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