
import './App.css';
import TimeZoneComponent from './Timezone';
import bg from "./back.jpg";

function App() {
  return (
    <div style={{backgroundImage: `url(${bg})`}} className="h-full">
        <TimeZoneComponent />
        <div className='bg-orange-200 text-red-600 p-2 text-base sm:text-xl text-center'>
          Credits: Mohit-Maroliya
        </div>
    </div>
  );
}

export default App;
