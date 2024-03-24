import React, { useState } from "react";
// import propTypes from 'prop-types';
import BodyMap from "./BodyMap";
const DynamicForm = ({ schema ,uiSchema, preData, formName, submitForm, showSubmitBtn, btnText, canceBtnHandler, processLoader,view}) => {
  const [formData, setFormData] = useState(preData||{});

  const handleChange = (name, value, e) => {
    if (e.target?.type === 'date' || e.target?.type === 'time') {
      e.preventDefault();
    }
  
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const dataQA= formName || 'electronic-form';
  const renderFormElement = (property, propertyName,fieldsetItems) => {      
    if (!property || !property.type) {
      return null; // or handle the undefined case accordingly
    }        
    const { type, title, enum: options, format, items, description, required ,step} = property;

    switch (type) {
      case "date":
        return (
          <div key={propertyName} className="flex flex-col mb-4">            
             <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000">{title}<span>{required?" *":""}</span></label>
            <input
              data-qa={`${dataQA}-${title}-date-input`.toLowerCase().replace(/ /g, "-")  .replace(/[/_.,]/g, "-")}
              type="date"
              className="d-flex relative w-[100%] lMobile:w-[346px] text-16 open-sans-400 px-[16px] py-[12px] h-[48px] rounded-[8px] bg-neutral-150 outline-none border border-neutral-900"
              id={propertyName}
              value={formData[propertyName] || ""}
              onChange={(e) => handleChange(propertyName, e.target.value,e)}
              required={required}
            />
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        );
        case "time":
        return (
          <div key={propertyName} className="flex flex-col mb-4">
             <label htmlFor={propertyName} >{title}<span>{required?" *":""}</span></label>
            <input
            data-qa={`${dataQA}-${title}-time-input`.toLowerCase().replace(/ /g, "-")  .replace(/[/_.,]/g, "-")}
              className="relative text-16 w-[100%] lMobile:w-[346px] open-sans-400 px-[16px] py-[12px] h-[48px] rounded-[8px] bg-neutral-150 outline-none border border-neutral-900"
              type="time"
              id={propertyName}
              value={formData[propertyName] || ""}
              onChange={(e) => handleChange(propertyName, e.target.value,e)}
              required={required}
            />
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        );


      case "integer":
        return (
          <div key={propertyName} className="flex flex-col mb-4">
             <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000">{title}<span>{required?" *":""}</span></label>
            <input
              data-qa={`${dataQA}-${title}-input`.toLowerCase().replace(/ /g, "-")  .replace(/[/_.,]/g, "-")}
              type="number"
              className="relative w-[100%] lMobile:w-[346px] text-16 open-sans-400 px-[16px] py-[12px] h-[48px] rounded-[8px] bg-neutral-150 outline-none border border-neutral-900"
              id={propertyName}
              value={formData[propertyName] || ""}
              onChange={(e) => handleChange(propertyName, e.target.value,e)}
              step={step}
              required={required}
            />
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        );
        case "bodyMap":
          return (
            <div key={propertyName} className="flex flex-col mb-4">
              <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000 mb-3">{title}</label>
              <BodyMap initialPoints={formData[propertyName] || []} onChange={(e) => handleChange(propertyName, e, "bodyMap")} viewMode={view || false} />
             {!view && <p dangerouslySetInnerHTML={{ __html: description }}></p>} 
            </div>
          );
        case "number":
            return (
              <div key={propertyName} className="flex flex-col mb-4">
                 <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000">{title}<span>{required?" *":""}</span></label>
                <input
                  data-qa={`${dataQA}-${title}-input`.toLowerCase().replace(/ /g, "-")  .replace(/[/_.,]/g, "-")}
                  type="number"
                  className="relative w-[100%] lMobile:w-[346px] text-16 open-sans-400 px-[16px] py-[12px] h-[48px] rounded-[8px] bg-neutral-150 outline-none border border-neutral-900"
                  id={propertyName}
                  value={formData[propertyName] || ""}
                  onChange={(e) => handleChange(propertyName, e.target.value,e)}
                  step={step}
                  required={required}
                />
                  <p dangerouslySetInnerHTML={{ __html: description }}></p>
              </div>
            );
      case "string":
        let config = uiSchema?.filter((item) => item.key === propertyName);
        if(fieldsetItems){
          config = fieldsetItems?.filter((item) => item.key === propertyName)
        }
        if (options) {          

          if(config[0]?.type === "radios"){
            return (
              <div key={propertyName} className="flex flex-col mb-4">
                <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000 mb-2">{title}</label>
                {options.map((option) => (
                    <label key={option} className="flex items-end gap-x-2 mb-2">
                      <input
                        data-qa={`${dataQA}-${title}-${option}-checkbox-input`.toLowerCase().replace(/ /g, "-").replace(/[/_.,]/g, "-")}
                        type="radio"
                        name={propertyName}
                        id={propertyName + option} 
                        value={option}
                        onChange={(e) =>
                          handleChange(
                            propertyName,
                            e.target.value,
                            e
                          )
                        }
                      />
                      {option}
                    </label>
                    ))}
                    {description && <span className="open-sans-400">{description}</span>}
              </div>
             )
          }
          else{
            return (            
              <div key={propertyName} className="flex flex-col mb-4">
                 <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000">{title}<span>{required?" *":""}</span></label>
                <div className="flex flex-col">
                <select
                   data-qa={`${dataQA}-${title}-select-input`.toLowerCase().replace(/ /g, "-").replace(/[/_.,]/g, "-")}
                  id={propertyName}
                  className="px-[16px] py-[12px] w-[100%] lMobile:w-[346px] open-sans-400 bg-neutral-150 mb-[5px] outline-none border border-neutral-900 rounded-[8px]"
                  value={formData[propertyName] || ""}
                  onChange={(e) => handleChange(propertyName, e.target.value,e)}
                  required={required}
                >
                  {options.map((option) => (
                    <option key={option} value={option} data-qa={`${dataQA}-${title}-${option}-select-option-input`.toLowerCase().replace(/ /g, "-").replace(/[/_.,]/g, "-")}>
                     {(config[0]?.titleMap?.[option] || option)}
                    </option>
                  ))}
                </select>
                {description && <span className="open-sans-400">{description}</span>}
                </div>             
              </div>
            );
          }
        }
       
          else if (config[0]?.type === "textarea") {
            // Render a text area
            return (
              <div key={propertyName} className="flex flex-col mb-4">
                <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000">
                  {title}<span>{required ? " *" : ""}</span>
                </label>
                <textarea
                  data-qa={`${dataQA}-${title}-textarea-input`.toLowerCase().replace(/ /g, "-").replace(/[/_.,]/g, "-")}
                  className="relative w-[100%] lMobile:w-[346px] text-16 open-sans-400 px-[16px] py-[12px] h-[96px] rounded-[8px] bg-neutral-150 outline-none border border-neutral-900"
                  id={propertyName}
                  value={formData[propertyName] || ""}
                  onChange={(e) => handleChange(propertyName, e.target.value, e)}
                  required={required}
                />
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
              </div>
            );
          }
        
        return (
          <div key={propertyName} className="flex flex-col mb-4">
             <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000">{title}<span>{required?" *":""}</span></label>
            <input
              data-qa={`${dataQA}-${title}-input`.toLowerCase().replace(/ /g, "-")  .replace(/[/_.,]/g, "-")}
              type="text"
              placeholder="some text"
              className="relative w-[100%] lMobile:w-[346px] text-16 open-sans-400 px-[16px] py-[12px] h-[48px] rounded-[8px] bg-neutral-150 outline-none border border-neutral-900"
              id={propertyName}
              value={formData[propertyName] || ""}
              onChange={(e) => handleChange(propertyName, e.target.value,e)}
              required={required}
            />
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        );
      case "textarea":
        return (
          <div key={propertyName} className="flex flex-col mb-4">
            <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000">
              {title}<span>{required ? " *" : ""}</span>
            </label>
            <textarea
              data-qa={`${dataQA}-${title}-textarea-input`.toLowerCase().replace(/ /g, "-").replace(/[/_.,]/g, "-")}
              className="relative w-[100%] lMobile:w-[346px] text-16 open-sans-400 px-[16px] py-[12px] h-[96px] rounded-[8px] bg-neutral-150 outline-none border border-neutral-900"
              id={propertyName}
              value={formData[propertyName] || ""}
              onChange={(e) => handleChange(propertyName, e.target.value, e)}
              required={required}
            />
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        );

    case "array":
      if (items && items.type === "string" && items.enum) {
     
        let config = uiSchema?.filter((item) => item.key === propertyName);
        if(fieldsetItems){
          config = fieldsetItems?.filter((item) => item.key === propertyName)
        }
        return (
          <div key={propertyName} className="flex flex-col mb-4">
            <label htmlFor={propertyName} className="open-sans-700 text-14 text-blue-1000 mb-2">
              {title}
              <span>{required ? " *" : ""}</span>
            </label>
            {items.enum.map((option) => (
              <label key={option} className="flex items-center mb-1">
                <input
                  data-qa={`${dataQA}-${title}-${option}-checkbox-input`.toLowerCase().replace(/ /g, "-").replace(/[/_.,]/g, "-")}
                  type="checkbox"
                  className="mr-3"
                  id={propertyName + option} // Use a unique identifier for each checkbox
                  checked={formData[propertyName]?.[option] || false}
                  onChange={(e) =>
                    handleChange(
                      propertyName,
                      {
                        ...formData[propertyName],
                        [option]: !formData[propertyName]?.[option],
                      },
                      e
                    )
                  }
                />
                {(config[0]?.titleMap?.[option] || option)}
              </label>
            ))}
              <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        );
      }

      break;
          default:
            return <div className="text-red-500 text-bold">{propertyName} attribute appears to be inaccurately defined or not properly configured</div>;
        }
  };

  const renderForm = () => {
    const properties = schema || {};
    const formConfig = uiSchema || [];
    if(formConfig.length){
      return formConfig.map((formElement, index) => {
        switch (formElement.type) {
          case "help":
            return (
              <div key={index} className="flex flex-col mb-4">
                <p dangerouslySetInnerHTML={{ __html: formElement.helpvalue }}></p>
              </div>
            );
          case "submit":
            // Render submit form elements
            return null
          case "fieldset":
              // Render form elements inside the fieldset
              return (
                <fieldset>
                  <legend className="text-[24px] mb-4">{formElement.title}</legend>
                  {formElement.items.map((propertyName) =>
                    renderFormElement(properties[propertyName.key ||propertyName], propertyName.key ||propertyName,formElement.items)
                  )}
                  
                </fieldset>
              );
          default:
            // Render all form elements if type is not specified or is "*"

            if (formElement === "*") {
              return Object.keys(properties).map((propertyName) =>
                renderFormElement(properties[propertyName.key ||propertyName], propertyName.key ||propertyName)
              );
            }
    
            // Render specific form element
            const propertyName = formElement.key;
            if(propertyName){
              return renderFormElement(properties[propertyName], propertyName);
            }
            else{
              return null
            }
            
        }
      });
    }
    else{
      return Object.keys(properties).map((propertyName) =>
      renderFormElement(properties[propertyName], propertyName)
    );
    }
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitForm(formData)
  };

  return (
    <form onSubmit={handleSubmit} className="w-[100%] h-[100%]" >
      {renderForm()}
      {showSubmitBtn &&
      <div className="flex items-center ml-[16px] gap-x-[16px] h-[93px] absolute bottom-0 right-0 left-0">
          <div>
            {/* <Close
              text={'CANCEL'}
              dataQaText={dataQA}
              onClick={canceBtnHandler}
            /> */}
        </div>
        <div>
          <button
            type="submit"
            // text={btnText}
            // dataQaText={`${dataQA}-${btnText.toLowerCase()}-button`}
            // processLoader={processLoader}
          />
        </div>
      </div>
      }
      {/* <button  data-qa={`${dataQA}-submit-button`} className="text-[12px] md:text-[14px] select-none cursor-pointer disabled:opacity-[50%] open-sans-700  px-[16px]  py-[12px] h-[60px] md:h-[44px] bg-blue-1000 text-white  tracking-wider rounded-[8px] hover:bg-neutral-1000 transtion duration-500" type="submit">Submit</button> */}
      </form>
  );
};
// DynamicForm.propTypes = {
//   schema: propTypes.object,
//   uiSchema: propTypes.array,
//   preData: propTypes.object, 
//   formName: propTypes.string,
//   submitForm: propTypes.func,
//   showSubmitBtn: propTypes.bool,
//   btnText: propTypes.string, 
//   canceBtnHandler: propTypes.func, 
//   processLoader: propTypes.bool,
//   view:propTypes.bool,
// }

export default DynamicForm;