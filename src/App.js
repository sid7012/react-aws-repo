import { DataProvider } from './components/DataContext';
import Index from './components/Index';
import IAM from './components/IAM';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScoreReport from './components/ScoreReport';
import Infrastructure from './components/Infrastructure';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import { Account } from './components/Auth/Account';
import Navbar from './components/Navbar';
import { useState } from 'react';
import ChangePassword from './components/Auth/ChangePassword';
import EmailVerificationForm from './components/Auth/EmailVerificationForm';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 


  // Your logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = "/login";
  };
 
  return (
    <Router>
      <DataProvider>
        <Account onLogout={handleLogout}>
          <Navbar isLoggedIn={isLoggedIn}  />
          <Routes>
            
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignUp  />} />
            <Route path="/emailverificationform" element={<EmailVerificationForm  />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route
              path="/home"
              element={
                isLoggedIn ? (
                  <Index />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/iam"
              element={
                isLoggedIn ? (
                  <IAM />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/infra"
              element={
                isLoggedIn ? (
                  <Infrastructure />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/scorereport"
              element={
                isLoggedIn ? (
                  <ScoreReport />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Account>
      </DataProvider>
    </Router>
  );
}

export default App;
