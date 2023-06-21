import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { toast } from "react-toastify";
import { Button, Grid, Input, Item, ItemContent, Label, Segment } from "semantic-ui-react";
import CustomTextInput from "../../common/form/customTextInput";
import { ShortURLDto } from "../../models/urls";
import { useStore } from "../../stores/store";

export default observer(function UrlForm() {

    const { urlStore, userStore } = useStore();
    const { createUrl, loadUrls } = urlStore;
    const { user } = userStore;

    return (
        <Segment>
            <Grid centered verticalAlign="middle">
                <Grid.Column className="center aligned" width={6}>
                    <Item>
                        <ItemContent>
                            <Formik
                                initialValues={{ destinationURL: '', createdBy: '' , error: null }}
                                onSubmit={(values, { setErrors }) => {
                                    if (user?.username == null) {
                                        toast.error('unauthorised');
                                        
                                    } else {
                                        values.createdBy = user?.username;
                                        createUrl(values).catch(error => setErrors({ error: 'Invalid Email or Password' })).then(loadUrls);
                                    }
                                }}
                            >
                                {({ handleSubmit, errors }) => (
                                    <Form className="ui form" onSubmit={handleSubmit}>
                                        <CustomTextInput name="destinationURL" placeholder="Paste your link" type="destinationURL" />
                                        <ErrorMessage
                                            name="error" render={() => <Label style={{ marginBottom: 10 }} basic color="red" content={errors.error} />}
                                        />
                                        <Button positive content="Create" type="submit" />
                                    </Form>
                                )}
                            </Formik>
                        </ItemContent>
                    </Item>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})