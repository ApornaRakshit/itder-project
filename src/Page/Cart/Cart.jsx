/* eslint-disable react/react-in-jsx-scope */
import { useContext } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";

const Cart = () => {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeCart,
    } = useContext(OrderContext);

    const total = cart.reduce(
        (sum, item) => sum + Number(item.discount_price) * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="flex justify-center items-center h-[70vh]">
                <h2 className="text-3xl font-bold">🛒 Your Cart is Empty</h2>
            </div>
        );
    }

    return (
        <div className="mt-6 px-5">

            <h1 className="text-2xl font-bold mb-5">
                Cart
            </h1>

            <div className="lg:flex gap-5">

                {/* Left */}
                <div className="lg:w-2/3 w-full bg-white shadow rounded-lg overflow-hidden">

                    <table className="table w-full">

                        <thead className="bg-gray-100">

                            <tr>
                                <th>Course</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>

                        </thead>

                        <tbody>

                            {cart.map((item) => (

                                <tr key={item.id}>

                                    <td>

                                        <div className="flex items-center gap-4">

                                            <RiDeleteBin5Line
                                                onClick={removeCart}
                                                className="text-red-500 text-xl cursor-pointer"
                                            />

                                            <img
                                                src={item.photo}
                                                alt={item.course_name}
                                                className="w-20 h-16 object-cover rounded"
                                            />

                                            <div>
                                                <h2 className="font-bold">
                                                    {item.course_name}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    {item.trainer_data?.name}
                                                </p>
                                            </div>

                                        </div>

                                    </td>

                                    <td className="font-bold">
                                        Tk {item.discount_price}
                                    </td>

                                    <td>

                                        <div className="flex items-center">

                                            <button
                                                onClick={decreaseQuantity}
                                                className="btn btn-sm"
                                            >
                                                -
                                            </button>

                                            <span className="px-4 font-bold">
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={increaseQuantity}
                                                className="btn btn-sm"
                                            >
                                                +
                                            </button>

                                        </div>

                                    </td>

                                    <td className="font-bold">
                                        Tk {Number(item.discount_price) * item.quantity}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Right */}

                <div className="lg:w-1/3 w-full mt-5 lg:mt-0">

                    <div className="bg-white shadow rounded-lg p-6">

                        <h2 className="text-xl font-bold border-b pb-3">
                            Cart Summary
                        </h2>

                        <div className="flex justify-between py-5">

                            <span className="font-bold">
                                Total
                            </span>

                            <span className="font-bold text-xl text-blue-600">
                                Tk {total}
                            </span>

                        </div>

                        <Link
                            to="/checkout"
                            className="btn btn-primary w-full"
                        >
                            PROCEED TO CHECKOUT
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Cart;