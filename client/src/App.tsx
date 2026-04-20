import { CircularProgress } from '@mui/material';
import './App.css'
import Navbar from './components/Navbar'
import { useAppDispatch, useAppSelector } from './hooks/storeHooks'
import Router from './Router'
import { clearTokens } from './utils/token';
import { fetchMe } from './store/slices/userSlice';
import { useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, userId, loading } = useAppSelector(state => state.auth);

  useEffect(() => {
    if (userId) {
      dispatch(fetchMe(userId))
    }
  }, [dispatch, userId])

  if (loading) {
    return <CircularProgress />
  }

  if (!loading && !isAuthenticated) {
    clearTokens();
    // Assignment: Navigate to the login page 
  }

  return (
    <>
      <Navbar />

      <Router />
      <ToastContainer position='top-right'  autoClose={4000} hideProgressBar={false} />
    </>
  )
}

export default App
