import { useState, useEffect } from 'react';

export const convertBufferToBase64 = image => {
    let binary = '';
    if (image.buffer && image.buffer.data) {
        const bytes = [].slice.call(new Uint8Array(image.buffer.data));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        binary = btoa(binary);
    }
    return `data:${image.mimeType};base64,${binary}`;
};

export const GetPluginsList = () => {
    const [plugins, setPlugins] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/plugins', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => {
                if (json) {
                    console.log(json);
                    setPlugins(json);
                } else {
                    setPlugins([]);
                }
            });
    }, []);

    return { plugins };
};

export const AddLike = (plugin, userId) => {

    const newArr = [];
    if(plugin.likes.length > 0){
        plugin.likes.map(plugin => newArr.push(plugin));
    }
    newArr.push(userId);

    console.log(newArr);

    fetch('http://localhost:3001/api/plugin', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'name': plugin.name,
            'users': newArr
        })
    });
};

export const GetPlugin = (pluginId) => {
    const [plugin, setPlugin] = useState({ name: '', version: '', category: '', image: '', description: '', linkgithub: '', tags: [], likes: [] });

    useEffect(() => {
        fetch(`http://localhost:3001/api/plugin?id=${pluginId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => {
                if (json) {
                    console.log(json);
                    setPlugin(json);
                } else {
                    setPlugin();
                }
            });
    }, []);

    return plugin;
};

export const GetUser = (userToken) => {
    const [user, setUser] = useState({ username: '', password: '', email: ''});

    useEffect(() => {
        fetch(`http://localhost:3001/api/user?token=${userToken}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => {
                if (json) {
                    console.log(json);
                    setUser(json);
                } else {
                    setUser();
                }
            });
    }, []);

    return user;
};

export const GetComments = (pluginId) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/comments?pluginId=${pluginId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(json => {
                console.log(json);
                if (json) {
                    setComments(json);
                } else {
                    setComments();
                }
            });
    }, []);

    return comments;
};
