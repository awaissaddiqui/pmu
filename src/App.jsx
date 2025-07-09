import { lazy, useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Home from './Pages/Home'
import Scholarships from './Pages/Scholarships'
import Projects from './Pages/Projects'
import Jobs from './Pages/Jobs'
import Alumni from './Pages/Alumni'
import Research from './Pages/Reaserch'
import Login from './Pages/Login'
import Admin from './Pages/Admin'
import Footer from './components/Footer'
const ResearchForm = lazy(() => import('./components/Forms/RegistrationForm'))
const CoverSheet = lazy(() => import('./components/Forms/CoverSheet'))
import ProjectDetails_1 from './components/Forms/ProjectDetails_1'
import ProjectDetails_2 from './components/Forms/ProjectDetails_2'
import ProjectDetails_3 from './components/Forms/ProjectDetails_3'
import InformationForm from './components/Forms/InformationForm'
import ChecklistForm from './components/Forms/ChecklistForm'
import CMEEF from './components/scholarshipDetails/CMEEF'
import HEEF from './components/scholarshipDetails/HEEF'
import { ResearchFormProvider } from './Context/ResearchFormContext';
import { AuthProvider } from './Context/AuthProvider';
import ProtectedRoute from './Context/ProtectedRoute';
import AdminFormDetails from './Pages/AdminFormDetails'
import UnNationalProgram from './components/scholarshipDetails/cmeefDetails/UnNationalProgram'
import GraduateNationalProgram from './components/scholarshipDetails/cmeefDetails/GraduateNationalProgram'
import PHDInternational from './components/scholarshipDetails/cmeefDetails/PHDInternational'
import UnNationalProgramPage2 from './components/scholarshipDetails/cmeefDetails/UnNationalProgramPage2'
import Error from './Pages/Error'
import { UndergraduateFormProvider } from './Context/UndergraduateFormContext'
import AdminUndergradFormDetail from './Pages/AdminUndergradFormDetail'
import { GraduateNationalFormProvider } from './Context/GraduateNationalFormContext'
import { PHDInternationalFormProvider } from './Context/PHDInternationalFormProvider'
import AdminGraduateNational from './Pages/AdminGraduateNational'
import AdminPhdInternational from './Pages/AdminPhdInternational'
import ScrollToTop from './components/ScrollToTop'
import UserLogin from './auth/UserLogin'
import UserSignup from './auth/UserSignup'
import UserProfile from './Pages/UserProfile'
import UserProtectedRoute from './Context/UserProtectedRoute'
function App() {
  return (
    <AuthProvider>
      <UndergraduateFormProvider>
        <GraduateNationalFormProvider>
          <PHDInternationalFormProvider>
            <ResearchFormProvider>
              <Router>
                <Navbar />
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/scholarships" element={<Scholarships />} />
                  <Route path="/scholarships/CMEEF/details" element={<CMEEF />} />

                  <Route path='/user/login' element={<UserLogin />} />
                  <Route path='/user/registration' element={<UserSignup />} />
                  <Route path="/user/scholarships/profile" element={<UserProtectedRoute><UserProfile /></UserProtectedRoute>} />
                  <Route path="/scholarships/CMEEF/details/UnNationalProgram" element={<UserProtectedRoute><UnNationalProgram /></UserProtectedRoute>} />
                  <Route path="/scholarships/CMEEF/details/UnNationalProgram/page2" element={<UserProtectedRoute><UnNationalProgramPage2 /></UserProtectedRoute>} />
                  <Route path="/scholarships/CMEEF/details/GraduateNationalProgram" element={<UserProtectedRoute><GraduateNationalProgram /></UserProtectedRoute>} />
                  <Route path="/scholarships/CMEEF/details/PHDInternational" element={<UserProtectedRoute><PHDInternational /></UserProtectedRoute>} />
                  <Route path="/scholarships/HEEF/details" element={<HEEF />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/advertisement" element={<Jobs />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/research/registration" element={<UserProtectedRoute><ResearchForm /></UserProtectedRoute>} />
                  <Route path="/research/registration/coversheet" element={<UserProtectedRoute><CoverSheet /></UserProtectedRoute>} />
                  <Route path="/research/registration/coversheet/details1" element={<UserProtectedRoute><ProjectDetails_1 /></UserProtectedRoute>} />
                  <Route path="/research/registration/coversheet/details2" element={<UserProtectedRoute><ProjectDetails_2 /></UserProtectedRoute>} />
                  <Route path="/research/registration/coversheet/details3" element={<UserProtectedRoute><ProjectDetails_3 /></UserProtectedRoute>} />
                  <Route path="/research/registration/coversheet/details/information" element={<UserProtectedRoute><InformationForm /></UserProtectedRoute>} />
                  <Route path="/research/registration/coversheet/details/checklist" element={<UserProtectedRoute><ChecklistForm /></UserProtectedRoute>} />

                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                  <Route path="/admin/form-details/:email" element={<ProtectedRoute><AdminFormDetails /></ProtectedRoute>} />
                  <Route path="/admin/form-details-undergrad/:email" element={<ProtectedRoute><AdminUndergradFormDetail /></ProtectedRoute>} />
                  <Route path="/admin/form-details-graduate/:email" element={<ProtectedRoute><AdminGraduateNational /></ProtectedRoute>} />
                  <Route path="/admin/form-details-phd/:email" element={<ProtectedRoute><AdminPhdInternational /></ProtectedRoute>} />
                  <Route path="*" element={<Error />} />

                </Routes>
                <Footer />
              </Router>
            </ResearchFormProvider>
          </PHDInternationalFormProvider>
        </GraduateNationalFormProvider>
      </UndergraduateFormProvider>
    </AuthProvider>
  );
}

export default App;
