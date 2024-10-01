let express= require("express");
let path= require("path");
let app= express();
let port= 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

app.get('/',(req,res)=>{
    res.send("This is the main page");
})
let posts=[
    {
        username:"Purna_tadikonda",
        content:"I am very good boy"
    },
    {
        username:"Kalyan_chilamkuri",
        content:"I am very bad boy"
    },
    {
        username:"Sai_ram_sharan",
        content:"I am very cute"
    },
    {
        username:"Pranav_reddy",
        content:"I watch anime.. hehehe...."
    }
];
app.get('/posts',(req,res)=>{
    // res.send("i am player");
    res.render("index.ejs",{posts});
});
app.get('/posts/new',(req,res)=>{
    res.render("new.ejs");
})

app.post('/posts',(req,res)=>{
    // let obj=req.body;
    let {username,content}= req.body;
    posts.push({username,content});
    // posts.push(obj);
    res.redirect("/posts");
});
