import React from 'react'

const CreateCase = () => {
  return (
    <div>
                <div className="flex flex-col items-center justify-center h-screen dark">
                    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-2xl font-bold text-gray-200 mb-4">Create Case</h2>
                        <form className="flex flex-col">
                            <input placeholder="Full Name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" />
                            <input placeholder="Email" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" />

                            <input placeholder="Phone" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="password" />

                            <input placeholder="Address" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" />

                            <input placeholder="Case Name" className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150" type="email" />
                            {/* PDF Upload Input */}
                            <label className="text-gray-200 mb-2" htmlFor="caseFile">Upload Case File (PDF)</label>
                            <input
                                id="caseFile"
                                className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                type="file"
                                accept="application/pdf"
                            />
                            <button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150" type="submit">
                                Create Case
                            </button>
                        </form>
                    </div>
                </div>
            </div>
  )
}

export default CreateCase