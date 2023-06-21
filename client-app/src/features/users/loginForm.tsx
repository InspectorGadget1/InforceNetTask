import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Header, Label } from "semantic-ui-react";
import CustomTextInput from "../../common/form/customTextInput";
import { useStore } from "../../stores/store";

export default observer(function LoginForm() {
    const navigate = useNavigate();

    const { userStore, modalStore } = useStore();
    function check() {
        if (userStore.isLoggedIn) modalStore.closeModal();
    }

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => {
                userStore.login(values).catch(error => setErrors({ error: 'Invalid Email or Password' })).then(check);
            }}
        >
            {({ handleSubmit, isSubmitting, errors }) => (
                <Form className="ui form" onSubmit={handleSubmit}>
                    <Header as='h2' content='Login' color='teal' textAlign='center' />
                    <CustomTextInput name="email" placeholder="Email" />
                    <CustomTextInput name="password" placeholder="Password" type="password" />
                    <ErrorMessage
                        name="error" render={() => <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
                    />
                    <Button loading={isSubmitting} positive content="Login" type="submit" fluid />
                </Form>
            )}
        </Formik>
    )
})