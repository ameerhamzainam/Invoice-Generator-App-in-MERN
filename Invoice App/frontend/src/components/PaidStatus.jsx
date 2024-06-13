import React from 'react';

function PaidStatus({ type }) {
    const classNames = {
        paid: ['text-[#33d69f] bg-[#33d69f0f]', 'bg-[#33d69f]'],
        Unpaid: ['text-[#ff8f00] bg-[#ff8f000f]', 'bg-[#ff8f00]'],
        // Remove the 'draft' entry from classNames
    };

    return (
        <div className={`${type === 'paid' ? classNames.paid[0] : type === 'pending' ? classNames.pending[0] : classNames.Unpaid[0]} flex justify-center space-x-2 rounded-lg items-center px-4 py-2`}>
            <div className={`h-3 w-3 rounded-full ${type === 'paid' ? classNames.paid[1] : type === 'pending' ? classNames.pending[1] : classNames.Unpaid[1]}`} />
            <p>
                {type}
            </p>
        </div>
    );
}

export default PaidStatus;
