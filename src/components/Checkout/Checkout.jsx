import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { CartContext } from "../../contexts/cartContext";
export default function Checkout() {
  const navigate = useNavigate();
  const { checkout } = useContext(CartContext);
  const initialState = {
    details: "",
    phone: "",
    city: "",
  };

  const checkoutForm = useFormik({
    initialValues: initialState,
    onSubmit: callCheckoutApi,
    validationSchema: Yup.object({
      details: Yup.string().required("Details is required"),
      phone: Yup.string().required("Phone is required"),
      city: Yup.string().required("City is required"),
    }),
  });

  async function callCheckoutApi(values) {
    const result = await checkout(values);
    if (result.success) {
      navigate("/cart");
      toast.success("Checkout successful");
    } else {
      toast.error(result.message);
    }
  }

  return (
    <form
      className="max-w-md mx-auto mt-10"
      onSubmit={checkoutForm.handleSubmit}
    >
      <h1 className="text-4xl  mb-5">Checkout</h1>
      {checkoutForm.errors.details && checkoutForm.touched.details ? (
        <div
          className="p-2 mb-3 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{checkoutForm.errors.details}</span>
        </div>
      ) : (
        ""
      )}
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="details"
          id="details"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={checkoutForm.values.details}
          onChange={checkoutForm.handleChange}
          onBlur={checkoutForm.handleBlur}
          required
        />
        <label
          htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Details
        </label>

        {checkoutForm.errors.details && checkoutForm.touched.details ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{checkoutForm.errors.details}</span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="phone"
          id="phone"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={checkoutForm.values.phone}
          onChange={checkoutForm.handleChange}
          onBlur={checkoutForm.handleBlur}
          required
        />
        <label
          htmlFor="phone"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Phone
        </label>

        {checkoutForm.errors.phone && checkoutForm.touched.phone ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{checkoutForm.errors.phone}</span>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          name="city"
          id="city"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
          placeholder=" "
          value={checkoutForm.values.city}
          onChange={checkoutForm.handleChange}
          onBlur={checkoutForm.handleBlur}
          required
        />
        <label
          htmlFor="city"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          City
        </label>

        {checkoutForm.errors.city && checkoutForm.touched.city ? (
          <div
            className="p-2 mb-2 mt-1 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{checkoutForm.errors.city}</span>
          </div>
        ) : (
          ""
        )}
      </div>

      {checkoutForm.isSubmitting ? (
        <div className="flex justify-end items-center">
          <div className="bg-main rounded-full p-2 w-20 flex justify-center items-center">
            <PuffLoader size={30} />
          </div>
        </div>
      ) : (
        <button
          type="submit"
          className="text-white bg-main hover:bg-main/80 focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main/80 dark:focus:ring-main ml-auto block"
        >
          Submit
        </button>
      )}
    </form>
  );
}
