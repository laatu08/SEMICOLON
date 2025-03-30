import React from 'react';

const ViewCase = () => {
    // Mock data for demonstration
    const cases = [
        {
            id: 1,
            personName: "John Doe",
            caseName: "Property Dispute",
            caseFileLink: "https://example.com/case-file-1.pdf",
        },
        {
            id: 2,
            personName: "Jane Smith",
            caseName: "Contract Breach",
            caseFileLink: "https://example.com/case-file-2.pdf",
        },
        {
            id: 3,
            personName: "Alice Johnson",
            caseName: "Intellectual Property",
            caseFileLink: "https://example.com/case-file-3.pdf",
        },
    ];

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
                    {cases.map((caseData) => (
                        <tr key={caseData.id} className="border-t">
                            <td className="py-2 px-4">{caseData.personName}</td>
                            <td className="py-2 px-4">{caseData.caseName}</td>
                            <td className="py-2 px-4">
                                <a
                                    href={caseData.caseFileLink}
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
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewCase;