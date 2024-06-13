import express, { request, response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Invoice } from './models/InvoiceModel.js';
import { Item } from './models/InvoiceModel.js';
import invoiceRoutes from './routes/invoiceRoutes.js'
import cors from 'cors';

const app = express();


//Middleware fro parsing request body
app.use(express.json());
app.use(cors());
//middleware fro handling the corse Policy
/*app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET','PSOT','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);*/
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome To MERN Stack Tutorial");

});

app.use('/invoices',invoiceRoutes);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to Database');
        app.listen(PORT, () => {
            console.log(`App is listening the Port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });