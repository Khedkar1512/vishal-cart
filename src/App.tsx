import { Navbar } from './components/Navbar';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Home } from './pages/Home';

function App() {
  return (
    <>
      <div className="noise-overlay"></div>
      <ProgressIndicator />
      <Navbar />
      <Home />
    </>
  );
}

export default App;
