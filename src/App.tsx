import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartIcon from './components/CartIcon';
import Chatbot from './components/Chatbot';
import HomePage from './pages/HomePage';
import EducationPage from './pages/EducationPage';
import LaptopsPage from './pages/LaptopsPage';
import ServicePage from './pages/ServicePage';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/AdminPage';
import { CartProvider } from './context/CartContext';
import { FiltersProvider } from './context/FiltersContext';
import AboutPage from './pages/AboutPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FiltersProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <CartIcon />
              <Chatbot />
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: '#333',
                    color: '#fff',
                    borderRadius: '0.5rem',
                  },
                  success: {
                    iconTheme: {
                      primary: '#F0DB4F',
                      secondary: '#000',
                    },
                  },
                }}
              />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/education" element={<EducationPage />} />
                  <Route path="/laptops" element={<LaptopsPage />} />
                  <Route path="/services" element={<ServicePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/about" element={<AboutPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </FiltersProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;