import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewCase = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/v1/view/view");
                console.log(response);
                setCases(response.data.data); // Extracting the cases from API response
                setLoading(false);
            } catch (err) {
                console.error("Error fetching cases:", err);
                setError("Failed to fetch cases. Please try again later.");
                setLoading(false);
            }
        };

        fetchCases();
    }, []);

    if (loading) {
        return <div className="text-center mt-10 text-gray-600">Loading cases...</div>;
    }

    if (error) {
        return <div className="text-center mt-10 text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 mt-10">
            {/* <h1 className="text-2xl font-bold mb-4">Cases</h1> */}
            <table className="min-w-full bg-white rounded-lg shadow-md">
                <thead>
                    <tr className="bg-gray-200 text-gray-700">
                        <th className="py-2 px-4 ">Person Name</th>
                        <th className="py-2 px-4">Case Name</th>
                        <th className="py-2 px-4 ">Case File</th>
                        <th className="py-2 px-4">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cases.length>0 ? (cases.map((caseData) => (
                        <tr key={caseData.id} className="border-t">
                            <td className="py-2 px-4">{caseData.user_name}</td>
                            <td className="py-2 px-4">{caseData.case_name}</td>
                            <td className="py-2 px-4">
                                <a
                                    href={`http://localhost:5000`+caseData.case_file_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline"
                                >
                                    View File
                                </a>
                            </td>
                            <td className="py-2 px-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400">
                                    Resolve Case
                                </button>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td colSpan="4" className="text-center py-4 text-gray-500">
                                No unresolved cases found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCase;