import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AddItem from './AddItem'
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from 'react-redux';
import { validateEmail, validateClientName, validateCity, validatePostCode, validateStreetAddress, validateItemCount, validateItemName, validateItemPrice, validateCountry } from '../functions/createInvoiceValidator'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

function CreateInvoice({ openCreateInvoice, setOpenCreateInvoice, invoice, type }) {


    const dispatch = useDispatch()


    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [isValidatorActive, setIsValidatorActive] = useState(false)
    const [isValid, setIsValid] = useState(true)


    const [filterValue, setfilterValue] = useState('')
    const deliveryTimes = [
        { text: 'Next 1 day', value: 'Next 1 day' },
        { text: 'Next 7 day', value: 'Next 7 day' },
        { text: 'Next 14 day', value: 'Next 14 day' },
        { text: 'Next 30 day', value: 'Next 30 day' },
    ]



    const [clientName, setClientName] = useState('')
    const [email, setEmail] = useState('')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [postCode, setPostCode] = useState('')
    const [country, setCountry] = useState('')
    const [invoiceDate, setInvoiceDate] = useState('')
    const [paymentTerm, setpaymentTerms] = useState(deliveryTimes[0].value)
    const [description, setDescription] = useState('')
    const [totalBill, settotalBill] = useState('')
    const [invoiceStatus, setinvoiceStatus] = useState('Unpaid')
    const [items, setItem] = useState(
        [
            {
                'name': "",
                'quantity': 1,
                'price': 0,
                'total': 0,
                id: uuidv4()
            }
        ]
    )

    const navigate = useNavigate();

    const handleSaveInvoice = () => {
        const invoiceData = {
            clientName,
            email,
            streetAddress,
            city,
            postCode,
            country,
            invoiceDate,
            paymentTerm,
            description,
            totalBill,
            invoiceStatus,
            items
        };
        console.log(invoiceData)
        axios
            .post('http://localhost:5555/invoices/', invoiceData)
            .then(() => {
                navigate('/');
                window.location.reload();
            })
            .catch((error) => {
                alert('An error happened, please check the console');
                console.log(error);
            });
    };



    const onDelete = (id) => {
        setItem((pervState) => pervState.filter((el) => el.id !== id))
    }

    const handelOnChange = (id, e) => {
        let data = [...items]

        let foundData = data.find((el) => el.id === id)

        if (e.target.name === 'quantity' || e.target.name === 'price') {
            foundData[e.target.name] = e.target.value
            foundData['total'] = (
                Number(foundData.quantity) * Number(foundData.price)
            ).toFixed(2)
        } else {
            foundData[e.target.name] = e.target.value
        }

        setItem(data);
    }

    if (type === 'edit' && isFirstLoad) {
        const updatedItemsArray = invoice.items.map((obj, index) => {
            return { ...obj, id: index + 1 };
        });

        setClientName(invoice.clientName)
        setEmail(invoice.email)
        setStreetAddress(invoice.streetAddress)
        setCity(invoice.city)
        setPostCode(invoice.postCode)
        setCountry(invoice.country)
        setInvoiceDate(invoice.invoiceDate)
        setpaymentTerms(invoice.paymentTerms)
        setDescription(invoice.description)
        settotalBill(invoice.totalBill)
        setinvoiceStatus(invoice.invoiceStatus)
        setIsFirstLoad(false)
    }


    function itemsValidator() {
        const itemName = items.map(i => validateItemName(i.name))
        const itemCount = items.map(i => validateItemCount(i.quantity))
        const itemPrice = items.map(i => validateItemPrice(i.price))

        const allItemsElement = itemCount.concat(itemPrice, itemName)

        return (allItemsElement.includes(false) === true ? false : true)
    }



    function validator() {
        if (validateEmail(email) && validateClientName(clientName) && validateCity(city) && validatePostCode(postCode) && validateStreetAddress(streetAddress) && validateCountry(country)) {
            return true
        }
        return false
    }

    useEffect(() => {
        // Recalculate totalBill whenever item changes
        const calculateTotalBill = () => {
            const total = items.reduce((acc, currentItem) => {
                return acc + Number(currentItem.total);
            }, 0);
            settotalBill(total.toFixed(2));
        };

        calculateTotalBill();
    }, [items]);

    return (
        <div onClick={(e) => {
            if (e.target !== e.currentTarget) {
                return;
            }
            setOpenCreateInvoice(false);
        }}
            className='  fixed top-0 bottom-0 left-0 right-0  bg-[#242424]'>

            <motion.div
                key='createInvoice-sidebar'
                initial={{ x: -500, opacity: 0 }}
                animate={{ opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 40, duration: .4 } }
                }
                exit={{ x: -700, transition: { duration: .2 } }}
                className='  scrollbar-hide flex flex-col dark:text-white dark:bg-[#1e2124] bg-white  md:pl-[150px] py-16 px-6 h-screen md:w-[768px] md:rounded-r-3xl'
            >

                <h1 className=' font-semibold dark:text-white text-3xl'>
                    {type == 'edit' ? 'Edit' : 'Create'} Invoice
                </h1>

                <div className=' overflow-y-scroll scrollbar-hide my-14'>


                    {/* Bill to Section */}

                    <h1 className=' text-2xl text-gray-500 mt-10'>
                        Invoice Details
                    </h1>
                    <br />
                    <div className=' grid grid-cols-3 mx-1   space-y-4 '>
                        <div className=' flex flex-col col-span-3'>
                            <label className=' text-gray-400 font-light'>
                                Client Name
                            </label>
                            <input type='text' value={clientName} onChange={(e) => setClientName(e.target.value)} className={` dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateClientName(clientName) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>

                        <div className=' flex flex-col   col-span-3'>
                            <label className=' text-gray-400 font-light'>
                                Client Email
                            </label>
                            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} className={` dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateEmail(email) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>

                        <div className=' flex flex-col col-span-3'>
                            <label className=' text-gray-400 font-light'>
                                Street Address
                            </label>
                            <input type='text' value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} className={` dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateStreetAddress(streetAddress) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>

                        <div className=' flex flex-col mr-4 col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                City
                            </label>
                            <input type='text' value={city} onChange={(e) => setCity(e.target.value)} className={` dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateCity(city) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>
                        <div className=' flex flex-col mr-4 col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                Post Code
                            </label>
                            <input type='text' value={postCode} onChange={(e) => setPostCode(e.target.value)}
                                className={` dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validatePostCode(postCode) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`}
                            />
                        </div>
                        <div className=' flex flex-col col-span-1'>
                            <label className=' text-gray-400 font-light'>
                                Country
                            </label>
                            <input type='text' value={country} onChange={(e) => setCountry(e.target.value)}
                                className={` dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none ${isValidatorActive && !validateCountry(country) && 'border-red-500 dark:border-red-500 outline-red-500 border-2'}   dark:border-gray-800`} />
                        </div>


                    </div>

                    <div className=' grid mx-1 grid-cols-2 mt-8 '>
                        <div className=' flex flex-col '>
                            <label className=' text-gray-400 font-light'>
                                Invoice Date
                            </label>
                            <input type='date' value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className=' dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg  focus:outline-purple-400 border-gray-300 focus:outline-none  dark:border-gray-800 dark:text-white  mr-4' />
                        </div>

                        <div className=' mx-auto w-full'>
                            <label className=' text-gray-400 font-light'>
                                Payment Terms
                            </label>
                            <select value={paymentTerm} onChange={(e) => setpaymentTerms(e.target.value)} className=' appearance-none w-full py-2 px-4 border-[.2px] rounded-lg focus:outline-none  dark:bg-[#424549] dark:text-white dark:border-gray-800  focus:outline-purple-400 border-gray-300 select-status' >
                                {deliveryTimes.map(time => (
                                    <option value={time.value}>
                                        {time.text}
                                    </option>
                                ))}
                            </select>
                        </div>


                    </div>

                    <div className=' mx-1 mt-4 flex flex-col '>
                        <label className=' text-gray-400 font-light'>
                            Description
                        </label>
                        <input value={description} onChange={(e) => setDescription(e.target.value)} type='text' className=' dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white' />
                    </div>

                    {/* Item List Section */}

                    <h2 className=' text-2xl text-gray-500 mt-10 '>
                        Item List
                    </h2>
                    {items.map((itemDetails, index) => (
                        <div className=' border-b pb-2 border-gray-300 mb-4 '>
                            <AddItem isValidatorActive={isValidatorActive} key={index} handelOnChange={handelOnChange} setItem={setItem} onDelete={onDelete} itemDetails={itemDetails} />
                        </div>
                    ))}



                    <button
                        onClick={() => {
                            setItem(
                                (state) => [
                                    ...state,
                                    {
                                        name: "",
                                        quantity: 1,
                                        price: 0,
                                        total: 0,
                                        id: uuidv4()
                                    }]
                            )
                        }}
                        className=' bg-gray-200  hover:opacity-80 mx-auto py-2 items-center dark:text-white dark:bg-[#7289da] justify-center rounded-xl  w-full mt-6'>
                        + Add New Item
                    </button>

                </div>
                <div className=' mx-1 mt-4 flex flex-col '>
                    <label className=' text-gray-400 font-light'>
                        Total Bill
                    </label>
                    <input
                        type='text'
                        value={totalBill}
                        disabled
                        className=' dark:bg-[#424549] py-2 px-4 border-[.2px] rounded-lg focus:outline-none   focus:outline-purple-400 border-gray-300 dark:border-gray-800 dark:text-white'
                    />
                </div>
                <div className=' mx-1 mt-4 ' >
                    <label className=' text-gray-400 font-light text-xl'>
                        Status
                    </label>
                    <br />

                    <select value={invoiceStatus} onChange={(e) => setinvoiceStatus(e.target.value)} className='appearance-none py-2 px-8 pl-3  border-[.2px] rounded-xl focus:outline-none dark:bg-[#424549] dark:text-white dark:border-gray-800 focus:outline-purple-400 border-gray-300 select-status'>
                        <option value="unpaid">Unpaid</option>
                        <option value="paid">Paid</option>
                    </select>

                </div>
                <br />
                <div className=' flex  justify-between'>
                    <div>
                        <button
                            onClick={() => {
                                setOpenCreateInvoice(false)
                            }}
                            className=' bg-gray-200  hover:opacity-80 mx-auto py-4 items-center dark:text-white  bg-red-500 justify-center  px-8 rounded-full '>
                            Discard
                        </button>
                    </div>

                    <div>
                        <button
                            className='text-white hover:opacity-80 mx-auto py-4 items-center bg-[#7289da] justify-center px-8 rounded-full'
                            onClick={() => {
                                const isValid = validator();
                                setIsValidatorActive(true);
                                if (isValid) {
                                    handleSaveInvoice(); // Call handleSaveInvoice function
                                    setOpenCreateInvoice(false);
                                }
                            }}
                        >
                            Save
                        </button>

                    </div>
                </div>



            </motion.div>

        </div>
    )
}

export default CreateInvoice