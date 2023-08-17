import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Shipping from './models/shippingModel.js';
import mongoose from 'mongoose';


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));


app.get('/', (req, res) => {
    res.send('Server is ready');
}
);

app.post('/shipping', async(req, res) => {
    console.log(req.body);
    const shipping =  await Shipping({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        address: req.body.address,
        zip: req.body.zip,
        country: req.body.country,
        sname:req.body.sname,
        // semail:req.body.semail,
        // scity:req.body.scity,
        // saddress:req.body.saddress,
        // szip:req.body.szip,
        // scountry:req.body.scountry,
    });
    const createdShipping = await shipping.save();
    res.send({
        _id: createdShipping._id,
        name: createdShipping.name,
        email: createdShipping.email,
        city: createdShipping.city,
        address: createdShipping.address,
        zip: createdShipping.zip,
        country: createdShipping.country,
        // sname:createdShipping.sname,
        // semail:createdShipping.semail,
        // scity:createdShipping.scity,
        // saddress:createdShipping.saddress,
        // szip:createdShipping.szip,
        // scountry:createdShipping.scountry,
    });
    // console.log(createdShipping);
    
    })



app.listen(5000, () => {
    console.log('Server at http://localhost:5000');
}
);