import { Routes, Route, Navigate } from 'react-router-dom'
import './styles/global.css'

import Home from './pages/Home'
import Details from './pages/Details'

function App() {
    return (
        <div className="App">
            <div class="content-container">
                <div class="logo">
                    Jikan <span>Moe</span>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<Navigate to="/anime" />} />
                <Route path="/anime" element={<Home />} />
                <Route path="/anime/:id" element={<Details />} />
            </Routes>
        </div>
    )
}

export default App
