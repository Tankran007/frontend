const express = require("express");
const axios = require("axios");
const app = express();
var bodyParser = require("body-parser");
const path = require("path");



// Base URL for the API
//const base_url = "https://api.example.com";
//  const base_url = "http://localhost:5500";
const base_url ="https://node50302-tankran.proen.app.ruk-com.cloud";

// Set the template engine
app.set("views", path.join(__dirname,"/public/views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files

app.use(express.static(__dirname + "/public"));

app.get("/viewalbum", async (req, res) => {
  try {

      const formatname = await axios.get(base_url + '/yuo/'+req.query.id1);
      const musicname = await axios.get(base_url + '/test/'+req.query.id2);
      const composername = await axios.get(base_url + '/com/'+req.query.id3);
      res.render("viewalbum", { musicformat: formatname.data, music: musicname.data, Composer:composername.data });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/cps", async (req, res) => {
  try {
      const response = await axios.get(base_url + '/com');
      res.render("composers", { composers: response.data });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/msn", async (req, res) => {
  try {
      const response = await axios.get(base_url + '/test');
      res.render("music", { music: response.data });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/formatview", async (req, res) => {
  try {
      const response = await axios.get(base_url + '/yuo');
      res.render("musicformat", { musicformat: response.data });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/inab", async(req, res) => {
  const musicformatdata = await axios.get(base_url + '/yuo');
  const musicdata = await axios.get(base_url + '/test');
  const Composerdata = await axios.get(base_url + '/com');
  res.render("inputdata", { musicformat: musicformatdata.data, music: musicdata.data, Composer:Composerdata.data});
}); 

app.post("/inab", async (req, res) => {
    try {
        const data = { musicformat: req.body.musicformat, music: req.body.music, Composer: req.body.Composer};
        await axios.post(base_url + '/iu', data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
  });


  app.get("/", async (req, res) => {
    try {
      const musicalbum = await axios.get(base_url + '/iu');
      // const musicformatdata = await axios.get(base_url + '/yuo');
      // const musicdata = await axios.get(base_url + '/test');
      // const Composerdata = await axios.get(base_url + '/com');
        res.render("test", {  musicalbum: musicalbum.data});
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
  });

// app.get("/book/:id" , async (req, res) => {
//   try {
//       const response = await axios.get(base_url + '/books/' + req.params.id);
//       res.render("book", { book: response.data });
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error');
//   }
// });

// app.get("/create", (req, res) => {
//   res.render("create");
// });

// app.post("/create", async (req, res) => {
//   try {
//       const data = { title: req.body.title, author: req.body.author };
//       await axios.post(base_url + '/Composers', data);
//       res.redirect("/");
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error');
//   }
// });
app.get("/inab2", async(req, res) => {
  res.render("createcomposer");
}); 

app.post("/inab2", async (req, res) => {
    try {
        const data = {composer_name: req.body.composer_name};
        await axios.post(base_url + '/com', data);
        res.redirect("/cps");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
  });

  app.get("/inab3", async(req, res) => {
    res.render("createmusic");
  }); 
  
  app.post("/inab3", async (req, res) => {
      try {
          const data = {music_name: req.body.music_name};
          await axios.post(base_url + '/test', data);
          res.redirect("/msn");
      } catch (err) {
          console.error(err);
          res.status(500).send('Error');
      }
    });

    app.get("/inab4", async(req, res) => {
      res.render("createformat");
    }); 
    
    app.post("/inab4", async (req, res) => {
        try {
            const data = {musicformat: req.body.musicformat};
            await axios.post(base_url + '/yuo', data);
            res.redirect("/formatview");
        } catch (err) {
            console.error(err);
            res.status(500).send('Error');
        }
      });

  
app.get("/updateab/:id", async (req, res) => {
  try {
        const musicalbumid = await axios.get(base_url + '/iu/'+req.params.id);
        const musicformatdata = await axios.get(base_url + '/yuo');
        const musicdata = await axios.get(base_url + '/test');
        const Composerdata = await axios.get(base_url + '/com');
        res.render("updatemusicab", { musicalbumid:musicalbumid.data, musicformat: musicformatdata.data, music: musicdata.data, Composer:Composerdata.data});
      } catch (err) {
          console.error(err);
          res.status(500).send('Error');
      }
});

  app.post("/updateab/:id", async (req, res) => {
    try {
        const data = { musicformat: req.body.musicformat, music: req.body.music , Composer: req.body.Composer };
        await axios.put(base_url + '/iu/' + req.params.id, data);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
  });

  app.get("/updatefm/:id", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/yuo/' + req.params.id);
            res.render("updateformat", {musicformat: response.data});
        } catch (err) {
            console.error(err);
            res.status(500).send('Error');
        }
  });
  
  app.post("/updatefm/:id", async (req, res) => {
    try {
        const data = { musicformat : req.body.musicformat};
        await axios.put(base_url + '/yuo/' + req.params.id, data);
        res.redirect("/formatview");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
  });

  app.get("/updatems/:id", async (req, res) => {
    try {
        const response = await axios.get(
            base_url + '/test/' + req.params.id);
            res.render("updatems", {music: response.data});
        } catch (err) {
            console.error(err);
            res.status(500).send('Error');
        }
  });
  
  app.post("/updatems/:id", async (req, res) => {
    try {
        const data = { music_name : req.body.music_name};
        await axios.put(base_url + '/test/' + req.params.id, data);
        res.redirect("/msn");
    } catch (err) {
        console.error(err);
        res.status(500).send('Error');
    }
  });


  app.get("/updatecps/:id", async (req, res) => {
  try {
      const response = await axios.get(
          base_url + '/com/' + req.params.id);
          res.render("updatecps", {composer: response.data});
      } catch (err) {
          console.error(err);
          res.status(500).send('Error');
      }
});

app.post("/updatecps/:id", async (req, res) => {
  try {
      const data = { composer_name : req.body.composer_name};
      await axios.put(base_url + '/com/' + req.params.id, data);
      res.redirect("/cps");
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

// app.get("/update/:id", async (req, res) => {
//   try {
//       const response = await axios.get(
//           base_url + '/books/' + req.params.id);
//           res.render("update", {book: response.data});
//       } catch (err) {
//           console.error(err);
//           res.status(500).send('Error');
//       }
// });

// app.post("/update/:id", async (req, res) => {
//   try {
//       const data = { title : req.body.title, author: req.body.author };
//       await axios.put(base_url + '/books/' + req.params.id, data);
//       res.redirect("/");
//   } catch (err) {
//       console.error(err);
//       res.status(500).send('Error');
//   }
// });

app.get("/delete/:id", async (req, res) => {
  try {
      await axios.delete(base_url + '/iu/' + req.params.id);
      res.redirect("/");
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/delete1/:id", async (req, res) => {
  try {
      await axios.delete(base_url + '/com/' + req.params.id);
      res.redirect("/cps");
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/delete2/:id", async (req, res) => {
  try {
      await axios.delete(base_url + '/test/' + req.params.id);
      res.redirect("/msn");
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});

app.get("/delete3/:id", async (req, res) => {
  try {
      await axios.delete(base_url + '/yuo/' + req.params.id);
      res.redirect("/formatview");
  } catch (err) {
      console.error(err);
      res.status(500).send('Error');
  }
});




//app.listen(8080, () => {
//    console.log('Server started on port 8080');
//});

app.listen(3100, () => {
  console.log('Server started on port 3100');
});