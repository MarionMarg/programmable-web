import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Row, Col, Card, Container, Badge, Form } from 'react-bootstrap';
import { GetPlugin, AddLike, GetUser, GetComments, AddComment, convertBufferToBase64 } from '../utils/hooks.js';
import { useSelector } from 'react-redux';
import SweetAlert from 'sweetalert2-react';
import './PluginDetails.css';

const PluginDetails = () => {
    //const [plugin, setPlugin] = useState({name: '', version: '', category: '', image: '', description: '', tags: [], likes: []});

    let user = '';
    const [alertMessage, setAlertMessage] = useState(null);
    const { pluginId } = useParams();
    const loggedIn = useSelector(state => state.loggedIn);
    if (sessionStorage.getItem('jwtToken')) {
        user = GetUser(sessionStorage.getItem('jwtToken'));
    }

    const click = (plugin) => {
        if (sessionStorage.getItem('jwtToken')) {
            const myId = user._id;
            if (!plugin.likes.includes(myId)) {
                AddLike(plugin, myId);
                window.location.reload();
            } else {
                setAlertMessage('Vous avez déjà aimé !');
            }
        } else {
            setAlertMessage('Veuillez vous connecter !');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const comment = Object.fromEntries(data);
        if (sessionStorage.getItem('jwtToken')) {
            if (comment.commentContent.trim().length > 0) {
                const myId = user.username;
                AddComment(plugin, myId, comment.commentContent);
                window.location.reload();
            }
        } else {
            alert('Veuillez vous connecter !');
        }
    };

    const plugin = GetPlugin(pluginId);
    const comments = GetComments(pluginId);
    console.log('renderPluginDetails');
    console.log(plugin);
    if (plugin === []) return null;
    if (comments) {
        console.log(comments);
    }
    return (
        <Container className="pluginDetails">
            <Row className="pluginDetailsHeader">
                <Col><h1>{plugin.name}</h1></Col>
                <Col><img className="Image" src={convertBufferToBase64(plugin.image)} alt="Plugin" /></Col>
                <Col><h4>Likes : {plugin.likes.length}</h4><Button variant="primary" onClick={() => click(plugin)}>Add</Button></Col>
            </Row>
            <Row className="pluginDetailsSourceLink">
                <Col><a href={plugin.linkgithub ? plugin.linkgithub : ''}>{plugin.linkgithub ? plugin.linkgithub : ''}</a></Col>
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
            <br />
            <Row className="pluginDetailsAuthorTitle">
                <Col><h4>Auteur:</h4></Col>
            </Row>
            <Row className="pluginDetailsAuthor">
                <Col>{plugin.creator.username}</Col>
            </Row>
            <br />
            <Row className="pluginDetailsDescriptionTitle">
                <Col><h4>Description:</h4></Col>
            </Row>
            <Row className="pluginDetailsDescription">
                <Col>{plugin.description}</Col>
            </Row>
            <br />
            <Row className="pluginDetailsCommentsTitle">
                {loggedIn ?
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label htmlFor="commentContent">Ajouter un commentaire</Form.Label>
                                <Form.Control name="commentContent" id="commentContent" required />
                            </Form.Group>
                            <Button type="submit">Ajouter</Button>
                        </Form>
                    </Col>
                    :
                    <Col></Col>
                }
            </Row>
            <Row className="pluginDetailsAddCommentsTitle">
                {loggedIn ?
                    <Col><h4>Comments:</h4></Col>
                    :
                    <Col><h4>Comments (connectez vous pour commenter):</h4></Col>
                }
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
                                                <span style={{ float: 'left' }}><b>{comment.writer}</b></span>
                                                <span style={{ float: 'right' }}>
                                                    {commentDate.toLocaleDateString()}
                                                </span>
                                            </div>
                                            <br />
                                        </Card.Title>
                                        <Card.Text>
                                            {comment.content}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Row>
                            <br />
                        </>
                    );
                }
                ) : <br />
            }
            <SweetAlert
                show={alertMessage}
                title="Erreur"
                text={alertMessage}
                type="error"
                onConfirm={() => setAlertMessage('')}
            />
        </Container>
    );
};

export default PluginDetails;
