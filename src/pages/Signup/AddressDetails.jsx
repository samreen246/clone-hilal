import React, { useState, useEffect } from "react";
import logo from "../../assets/images/logo.jpeg";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const AddressDetails = () => { 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const base = useSelector((state) => state.userSlice.base_url);

  useEffect(() => {
    const accessId = localStorage.getItem("accessId");
    const verification = localStorage.getItem("verification");
    const storedName = localStorage.getItem("name");
    if (!accessId) {
      navigate("/signup");
    }
    if (!verification) {
      navigate("/signup/verification");
    }
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    const { category, gender, state, country, city } = data;
    const accessId = localStorage.getItem("accessId");
    fetch(`${base}/signup/address`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, accessId: accessId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("address", "1");
          navigate("/signup/bio");
        } else {
          alert("Error adding address details:", data.error);
          setLoading(false);
        }
      })
      .catch((error) => {
        alert("Error:", error);
      });
  };

  return (
    <div className="max-sm:p-2 h-[120dvh]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center py-6">
          <img src={logo} className="size-10 rounded-full" alt="" />
        </div>
        <div className="w-[min(400px,98%)] mx-auto pt-6 mb-6">
          <div className="text-2xl font-medium max-sm:text-lg text-center">
            Salam {name}
          </div>
          <div className="text-sm mt-5 max-sm:hidden">
            Welcome to HilalLink:
          </div>
          <div className="text-sm mt-1 max-sm:hidden">
            Your Gateway to a Global Muslim Community.
          </div>
        </div>
        <div className="w-[min(400px,98%)] grid gap-y-4 p-6  bg-white border rounded-md mx-auto max-sm:bg-transparent max-sm:border-hidden max-sm:py-2 max-sm:px-2">
          <label className="text-sm">
            Category / Profession <span className="text-red-500">*</span>
            <select
              {...register("category", { required: true })}
              className="w-full border rounded p-2 mt-1"
            >
              <option value="Artist">Artist</option>
              <option value="Creator">Creator</option>
              <option value="Others">Others</option>
            </select>
            {errors.category && (
              <span className="text-red-500">This field is required</span>
            )}
          </label>
          <label className="text-sm">
            Gender <span className="text-red-500">*</span>
            <select
              {...register("gender", { required: true })}
              className="w-full border rounded p-2 mt-1"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <span className="text-red-500">This field is required</span>
            )}
          </label>
          <label className="text-sm">
            State <span className="text-red-500">*</span>
            <input
              {...register("state")}
              type="text"
              className="w-full border rounded p-2 mt-1"
              required
            />
          </label>
          <label className="text-sm">
            Country / Region <span className="text-red-500">*</span>
            <input
              {...register("country")}
              type="text"
              className="w-full border rounded p-2 mt-1"
              required
            />
          </label>
          <label className="text-sm">
            City / District <span className="text-red-500">*</span>
            <input
              {...register("city", { required: true })}
              type="text"
              className="w-full border rounded p-2 mt-1"
            />
            {errors.city && (
              <span className="text-red-500">This field is required</span>
            )}
          </label>
          <button
            disabled={loading}
            className={`py-2.5 text-sm rounded-full ${
              loading ? "bg-blue-200" : "bg-primary"
            } grid place-items-center w-full disabled:cursor-not-allowed`}
          >
            {loading ? (
              <TailSpin height={20} width={20} color="white" />
            ) : (
              "Continue"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressDetails;

