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
                            <Image src={`https://media.istockphoto.com/id/1300845620/uk/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D1%96-%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%BD%D1%8F/%D0%BF%D1%96%D0%BA%D1%82%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%B0-%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D1%83%D0%B2%D0%B0%D1%87%D0%B0-%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B0-%D1%96%D0%B7%D0%BE%D0%BB%D1%8C%D0%BE%D0%B2%D0%B0%D0%BD%D0%B0-%D0%BD%D0%B0-%D0%B1%D1%96%D0%BB%D0%BE%D0%BC%D1%83-%D1%82%D0%BB%D1%96-%D1%81%D0%B8%D0%BC%D0%B2%D0%BE%D0%BB-%D0%BA%D0%BE%D1%80%D0%B8%D1%81%D1%82%D1%83%D0%B2%D0%B0%D1%87%D0%B0.jpg?s=1024x1024&w=is&k=20&c=MHqNqjLKzyfe_htgZdb6AEvs7MoQ5NX9Qe3IkBVvCU4=`} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user?.username}>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={funcLogOut} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ): (
                            <>
                                <Menu.Item onClick={() => modalStore.openModal(<LoginForm />)} name="Login"></Menu.Item>
                                <Menu.Item onClick={() => modalStore.openModal(<RegisterForm />)} name="Register"></Menu.Item>
                            </>
                        )}
                    
                </Menu.Item>
            </Container>
        </Menu>
    )
})