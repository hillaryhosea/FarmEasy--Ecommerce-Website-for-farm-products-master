import express from 'express';
import Shipping from '../models/shippingModel';

const shippingRouter = express.Router();

router.post('/', async(req, res) => {
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
    console.log(req.body);
    })
    
export default shippingRouter;