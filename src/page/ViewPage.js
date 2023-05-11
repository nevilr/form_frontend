import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [fields, setFields] = useState({});
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/${id}`)
      .then((response) => setFields((response.data)))
      .catch((error) => console.log(error));
  }, [id]);

  console.log(fields);
  const { data } = fields;
  const formData = data;
  console.log(formData);
  if (fields) {
    console.log(fields);
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const error = validateField(
      name,
      type === "checkbox" ? checked : value,
      formData
    );

    // Handle text inputs and checkboxes
    setFormValues((prevValues) => {
      if (type === "checkbox") {
        return {
          ...prevValues,
          [name]: [...(prevValues[name] || []), value].filter(
            (v, i, a) => a.indexOf(v) === i
          ),
        };
      } else {
        return {
          ...prevValues,
          [name]: value,
        };
      }
    });

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formValues, formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      console.log(formValues);
      navigate("/");
      toast('success')
    }
  };

  const validateField = (name, value, formData) => {
    const field = formData.find((field) => field.props.name === name);
    let error = "";

    if (field.validField.require && !value) {
      error = "This field is required";
    } else if (
      field.validField.min !== "" &&
      value.length < field.validField.min
    ) {
      error = `Minimum length is ${field.validField.min} characters`;
    } else if (
      field.validField.max !== "" &&
      value.length > field.validField.max
    ) {
      error = `Maximum length is ${field.validField.max} characters`;
    } else if (field.validField.alphanum && !/^[a-zA-Z0-9@.]+$/.test(value)) {
      error = "Only alphanumeric characters are allowed";
    }

    return error;
  };

  const validateForm = (formValues, formData) => {
    const errors = {};
    formData.forEach((field) => {
      const error = validateField(
        field.props.name,
        formValues[field.props.name],
        formData
      );
      if (error !== "") {
        errors[field.props.name] = error;
      }
    });
    return errors;
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit}>
            <h4 className="text-center my-2">{fields.name}</h4>
            {formData &&
              formData.map((field) => (
                <div key={field.props.name}>
                  {[
                    "text",
                    "password",
                    "email",
                    "date",
                    "tel",
                    "textarea",
                    "file",
                  ].includes(field.input) && (
                    <>
                      <label>{field.props.label} :</label>
                      <br />
                      {field.input === "file" && (
                        <input
                          type={field.input}
                          name={field.props.name}
                          id={field.props.name}
                          accept="image/*"
                          onChange={(event) => {
                            const img = event.target.files[0];
                            // setFile(URL.createObjectURL(img));
                            setFormValues({
                              ...formValues,
                              file: URL.createObjectURL(img),
                            });
                          }}
                        />
                      )}
                      {field.input === "textarea" && (
                        <textarea
                          name={field.props.name}
                          onChange={handleChange}
                          error={formErrors[field.props.name]}
                        />
                      )}
                      {["text", "password", "email", "date", "tel"].includes(
                        field.input
                      ) && (
                        <input
                          type={field.input}
                          name={field.props.name}
                          // value={field.props.value}
                          onChange={handleChange}
                          error={formErrors[field.props.name]}
                        />
                      )}
                    </>
                  )}
                  {field.input === "radio" && (
                    <>
                      <label>{field.props.name} :</label>
                      <br />
                      <div className="d-flex">
                        {field.props.options.map((option, index) => (
                          <div key={`${field.props.name}-${index}`}>
                            <input
                              type={field.input}
                              name={field.props.name}
                              value={option.label}
                              checked={
                                field.validField.require ? null : "checked"
                              }
                              onChange={handleChange}
                              error={formErrors[field.props.name]}
                            />
                            <label>{option.label}</label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {field.input === "checkbox" && (
                    <>
                      <label>{field.props.name} :</label>
                      <br />
                      <div className="d-flex">
                        {field.props.options.map((option, index) => (
                          <div key={`${field.props.name}-${index}`}>
                            <input
                              type={field.input}
                              name={field.props.name}
                              value={option.label}
                              onChange={handleChange}
                              error={formErrors[field.props.name]}
                            />
                            <label>{option.label}</label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {field.input === "select" && (
                    <div>
                      <select name={field.props.name} onChange={handleChange}>
                        <option value="">{field.props.label}</option>
                        {field.props.value.map((fruit, id) => (
                          <option key={id} value={fruit}>
                            {fruit}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div>
                    {formErrors[field.props.name] && (
                      <span style={{ color: "red" }}>
                        {formErrors[field.props.name]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary mx-2">
                Submit
              </button>

              <Link to="/">
                {" "}
                <button className="btn btn-warning">Back</button>
              </Link>
            </div>
            {/* <div>
              {formValues && (
                <img
                  src={formValues.file}
                  alt="Selected file"
                  width={300}
                  height={200}
                  className="float-end"
                />
              )}
            </div> */}
          </form>
        </div>
      </div>
    </div>
  );
}
export default Form;
