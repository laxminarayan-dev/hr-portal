import { Mail, Lock, Eye, EyeOff, User, Pen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminRegister = () => {
  const [passwordState, setPasswordState] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data.password === data.confPassword) {
      console.log(data);
      fetch("http://localhost:8000/api/auth/register", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          let resp = await res.json();
          if (resp.ok) {
            console.log(resp.message);
          } else {
            console.log(resp.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("password not match");
    }
  };
  return (
    <div
      className="w-full min-h-[calc(100dvh-48px)] flex justify-center items-center bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url("/loginb.jpg") ` }}
    >
      <div
        className="w-96 shadow-lg shadow-blue-100 border border-stone-100 py-10 rounded-lg min-h-fit"
        style={{ background: "rgba(255,255,255,0.5)" }}
      >
        <form
          action="#"
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-start gap-5 px-10 "
        >
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold">Welcome</h1>
            <h3 className="text-xs mt-2">
              Please enter your details to Register
            </h3>
          </div>
          {/* Name */}
          <div className="w-full flex flex-col justify-center items-start gap-1">
            <label
              className="text-xs flex justify-center items-center gap-2"
              htmlFor="name"
            >
              <User size={18} /> Your Name
            </label>
            <input
              className="focus:outline-0 w-full border border-slate-300 rounded-lg px-2 py-1"
              type="name"
              name="name"
              id="name"
              placeholder="Enter Full Name"
            />
          </div>

          {/* Email */}
          <div className="w-full flex flex-col justify-center items-start gap-1">
            <label
              className="text-xs flex justify-center items-center gap-2"
              htmlFor="email"
            >
              <Mail size={18} /> Your Email Address
            </label>
            <input
              className="focus:outline-0 w-full border border-slate-300 rounded-lg px-2 py-1"
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
            />
          </div>
          {/* Password */}
          <div className="w-full flex flex-col justify-center items-start gap-1">
            <label
              className="text-xs flex justify-center items-center gap-2"
              htmlFor="password"
            >
              <Lock size={18} /> Password
            </label>
            <div className=" w-full border border-slate-300 rounded-lg px-2 py-1 flex justify-between">
              <input
                name="password"
                id="password"
                className="focus:outline-0 flex-1"
                type={passwordState ? "password" : "text"}
                placeholder={
                  passwordState ? "*****************" : "Enter Password"
                }
              />
              <button
                type="button"
                onClick={() => {
                  setPasswordState(!passwordState);
                }}
              >
                {passwordState ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-1">
            <label
              className="text-xs flex justify-center items-center gap-2"
              htmlFor="confPassword"
            >
              <Lock size={18} /> Confirm Password
            </label>
            <div className=" w-full border border-slate-300 rounded-lg px-2 py-1 flex justify-between">
              <input
                className="focus:outline-0 flex-1"
                type={"text"}
                placeholder={"Confirm Password"}
                name="confPassword"
                id="confPassword"
              />
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-1">
            <div className="flex justify-between items-center w-full py-3">
              <div className="flex justify-center items-center gap-2">
                <input type="checkbox" name="" id="" />{" "}
                <p className="text-sm text-slate-900">Remember me</p>
              </div>
              <Link className="text-sm underline text-slate-900">
                Forgot password?
              </Link>
            </div>
            <input
              className="border border-slate-300 bg-slate-900 text-white rounded-lg w-full px-2 py-1"
              type="submit"
              value="Submit"
            />
            <Link to="/user/login" className="underline text-sm">
              Login
            </Link>
          </div>
        </form>
      </div>{" "}
    </div>
  );
};

export default AdminRegister;
