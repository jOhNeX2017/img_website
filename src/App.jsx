import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { ContentProvider } from './context/ContentContext'
import Header from './components/header/Header'
import Review from './components/pages/Review'
import ExamsSection from './components/pages/Exams'
import StudyAbroadScope from './components/pages/StudyAbroadScope'
import InstitutionalScholarships from './components/pages/Scholarships'
import HomeSection from './components/pages/Home'
import Registration from './components/pages/Registration'
import CourseModules from './components/pages/CourseModules'
import CareerBoost from './components/pages/CareerBoost'
import CourseOverview from './components/pages/CourseOverview'
import ActiveCommunity from './components/pages/ActiveCommunity'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    return hash || 'home'
  })

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash) {
      setCurrentPage(hash)
      setTimeout(() => {
        const section = document.getElementById(hash)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
    }
  }, []);

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  // Render Home Page (Default)
  return (
    <ThemeProvider>
      <ContentProvider>
        <div className="min-h-screen">
          <Header onNavigate={navigateTo} currentPage={currentPage} />
          
          {/* Main Content */}
          <main className="pt-24 pb-16 px-4 sm:px-6">
            {/* Home Section */}
            <HomeSection />

            {/* Course Modules - Unified Scroll Component */}
            <CourseModules />

            {/* Career Boost Section */}
            <CareerBoost />

            {/* Course Overview Section */}
            <CourseOverview />

            {/* Active Community Section */}
            <ActiveCommunity />

            {/* Registration Section */}
            {currentPage === 'registration' && (
              <Registration />
            )}

            {/* Exams Section */}
            <ExamsSection />

            {/* Study Abroad Scope Section */}
            {/* <StudyAbroadScope /> */}

            {/* Institutional Scholarships and Events Section */}
            <InstitutionalScholarships />

            {/* Reviews Section */}
            <Review />
          </main>
        </div>
      </ContentProvider>
    </ThemeProvider>
  )
}

export default App

