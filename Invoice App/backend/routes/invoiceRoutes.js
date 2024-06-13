import express from "express";
import { Invoice, Item } from "../models/InvoiceModel.js";



const router = express.Router();
//Route for Save an Invoice
router.post('/', async (request, response) => {
    try {
        console.log(request.body)
        if (
            !request.body.clientName ||
            !request.body.email ||
            !request.body.streetAddress ||
            !request.body.city ||
            !request.body.postCode ||
            !request.body.country ||
            !request.body.invoiceDate ||
            !request.body.paymentTerm ||
            !request.body.description ||
            !request.body.totalBill ||
            !request.body.invoiceStatus ||
            !request.body.items

        ) {
            console.log("This is checkpoint")
            return response.status(400).send({
                message: 'Send all required fields: clientName,email etc'
            });
        }
        const newInvoice = {
            clientName: request.body.clientName,
            email: request.body.email,
            streetAddress: request.body.streetAddress,
            city: request.body.city,
            postCode: request.body.postCode,
            country: request.body.country,
            invoiceDate: request.body.invoiceDate,
            paymentTerm: request.body.paymentTerm,
            description: request.body.description,
            totalBill: request.body.totalBill,
            invoiceStatus: request.body.invoiceStatus
        };
        const invoice = await Invoice.create(newInvoice);
        const return_data = {
            invoice,
            items: []
        }
        for (const item of request.body.items) {
            const created = await Item.create(
                {
                    invoiceId: invoice._id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    total: item.total
                }
            );
            return_data.items.push(created);
        }

        return response.status(201).send(return_data);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//route to get invoices data
router.get('/', async (request, response) => {
    try {
        const { invoiceId } = request.params;
        const invoices = await Invoice.find({});
        const return_data = {
            invoices,
            items: await Item.find(invoiceId)
        }
        return response.status(200).json(invoices);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})
//route to get single invoice data
router.get('/:invoiceId', async (request, response) => {
    try {
        const { invoiceId } = request.params;
        const invoices = await Invoice.findById({ _id: invoiceId });
        const return_data = {
            invoices,
            items: await Item.find({ invoiceId })
        }
        console.log(return_data)
        return response.status(200).json(return_data);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})
//route to update the invoice data
router.put('/:invoiceId', async (request, response) => {
    try {


        const { invoiceId } = request.params;
        const updatedInvoice = {
            clientName: request.body.clientName,
            email: request.body.email,
            streetAddress: request.body.streetAddress,
            city: request.body.city,
            postCode: request.body.postCode,
            country: request.body.country,
            invoiceDate: request.body.invoiceDate,
            paymentTerm: request.body.paymentTerm,
            description: request.body.description,
            totalBill: request.body.totalBill,
            invoiceStatus: request.body.invoiceStatus
        };

        const result = await Invoice.findByIdAndUpdate(invoiceId, updatedInvoice, { new: true });
        if (!result) {
            return response.status(404).json({ message: 'Invoice not found' });
        }
        return response.status(200).json({ message: 'Invoice updated successfully', invoice: result });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

//deleting the invoice

router.delete('/:invoiceId', async (request, response) => {
    try {
        const { invoiceId } = request.params;
        const result = await Invoice.findByIdAndDelete(invoiceId);
        if (!result) {
            return response.status(404).json({ message: 'Invoice not found' });
        }
        return response.status(200).json({ message: 'Invoice deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ message: 'Internal server error' });
    }
});

export default router;