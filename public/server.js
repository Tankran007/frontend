const express = require ('express');
const Sequelize = require( 'sequelize');
const app = express();

// parse incoming requests
app.use (express.json());

// create a connection to the database
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'Database/Music_Album.db'
});

//Employee
const MusicAlbums = sequelize.define('MusicAlbum', {
    musicID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        
    },
    musicformat: {
        type: Sequelize.INTEGER,
        allowNull: false
        
    },
    music: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    Composer: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    
});

//Department
const Musicformats = sequelize.define('Musicformats', {
    id_fom: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    musicformat: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

const Music = sequelize.define('Music', {
    id_mus: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    music_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});

const Composer = sequelize.define('Composer', {
    id_com: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    composer_name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
});
sequelize.sync();

//ของ table MusicAlbums
app.get('/iu', (req, res) => {
    MusicAlbums.findAll().then(musicAlbums => {
        res.json(musicAlbums);
    }).catch(err =>{
        res.status(500).send(err);
    });
});

app.get('/iu/:id', (req, res) => {
    MusicAlbums.findByPk(req.params.id).then(musicAlbums => {
    if (!musicAlbums) {
            res.status (404).send('music not found');
        } else {    
            res.json(musicAlbums) ;
        }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

app.post('/iu',(req,res) => {
    MusicAlbums.create(req.body).then(musicAlbums => {
        res.send(musicAlbums);
    }).catch(err => {
        res.status(500).send(err);
    });

});

app.put('/iu/:id', async (req, res) => {
    try {
        const musicAlbums = await MusicAlbums.findByPk(req.params.id);
        if (!musicAlbums) {
            res.status(404).json({ error: 'musicAlbums not found' });
        } else {
            await musicAlbums.update(req.body);
            res.status(200).json(musicAlbums); // ส่งข้อมูลที่ถูกแก้ไขคืนไป
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

    app.delete('/iu/:id', async (req, res) => {
        try {
            const musicAlbums = await MusicAlbums.findByPk(req.params.id);
            if (!musicAlbums) {
                res.status(404).json({ error: 'musicAlbums not found' });
            } else {
                await musicAlbums.destroy();
                res.status(204).json({});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });



//ของ table Musicformats
app.get('/yuo', (req, res) => {
    Musicformats.findAll().then(formats => {
        res.json(formats);
    }).catch(err =>{
        res.status(500).send(err);
    });
});

app.get('/yuo/:id', (req, res) => {
    Musicformats.findByPk(req.params.id).then(formats => {
    if (!formats) {
            res.status (404).send('music not found');
        } else {    
            res.json(formats) ;
        }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

app.post('/yuo',(req,res) => {
    Musicformats.create(req.body).then(formats => {
        res.send(formats);
    }).catch(err => {
        res.status(500).send(err);
    });

});

app.put('/yuo/:id', async (req, res) => {
    try {
        const formats = await Musicformats.findByPk(req.params.id);
        if (!formats) {
            res.status(404).json({ error: 'formats not found' });
        } else {
            await formats.update(req.body);
            res.status(200).json(formats); // ส่งข้อมูลที่ถูกแก้ไขคืนไป
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

    app.delete('/yuo/:id', async (req, res) => {
        try {
            const formats = await Musicformats.findByPk(req.params.id);
            if (!formats) {
                res.status(404).json({ error: 'formats not found' });
            } else {
                await formats.destroy();
                res.status(204).json({});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });



//ของ table music
app.get('/test', (req, res) => {
    Music.findAll().then(music => {
        res.json(music);
    }).catch(err =>{
        res.status(500).send(err);
    });
});

app.get('/test/:id', (req, res) => {
    Music.findByPk(req.params.id).then(music => {
    if (!music) {
            res.status (404).send('music not found');
        } else {    
            res.json(music) ;
        }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

app.post('/test',(req,res) => {
    Music.create(req.body).then(music => {
        res.send(music);
    }).catch(err => {
        res.status(500).send(err);
    });

});

app.put('/test/:id', async (req, res) => {
    try {
        const music = await Music.findByPk(req.params.id);
        if (!music) {
            res.status(404).json({ error: 'Music not found' });
        } else {
            await music.update(req.body);
            res.status(200).json(music); // ส่งข้อมูลที่ถูกแก้ไขคืนไป
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

    app.delete('/test/:id', async (req, res) => {
        try {
            const music = await Music.findByPk(req.params.id);
            if (!music) {
                res.status(404).json({ error: 'music not found' });
            } else {
                await music.destroy();
                res.status(204).json({});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

//ของ table composer
app.get('/com', (req, res) => {
    Composer.findAll().then(composer => {
        res.json(composer);
    }).catch(err =>{
        res.status(500).send(err);
    });
});

app.get('/com/:id', (req, res) => {
    Composer.findByPk(req.params.id).then(composer => {
    if (!composer) {
            res.status (404).send('composer not found');
        } else {    
            res.json(composer) ;
        }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

app.post('/com',(req,res) => {
    Composer.create(req.body).then(composer => {
        res.send(composer);
    }).catch(err => {
        res.status(500).send(err);
    });

});

app.put('/com/:id', (req, res) => {
    Composer.findByPk( req.params.id).then(composer => {
    if (!composer) {
        res.status(404).send('composer not found');
    } else {
        composer.update(req.body).then(() => {
        res.send(composer) ;
    }).catch(err => {
        res.status(500).send(err);
    });
    }
    }).catch(err => {
        res. status(500).send(err);
    });
});

    app.delete('/com/:id', async (req, res) => {
        try {
            const composer = await Composer.findByPk(req.params.id);
            if (!composer) {
                res.status(404).json({ error: 'Composer not found' });
            } else {
                await composer.destroy();
                res.status(204).json({});
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

app.listen(5500, () => {
    console.log("Server started on port 5500");
    });