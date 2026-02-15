import { Routes, Route, Navigate } from 'react-router-dom'
import Review from '../components/pages/Review'
import ExamsSection from '../components/pages/Exams'
import StudyAbroadScope from '../components/pages/StudyAbroadScope'
import InstitutionalScholarships from '../components/pages/Scholarships'
import HomeSection from '../components/pages/Home'
import Registration from '../components/pages/Registration'
import CourseModules from '../components/pages/CourseModules'
import CareerBoost from '../components/pages/CareerBoost'
import CourseOverview from '../components/pages/CourseOverview'
import ActiveCommunity from '../components/pages/ActiveCommunity'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomeSection />} />
      
      {/* Course Modules Route */}
      {/* <Route path="/course-modules" element={<CourseModules />} /> */}
      
      {/* Career Boost Route */}
      <Route path="/career-boost" element={<CareerBoost />} />
      
      {/* Course Overview Route */}
      <Route path="/course-overview" element={<CourseOverview />} />
      
      {/* Active Community Route */}
      <Route path="/community" element={<ActiveCommunity />} />
      
      {/* Registration Route */}
      <Route path="/registration" element={<Registration />} />
      
      {/* Exams Route */}
      <Route path="/exams" element={<ExamsSection />} />
      
      {/* Scholarships Route */}
      <Route path="/scholarships" element={<InstitutionalScholarships />} />
      
      {/* Reviews Route */}
      {/* <Route path="/reviews" element={<Review />} /> */}
      
      {/* Study Abroad Scope Route */}
      <Route path="/study-abroad" element={<StudyAbroadScope />} />
      
      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes
