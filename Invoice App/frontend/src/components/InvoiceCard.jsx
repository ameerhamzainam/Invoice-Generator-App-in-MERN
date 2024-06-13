import React from 'react'
import PaidStatus from './PaidStatus'
import rightArrow from '../assets/icon-arrow-right.svg'
import { Link } from 'react-router-dom'


function InvoiceCard({ invoice }) {
    //console.log(invoice);
    return (
        <Link
            to={`invoices/${invoice._id}`}
        >
            {/* Big Screen  */}
            <div className=' hidden md:flex cursor-pointer duration-100  ease-in-out  hover:border border-blue-500 py-4 shadow-sm px-6 dark:bg-[#36393e] bg-white rounded-lg  items-center justify-between'>
                <div className=' flex items-center '>
                    <h2 className='dark:text-white'>
                        <span className='text-[#7e88c3]'>#</span>
                        {invoice._id.substring(invoice._id.length - 4)}
                    </h2>

                    <h2 className=' text-sm text-gray-400 font-light ml-10'>
                        {invoice.clientName}
                    </h2>


                </div>

                <div className='  flex  items-center '>

                    <h1 className=' text-2xl mr-2  dark:text-white'>

                    {invoice.totalBill} 

                    </h1>
                    <h1 className=' text-sm mr-8  dark:text-white'>

                     PKR 

                    </h1>


                    <PaidStatus type={invoice.invoiceStatus} />

                    <img src={rightArrow} className=' ml-4' />


                </div>

            </div>

            {/* Phone Screen */}
            <div className=' md:hidden flex cursor-pointer hover:border border-purple-500 py-4 shadow-sm px-6 dark:bg-[#1E2139] bg-white rounded-lg  items-center justify-between'>

                <div className=' flex flex-col'>
                    <h2 className=' dark:text-white '>
                        <span className=' text-[#7e88c3]'>
                            #
                        </span>
                        {invoice.id}
                    </h2>

                    
                    <h1 className=' text-xl  dark:text-white'>
                        PKR {invoice.totalBill}
                    </h1>
                </div>

                <div className=' flex   flex-col'>
                    <h2 className=' text-sm mb-4 text-gray-400 font-light  text-right  '>
                        {invoice.clientName}
                    </h2>

                    <PaidStatus type={invoice.invoiceStatus} />

                </div>
            </div>
        </Link>
    )
}

export default InvoiceCard