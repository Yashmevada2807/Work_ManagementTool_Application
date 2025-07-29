import React from 'react'

const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <>
      
      <div onClick={onCancel} className="fixed inset-0 bg-gray-900/90  z-40 " />

      
      <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-900 via-indigo-800 to-gray-900 rounded-2xl shadow-2xl w-[90%] max-w-md p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-300 mb-4 text-center">
          Are you sure you want to delete this todo?
        </h2>
        <div className="flex gap-4 mt-4">
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-lg cursor-pointer text-white bg-red-600 hover:bg-red-700 transition-all duration-200"
          >
            Yes, Delete
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-gray-400 text-gray-300 hover:bg-blue-400 transition-all duration-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  )
}

export default DeleteConfirmModal
