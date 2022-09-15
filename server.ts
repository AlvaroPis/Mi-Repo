import dotenv from "dotenv";
dotenv.config();

import express, { Express , Request, Response} from "express";
import mongoose from "mongoose";

const app: Express = express();

interface User {
  name: string
  lastName: string
}

const users: User[] = [{name:"",lastName:""}]

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`Server is up and running at port ${process.env.PORT}`);
});

app.get("/",(req: Request,res: Response)=>{
   res.status(200).send(users)
})

app.post("/",(req: Request<any, any, User>,res)=>{
  users.push(req.body)
  console.log(req.body)
  //res.send(JSON.stringify({data:users}))
  res.status(200).send(`El nombre de tu usuario es ${req.body.name} ${req.body.lastName}`)
})

app.delete('/',(req: Request,res: Response) =>{
  const index = users.findIndex(users => users.name === req.body.name && users.lastName === req.body.lastName)
  if (index === -1) {
      res.status(404).send('No existe')
      return
  }
  users.splice(index, 1)
  res.send(users)

  //users.splice(users.indexOf({name:req.body.name, lastName:req.body.lastName},1))
  //res.status(200).send(`Se ha borrado con exito el usuario`)
})

app.put('/',(req: Request,res: Response) =>{
  res.status(200).send("comando PUT invocado")
})



connectToDb()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

async function connectToDb() {
  if (process.env.DB_CONNECTION_STRING) {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
  } else {
    console.log("Connection string is missing");
  }
}
