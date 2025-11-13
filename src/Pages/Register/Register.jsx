import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import useTitle from "../../Hook/UseTitle";
import Swal from "sweetalert2";
import { Eye, EyeClosed } from "lucide-react";

const Register = () => {
  useTitle("Register");
  const { createUser, signInWithGoogle, updateUserProfile } =useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [open,setOpen] =useState(false)

  const handelSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setPassError(false);

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const photo = e.target.photo.value.trim();
    const pass = e.target.pass.value;

    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
      setEmailError(true)
      return;
    }


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(pass)) {
      setPassError(true);
      return; 
    }

    try {
   
      const userCredential = await createUser(email, pass);
      if(userCredential){

        Swal.fire("Success!", "Account created successfully", "success");
      }

    
      await updateUserProfile({ displayName: name, photoURL: photo });

      navigate(location.state || "/home");
    } catch (error) {
      console.error(error);
      Swal.fire("Error Account Already in use ");
    }

    e.target.reset();
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result);
        navigate(location.state || "/home");
      })
      .catch((err) => console.dir(err));
  };

  const handleEys =()=>{
    setOpen(!open)
  }

  return (
    <div className="hero-content flex-col">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">Register Now</h1>
      </div>

      <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handelSubmit}>
            <fieldset className="fieldset">
              <div className="inputBox">
                <input name="name" required type="text" />
                <span>Your Name</span>
                <i></i>
              </div>

              <div className="inputBox my-3">
                <input name="email" required type="text" />
                <span>Your Email</span>
                <i></i>
              </div>
              {emailError && (
                <p className="text-red-600 my-2">
                  Enter a valid email like example@gmail.com
                </p>
              )}

              <div className="inputBox">
                <input name="photo" required type="text" />
                <span>Photo URL</span>
                <i></i>
              </div>
              <div className="flex items-center relative">
                <div className="inputBox mt-3">
                  <input
                    name="pass"
                    required
                    type={open ? "text" : "password"}
                  />
                  <span className="">Password</span>
                  <i></i>
                </div>
                <div
                  onClick={handleEys}
                  className="absolute z-50 right-4 bottom-2"
                >
                  {open ? <EyeClosed /> : <Eye />}
                </div>
              </div>
              {passError && (
                <p className="text-red-600 my-2">
                  Password must be at least 6 characters long and include both
                  uppercase and lowercase letters
                </p>
              )}

              <div>
                <Link to="/login" className="link link-hover">
                  Already have Account?{" "}
                  <span className="hover:text-blue-800 hover:font-bold ml-0.5 hover:border-b-blue-800">
                    Log In
                  </span>
                </Link>
              </div>

              <button className="custom-btn py-2 mt-4 shadow">Register</button>
              <div className="flex justify-center my-2">
                <h1 className="text-xl">or</h1>
              </div>
            </fieldset>
          </form>

          <button
            onClick={handleGoogle}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
