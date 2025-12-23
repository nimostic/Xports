import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AngledButton from "../../Components/AngledButton";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import contestTypes from "../../../public/ContestTypes.json";
const CreateContest = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  // console.log(contestType);
  const onSubmit = (data) => {
    const bannerImage = data.bannerImage[0];

    //1. store the image in form data

    const formData = new FormData();
    formData.append("image", bannerImage);

    //2. send the photo to store and get the url

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    axios.post(image_API_URL, formData).then((res) => {
      // console.log(res.data.data.url);
      const photoURL = res.data.data.url;

      const contestData = {
        ...data,
        bannerImage: photoURL,
        price: parseFloat(data.price),
        prizeMoney: parseFloat(data.prizeMoney),
        participantsCount: 0,
        status: "pending",
        contestOwner: user?.displayName,
        ownerEmail: user?.email,
        winnerName: "",
        winnerPhoto: "",
        winnerEmail: "",
      };
      console.log(contestData);
      Swal.fire({
        title: "Are you sure?",
        text: "You want to create this contest?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F40E08",
        cancelButtonColor: "#111",
        confirmButtonText: "Yes, Submit it!",
        background: "#161616",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure
            .post("/contests", contestData)
            .then((res) => {
              if (res.data.insertedId || res.status === 200) {
                Swal.fire({
                  title: "Success!",
                  text: "Contest created successfully!",
                  icon: "success",
                  background: "#161616",
                  color: "#fff",
                });
                reset();
              }
            })
            .catch(() => {
              Swal.fire({
                title: "Error",
                text: "Submission failed!",
                icon: "error",
                background: "#161616",
                color: "#fff",
              });
            });
        }
      });
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#111111] p-6 md:p-10 rounded-xl border border-gray-800 shadow-2xl my-10">
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-primary text-4xl font-black uppercase tracking-tighter italic">
          Create New <span className="text-white">Contest</span>
        </h1>
        <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
          Fill in the details to launch your tournament
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Contest Name */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider ml-1">
              Contest Name
            </label>
            <input
              type="text"
              placeholder="Enter tournament name"
              className={`input input-bordered w-full bg-[#0a0a0a] border-gray-700 text-white focus:outline-none focus:border-primary transition-all ${
                errors.contestName && "border-primary"
              }`}
              {...register("contestName", {
                required: "Contest name is required",
              })}
            />
            {errors.contestName && (
              <span className="text-primary text-[10px] font-bold uppercase ml-1">
                {errors.contestName.message}
              </span>
            )}
          </div>

          {/* Contest Type */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider ml-1">
              Contest Type
            </label>
            <select
              className={`select select-bordered w-full bg-[#0a0a0a] border-gray-700 text-white focus:outline-none focus:border-primary transition-all ${
                errors.contestType && "border-primary"
              }`}
              {...register("contestType", { required: "Select a type" })}
            >
              {contestTypes.map((contestType) => (
                <option key={contestType.id} value={contestType.value}>
                  {contestType.name}
                </option>
              ))}
            </select>
            {errors.contestType && (
              <span className="text-primary text-[10px] font-bold uppercase ml-1">
                {errors.contestType.message}
              </span>
            )}
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider ml-1">
              Banner Image File
            </label>
            <input
              type="file"
              placeholder="Enter Contest Bannner"
              className={`input input-bordered w-full bg-[#0a0a0a] border-gray-700 text-white focus:outline-none focus:border-primary transition-all ${
                errors.bannerImage && "border-primary"
              }`}
              {...register("bannerImage", { required: "Image is required" })}
            />
            {errors.bannerImage && (
              <span className="text-primary text-[10px] font-bold uppercase ml-1">
                {errors.bannerImage.message}
              </span>
            )}
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider ml-1">
              Registration Deadline
            </label>
            <Controller
              control={control}
              name="deadline"
              rules={{ required: "Deadline is required" }}
              render={({ field }) => (
                <DatePicker
                  placeholderText="Pick a date"
                  className="input input-bordered bg-[#0a0a0a] border-gray-700 text-white focus:outline-none focus:border-primary w-full"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  minDate={new Date()}
                  wrapperClassName="w-full"
                />
              )}
            />
            {errors.deadline && (
              <span className="text-primary text-[10px] font-bold uppercase ml-1">
                {errors.deadline.message}
              </span>
            )}
          </div>

          {/* Registration Price */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider ml-1">
              Entry Fee (USD)
            </label>
            <input
              type="number"
              step="any"
              placeholder="0.00"
              className={`input input-bordered w-full bg-[#0a0a0a] border-gray-700 text-white focus:outline-none focus:border-primary transition-all ${
                errors.price && "border-primary"
              }`}
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Can't be negative" },
              })}
            />
            {errors.price && (
              <span className="text-primary text-[10px] font-bold uppercase ml-1">
                {errors.price.message}
              </span>
            )}
          </div>

          {/* Prize Money */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider ml-1">
              Winning Prize (USD)
            </label>
            <input
              type="number"
              step="any"
              placeholder="500.00"
              className={`input input-bordered w-full bg-[#0a0a0a] border-gray-700 text-white focus:outline-none focus:border-primary transition-all ${
                errors.prizeMoney && "border-primary"
              }`}
              {...register("prizeMoney", {
                required: "Prize is required",
                valueAsNumber: true,
                min: { value: 0, message: "Can't be negative" },
              })}
            />
            {errors.prizeMoney && (
              <span className="text-primary text-[10px] font-bold uppercase ml-1">
                {errors.prizeMoney.message}
              </span>
            )}
          </div>

          {/* Task Instruction */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider ml-1">
              Submission Instructions
            </label>
            <textarea
              className={`textarea textarea-bordered w-full bg-[#0a0a0a] border-gray-700 text-white focus:outline-none focus:border-primary h-28 transition-all ${
                errors.instruction && "border-primary"
              }`}
              placeholder="Describe what participants need to submit..."
              {...register("instruction", {
                required: "Instruction is required",
              })}
            ></textarea>
            {errors.instruction && (
              <span className="text-primary text-[10px] font-bold uppercase ml-1">
                {errors.instruction.message}
              </span>
            )}
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-2 md:col-span-2">
            <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider ml-1">
              Contest Overview
            </label>
            <textarea
              className={`textarea textarea-bordered w-full bg-[#0a0a0a] border-gray-700 text-white focus:outline-none focus:border-primary h-20 transition-all ${
                errors.description && "border-primary"
              }`}
              placeholder="Short summary of the contest..."
              {...register("description", {
                required: "Description is required",
              })}
            ></textarea>
            {errors.description && (
              <span className="text-primary text-[10px] font-bold uppercase ml-1">
                {errors.description.message}
              </span>
            )}
          </div>
        </div>

        <div className="pt-4">
          <AngledButton
            type="submit"
            text="Launch Contest"
            className="w-full h-14 text-lg"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateContest;
