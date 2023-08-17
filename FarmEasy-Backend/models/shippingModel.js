import mongoose from 'mongoose';

const shippingSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        zip: { type: String },
        country: { type: String, required: true },
        // sname:{type:String},
        // semail:{type:String},   
        // scity:{type:String},
        // saddress:{type:String},
        // szip:{type:String},
        // scountry:{type:String},
    },
    {
        timestamps: true,
    }
);
const Shipping = mongoose.model('Shipping', shippingSchema);
export default Shipping;
