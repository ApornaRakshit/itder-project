import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


const OrderDetails = () => {
    const location = useLocation();

    console.log("OrderDetails Rendered");
    console.log(location.state);


    const order = location.state?.order;

    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (!order) return;

        axios
            .get("https://itder.com/api/get-course-list")
            .then((res) => {
                const foundCourse = res.data.courseData.find(
                    (item) => Number(item.id) === Number(order.course_id)
                );

                setCourse(foundCourse);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [order]);


    if (!order) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <h2 className="text-3xl font-bold">
                    No Order Found
                </h2>
            </div>
        );
    }

    return (
        <div className="m-mt_16px">
            <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2">

                <div className="bg-white lg:p-p_30px w-full">

                    {/* Order Header */}

                    <div className="text-center flex flex-col justify-center items-center">

                        <p className="text-xl font-bold">
                            Order Information
                        </p>

                        <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
                            Order Id :
                            <span className="font-semibold">
                                {order?.form_no}
                            </span>
                        </p>

                    </div>

                    {/* Customer Information */}

                    <div className="w-full border flex flex-col md:flex-row md:items-start md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4">

                        {/* Left */}

                        <div className="md:text-base text-sm flex-1 font-semibold md:border-r-2 md:border-black md:pr-10">

                            <p className="font-bold md:mb-4">
                                Student Information
                            </p>

                            <div className="space-y-2">

                                <div className="flex items-center justify-between">
                                    <p>Full Name :</p>
                                    <p className="text-start">
                                        {order?.name}
                                    </p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Email :</p>
                                    <p>{order.email}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Phone :</p>
                                    <p>{order.phone_no}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Gender :</p>
                                    <p>{order.gender}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Blood Group :</p>
                                    <p>{order.blood_group}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Date of Birth :</p>
                                    <p>{order.date_of_birth}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Admission Date :</p>
                                    <p>{order.admission_date}</p>
                                </div>

                            </div>

                        </div>

                        {/* Right */}

                        <div className="md:text-base text-sm flex-1 font-semibold md:ml-10 mt-5 md:mt-0">

                            <p className="font-bold md:mb-4">
                                Family & Address Information
                            </p>

                            <div className="space-y-2">

                                <div className="flex justify-between">
                                    <p>Father :</p>
                                    <p>{order.father_name}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Father Phone :</p>
                                    <p>{order.father_phone_no}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Local Guardian :</p>
                                    <p>{order.local_guardian_name}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Guardian Phone :</p>
                                    <p>{order.local_guardian_phone_no}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Present Address :</p>
                                    <p>{order.present_address}</p>
                                </div>

                                <div className="flex justify-between">
                                    <p>Permanent Address :</p>
                                    <p>{order.permanent_address}</p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* Course */}

                    <div className="lg:my-8 md:my-6 my-8 px-p_4px">

                        <p className="md:my-2 font-semibold">
                            Courses
                        </p>

                        <table className="overflow-x-auto border w-full">

                            <thead>

                                <tr>

                                    <th className="border py-4">
                                        Image
                                    </th>

                                    <th className="border py-4">
                                        Course Name
                                    </th>

                                    <th className="border py-4">
                                        Student
                                    </th>

                                    <th className="border py-4">
                                        Quantity
                                    </th>

                                    <th className="border py-4">
                                        Price
                                    </th>

                                    <th className="border py-4">
                                        Total
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr>

                                    <td className="border p-2">

                                        {/* <img
                                            src={order.photo}
                                            alt="Student"
                                            className="w-24 h-24 object-cover mx-auto rounded"
                                        /> */}
                                        <img
                                            className="w-24 h-24 object-cover mx-auto"
                                            src={course?.photo}
                                            alt={course?.course_name}
                                        />

                                    </td>

                                    <td className="text-center border">
                                        {course?.course_name}
                                    </td>

                                    <td className="border text-center">
                                        {order.name}
                                    </td>

                                    <td className="border text-center">
                                        {order.course_qty}
                                    </td>

                                    <td className="border text-center">
                                        Tk {order.discount_course_fee}
                                    </td>

                                    <td className="border text-center">
                                        Tk {order.sub_total_course_fee}
                                    </td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default OrderDetails;