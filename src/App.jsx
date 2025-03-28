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
                  <Route path="/scholarships/CMEEF/details/UnNationalProgram" element={<UnNationalProgram />} />
                  <Route path="/scholarships/CMEEF/details/UnNationalProgram/page2" element={<UnNationalProgramPage2 />} />
                  <Route path="/scholarships/CMEEF/details/GraduateNationalProgram" element={<GraduateNationalProgram />} />
                  <Route path="/scholarships/CMEEF/details/PHDInternational" element={<PHDInternational />} />
                  <Route path="/scholarships/HEEF/details" element={<HEEF />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/alumni" element={<Alumni />} />
                  <Route path="/research" element={<Research />} />
                  <Route path="/research/registration" element={<ResearchForm />} />
                  <Route path="/research/registration/coversheet" element={<CoverSheet />} />
                  <Route path="/research/registration/coversheet/details1" element={<ProjectDetails_1 />} />
                  <Route path="/research/registration/coversheet/details2" element={<ProjectDetails_2 />} />
                  <Route path="/research/registration/coversheet/details3" element={<ProjectDetails_3 />} />
                  <Route path="/research/registration/coversheet/details/information" element={<InformationForm />} />
                  <Route path="/research/registration/coversheet/details/checklist" element={<ChecklistForm />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
                  <Route path="/admin/form-details/:email" element={<AdminFormDetails />} />
                  <Route path="/admin/form-details-undergrad/:email" element={<AdminUndergradFormDetail />} />
                  <Route path="/admin/form-details-graduate/:email" element={<AdminGraduateNational />} />
                  <Route path="/admin/form-details-phd/:email" element={<AdminPhdInternational />} />
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
