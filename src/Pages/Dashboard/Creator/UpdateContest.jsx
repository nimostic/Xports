import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import contestTypes from "../../../../public/ContestTypes.json";
import AngledButton from "../../../Components/AngledButton";
import DatePicker from "react-datepicker";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const UpdateContest = ({ closeModal, refetch, selectedContest }) => {
  const axiosSecure = useAxiosSecure();
  const { handleSubmit, register, formState: { errors }, control, reset } = useForm();

  useEffect(() => {
    if (selectedContest) {
      reset({
        contestName: selectedContest.contestName,
        contestType: selectedContest.contestType,
        price: selectedContest.price,
        prizeMoney: selectedContest.prizeMoney,
        instruction: selectedContest.instruction,
        description: selectedContest.description,
        deadline: selectedContest.deadline ? new Date(selectedContest.deadline) : new Date(),
      });
    }
  }, [selectedContest, reset]);

  const onSubmit = (data) => {
    axiosSecure
      .patch(`/contests/${selectedContest._id}?email=${selectedContest.ownerEmail}`, data)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("ARENA UPDATED!");
          refetch();
          closeModal();
        } else {
          toast.info("NO CHANGES.");
          closeModal();
        }
      });
  };

  // Common Label Style for reuse
  const labelStyle = "text-[11px] font-black uppercase tracking-[0.15em] text-white/80 mb-1 ml-1 italic shadow-sm";

  return (
    <div className="modal modal-open backdrop-blur-md transition-all duration-300 items-center justify-center p-4">
      <div className="modal-box max-w-4xl w-full bg-[#0a0a0a] border border-white/20 p-6 md:p-10 rounded-4xl shadow-[0_0_60px_rgba(0,0,0,1)] relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <button
          onClick={closeModal}
          className="btn btn-sm btn-circle bg-white/10 border-none absolute right-6 top-6 hover:bg-primary hover:text-white z-50 transition-colors"
        >
          ✕
        </button>

        <div className="mb-8 border-l-4 border-primary pl-4">
          <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-white">
            Update <span className="text-primary">Arena</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 italic mt-1">
            System Configuration Mode
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Contest Name */}
          <div className="flex flex-col gap-1">
            <label className={labelStyle}>Tournament Title</label>
            <input
              type="text"
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm font-bold italic text-white focus:border-primary focus:bg-white/10 outline-none transition-all shadow-inner"
              {...register("contestName", { required: "Required" })}
            />
          </div>

          {/* Contest Type */}
          <div className="flex flex-col gap-1">
            <label className={labelStyle}>Arena Category</label>
            <select
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm font-bold italic text-white focus:border-primary focus:bg-white/10 outline-none transition-all cursor-pointer"
              {...register("contestType", { required: true })}
            >
              {contestTypes.map((type) => (
                <option key={type.id} value={type.value} className="bg-[#0a0a0a] text-white font-bold italic uppercase text-xs">
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Deadline */}
          <div className="flex flex-col gap-1">
            <label className={labelStyle}>Submission Deadline</label>
            <Controller
              control={control}
              name="deadline"
              render={({ field }) => (
                <DatePicker
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm font-bold italic text-white focus:border-primary focus:bg-white/10 outline-none transition-all shadow-inner"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
          </div>

          {/* Entry Fee */}
          <div className="flex flex-col gap-1">
            <label className={labelStyle}>Entry Credit ($)</label>
            <input
              type="number"
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-3.5 text-sm font-bold italic text-white focus:border-primary focus:bg-white/10 outline-none transition-all shadow-inner"
              {...register("price", { required: true, valueAsNumber: true })}
            />
          </div>

          {/* Prize Pool - Visual Highlight */}
          <div className="md:col-span-2 bg-gradient-to-r from-primary/20 to-transparent p-5 rounded-2xl border border-primary/30 shadow-lg">
            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-primary italic mb-2 block">Grand Prize Pool (USD)</label>
            <div className="flex items-center gap-3">
               <span className="text-2xl font-black text-primary">$</span>
               <input
                 type="number"
                 className="w-full bg-transparent border-none p-0 text-3xl font-black italic text-white focus:outline-none"
                 {...register("prizeMoney", { required: true, valueAsNumber: true })}
               />
            </div>
          </div>

          {/* Instruction */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className={labelStyle}>Mission Instructions</label>
            <textarea
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-[13px] font-medium italic text-white/90 focus:border-primary focus:bg-white/10 outline-none transition-all h-28 resize-none leading-relaxed"
              {...register("instruction", { required: true })}
            ></textarea>
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className={labelStyle}>Arena Overview</label>
            <textarea
              className="bg-white/5 border border-white/20 rounded-xl px-4 py-4 text-[13px] font-medium italic text-white/90 focus:border-primary focus:bg-white/10 outline-none transition-all h-24 resize-none leading-relaxed"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          {/* Submit Action */}
          <div className="md:col-span-2 pt-6">
            <AngledButton
              type="submit"
              text="Update Configuration"
              className="w-full h-16 text-lg tracking-[0.25em] shadow-[0_0_30px_rgba(244,14,8,0.2)]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateContest;