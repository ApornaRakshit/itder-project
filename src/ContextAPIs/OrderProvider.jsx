/* eslint-disable react/prop-types */
import { createContext, useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const OrderContext = createContext(null);

const OrderProvider = ({ children }) => {
    // Existing states
    const [examID, setExamID] = useState(null);
    const [open, setOpen] = useState(true);
    const sidebarRef = useRef(null);

    // Cart state
    const [cart, setCart] = useState([]);

    // Add to Cart
    const addToCart = (course) => {
        console.log("ADD TO CART", course.id);

        if (cart.length > 0) {
            console.log("Already has course");

            if (cart[0].id === course.id) {
                toast.warning("This course has already been added.");
                return;
            }

            toast.warning("Only one course can be added.");
            return;
        }

        console.log("Adding first course");

        setCart([
            {
                ...course,
                quantity: 1,
            },
        ]);

        toast.success("Course added to cart.");
    };

    // Increase Quantity
    const increaseQuantity = () => {
        if (cart.length === 0) return;

        setCart([
            {
                ...cart[0],
                quantity: cart[0].quantity + 1,
            },
        ]);
    };

    // Decrease Quantity
    const decreaseQuantity = () => {
        if (cart.length === 0) return;

        if (cart[0].quantity === 1) return;

        setCart([
            {
                ...cart[0],
                quantity: cart[0].quantity - 1,
            },
        ]);
    };

    // Remove Cart
    const removeCart = () => {
        setCart([]);
        toast.success("Course removed from cart.");
    };

    useEffect(() => {
        console.log("Current Cart:", cart);
    }, [cart]);

    const info = {
        // Existing
        examID,
        setExamID,
        open,
        setOpen,
        sidebarRef,

        // Cart
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeCart,
    };

    return (
        <OrderContext.Provider value={info}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;