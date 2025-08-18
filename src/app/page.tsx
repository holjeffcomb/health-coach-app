"use client";

// App.tsx
import { useState } from "react";
import WellnessCalculator from "./_components/WellnessCalculator";
import LandingPage from "./_components/LandingPage"; // You'll need to save the landing page component here

function App() {
  const [showCalculator, setShowCalculator] = useState(false);

  const handleStartAssessment = () => {
    setShowCalculator(true);
  };

  const handleBackToLanding = () => {
    setShowCalculator(false);
  };

  return (
    <div className="App">
      {showCalculator ? (
        <div>
          {/* Optional: Add a back button */}
          <div className="p-4 bg-white border-b">
            <button
              onClick={handleBackToLanding}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Back to Home
            </button>
          </div>
          <WellnessCalculator />
        </div>
      ) : (
        <LandingPage onStartAssessment={handleStartAssessment} />
      )}
    </div>
  );
}

export default App;
