import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const RegisterForm = () => {

    const navigate = useNavigate()

    const initialValues = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    };


    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required').matches(/@gmail.com$/, 'Email must end with @gmail.com'),
        firstname: Yup.string().min(3, 'min 3 char').max(30, 'max is 30').required('FirstName is required'),
        lastname: Yup.string().min(3, 'min 3 char').max(30, 'max is 30').required('LastName is required'),
        password: Yup.string()
            .required('Password is required')
            .max(12, 'max 12 code')
            .test('password-strength', (value) => {
                let passwordStrength = 0;
                if (value.match(/[A-Z]/)) {
                    passwordStrength += 1;
                }
                if (value.match(/[a-z]/)) {
                    passwordStrength += 1;
                }
                if (value.match(/\d/)) {
                    passwordStrength += 1;
                }
                if (value.match(/[!@#$%^&*]/)) {
                    passwordStrength += 1;
                }
                if (passwordStrength < 3) {
                    return false;
                }
                return true;
            })
            .test(
                "no-name",
                "Password cannot contain name",
                function (value) {
                    const name = this.parent.lastname;
                    const fname = this.parent.firstname
                    //   const lname = this.parent.lastname;
                    return !value.toLowerCase().includes(name.toLowerCase()) && !value.toLowerCase().includes(fname.toLowerCase());

                }
            ),
        confirmPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password')], 'Passwords must match'),
    });

    const passwordStrengthMsg = (password) => {
        let passwordStrength = 0;
        if (password.match(/[A-Z]/)) {
            passwordStrength += 1;
        }
        if (password.match(/[a-z]/)) {
            passwordStrength += 1;
        }
        if (password.match(/\d/)) {
            passwordStrength += 1;
        }
        if (password.match(/[!@#$%^&*]/)) {
            passwordStrength += 1;
        }
        switch (passwordStrength) {
            case 0:
            case 1:
                return 'Very Weak';
            case 2:
                return 'Weak';
            case 3:
                return 'not bad';
            default:
                return '';
        }
    };

    const handleSubmit = async (values, { setSubmitting, setFieldError }) => {

        await axios.post('http://localhost:3000/users', values)
            .then(response => {
                console.log(response);
                navigate('/login')
            })
            .catch(error => {
                console.log(error);
            });


    };

    return (
        <div className="container h-100">
            <div className="row  h-100">
                <div className="col d-flex justify-content-center align-items-center h-100">
                    <div className="card" style={{ width: '22rem', padding: "12px", backgroundColor: "#1162" }}>
                        <h3 className='m-auto fw-bold'>Register Here</h3>
                        <div className="inputs">
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                {({ errors, touched, values }) => (
                                    <Form>
                                        <div className='my-2'>
                                            <label htmlFor="name">First Name : </label> <br />
                                            <Field type="text" id="firstname" name="firstname" /><br />
                                            <ErrorMessage name="firstname" />
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="name">Last Name : </label> <br />
                                            <Field type="text" id="lastname" name="lastname" /><br />
                                            <ErrorMessage name="lastname" />
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="email">Email :</label><br />
                                            <Field type="email" id="email" name="email" /><br />
                                            <ErrorMessage name="email" />
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="password">Password :</label><br />
                                            <Field className="field" type="password" id="password" name="password" /><br />
                                            {errors.password && touched.password}<ErrorMessage name="password" />
                                            {values.password && <div>{passwordStrengthMsg(values.password)}</div>}
                                        </div>
                                        <div className='my-2'>
                                            <label htmlFor="confirmPassword">Confirm Password :</label><br />
                                            <Field type="password" id="confirmPassword" name="confirmPassword" /><br />
                                            {errors.confirmPassword && touched.confirmPassword && <div>{errors.confirmPassword}</div>}
                                        </div>

                                        <Button type="submit">Register</Button>

                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;