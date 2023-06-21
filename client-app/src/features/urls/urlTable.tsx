import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import LoadingComponent from "../../layout/loadingComponent";
import { useStore } from "../../stores/store";

export default observer(function UrlTable() {

    const { urlStore } = useStore();
    const { urlsByDate, urlRegistry, loadUrls} = urlStore;

    useEffect(() => {
        if (urlRegistry.size <= 1) loadUrls();
    }, [urlRegistry.size, loadUrls])

    if (urlStore.loadingInitial) return <LoadingComponent content='Loading jobs' />

    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Destination Url</Table.HeaderCell>
                    <Table.HeaderCell>Short Url</Table.HeaderCell>
                    <Table.HeaderCell>Details</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {urlsByDate.map((url) => (
                    <Table.Row key={url.id}>
                        <Table.Cell> <a href={url.destinationURL}>{url.destinationURL}</a> </Table.Cell>
                        <Table.Cell><a href={url.shortenedURL}>{url.shortenedURL}</a></Table.Cell>
                        <Table.Cell>
                            <Button
                                as={Link}
                                to={`/shortUrl/${url.id}`}
                                color='teal'
                                floated="right"
                                content='View'
                            />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
})