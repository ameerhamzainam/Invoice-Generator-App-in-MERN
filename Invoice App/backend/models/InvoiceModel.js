import mongoose, { mongo } from "mongoose";

const invoiceSchema = mongoose.Schema({
    clientName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    streetAddress: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    postCode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    invoiceDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    paymentTerm: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    totalBill:{
        type: Number,
        required: true,
    },
    invoiceStatus: {
        type: String,
        required: true,
    }
});

const itemSchema = mongoose.Schema({
    invoiceId: {
        type: String,
        required: true,
      },
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1 // Ensure quantity is always positive
    },
    price: {
        type: Number,
        required: true,
        min: 0.01 // Ensure price is always positive
    },
    total: {
        type: Number,
        required: true,
        min: 0.01 // Ensure total is always positive
    },
});
export const Invoice = mongoose.model('Invoice', invoiceSchema);
export const Item = mongoose.model('Item', itemSchema);

