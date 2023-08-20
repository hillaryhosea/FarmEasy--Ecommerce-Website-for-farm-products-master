import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Shipping from './models/shippingModel.js';
import mongoose from 'mongoose';
import Signup from './models/signUpModel.js';
import bcrypt from 'bcrypt'
import Product from './models/ProductModel.js';
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname as you normally would



const app = express();
dotenv.config();
app.use(cors());

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));
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
    
    const shipping =  await Shipping({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        address: req.body.address,
        zip: req.body.zip,
        country: req.body.country,
        sname:req.body.sname,
        semail:req.body.semail,
        scity:req.body.scity,
        saddress:req.body.saddress,
        szip:req.body.szip,
        scountry:req.body.scountry,
        order:req.body.cartItems
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
        sname:createdShipping.sname,
        semail:createdShipping.semail,
        scity:createdShipping.scity,
        saddress:createdShipping.saddress,
        szip:createdShipping.szip,
        scountry:createdShipping.scountry,
    });
    // console.log(createdShipping);
    
    })

    app.get('/orders', async(req, res)=>{
      const createdOrders = await Shipping.find({})
      res.send({createdOrders})
    })
    app.post('/signup', async (req, res) => {
      try {
        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
        const signUp = await Signup({
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          role: req.body.role
        });
    
        const createdUser = await signUp.save();
        res.send({
          role: createdUser.role
        });
    
        console.log(createdUser);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    app.post('/signin', async (req, res) => {
      try {
        const user = await Signup.findOne({ email: req.body.email });
    
        if (!user) {
          return res.status(401).json({ message: 'Unauthorized user' });
        }
    
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    
        if (isPasswordValid) {
          // Password is correct, you can send the user details along with the role
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role // Assuming 'role' is a property in your User schema
            // Add any other properties you want to send
          });
        } else {
          res.status(401).json({ message: 'Unauthorized user' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // Import necessary libraries and modules

// Define routes and handlers
app.post('/upload', upload.single('productImage'), async (req, res) => {
  try {
    // Save product details including the image URL to the database
    const newProduct = new Product({
      name: req.body.productName,
      price: req.body.productPrice,
      imageUrl: req.file.path, // This assumes you have configured multer for file uploads
    });
    await newProduct.save();

    res.status(201).send({ message: 'Product uploaded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading product' });
  }
});

app.get('/products', async (req, res) => {
  try {
    // Retrieve all products from the database
    const products = await Product.find();
console.log(products);
    res.status(200).send(products);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error fetching products' });
  }
});



app.listen(5000, () => {
    console.log('Server at http://localhost:5000');
}
);