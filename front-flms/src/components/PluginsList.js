import React from 'react';
import { GetPluginsList } from '../utils/hooks';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PluginsList = () => {

    const { plugins } = GetPluginsList();

    const click = (likes) => {
        if (sessionStorage.getItem('jwtToken')) {
            console.log('connecté');
            console.log(likes);
        } else {
            alert('Veuillez vous connecter !');
        }
    };

    return (
        <div>
            <Link to={'/pluginDetails/5e35427d1f125b006bc4d0be'}>to pluginDetails</Link>
            {
                plugins.map(plugins =>
                    <Card key={plugins._id} style={{ width: '18rem' }}>
                        <Card.Body>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <Card.Title>{plugins.name}</Card.Title>
                                <Card.Img variant="top" src={plugins.image} />
                                <Card.Text>
                                    {plugins.description}
                                </Card.Text>
                            </Link>
                            Likes : {plugins.likes.length}<br />
                            <Button variant="primary" onClick={click(plugins.likes)}>Add</Button>
                        </Card.Body>
                    </Card>
                )
            }
        </div>
    );
};

export default PluginsList;
