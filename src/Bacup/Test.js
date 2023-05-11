import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

function Test() {

  const [inputType, setInputType] = useState('');
  const [inputValue, setInputValue] = useState();
  const [options, setOptions] = useState([]);
  const [formdata, setFormData] = useState([]);
  const [formname, setFormname] = useState()
  const [isDisabled, setIsDisabled] = useState(false);

console.log(options, "dd");

  const handleInputChange = (index, key, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][key] = value;
    setOptions(updatedOptions);
  };

  const [label, setLabel] = useState('');
  const [type, setType] = useState('');

  const inputdata = {
    label: label,
    type: type
  }

  function handleLabelChange(event) {
    setLabel(event.target.value);
  }
  function handleInputTypeChange(event) {
    setType(event.target.value);
  } 

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setInputType(value);
    setInputValue('');
    setOptions([]);
  };

  const handleAddOption = () => {
    const updatedOptions = [...options, { label: "", value: "" }];
    setOptions(updatedOptions);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const addFormData = (args) => {
    const abc = formdata;
    abc.push(args);
    setFormData(abc)
    console.log(abc, " abc");
  }
  const removeData = (id) => {
    const removedata = [...formdata];
    removedata.splice(id, 1);
    setFormData(removedata);
    localStorage.setItem("final", JSON.stringify(removedata))
  }


  //*******************validation */
  const [validField, setValidField] = useState({
    min: '',
    max: ''
  });

  const handleCheckboxChange = (event) => {
    const { name, type, checked, value } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValidField(prevState => ({
      ...prevState,
      [name]: newValue
    }));
  };

  //*******************select  */
  const [select, setSelect] = useState([]);

  const handleChange = (e) => {
    setSelect(e.target.value.split(";"));
  };

  const submit = () => {

    if (inputType === 'text') {
      addFormData({ "input": type, "props": { "name": label.replace(/\s+/g, ''), "label": label, "value": label }, validField });
    }

    else if (inputType === 'password') {
      addFormData({ "input": inputType, "props": { "name": "password", "label": label, "value": "" }, validField });
    } else if (inputType === 'checkbox') {
      addFormData({ "input": inputType, "props": { "name": inputValue, "options": options }, validField });
    } else if (inputType === 'radio') {
      addFormData({ "input": inputType, "props": { "name": inputValue, "options": options }, validField });
    } else if (inputType === 'date') {
      addFormData({ "input": inputType, "props" : {"name" : label, "label" : label}, validField });
    } else if (inputType === "textarea") {
      addFormData({ "input": inputType, "props": { "name": label, "label" : label }, validField });
    } else if (inputType === "select") {
      addFormData({ "input": inputType, "props": { "name": label, "label": label, "value": select }, validField })
    } else if (inputType === "file") {
      addFormData({ "input": inputType, "props": { "name": "file", "value": inputValue }, validField })
    }
    setInputType("")
    setOptions([]);
    setIsDisabled(true);
    setType("")
    setLabel("")
    setValidField({ min: "", max: "" })
  };

  const form_data = {
    name: formname,
    data: formdata,
  }
  const handlefinalSubmit = () => {

    localStorage.setItem(formname, JSON.stringify(form_data))
    setInputType("")
    setOptions([]);
    setIsDisabled(true);
    setType("")
    setLabel("")
    setValidField({ min: "", max: "" })
  }

  const renderInputField = () => {
    switch (inputType) {
      case 'text':
        return (
          <div className='d-flex justify-content-around'>
            <div>
              <label htmlFor="label">Label Name</label>
              <input
                type="text"
                name="label"
                value={label}
                onChange={handleLabelChange}
              />
              <label htmlFor="type" className='my-2'>Label Type :</label>
              <select name="type" id="type" value={type} onChange={handleInputTypeChange}>
                <option value="">Select Type</option>
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="tel">Contact</option>
                <option value="button">Button</option>
              </select>
            </div>
          </div>
        );
      case 'password':
        return (
          <div class="form-group d-flex justify-content-around">
            <div>
              <label htmlFor="label">Label Name : </label><br />
              <input
                type="text"
                name="label"
                value={label}
                onChange={handleLabelChange}
              />
            </div>
            <div>
              <label>Password : </label><br />
              <input
                type='password'
                placeholder='just for demo.'
                onChange={(event) => setInputValue(event.target.value)}>
              </input>
            </div>
          </div>
        );
      case "file":
        const handleFileChange = (event) => {
          const file = event.target.files[0];
          setInputValue(URL.createObjectURL(file));
        };
        return (
          <div>
            <label htmlFor="formFile" className="form-label">Select a file:</label>
            <input
              type="file"
              className="form-control"
              id="formFile"
              accept="image/*"
              onChange={handleFileChange}
            />

          </div>
        );
      case 'textarea':
        return (
          <div>
          <label htmlFor="label">Label of Textarea : </label>
              <input
                type="text"
                name="label"
                value={label}
                onChange={handleLabelChange}
              />
          <div class="form-group">
            <label for="exampleFormControlTextarea1" style={{float:"left", margin:"8px"}}>{label ? label : "Example"} : </label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}>
            </textarea>
          </div>
          </div>
        );
      case 'date':
        return (
          <div class="form-group">
            <div>
            <label htmlFor="label">Label Name : </label><br />
              <input
                type="text"
                name="label"
                value={label}
                onChange={handleLabelChange}
              />
              </div>
              <div className='mt-2'>
            <label htmlFor="input-text">{label}:</label>
            <input
              type="date"
              id="input-date"
              value={inputValue}
              disabled
              onChange={(event) => setInputValue(event.target.value)}
            />
            </div>
          </div>
        );
      case "select":
        return (
          <div>
            <div>
              <label htmlFor="label">Label Name</label>
              <input
                type="text"
                name="label"
                value={label}
                onChange={handleLabelChange}
              />
            </div>
            <div className='form-group mt-3 d-flex'>
              <div>
                <label htmlFor="options">Options:</label>
                <input type="text" id="options" placeholder='option seperate by ;' onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="select">Select option:</label>
                <select id="select" style={{width:"100px"}}>
                  {select.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        );
      case 'radio':
        return (
          <div>
            <label htmlFor="input-radio-name">Radio Name : </label>
            <div>
              <input
                type="text"
                id="input-radio-name"
                placeholder='Gender..'
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
              />
              <Button onClick={handleAddOption} className='btn-secondary fw-bold'>+</Button>
            </div>
            <br />
            <label>Options:</label>
            {options.length}
            {options.map((option, index) => (
              <div key={index} className='my-2'>
                <label htmlFor="">Label of Radio</label>
                <input className='me-3'
                  type="text"
                  value={option.label}
                  placeholder='...'
                  onChange={(event) =>
                    handleInputChange(index, "label", event.target.value)
                  }
                /> {option.label} : <input type="radio" className='mx-2' />
                {/* <label htmlFor="">Example :</label>
                <input
                  type="radio"
                  value={option.value}
                  onChange={(event) =>
                    handleInputChange(index, "value", event.target.value)
                  }
                /> */}
                <Button onClick={() => handleRemoveOption(index)} className='btn-warning fw-bold mx-2'>-</Button>
              </div>
            ))}

          </div>
        );
      case 'checkbox':
        return (
          <div>
            <div>
              <label htmlFor="label">Checkbox Name :</label>
              <input
                type="text"
                value={inputValue}
                placeholder='Hobby...'
                onChange={(event) => setInputValue(event.target.value)}
              /><Button onClick={handleAddOption} className='btn-secondary fw-bold'>+</Button> <br />

              <label>Options :</label>
              {options.map((option, index) => (
                <div key={index} className='my-1'>
                  <label htmlFor="">label Name : </label>
                  <input className='me-3'
                    type="text"
                    value={option.label}
                    onChange={(event) =>
                      handleInputChange(index, "label", event.target.value)
                    }
                  />{option.label} : <input type="radio" className='mx-2' />
                  <Button onClick={() => handleRemoveOption(index)} className='btn-warning fw-bold mx-2'>-</Button>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };


  return (
    <>
      <div className="container border">
        <div className="row">
          <div className="col">
            <div className=' p-2'>
              <div className='d-flex justify-content-around'>
                <div>
                  <label htmlFor="">Your Form Name:</label><br />
                  <input type="text" value={formname} onChange={(event) => setFormname(event.target.value)} disabled={isDisabled} />
                </div>
                <div>
                  <label htmlFor="input-type">Input Type:</label><br />
                  <select id="input-type" value={inputType} onChange={handleSelectChange} className='p-1'>
                    <option value="">Select an input type</option>
                    <option value="text">Text</option>
                    <option value="radio">Radio</option>
                    <option value="checkbox">checkbox</option>
                    <option value="password">Password</option>
                    <option value="date">date</option>
                    <option value="textarea">textarea</option>
                    <option value="select">Select</option>
                    <option value="file">file</option>
                  </select>
                </div>
              </div>

              <div className='mt-3'>
                <div className='m-auto text-center border p-3'>
                  {renderInputField()}
                </div>

                <h5 className='mt-5'>Validation : </h5>
                <div className='d-flex'>
                  <div>
                    <label>
                      <input type="checkbox" name="require" checked={validField.require} onChange={handleCheckboxChange} />
                      Require
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" name="alphabet" checked={validField.alphabet} onChange={handleCheckboxChange} />
                      Alphabet
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="checkbox" name="alphanum" checked={validField.alphanum} onChange={handleCheckboxChange} />
                      Alphanumeric
                    </label>
                  </div>
                </div>
                <div className='d-flex mt-3'>
                  <div>
                    <label>
                      Min Value :
                      <input type="number" name="min" value={validField.min} onChange={handleCheckboxChange} style={{ width: "100px" }} />
                    </label>
                  </div>
                  <div>
                    <label>
                      Max Value :
                      <input type="number" name="max" value={validField.max} onChange={handleCheckboxChange} style={{ width: "100px" }} />
                    </label>
                  </div>
                </div>
                <div className='text-center'>
                  <Button onClick={submit} className='m-3 btn-success'>Add Data</Button>
                </div>
              </div>

            </div>
          </div>
          <div className="col border d-flex justify-content-center align-items-center">
            <div>
              <h3 className='text-center'>{formname}</h3>
              {
                formdata && formdata.map((item, id) => {
                  console.log(item, "dsd");
                  return (
                    <div>
                      {(item.input === "text" || item.input === "email" || item.input === "tel") &&
                        <div key={id}>
                          <label>{item.props.label}</label><br />
                          <input type={item.input} name={item.props.name} value={item.props.name}/>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold mx-2'>-</Button>
                        </div>
                      }
                      {item.input === "password" &&
                        <div>
                          <label htmlFor="">{item.props.name}</label><br />
                          <input type={item.input} value={item.props.value} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }

                      {item.input === "textarea" &&
                        <div>
                          <label htmlFor="exampleFormControlTextarea1">{item.props.name}</label>
                          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                            value={item.props.value}>
                          </textarea>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.file === "file" &&
                        <div>
                          <div style={{ overflow: "hidden" }}>
                            <img src={item.props.value} alt="dd" style={{ width: "100px", height: " 100px" }} />
                          </div>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.select === "select" &&
                        <div>
                          <label htmlFor="cars">{item.props.label}:</label>
                          <select id="select">
                            {item.props.value.map((option, index) => (
                              <option key={index} value={option}>
                                {option.split(":")}
                              </option>
                            ))}
                          </select>
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "radio" &&
                        <div>
                          <label>{item.props.name}</label> <br />
                          {item.props.options.map((opt, ids) => {
                            return (
                              <div key={ids} className='form-check form-check-inline'>
                                <label htmlFor="" className='form-check-label'>{opt.label}</label>
                                <input type="radio" value={opt.value} name='radio' className='form-check-input' />
                              </div>
                            )
                          })}
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                      {item.input === "checkbox" &&
                        <div>
                          <label>{item.props.name}</label> <br />
                          {item.props.options.map((opt, ids) => {
                            return (
                              <div key={ids} className='form-check form-check-inline'>
                                <label htmlFor="" className='form-check-label'>{opt.label}</label>
                                <input type="checkbox" value={opt.value} className='form-check-input' />
                              </div>
                            )
                          })}
                        </div>
                      }
                      {item.input === "date" &&
                        <div>
                          <label htmlFor="">{item.input}</label><br />
                          <input type="date" value={item.input} />
                          <Button onClick={() => removeData(id)} className='btn-warning fw-bold'>-</Button>
                        </div>
                      }
                    </div>
                  )
                })
              }
              <button onClick={handlefinalSubmit} className='btn btn-primary m-3'>submit all your data</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
