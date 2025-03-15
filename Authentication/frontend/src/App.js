
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/footer/footer';  // Ensure lowercase import
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/shop';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      
      <Routes>
      <Route path='/' element={<Shop/>}/>
      </Routes>

      <Footer />
      </BrowserRouter>  {/* Make sure to use <Footer /> even if the file is named `footer.js` */}
    </div>
  );
}

export default App;

