import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ContentProvider } from './context/ContentContext'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import AppRoutes from './routes/Routes'

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-[#0a1420] flex flex-col">
            <Header />
            <main className="pt-20 pb-16 px-4 sm:px-6 max-w-full mx-auto flex-grow">
              <AppRoutes />
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ContentProvider>
    </ThemeProvider>
  )
}

export default App
