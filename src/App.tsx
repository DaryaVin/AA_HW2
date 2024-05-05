import React, { useState } from "react";
import "./App.css";
import { FormJSONType } from "./Shared";
import { CreatingForm, ParsingJSONComponent } from "./Modules";

function App() {
  const [parseResult, setParseResult] = useState<FormJSONType[]>([]);
  const [indexItemForDelete, setIndexItemForDelete] = useState<number[]>([]);
  return (
    <div className="App">
      <ParsingJSONComponent
        setDataFormsJSON={setParseResult}
        indexItemForDelete={indexItemForDelete}
        setIndexItemForDelete={setIndexItemForDelete}
      />
      <ul className="App__formsList">
        {parseResult.map((formItem, index) => {
          return (
            <CreatingForm
              key={formItem.form_name}
              formItem={formItem}
              onClickDelFormBtn={() => {
                setIndexItemForDelete([...indexItemForDelete, index]);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
