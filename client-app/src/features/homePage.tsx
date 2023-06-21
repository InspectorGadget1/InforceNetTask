import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import UrlForm from "./urls/urlForm";
import UrlTable from "./urls/urlTable";
import LoginForm from "./users/loginForm";
import RegisterForm from "./users/registerForm";

export default observer(function HomePage() {

    const { userStore, modalStore } = useStore();

    return (
        <Segment textAlign="center" vertical className="masthead">
            <Container text style={{ marginTop: '7em' }}>
                {userStore.isLoggedIn ? (
                    <>
                        <UrlForm/>
                    </>
                ) : (
                    <>
                            <Header as='h1'>
                                Login before creating shortened URL
                            </Header>
                    </>
                )}
                <UrlTable/>
            </Container>
        </Segment>
    )
})