import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "semantic-ui-react";
import LoadingComponent from "../../layout/loadingComponent";
import { useStore } from "../../stores/store";

export default observer(function UrlDetails() {

    const { urlStore, userStore } = useStore();
    const { selectedUrl: url, loadUrl, loadingInitial,deleteUrl } = urlStore;
    const { isLoggedIn, user } = userStore;
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) loadUrl(parseInt(id));
    }, [id, loadUrl]);

    if (!isLoggedIn) return <Navigate to='/'/>
    if (loadingInitial) return <LoadingComponent />;

    return (
        <Card fluid>
            <Card.Content>
                <Card.Description>
                    <div>Desctination: <a href={url?.destinationURL}>{url?.destinationURL}</a></div>
                    <div>Shortened Url: <a href={url?.shortenedURL}>{url?.shortenedURL}</a></div>
                    <div>Created By: {url?.createdBy}</div>
                    <div>Creation Date: {url?.createdDate}</div>
                </Card.Description>
            </Card.Content>
            {(user?.username == url?.createdBy || userStore.role == "Admin") &&
            <Card.Content extra>
                    <Button onClick={()=>deleteUrl(url?.id!).then(()=> navigate('/'))} floated='right' color='orange'>Delete</Button>
            </Card.Content>
            }
        </Card>
    )
})