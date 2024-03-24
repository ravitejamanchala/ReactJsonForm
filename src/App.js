
import { useState } from 'react';
import './App.css';
import DynamicForm from './POC/DynamicForm';
import { Editor } from '@monaco-editor/react';
import Navbar from './Components/Navbar';

function App() {
  const [schema, setSchema] = useState({
    "schema": {
      "name": {
        "title": "Name",
        "description": "Nickname allowed",
        "type": "string"
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
      },
      "comment": {
        "type": "textarea",
        "title": "Comment"
      },
      "age": {
        "type": "number",
        "title": "Age",
        "description": "Your Age"
      },
      "gender": {
        "title": "Gender",
        "description": "Your gender",
        "type": "string",
        "enum": [
          "male",
          "female",
          "alien"
        ]
      }
    },
    "form": []
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
    <div className="flex px-8 pt-24 max-w-screen-xl  mx-auto">
      <Navbar/>
      <div
        id="content"
        className="w-1/2 h-[90vh]"
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
        className="w-1/4 p-10"
      >  
        <h2 className='text-[18px] mb-8 font-bold'>Preview</h2>
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
