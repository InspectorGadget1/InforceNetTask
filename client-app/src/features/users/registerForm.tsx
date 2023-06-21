import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Label } from "semantic-ui-react";
import CustomTextInput from "../../common/form/customTextInput";
import { useStore } from "../../stores/store";
import * as Yup from "yup";
import ValidationErrors from "../errors/validationError";

export default observer(function RegisterForm() {
    const navigate = useNavigate();

    const { userStore, modalStore } = useStore();
    function check() {
        if (userStore.isLoggedIn) modalStore.closeModal();
    }

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore.register(values).catch(error => setErrors({ error })).then(check);
            }}
            validationSchema={Yup.object({
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className="ui form error" onSubmit={handleSubmit}>
                    <Header as='h2' content='Sign up' color='teal' textAlign='center' />
                    <CustomTextInput name="username" placeholder="Username" />
                    <CustomTextInput name="email" placeholder="Email" />
                    <CustomTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage
                        name="error" render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Button disabled={!isValid || !dirty} loading={isSubmitting} positive content="Register" type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})