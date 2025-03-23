import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import WeatherDashboard from './components/WeatherDashboard';

function App() {
  return (
    <div className='min-h-screen bg-base-100'>
      <WeatherDashboard />
      <ToastContainer position="top-center" autoClose={false} closeButton={false} draggable={false} />
    </div>
  );
}

export default App;