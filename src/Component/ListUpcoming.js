import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";

const ListUpcoming = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const user_id = localStorage.getItem("id");
    
    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_API_BASE_URL}/getUserAllPackageHistory/${user_id}`
                );
                setData(res.data.data || []);
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
                console.error("Error fetching upcoming data:", err);
            } finally {
                setLoading(false);
            }
        };
        
        if (user_id) fetchUpcoming();
    }, [user_id]);
    
    return (
        <div className="min-h-screen bg-red-50">
            {/* Simple Header */}
            <div className="bg-red-600 py-4">
                <h1 className="text-white text-2xl font-bold text-center">Upcoming Packages</h1>
            </div>
            
            <div className="max-w-3xl mx-auto p-4">
                {loading ? (
                    <div className="space-y-3">
                        {[1, 2, 3].map((_, index) => (
                            <div key={index} className="bg-red-100 animate-pulse p-3 h-16 rounded"></div>
                        ))}
                    </div>
                ) : error ? (
                    <p className="text-center text-red-600 bg-white p-3 rounded">{error}</p>
                ) : data.length > 0 ? (
                    <div className="space-y-3">
                        {data.map((item, index) => (
                            <div key={index} className="bg-white rounded shadow border-l-4 border-red-500 p-3 flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-gray-800">{item.package_name}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-red-600">₹{item.total_amount}</p>
                                    <p className="text-sm text-gray-600">🍱 {item.tiffin_quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-red-600 bg-white p-4 rounded">No upcoming packages found.</p>
                )}
                
                <div className="mt-6">
                    <Nav />
                </div>
            </div>
        </div>
    );
};

export default ListUpcoming;