import { observer } from "mobx-react-lite";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from "semantic-ui-react";
import LoginForm from "../features/users/loginForm";
import RegisterForm from "../features/users/registerForm";
import { useStore } from "../stores/store";

export default observer(function NavBar() {

    const navigate = useNavigate();

    const { userStore: { user, logout, isLoggedIn }, modalStore } = useStore();
    function funcLogOut() {
        logout();
        navigate('/');
    }
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    UrlShortener
                </Menu.Item>
                <Menu.Item as={NavLink} to='/about' name="About"></Menu.Item>
                <Menu.Item position="right">
                    {isLoggedIn ? (
                        <>
                            <Image src={`/assets/userImages/andrii.jpg`} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user?.username}>
                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={`profiles/${user?.username}`} text='My profile' icon='user' />
                                    <Dropdown.Item onClick={funcLogOut} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ): (
                            <>
                                <Button onClick={() => modalStore.openModal(<LoginForm />)} positive content='Login' />
                                <Button onClick={() => modalStore.openModal(<RegisterForm />)} positive content='Register' />
                            </>
                        )}
                    
                </Menu.Item>
            </Container>
        </Menu>
    )
})