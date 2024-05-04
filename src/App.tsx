import React, { useState } from "react";
import "./App.css";
import { FormJSONType } from "./Shared";
import { CreatingForm, ParsingJSONComponent } from "./Modules";

function App() {
  const [parseResult, setParseResult] = useState<FormJSONType[]>([]);
  return (
    <div className="App">
      <ParsingJSONComponent setDataFormsJSON={setParseResult} />
      <ul className="App__formsList">
        {parseResult.map((formItem) => {
          return <CreatingForm key={formItem.form_name} formItem={formItem} />;
        })}
      </ul>
    </div>
  );
}

export default App;
