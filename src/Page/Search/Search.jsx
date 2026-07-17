import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [formNo, setFormNo] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const navigate = useNavigate();

    const handleSearch = async () => {
        try {
            const res = await axios.post(
                "https://itder.com/api/search-purchase-data",
                {
                    form_no: formNo.trim(),
                    phone_no: phoneNo.trim(),
                }
            );
            console.log({
                form_no: formNo.trim(),
                phone_no: phoneNo.trim(),
            });

            console.log(res.data);
            // console.log(res.data.coursePurchaseData);

            // navigate("/order-details", {
            //     state: {
            //         order: res.data.coursePurchaseData,
            //     },
            // });
            navigate("/order-details", {
                state: {
                    order: res.data.singleCoursePurchaseData,
                },
            });

        }
        catch (err) {
            console.log(err.response);
            console.log(err.response?.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">

            <div className="bg-white shadow-lg rounded-lg p-8 w-[600px]">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Search Order
                </h1>

                {/* Form Number */}

                <div className="mb-5">

                    <label className="font-semibold block mb-2">
                        Form Number
                    </label>

                    <input
                        type="text"
                        value={formNo}
                        onChange={(e) => setFormNo(e.target.value)}
                        placeholder="Enter Form Number"
                        className="w-full border rounded-md p-3"
                    />

                </div>

                {/* Phone Number */}

                <div className="mb-6">

                    <label className="font-semibold block mb-2">
                        Phone Number
                    </label>

                    <input
                        type="text"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        placeholder="Enter Phone Number"
                        className="w-full border rounded-md p-3"
                    />

                </div>

                <button
                    onClick={handleSearch}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <IoMdSearch />
                    Search
                </button>

            </div>

        </div>
    );
};

export default Search;