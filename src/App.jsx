//

import "./App.css";
import ImageUpload from "./components/ImageUpload";
import { useGoogleApiKey } from "./utils/setGoogleAPIkey";

// ----------------------------------------------

function App() {
  const { apiKey } = useGoogleApiKey();

  console.log("found google api key in the local storage:", apiKey);

  return (
    <>
      <div style={{ height: 16 }} />

      <section id="center">
        <div className="hero">
          <div>
            <h2>AutoML vs Custom Training </h2>
            <p>
              Predict the Brain tumor possibility using AutoML and Custom
              Training and compare the results.
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: 24 }} />

      <ImageUpload />

      <section id="spacer"></section>
    </>
  );
}

export default App;
