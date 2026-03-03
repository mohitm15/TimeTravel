
import './App.css';
import TimeZoneComponent from './Timezone';
import bg from "./back.jpg";

function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="min-h-screen bg-black/60 text-white flex flex-col font-sans">
        <div className="flex-grow">
          <TimeZoneComponent />
        </div>
        <footer className="text-center py-4 text-white/50 text-sm border-t border-white/10">
          © 2026 Time-Travel - Created by Mohit-Maroliya
        </footer>
      </div>
    </div>
  );
}

export default App;
