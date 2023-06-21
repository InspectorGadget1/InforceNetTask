import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './navBar';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from '../features/homePage';
import LoginForm from '../features/users/loginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './loadingComponent';
import ModalContainer from '../common/modals/modalContainer';
import { ToastContainer } from 'react-toastify';


function App() {

    const location = useLocation();
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])

    if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar />
            <ModalContainer />
            <Routes>
                <Route path='/' element={<> <NavBar /> <HomePage /></>} />
                <Route path={'/*'} element={
                    <Fragment>
                        <NavBar />
                        <Container style={{ marginTop: '7em' }}>
                            <Routes>
                                {/* <Route path='shortUrl/:id' element={<JobDetails />} /> 
                                    <Route path='about' element={<Analysis />} />
                                  */ }
                                <Route path='login' element={<LoginForm />} />
                            </Routes>
                        </Container>
                    </Fragment>
                } />
            </Routes>
        </>
    );
}

export default observer(App);