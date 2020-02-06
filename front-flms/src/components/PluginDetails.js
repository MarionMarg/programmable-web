import React from 'react';
import { useParams } from 'react-router-dom';
import { Button, Row, Col, Card, Container, Badge } from 'react-bootstrap';
import { GetPlugin,AddLike, GetUser, GetComments, convertBufferToBase64 } from '../utils/hooks.js';

const PluginDetails = () => {
    //const [plugin, setPlugin] = useState({name: '', version: '', category: '', image: '', description: '', tags: [], likes: []});

    let user = '';
    const { pluginId } = useParams();
    if (sessionStorage.getItem('jwtToken')) {
        user = GetUser(sessionStorage.getItem('jwtToken'));
    }

    const click = (plugin) => {
        if (sessionStorage.getItem('jwtToken')) {
            const myId = user._id;
            if(!plugin.likes.includes(myId)){
                AddLike(plugin,myId);
                window.location.reload();
            }else {
                alert('Vous avez deja aimé !');
            }
        } else {
            alert('Veuillez vous connecter !');
        }
    };

    const plugin = GetPlugin(pluginId);
    const comments = GetComments(pluginId);
    if (plugin) {
        console.log(plugin);
        if (comments) {
            console.log(comments);
        }
        return (
            <Container className="pluginDetails">
                <Row className="pluginDetailsHeader">
                    <Col><h1>{plugin.name}</h1></Col>
                    <Col><img src={convertBufferToBase64(plugin.image)} /></Col>
                    <Col><h4>Likes : {plugin.likes.length}</h4><Button variant="primary" onClick={e => click(plugin)}>Add</Button></Col>
                </Row>
                <Row className="pluginDetailsSourceLink">
                    <Col><a  href={plugin.linkgithub ? plugin.linkgithub : ''}>{plugin.linkgithub ? plugin.linkgithub : ''}</a></Col>
                </Row>
                <Row className="pluginDetailsPicture">
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
                <Row className="pluginDetailsTag">
                    <Col></Col>
                    <Col>{plugin.tags.map((tag) => <><Badge variant="info">{tag}</Badge></>)}</Col>
                    <Col></Col>
                </Row>
                <br/>
                <Row className="pluginDetailsDescriptionTitle">
                    <Col><h4>Description:</h4></Col>
                </Row>
                <Row className="pluginDetailsDescription">
                    <Col>{plugin.description}</Col>
                </Row>
                <br/>
                <Row className="pluginDetailsCommentsTitle">
                    <Col><h4>Comments:</h4></Col>
                </Row>
                {
                    comments.length > 0 ? comments.map((comment, i) => {
                        const commentDate = new Date(comment.date);
                        return (
                            <>
                                <Row key={i} className="pluginDetailsComment">
                                    <Card>
                                        <Card.Body>
                                            <Card.Title>
                                                <div>
                                                    <span style={{float: 'left'}}><b>{comment.writer}</b></span>
                                                    <span style={{float: 'right'}}>
                                                        {commentDate.toLocaleDateString()}                       
                                                    </span>
                                                </div>
                                                <br/>
                                            </Card.Title>
                                            <Card.Text>
                                                {comment.content}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Row>
                                <br/>
                            </>
                        );
                    }
                    ) : <br/>
                }
            </Container>
        );
    }
    return null;
};

export default PluginDetails;
