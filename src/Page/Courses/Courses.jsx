import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { OrderContext } from "../../ContextAPIs/OrderProvider";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(OrderContext);

  useEffect(() => {
    axios
      .get("https://itder.com/api/get-course-list")
      .then((res) => {
        console.log(res.data.courseData);
        setCourses(res.data.courseData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="mt-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => {
          const regularPrice = Number(course.regular_price);
          const discountPrice = Number(course.discount_price);

          const discountPercentage =
            regularPrice > 0
              ? Math.round(
                  ((regularPrice - discountPrice) / regularPrice) * 100
                )
              : 0;

          return (
            <div
              key={course.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden border"
            >
              {/* Image */}
              <div className="p-5 bg-gray-100">
                <img
                  src={course.photo}
                  alt={course.course_name}
                  className="w-full h-60 object-contain rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  {course.course_name}
                </h2>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-blue-500">★★★★★</span>

                  <span className="font-semibold text-gray-700">
                    {course.trainer_data?.name || "Trainer"}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {course.course_details?.replace(/<[^>]+>/g, "")}
                </p>

                <hr />

                <div className="mt-4">
                  <p className="line-through text-gray-400">
                    Tk {regularPrice}
                  </p>

                  <p className="text-green-600 font-bold">
                    {discountPercentage}% OFF
                  </p>

                  <p className="text-2xl font-bold text-black">
                    Tk {discountPrice}
                  </p>
                </div>

                <button
                  onClick={() => addToCart(course)}
                  className="mt-5 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;