import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AngledButton from "../../../Components/AngledButton";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthContext";
import axios from "axios";
import contestTypes from "../../../../public/ContestTypes.json";

const CreateContest = () => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
    const bannerImage = data.bannerImage[0];
    const formData = new FormData();
    formData.append("image", bannerImage);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

    axios.post(image_API_URL, formData).then((res) => {
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

      Swal.fire({
        title: "CONFIRM LAUNCH?",
        text: "The arena awaits your tournament!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#F40E08",
        cancelButtonColor: "#111",
        confirmButtonText: "YES, DEPLOY!",
        background: "#0a0a0a",
        color: "#fff",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/contests", contestData).then((res) => {
            if (res.data.insertedId || res.status === 200) {
              Swal.fire({ title: "SUCCESS!", text: "Contest live in pending!", icon: "success", background: "#0a0a0a", color: "#fff" });
              reset();
            }
          });
        }
      });
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Form Container - Consistent with Categories Card Style */}
      <div className="max-w-4xl mx-auto bg-base-200/40 backdrop-blur-md p-6 sm:p-10 md:p-16 rounded-[2.5rem] border border-base-content/5 shadow-2xl relative overflow-hidden">
        
        {/* Decorative Glow - Consistency Fix */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10"></div>

        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter leading-none">
            Forge <span className="text-primary">Arena</span>
          </h1>
          <div className="h-1.5 w-20 bg-primary mt-4 rounded-full mx-auto md:mx-0"></div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] opacity-40 mt-6 italic">
            Tournament Initialization Sequence
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            
            {/* Reusable Input Logic for Consistency */}
            {[
              { label: "Contest Title", name: "contestName", type: "text", ph: "e.g. Cyber Strike 2026" },
              { label: "Entry Fee (USD)", name: "price", type: "number", ph: "0.00" },
              { label: "Prize Pool (USD)", name: "prizeMoney", type: "number", ph: "1000.00" }
            ].map((input) => (
              <div key={input.name} className="flex flex-col gap-3">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1 italic">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  step="any"
                  placeholder={input.ph}
                  className="w-full bg-base-100/50 border border-base-content/10 rounded-2xl px-6 py-4 text-sm font-bold italic tracking-widest focus:border-primary/50 focus:outline-none transition-all placeholder:opacity-20"
                  {...register(input.name, { required: true })}
                />
              </div>
            ))}

            {/* Category Dropdown */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1 italic">
                Arena Category
              </label>
              <select
                className="w-full bg-base-100/50 border border-base-content/10 rounded-2xl px-6 py-4 text-sm font-bold italic tracking-widest focus:border-primary/50 focus:outline-none appearance-none"
                {...register("contestType", { required: true })}
              >
                {contestTypes.map((type) => (
                  <option key={type.id} value={type.value} className="bg-base-300 text-base-content uppercase italic">
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Banner Upload */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1 italic">
                Banner Artwork
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full bg-base-100/50 border-base-content/10 rounded-2xl text-[10px] font-bold uppercase italic"
                {...register("bannerImage", { required: true })}
              />
            </div>

            {/* Deadline Picker */}
            <div className="flex flex-col gap-3">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1 italic">
                Final Timeline
              </label>
              <Controller
                control={control}
                name="deadline"
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Select Date"
                    className="w-full bg-base-100/50 border border-base-content/10 rounded-2xl px-6 py-4 text-sm font-bold italic tracking-widest focus:border-primary/50 focus:outline-none"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    minDate={new Date()}
                  />
                )}
              />
            </div>

            {/* Instructions - Full Width Mobile to Desktop */}
            <div className="flex flex-col gap-3 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1 italic">
                Submission Protocol
              </label>
              <textarea
                rows="4"
                className="w-full bg-base-100/50 border border-base-content/10 rounded-[1.5rem] px-6 py-5 text-sm font-medium italic focus:border-primary/50 focus:outline-none transition-all"
                placeholder="Detail the mission objectives..."
                {...register("instruction", { required: true })}
              ></textarea>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-3 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest opacity-50 ml-1 italic">
                Arena Intel (Overview)
              </label>
              <textarea
                rows="3"
                className="w-full bg-base-100/50 border border-base-content/10 rounded-[1.5rem] px-6 py-5 text-sm font-medium italic focus:border-primary/50 focus:outline-none transition-all"
                placeholder="Brief the participants..."
                {...register("description", { required: true })}
              ></textarea>
            </div>
          </div>

          <div className="pt-6">
            <AngledButton
              type="submit"
              text="Launch Tournament"
              className="w-full h-16 text-lg tracking-[0.2em] shadow-lg shadow-primary/20"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContest;