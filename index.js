const express = require("express")
const cors = require("cors")
const port = 8080 || process.env.PORT
const app = express() 
const fileUpload = require("express-fileupload")
const {User, Post}= require("./models/Schemas")
const mongoose = require("mongoose")
const path = require("path")

const uri = 'mongodb+srv://Pritish:Pritish19@cluster0.nre1sxt.mongodb.net/?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())
app.use(fileUpload())

//Connection to mongoDB
mongoose.set('strictQuery', true)
mongoose.connect(uri, (err) => {
    if(err) {
        console.log("Connection to mongodb failed")
    }
    else console.log("Connected to mongoDB successfully")
})



app.listen(port, () => {
    console.log(`App is listening on ${port}`);
})

app.get("/test", (res, resp) => {
    resp.send(`<h1>You are in / Backend is working</h1>`)
})


app.post("/user", async (req, resp) => {
    const {name, password} = req.body
    const userObject = new User({
        name,
        password,
        // imagefile,
    })
    const response = await userObject.save()
    resp.json({message: response})
})

app.post("/api", (req, resp) => {
    const { name, location, description }  = req.body
    const {imagefile} = req.files
    console.log({ name, location, description, imagefile});
    imagefile.mv("./uploads/"+imagefile.name, async (err) => {
        if(err) {
            resp.json({message: err})
        }
        else {
            const post = new Post({
                ...{ name, location, description },
                imagefile: imagefile.name
            })
            try{
                const response = await post.save()
                resp.json({message: 'Everything is fine', response})
            }catch(e){
                resp.json({message: 'Something went wrong' , response: e })
            }
        }
    })
})

app.get("/all", async (req, resp) => {
    resp.json({result: await Post.find().sort({_id:"-1"})})
})

app.get("/images/:fileName", async (req, resp) => {
    console.log(`./uploads/${req.params.fileName}`)
    resp.sendFile(path.join(__dirname, `./uploads/${req.params.fileName}`))
})

// const express = require("express")
// const cors = require("cors")

// const port = 8080

// const app = express()

// const fileUpload = require('express-fileupload')
// // const {User, database} = require("./models/User")
// const {User, Post} = require("./models/Schemas")

// const obj = require("./models/Schemas")

// const uri = 'mongodb+srv://Pritish:Pritish19@cluster0.nre1sxt.mongodb.net/?retryWrites=true&w=majority'

// const mongoose = require("mongoose")

// app.use(cors())
// app.use(express.json())
// app.use(fileUpload())

// //Connection to mongoDB
// mongoose.set('strictQuery', true)
// mongoose.connect(uri, (err) => {
//     if(err) {
//         console.log("Connection to mongoDB failed");
//     }
//     else console.log("Connected to mongoDB sucessfully");
// })

// app.listen(port, () => {
//     console.log(`App listening on ${port}`);
// })

// //Create a post api

// // app.post("/add", (req, resp) => {

// // })

// // app.post("/api", (req, resp) => {
// //     console.log(req.files, imagefile);
// //     // console.log(req.body, req.files),

// //     // resp.send("Data Received now"),
// //     resp.json({message: 'sucess My Message data Received'})
// // })

// app.post("/user", async (req, resp) => {
//     const {name, password} = req.body
//     const userObject = new User({
//         name,
//         password,
//     })
//     const response = await userObject.save()
//     resp.json({message: response})
// })

// app.post("/api", (req, resp) => {
//     const { name, location, description } = req.body;
//     const {imagefile} = req.files 
//     console.log({ name, location, description, imagefile});
//     resp.send("Response from client");
    
//     // imagefile.mv("./uploads/"+imagefile.name, async (err) => {
//     //     if(err) {
//     //         resp.json({message: err})
//     //     }
//     //     else {
//     //         // resp.json({message: "Upload success"})
//     //         const post = new Post({
//     //             ...{ name, location, description },
//     //             imagefile: imagefile.name
//     //         })
//     //         try{
//     //             const response = await post.save()
//     //             resp.json({message: 'Everything is fine', response})
//     //         }catch(e){
//     //             resp.json({message: 'Something wents wrong', response: e})
//     //         }
//     //     }
//     // })
// })