
import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { AnimatePresence } from 'framer-motion';
import { DevToolsProvider } from './context/DevToolsContext';
import ModuleErrorBoundary from './components/ModuleErrorBoundary';

// Lazy load pages for better performance with prefetching
const Home = lazy(() => import(/* webpackPrefetch: true */ './pages/Home'));
const Theory = lazy(() => import(/* webpackPrefetch: true */ './pages/Theory'));
const PracticeHub = lazy(() => import(/* webpackPrefetch: true */ './pages/practice/PracticeHub'));
const Leaderboard = lazy(() => import(/* webpackPrefetch: true */ './pages/Leaderboard'));
const Registration = lazy(() => import('./pages/practice/Registration'));
const Payment = lazy(() => import('./pages/practice/Payment'));
const Banking = lazy(() => import('./pages/practice/Banking'));
const Ecommerce = lazy(() => import('./pages/practice/Ecommerce'));
const ExamResults = lazy(() => import('./pages/practice/ExamResults'));
const API = lazy(() => import('./pages/practice/API'));
const Achievements = lazy(() => import('./pages/Achievements'));
const Mobile = lazy(() => import('./pages/practice/Mobile'));
const Security = lazy(() => import('./pages/practice/Security'));
const Performance = lazy(() => import('./pages/practice/Performance'));
const Interview = lazy(() => import('./pages/Interview'));
const InterviewResults = lazy(() => import('./pages/InterviewResults'));
const Automation = lazy(() => import('./pages/practice/Automation'));
const Database = lazy(() => import('./pages/practice/Database'));
const Glossary = lazy(() => import(/* webpackPrefetch: true */ './pages/Glossary'));
const ISTQB = lazy(() => import(/* webpackPrefetch: true */ './pages/ISTQB'));
const Exam = lazy(() => import(/* webpackPrefetch: true */ './pages/practice/Exam'));

// Import skeleton components
import { SkeletonHome } from './components/Skeleton';

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6 pt-24">
    <div className="max-w-4xl mx-auto">
      <SkeletonHome />
    </div>
  </div>
);

function App() {
  const location = useLocation();

  return (
    <DevToolsProvider>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="theory" element={<Theory />} />
              <Route path="theory/:moduleId" element={<Theory />} />
              <Route path="practice" element={<PracticeHub />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="practice/registration" element={<ModuleErrorBoundary><Registration /></ModuleErrorBoundary>} />
              <Route path="practice/payment" element={<ModuleErrorBoundary><Payment /></ModuleErrorBoundary>} />
              <Route path="practice/banking" element={<ModuleErrorBoundary><Banking /></ModuleErrorBoundary>} />
              <Route path="practice/exam" element={<ModuleErrorBoundary><Exam /></ModuleErrorBoundary>} />
              <Route path="practice/exam-results" element={<ModuleErrorBoundary><ExamResults /></ModuleErrorBoundary>} />
              <Route path="practice/api" element={<ModuleErrorBoundary><API /></ModuleErrorBoundary>} />
              <Route path="practice/mobile" element={<ModuleErrorBoundary><Mobile /></ModuleErrorBoundary>} />
              <Route path="practice/security" element={<ModuleErrorBoundary><Security /></ModuleErrorBoundary>} />
              <Route path="practice/performance" element={<ModuleErrorBoundary><Performance /></ModuleErrorBoundary>} />
              <Route path="practice/ecommerce" element={<ModuleErrorBoundary><Ecommerce /></ModuleErrorBoundary>} />
              <Route path="interview" element={<ModuleErrorBoundary><Interview /></ModuleErrorBoundary>} />
              <Route path="practice/interview-results" element={<ModuleErrorBoundary><InterviewResults /></ModuleErrorBoundary>} />
              <Route path="practice/automation" element={<ModuleErrorBoundary><Automation /></ModuleErrorBoundary>} />
              <Route path="practice/database" element={<ModuleErrorBoundary><Database /></ModuleErrorBoundary>} />
              <Route path="glossary" element={<ModuleErrorBoundary><Glossary /></ModuleErrorBoundary>} />
              <Route path="istqb" element={<ModuleErrorBoundary><ISTQB /></ModuleErrorBoundary>} />
              <Route path="leaderboard" element={<Leaderboard />} />
            </Route>
          </Routes>
        </Suspense>
      </AnimatePresence>
    </DevToolsProvider>
  );
}

export default App;

