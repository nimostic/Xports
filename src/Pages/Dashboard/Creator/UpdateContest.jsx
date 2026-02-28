import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import contestTypes from "../../../../public/ContestTypes.json";
import AngledButton from "../../../Components/AngledButton";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
const UpdateContest = ({ closeModal, refetch, selectedContest }) => {
  const axiosSecure = useAxiosSecure();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm();
  //console.log(selectedContest);
  //reset functionality through default vabe register("contestName")etc bose jasse
  useEffect(() => {
    if (selectedContest) {
      reset({
        contestName: selectedContest.contestName,
        contestType: selectedContest.contestType,
        price: selectedContest.price,
        prizeMoney: selectedContest.prizeMoney,
        instruction: selectedContest.instruction,
        description: selectedContest.description,
        deadline: selectedContest.deadline
          ? new Date(selectedContest.deadline)
          : new Date(),
      });
    }
  }, [selectedContest, reset]);

  const onSubmit = (data) => {
    axiosSecure
      .patch(
        `/contests/${selectedContest._id}?email=${selectedContest.ownerEmail}`,
        data,
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Successfully updated!");
          refetch();
          closeModal();
        } else {
          toast.info("No changes made.");
          closeModal();
        }
      });
  };

  return (
    <div className="modal modal-open modal-bottom sm:modal-middle overflow-y-auto">
      <div className="modal-box max-w-4xl bg-[#111111] border border-gray-800 p-6 md:p-10 shadow-2xl scrollbar-hide">
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-base-content hover:bg-primary"
        >
          ✕
        </button>
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-primary text-4xl text-base-content uppercase tracking-tighter italic">
            Update <span className="text-base-content">Contest</span>
          </h1>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
            Fill in the details what you wanna update...
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Contest Name */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider">
                Contest Name
              </label>
              <input
                type="text"
                className={`input input-bordered w-full bg-[#0a0a0a] border-gray-700 text-base-content focus:border-primary ${
                  errors.contestName && "border-primary"
                }`}
                {...register("contestName", {
                  required: "Contest name is required",
                })}
              />
              {errors.contestName && (
                <span className="text-primary text-[10px] font-bold uppercase">
                  {errors.contestName.message}
                </span>
              )}
            </div>

            {/* Contest Type */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider">
                Contest Type
              </label>
              <select
                className="select select-bordered w-full bg-[#0a0a0a] border-gray-700 text-base-content"
                {...register("contestType", { required: "Select a type" })}
              >
                {contestTypes.map((type) => (
                  <option key={type.id} value={type.value}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider">
                Deadline
              </label>
              <Controller
                control={control}
                name="deadline"
                render={({ field }) => (
                  <DatePicker
                    className="input input-bordered bg-[#0a0a0a] border-gray-700 text-base-content w-full"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                  />
                )}
              />
            </div>

            {/* Entry Fee */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider">
                Entry Fee (USD)
              </label>
              <input
                type="number"
                step="any"
                className="input input-bordered bg-[#0a0a0a] border-gray-700 text-base-content"
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* Winning Prize */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider">
                Winning Prize (USD)
              </label>
              <input
                type="number"
                className="input input-bordered bg-[#0a0a0a] border-gray-700 text-base-content"
                {...register("prizeMoney", {
                  required: "Prize is required",
                  valueAsNumber: true,
                })}
              />
            </div>

            {/* Instruction */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider">
                Instructions
              </label>
              <textarea
                className="textarea textarea-bordered bg-[#0a0a0a] border-gray-700 text-base-content h-24"
                {...register("instruction", {
                  required: "Instruction is required",
                })}
              ></textarea>
            </div>

            {/* Description - Fixed Name Here */}
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-gray-300 font-semibold uppercase text-[11px] tracking-wider">
                Overview
              </label>
              <textarea
                className="textarea textarea-bordered bg-[#0a0a0a] border-gray-700 text-base-content h-20"
                {...register("description", {
                  required: "Description is required",
                })}
              ></textarea>
            </div>
          </div>

          <div className="pt-4">
            <AngledButton
              type="submit"
              text="Update Contest"
              className="w-full h-14 text-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateContest;
