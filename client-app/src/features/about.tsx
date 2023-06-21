import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Form, Grid, Header, Item, ItemContent, Segment, TextArea } from "semantic-ui-react";
import CustomTextArea from "../common/form/customTextArea";
import { AboutDescription } from "../models/about";
import { useStore } from "../stores/store";

export default observer(function About() {

    const { aboutStore, userStore } = useStore();
    const [description, setDescription] = useState<string>("");

    useEffect(() => {
        aboutStore.getDescription().then(() => {
            setDescription(aboutStore.description.description);
        });
    }, [aboutStore]);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleUpdateDescription = async () => {
        const updatedDescription: AboutDescription = {
            id: aboutStore.description.id,
            description: description,
        };
        await aboutStore.updateDescription(updatedDescription);
    };
        
    return (
        <Segment raised>
            <Header>Про проект</Header>
            {(userStore.isLoggedIn && userStore.role == "Admin") ? (
                    <Segment>
                        <Form>
                            <TextArea value={description} onChange={handleInputChange} rows={7} />
                            <Button onClick={handleUpdateDescription} positive content="Update" type="submit" />
                        </Form>           
                    </Segment>
            ): (
                <>
                    <p>{description}</p>
                </>
            ) }
        </Segment>
    )
})