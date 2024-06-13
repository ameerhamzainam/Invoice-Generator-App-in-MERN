import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import leftArrow from '../assets/icon-arrow-left.svg';
import { AnimatePresence, motion } from 'framer-motion';
import PaidStatus from './PaidStatus';
import formatDate from '../functions/formatDate';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';

function InvoiceInfo() {
    const [invoice, setInvoice] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5555/invoices/${id}`)
            .then((response) => {
                setInvoice(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const markAsPaid = () => {
        axios
            .put(`http://localhost:5555/invoices/${id}`, { invoiceStatus: 'paid' })
            .then((response) => {
                setInvoice(response.data.invoices);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteInvoice = () => {
        axios
            .delete(`http://localhost:5555/invoices/${id}`)
            .then(() => {
                navigate(-1);
            })
            .catch((error) => {
                console.error('Error deleting invoice:', error);
            });
    };

    const handleDeleteConfirmation = () => {
        setShowDeleteConfirmation(!showDeleteConfirmation); // Toggle the state
    };

    const handleDeleteConfirm = () => {
        deleteInvoice(); // Call the delete function
        setShowDeleteConfirmation(false); // Close the modal
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false); // Close the modal
    };

    return (
        <div>
            {invoice ? (
                <motion.div
                    key='invoice-info'
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    exit={{ x: '200%' }}
                    transition={{ duration: 0.5 }}
                    className='dark:bg-[#1e2124] mx-auto duration-300 min-h-screen bg-[#f8f8fb] py-[34px] px-2 md:px-8 lg:px-12 max-w-3xl lg:py-[72px] '>
                    <div className=''>
                        <button onClick={() => navigate(-1)} className='flex items-center space-x-4 group dark:text-white font-thin'>
                            <img className='' src={leftArrow} alt='Back' />
                            <p className='group-hover:opacity-80'>Go back</p>
                        </button>

                        <div className='mt-8 rounded-lg w-full flex items-center justify-between px-6 py-6 bg-white dark:bg-[#36393e]'>
                            <div className='flex space-x-2 justify-between md:justify-start md:w-auto w-full items-center'>
                                <h1 className='text-gray-600 dark:text-gray-400'>Status:</h1>
                                <PaidStatus type={invoice.invoices.invoiceStatus} />
                            </div>
                            <div className='md:block hidden'>
                                {invoice.invoices.invoiceStatus === 'paid' && (
                                    <button onClick={handleDeleteConfirmation} className='ml-3 text-center text-white bg-red-500 hover:opacity-80 p-3 px-7 rounded-full'>
                                        Delete Invoice
                                    </button>
                                )}
                                {invoice.invoices.invoiceStatus === 'Unpaid' && (
                                    <button onClick={markAsPaid} className='ml-3 text-center text-white bg-[#7289da] hover:opacity-80 p-3 px-7 rounded-full'>
                                        Mark as Paid
                                    </button>
                                )}
                            </div>
                        </div>

                        {showDeleteConfirmation && (
                            <ConfirmationModal
                                message='Are you sure you want to delete this invoice?'
                                onConfirm={handleDeleteConfirm}
                                onCancel={handleDeleteCancel}
                            />
                        )}

                        <div className='mt-4 rounded-lg w-full  px-6 py-6 bg-white dark:bg-[#36393e]'>
                            <div className=' flex flex-col md:flex-row items-start justify-between w-full '>
                                <div>
                                    <h1 className='font-semibold dark:text-white text-lg'>
                                        <span className='text-[#7e88c3]'>#ID </span>
                                        {invoice.invoices._id && invoice.invoices._id.slice(-4)}
                                    </h1>
                                    <p className='text-sl font-semibold dark:text-white'>Invoice Details</p>
                                </div>
                            </div>
                            <div className=' mt-10 grid grid-cols-2 w-full  md:grid-cols-3'>
                                <div className=' flex flex-col justify-between'>
                                    <div>
                                        <h3 className=' text-gray-400 font-thin '>Invoice Date</h3>
                                        <h1 className=' text-lg font-semibold dark:text-white'>{formatDate(invoice.invoices.invoiceDate)}</h1>
                                    </div>
                                    <div>
                                        <h3 className=' text-gray-400 font-thin '>Payment Due</h3>
                                        <h1 className=' dark:text-white text-lg font-semibold'>{invoice.invoices.paymentTerm}</h1>
                                    </div>
                                </div>
                                <div className=''>
                                    <p className=' text-gray-400 font-thin'>Bill to</p>
                                    <h1 className=' dark:text-white text-ls font-semibold overflow-hidden'>
                                        {invoice.invoices.clientName}
                                    </h1>
                                    <p className=' text-gray-400 font-thin'>{invoice.invoices.streetAddress},</p>
                                    <p className=' text-gray-400 font-thin'>{invoice.invoices.city},</p>
                                    <p className=' text-gray-400 font-thin'>{invoice.invoices.postCode},</p>
                                    <p className=' text-gray-400 font-thin'>{invoice.invoices.country}</p>
                                </div>
                                <div className=' mt-8 md:mt-0'>
                                    <p className=' text-gray-400 font-thin'>Sent to</p>
                                    <h1 className=' dark:text-white text-sm font-semibold overflow-hidden'>
                                        {invoice.invoices.email}
                                    </h1>
                                </div>
                            </div>

                            {/* Last Section */}

                            <div className=' sm:hidden mt-10 bg-[#f9fafe] dark:bg-[#36393e] rounded-lg rounded-b-none space-y-4  p-10'>
                                {invoice.items && Array.isArray(invoice.items) && invoice.items.map(item => (
                                    <div className='justify-between text-lg dark:text-white flex' key={item.name}>
                                        <h1>{item.name}</h1>
                                        <h1>{item.total} PKR</h1>
                                    </div>
                                ))}
                            </div>

                            <div className=' hidden sm:block mt-10 bg-[#f9fafe] dark:bg-[#282b30] rounded-lg rounded-b-none space-y-4  p-10'>
                                {invoice.items && Array.isArray(invoice.items) && invoice.items.map(item => (
                                    <div key={item.itemName} className=' flex justify-around  '>
                                        <div className=' space-y-4' >
                                            <p className=' text-gray-400 font-thin'>Item name</p>
                                            <h1 className=' dark:text-white text-base font-semibold'>
                                                {item.name}
                                            </h1>
                                        </div>
                                        <div className=' space-y-4' >
                                            <p className=' text-gray-400 font-thin'>Qty.</p>
                                            <h1 className=' dark:text-white text-base font-semibold'>
                                                {item.quantity}
                                            </h1>
                                        </div>
                                        <div className=' space-y-4' >
                                            <p className=' text-gray-400 font-thin'>Item price</p>
                                            <h1 className=' dark:text-white text-base font-semibold'>
                                                {item.price} PKR
                                            </h1>
                                        </div>
                                        <div className=' space-y-4' >
                                            <p className=' text-gray-400 font-thin'>Total</p>
                                            <h1 className=' dark:text-white text-base font-semibold'>
                                                {item.total} PKR
                                            </h1>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className=' p-10 font-semibold text-white rounded-lg rounded-t-none justify-between flex bg-[#7289da] bg-gray-700 '>
                                <h3 className=' text-xl '>
                                    Amount Due :
                                </h3>
                                <h1 className=' text-3xl'>
                                    {invoice.invoices.totalBill} PKR
                                </h1>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default InvoiceInfo;
