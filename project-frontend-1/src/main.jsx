import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import DashBoard from './DashBoard.jsx'
import JobPosting from './JobPosting.jsx'
import JobSearch from './JobSearch.jsx'
import MyProfile from './MyProfile.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/jobposting" element={<JobPosting />} />
      <Route path="/jobsearch" element={<JobSearch />} />
      <Route path="/profile" element={<MyProfile />} />
    </Routes>
  </BrowserRouter>
)
