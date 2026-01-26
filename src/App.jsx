import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ContentProvider } from './context/ContentContext'
import Header from './components/header/Header'
import AppRoutes from './routes/Routes'

function App() {
  return (
    <ThemeProvider>
      <ContentProvider>
        <BrowserRouter>
          <div className="min-h-screen">
            <Header />
            <main className="pt-20 pb-16 px-4 sm:px-6 max-w-full mx-auto">
              <AppRoutes />
            </main>
          </div>
        </BrowserRouter>
      </ContentProvider>
    </ThemeProvider>
  )
}

export default App
