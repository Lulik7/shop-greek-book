import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import PurchasePage from './pages/PurchasePage'
import KaraokePage from './pages/KaraokePage'
import ExercisesPage0 from './pages/ExercisesPage0'
import ExercisesPage1 from './pages/ExercisesPage1'

function App() {
    return (
        <BrowserRouter>
            <Helmet>
                <title>ΕΛΛΗΝΙΚΑ · Зоя Павловская</title>
                <meta name="description" content="Курсы греческого языка онлайн с Зоей Павловской" />
            </Helmet>
            <Navbar />
            <Routes>
                <Route path="/"              element={<HomePage />} />
                <Route path="/contact"       element={<ContactPage />} />
                <Route path="/login"         element={<PurchasePage />} />
                <Route path="/purchase"      element={<PurchasePage />} />
                <Route path="/karaoke"       element={<KaraokePage />} />
                <Route path="/exercises"     element={<Navigate to="/exercises/0" replace />} />
                <Route path="/exercises/0"   element={<ExercisesPage0 />} />
                <Route path="/exercises/1"   element={<ExercisesPage1 />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
