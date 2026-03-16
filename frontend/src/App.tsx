import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/"          element={<HomePage />} />
                <Route path="/contact"   element={<ContactPage />} />
                <Route path="/login"     element={<LoginPage />} />
                <Route path="/register"  element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App