import React from 'react';

function ConfirmationModal({ message, onConfirm, onCancel }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-700 bg-opacity-50">
            <div className="relative bg-white w-96 p-6 rounded-lg shadow-lg">
                <div className="text-xl font-semibold mb-4">{message}</div>
                <div className="flex justify-center">
                    <button onClick={onConfirm} className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600">
                        Yes
                    </button>
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
