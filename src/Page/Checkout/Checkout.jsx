import { useContext, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { FiImage } from "react-icons/fi";

const Checkout = () => {
    const navigate = useNavigate();

    const {
        cart,
        removeCart
    } = useContext(OrderContext);

    const course = cart[0];

    const total =
        cart.length > 0
            ? Number(course.discount_price) * course.quantity
            : 0;

    const [formData, setFormData] = useState({
        name: "",
        father_name: "",
        father_phone_no: "",
        school_collage_name: "",
        job_title: "",
        email: "",
        gender: "",
        present_address: "",
        permanent_address: "",
        nid_no: "",
        phone_no: "",
        local_guardian_name: "",
        local_guardian_phone_no: "",
        date_of_birth: "",
        blood_group: "",
    });

    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setPhoto(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("course_id", course.id);
        data.append("admission_date", new Date().toISOString().slice(0, 10));

        data.append("name", formData.name);
        data.append("father_name", formData.father_name);
        data.append("father_phone_no", formData.father_phone_no);
        data.append("school_collage_name", formData.school_collage_name);
        data.append("job_title", formData.job_title);
        data.append("email", formData.email);
        data.append("gender", formData.gender);
        data.append("present_address", formData.present_address);
        data.append("permanent_address", formData.permanent_address);
        data.append("nid_no", formData.nid_no);
        data.append("phone_no", formData.phone_no);
        data.append("local_guardian_name", formData.local_guardian_name);
        data.append("local_guardian_phone_no", formData.local_guardian_phone_no);
        data.append("date_of_birth", formData.date_of_birth);
        data.append("blood_group", formData.blood_group);

        data.append("course_fee", course.regular_price);
        data.append("course_qty", course.quantity);
        data.append(
            "total_course_fee",
            Number(course.regular_price) * course.quantity
        );
        data.append("discount_course_fee", course.discount_price);
        data.append(
            "sub_total_course_fee",
            Number(course.discount_price) * course.quantity
        );

        // Upload Image
        if (photo) {
            data.append("photo", photo);
        }

        try {
            const res = await axios.post(
                "https://itder.com/api/course-purchase",
                data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            // console.log(res.data);
            console.log(JSON.stringify(res.data, null, 2));

            toast.success("Admission submitted successfully");

            removeCart();

            navigate("/order-details", {
                state: {
                    order: res.data.coursePurchaseData,
                },
            });
        }
        catch (err) {
            console.log("Status:", err.response?.status);
            console.log("Response:", err.response?.data);

            toast.error(err.response?.data?.message || "Submission Failed");
        }
    };

    if (cart.length === 0) {
        return (
            <div className="text-center mt-20">
                <h2 className="text-3xl font-bold">Your Cart is Empty</h2>
            </div>
        );
    }
    return (
        <div className="  mt-5 border mx-2">
            <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
                <h2 className='text-5xl font-bold'>Trainee Admission Form</h2>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6"
            >
                {/* Trainee Information Section */}
                <div className="form-section">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="fullName" className="block font-semibold text-base mb-2">Full Name:</label>
                            <input
                                type="text"
                                id="fullName"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="formNo" className="block font-semibold text-base mb-2">Form no:</label>
                            <input
                                type="text"
                                id="formNo"
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="parentName" className="block font-semibold text-base mb-2">Father/Mother Name:</label>
                            <input
                                type="text"
                                id="parentName"
                                name="father_name"
                                value={formData.father_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="parentNumber" className="block font-semibold text-base mb-2">Number:</label>
                            <input
                                type="text"
                                id="parentNumber"
                                name="father_phone_no"
                                value={formData.father_phone_no}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="school" className="block font-semibold text-base mb-2">School/College:</label>
                            <input
                                type="text"
                                id="school"
                                name="school_collage_name"
                                value={formData.school_collage_name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="jobInfo" className="block font-semibold text-base mb-2">Job Information:</label>
                            <input
                                type="text"
                                id="jobInfo"
                                name="job_title"
                                value={formData.job_title}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="email" className="block font-semibold text-base mb-2">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="gender" className="block font-semibold text-base mb-2">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="presentAddress" className="block font-semibold text-base mb-2">Present Address:</label>
                            <textarea
                                id="presentAddress"
                                name="present_address"
                                value={formData.present_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="permanentAddress" className="block font-semibold text-base mb-2">Permanent Address:</label>
                            <textarea
                                id="permanentAddress"
                                name="permanent_address"
                                value={formData.permanent_address}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="nid" className="block font-semibold text-base mb-2">NID Number:</label>
                            <input
                                type="text"
                                id="nid"
                                name="nid_no"
                                value={formData.nid_no}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block font-semibold text-base mb-2">Mobile No:</label>
                            <input
                                type="text"
                                id="mobile"
                                name="phone_no"
                                value={formData.phone_no}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">

                        <div>
                            <label className="block font-semibold mb-2">
                                Local Guardian Name
                            </label>

                            <input
                                type="text"
                                name="local_guardian_name"
                                value={formData.local_guardian_name}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Local Guardian Phone
                            </label>

                            <input
                                type="text"
                                name="local_guardian_phone_no"
                                value={formData.local_guardian_phone_no}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                        <div>
                            <label className="block font-semibold mb-2">
                                Date Of Birth
                            </label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                                className="w-full border rounded-md p-2"
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="bloodGroup" className="block font-semibold text-base mb-2">Blood Group:</label>
                            <select
                                id="bloodGroup"
                                name="blood_group"
                                value={formData.blood_group}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Select Blood Group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mb-6 mt-4">
                    <label className="block font-semibold text-base mb-2">
                        Student Photo <span className="text-red-500">*</span>
                    </label>

                    <label
                        htmlFor="photo"
                        className="border-2 border-dashed border-gray-300 rounded-lg min-h-[250px] flex flex-col justify-center items-center cursor-pointer overflow-hidden"
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <>
                                <div className="text-center">
                                    <FiImage className="text-7xl text-gray-500 mx-auto" />
                                    <p className="mt-4 text-lg font-medium text-gray-600">
                                        Upload Photo
                                    </p>
                                </div>
                            </>
                        )}
                    </label>

                    <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange}
                    />
                </div>

                <div className="m-mt_16px">


                    <div className="pt-p_16px">
                        <div className="lg:flex items-start gap-3">
                            <div className="w-full lg:w-[58%] bg-white border-2">
                                <table className=" overflow-x-auto  w-full">
                                    <thead>
                                        <tr className="border-b-4 border-gray-300">
                                            <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                                                Course
                                            </th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Price
                                            </th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Quantity
                                            </th>
                                            <th className="text-[14.4px] font-bold p-[7px] text-black">
                                                Sub Total
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr className="border-b border-gray-300">

                                            {/* Course */}
                                            <td>
                                                <div className="flex items-center gap-3 p-3">

                                                    <RiDeleteBin5Line
                                                        onClick={removeCart}
                                                        className="text-xl text-red-500 cursor-pointer"
                                                    />

                                                    <img
                                                        src={course.photo}
                                                        alt={course.course_name}
                                                        className="w-20 h-14 object-cover rounded"
                                                    />

                                                    <div>
                                                        <h3 className="font-semibold">
                                                            {course.course_name}
                                                        </h3>

                                                        <p className="text-gray-500">
                                                            {course.trainer_data?.name}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            {/* Price */}
                                            <td className="text-center font-semibold">
                                                Tk {course.discount_price}
                                            </td>

                                            {/* Fixed Quantity */}
                                            <td className="text-center">
                                                <div className="border w-16 mx-auto py-2 rounded">
                                                    {course.quantity}
                                                </div>
                                            </td>

                                            {/* Subtotal */}
                                            <td className="text-center font-semibold">
                                                Tk {Number(course.discount_price) * course.quantity}
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="lg:w-[41%] bg-white border-2 ">
                                <div className="px-[30px]">
                                    <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                                        Cart Summary
                                    </h2>
                                    <div className="py-3 flex justify-between border-b border-gray-300">
                                        <p className="font-bold">
                                            Total Price
                                        </p>

                                        <p className="font-bold">
                                            Tk {total}
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="font-medium text-black border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block w-full"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


        </div>
    );
};

export default Checkout;