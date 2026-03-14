import { Mail, Lock, Eye, EyeOff } from "lucide-react";
0.0;
import { useState } from "react";
import { Link } from "react-router-dom";

const AdminLogin = ({ setIsLoggedIn }) => {
  const [isLoading, setIsLoding] = useState(false);
  const [passwordState, setPasswordState] = useState(true);
  const [response, setResponse] = useState(null);
  const [submitDisable, setSubmitDisable] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoding(true);
    let formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        let resp = await res.json();
        setSubmitDisable(true);
        setIsLoding(false);
        if (res.ok) {
          if (data.rememberMe) {
            localStorage.setItem("token", resp.token);
          }
          setResponse({ success: true, msg: resp.message });
          setTimeout(() => {
            setResponse(null);
            setIsLoggedIn(true);
          }, 1500);
        } else {
          setResponse({ success: false, msg: resp.message });
          setTimeout(() => {
            setResponse(null);
            setSubmitDisable(false);
          }, 1500);
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoding(false);
        setResponse({ success: false, msg: "Internal Server Error" });
        setTimeout(() => {
          setResponse(null);
          setSubmitDisable(false);
        }, 1500);
      });
  };
  return (
    <div
      className="flex justify-center items-center w-full min-h-[100dvh] bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url("/loginb.jpg") ` }}
    >
      {isLoading && (
        <div className="z-10 absolute top-0 left-0 rounded-md bg-[rgba(0,0,0,0.3)] w-full h-full flex justify-center items-center">
          <div className="animate-spin w-10 h-10 border-2 rounded-full border-b-transparent"></div>
        </div>
      )}
      <div
        className="w-96 shadow-lg shadow-blue-200 py-10 rounded-lg backdrop-blur-sm h-96 "
        style={{ background: "rgba(255,255,255,0.2)" }}
      >
        <form
          action="#"
          className="flex flex-col justify-center items-start gap-5 h-80 px-10 flex-1"
          onSubmit={handleSubmit}
        >
          <div className="text-center w-full">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <h3 className="text-xs mt-2">Please enter your details to login</h3>
          </div>
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
              placeholder="Enter Email Address"
              name="email"
              required
            />
          </div>
          <div className="w-full flex flex-col justify-center items-start gap-1">
            <label
              className="text-xs flex justify-center items-center gap-2"
              htmlFor="pass"
            >
              <Lock size={18} /> Password
            </label>
            <div className=" w-full border border-slate-300 rounded-lg px-2 py-1 flex justify-between">
              <input
                className="focus:outline-0 flex-1"
                type={passwordState ? "password" : "text"}
                placeholder={
                  passwordState ? "*****************" : "Enter Password"
                }
                id="pass"
                name="password"
                required
              />
              <button
                type="button"
                className="cursor-pointer"
                onClick={() => {
                  setPasswordState(!passwordState);
                }}
              >
                {!passwordState ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-1">
            <div className="flex justify-between items-center w-full py-3">
              <div className="flex justify-center items-center gap-2">
                <input type="checkbox" name="rememberMe" id="rememberMe" />
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
              disabled={submitDisable}
            />
          </div>
        </form>
      </div>
      {response && (
        <div className="absolute top-10 right-1 transform -translate-x-1/2 bg-white p-4 rounded shadow-lg">
          <p className={response.success ? "text-green-500" : "text-red-500"}>
            {response.msg}
          </p>
        </div>
      )}
    </div>
  );
};
export default AdminLogin;
