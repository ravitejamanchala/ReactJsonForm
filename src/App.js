
import { useState } from 'react';
import './App.css';
import DynamicForm from './POC/DynamicForm';
import { Editor } from '@monaco-editor/react';

function App() {
  const [schema, setSchema] = useState({
    "schema": {
      "name": {
        "title": "Mandatory",
        "description": "This must be completed",
        "type": "string",
        "required": true
      },
      "menu": {
        "type": "array",
        "title": "Options",
        "items": {
          "type": "string",
          "title": "Option",
          "enum": [
            "starter",
            "maincourse",
            "cheese",
            "dessert"
          ]
        }
      }
    },
    "form": [
      // Uncommented form configuration
      // {
      //   "key": "field"
      // },
      // {
      //   "type": "submit",
      //   "title": "Submit"
      // },
      // {
      //   "key": "menu",
      //   "type": "checkboxes",
      //   "titleMap": {
      //     "starter": "Starter would be great",
      //     "maincourse": "No way I'll skip the main course",
      //     "cheese": "Cheddar rules!",
      //     "dessert": "Thumbs up for a dessert"
      //   }
      // }
    ]
  });
  //  const [schemaTextarea, setSchemaTextarea] = useState()
  const handleSchemaChange = (value) => {
    try {
      const newSchema = JSON.parse(value);
      // setSchemaTextarea(value)
      setSchema(newSchema);
      // setErrorsDefinition("");
    } catch (error) {
      // setErrorsDefinition(`Invalid JSON schema:${error}`)
      console.log('Invalid JSON schema:', error);
    }
  };
  return (
    <div className="flex p-6">
      <div
        id="content"
        className="w-1/2 bg-blue-200"
      >

        <Editor
          defaultLanguage="json"
          theme="vs-dark"
          value={(JSON.stringify(schema, null, 2))}
          onChange={handleSchemaChange}
        />
      </div>
      <div
        id="content"
        className="w-1/3 bg-blue-200"
      >
        <DynamicForm
          schema={schema.schema}
          showSubmitBtn={false}
          btnText={"SUBMIT"}
          uiSchema={schema.form ? schema.form : []}
          preData={{}}
          formName="electronic-form"
          submitForm={() => { }}
        />
      </div>
    </div>
  );
}

export default App;
