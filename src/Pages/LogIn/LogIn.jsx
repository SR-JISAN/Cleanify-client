import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import useTitle from '../../Hook/UseTitle';
import { Eye, EyeClosed } from 'lucide-react';
import Swal from 'sweetalert2';

const LogIn = () => {
  useTitle("LogIn");
    const { signInWithGoogle, signInUser } = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate()
      const [passError, setPassError] = useState(false);
       const [emailError, setEmailError] = useState(false);
       const [open,setOpen] =useState(false)
    
    const handelSubmit =(e)=>{
        e.preventDefault()
        const email = e.target.email.value
        const pass = e.target.pass.value

        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        if (!gmailRegex.test(email)) {
          setEmailError(true);
          return;
        }
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
  if (!passwordRegex.test(pass)) {
    setPassError(true);
    return;
  }

        signInUser(email,pass)
        .then(result=>{
          if(result){

            Swal.fire("Success!", "Account created successfully", "success");
          }
          navigate(location.state || "/home");

        }).catch(err=>{
            console.log(err)
        })
    }
    const handleGoogle = () => {
      signInWithGoogle()
        .then((result) => {
          if (result) {
            Swal.fire("Success!", "Account created successfully", "success");
          }
          navigate(location.state || "/home");
        })
        .catch((err) => {
          console.error(err);
          if(err){

            Swal.fire("Error invalid Account");
          }
        });
    };
     const handleEys = () => {
       setOpen(!open);
     };
    return (
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">LogIn Now</h1>
        </div>
        <div className="card bg-white w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handelSubmit}>
              <fieldset className="fieldset">
                <div className="inputBox my-3">
                  <input name="email" required="required" type="email" />
                  <span>Your Email</span>
                  <i></i>
                </div>
                {emailError && (
                  <p className="text-red-600 my-2">
                    Enter a valid email like example@gmail.com
                  </p>
                )}
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
                  <Link to="/register" className="link link-hover">
                    Don't have account?
                    <span className="hover:text-blue-800 ml-0.5 hover:font-bold hover:border-b-blue-800">
                      Register
                    </span>
                  </Link>
                </div>

                <button className="custom-btn py-2 mt-4 shadow">Log In</button>
                <div className="flex justify-center my-2">
                  <h1 className="text-xl">or</h1>
                </div>
              </fieldset>
            </form>
            <button
              onClick={handleGoogle}
              className="btn  bg-white text-black border-[#e5e5e5] rounded-2xl"
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

export default LogIn;