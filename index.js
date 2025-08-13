import express from "express";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
const port = 3000;
//used to parse the form data
app.use(express.urlencoded({extended:true}));
//used to parse the json data
app.use(express.json());

dotenv.config();

const db = new pg.Client({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT
});
db.connect();

app.use(express.static("public"));
//Get all the post
app.get("/",async(req,res)=>{
    try {
        const allowedSort = ["rating","summary_date","title"];
        //here we sort based on allowedSort and if user didn't select any sort we by default sort using date
         const sort = allowedSort.includes(req.query.sort)? req.query.sort: "summary_date";
      const direction = req.query.direction === "asc" ? "ASC" : "DESC";
    const response = await db.query(`SELECT * FROM book_summary ORDER BY ${sort} ${direction}`);
    const result = response.rows;
    // console.log(result);
    res.render("home.ejs",{
        posts:result,
    });
    } catch (error) {
        res.send("Something Went Wrong...");
        console.log(error);
    }
   
});
//Post
app.post("/post",async(req,res)=>{
    try {
     const {title,summary,rating,cover_id} = req.body;
    const summary_date = new Date();
    await db.query("INSERT INTO book_summary (title,summary,summary_date,rating,book_cover_id) VALUES($1,$2,$3,$4,$5)",[title,summary,summary_date,rating,cover_id]);
    res.redirect("/");
    } catch (error) {
          res.send("Something Went Wrong...");
        console.log(error);
    }

});
//New-post
app.get("/new-post",(req,res)=>{
    res.render("edit.ejs",{
        heading:"New-book Wow!",
        submit:"Let's gooo...",
    })
});
//Get post by id
app.get("/post/:id",async(req,res)=>{
    try{
        const id= req.params.id;
        const response = await db.query("SELECT * FROM book_summary WHERE id=$1",[id]);
        const result= response.rows[0];
        // console.log(result);
        res.render("edit.ejs",{
            heading:"Edit",
            submit:"edited",
            edit:result,
        });
    }catch(err){
        console.log(err);
    }
});
//Update route
app.post("/update-post/:id",async(req,res)=>{
    try {
          const id = req.params.id;
     const {title,summary,rating,cover_id} = req.body;
    const summary_date = new Date();
    await db.query("UPDATE book_summary SET title=$1, summary=$2, rating=$3, summary_date=$4,book_cover_id=$5 WHERE id=$6",[title,summary,rating,summary_date,cover_id,id]);
    res.redirect("/");
    } catch (error) {
          res.send("Something Went Wrong...");
        console.log(error);
    }
  
});
//Delete route
app.get("/delete-post/:id",async(req,res)=>{
    try {
           const id = req.params.id;
   await db.query("DELETE FROM book_summary WHERE id=$1",[id]);
   res.redirect("/");
    } catch (error) {
          res.send("Something Went Wrong...");
        console.log(error);
    }
});
//View full summary route
app.get("/view/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await db.query("SELECT * FROM book_summary WHERE id=$1", [id]);
        const result = response.rows[0];
        
        if (!result) {
            return res.status(404).send("Book not found");
        }
        
        res.render("view.ejs", {
            post: result,
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong...");
    }
});
app.listen(port,()=>{
    console.log(`Port is running on http://localhost:${port}`)
});