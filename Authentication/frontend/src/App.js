
import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/footer/footer';  // Ensure lowercase import

function App() {
  return (
    <div>
      <Navbar />
      
      {/* Your page content here */}
      <h1>Welcome to SmartHomeCare</h1>

      <Footer />  {/* Make sure to use <Footer /> even if the file is named `footer.js` */}
    </div>
  );
}

export default App;

