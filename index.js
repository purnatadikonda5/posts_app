let express= require("express");
let path= require("path");
const { CLIENT_RENEG_LIMIT } = require("tls");
let app= express();
let port= 8080;
let methodOverride = require('method-override');
app.use(methodOverride('_method'));
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
        id:1,
        username:"Purna_tadikonda",
        content:"I am very good boy"
    },
    {
        id:2,
        username:"Kalyan_chilamkuri",
        content:"I am very bad boy"
    },
    {
        id:3,
        username:"Sai_ram_sharan",
        content:"I am very cute"
    },
    {
        id:4,
        username:"Pranav_reddy",
        content:"I watch anime.. hehehe...."
    },
    {
        id:5,
        username:"Gaurav",
        content:"I like music , lalala"
    }
];
let count=posts.length
app.get('/posts',(req,res)=>{
    // res.send("i am player");
    res.render("index.ejs",{posts});
});
app.get('/posts/new',(req,res)=>{
    res.render("new.ejs");
})
app.post('/posts',(req,res)=>{
    let {username,content}= req.body;
    count++;
    posts.push({id:count,username,content});
    console.log(posts);
    res.redirect("/posts");
});
app.get('/posts/:id',(req,res)=>{
    console.log(posts);

    let id= req.params.id;
    console.log(id);
    let post =null;
    for(let pos of posts){
        if(pos.id==id){post=pos;break;}
    }
    // res.send("yes this is the post");
    res.render("postdetail.ejs",{post});
});
app.patch('/posts/:id',(req,res)=>{
    let id= req.params.id;
    let {username,content} = req.body;
    let post=null;
    for(let pos of posts){
        if(pos.id==id){post=pos;break;}
    }
    if(username!=null)post.username=username;
    if(content!=null)post.content=content;
    res.redirect('/posts');
});
app.get('/posts/:id/edit',(req,res)=>{
    let id= req.params.id;
    let post=null;
    for(let pos of posts){
        if(pos.id==id){post=pos;break;}
    }
    res.render("update.ejs",{post});
});
app.delete('/posts/:id',(req,res)=>{
    let id= req.params.id;
    let dull=[];
    for(let pos of posts){
        if(pos.id!=id){dull.push(pos);}
    }
    posts=dull;
    res.redirect('/posts');
})