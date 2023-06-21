import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../stores/store";
import LoginForm from "./users/loginForm";
import RegisterForm from "./users/registerForm";

export default observer(function HomePage() {

    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    ProMote
                </Header>
                <Header as='h2' inverted content="Welcome to ProMote" />
                {userStore.isLoggedIn ? (
                    <>
                        <Button as={Link} to='/jobs' size="huge" inverted>
                            Take me to Freelance
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size="huge" inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size="huge" inverted>
                            Register
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})