//

import "./App.css";
import ImageUpload from "./components/ImageUpload";

// ----------------------------------------------

function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <div>
            <h1>AutoML vs Custom Training </h1>
            <p>
              Predict the Brain tumor possibility using AutoML and Custom
              Training and compare the results.
            </p>
          </div>
        </div>
      </section>

      <div style={{ height: 42 }} />
      <div style={{ height: 42 }} />

      <ImageUpload />

      <section id="spacer"></section>
    </>
  );
}

export default App;
