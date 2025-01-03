import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Authentication.module.css";
import loginPic from "../../assets/login.png";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setshowConfirmPass(!showConfirmPass);
  };
  return (
    <>
      <div className={styles.authTemplate}>
        <div className="container">
          <div className="d-flex">
            <div className="leftSide bg-white w-50 p-5 rounded-start-4">
              <h3>Create Account</h3>
              <p className="text-capitalize mb-4">
                Register with your valid email address
              </p>
              <form>
                {/* Full name */}
                <div className="mb-4">
                  <label htmlFor="fullName">Full Name</label>
                  <div className={`${styles.inputBox} mb-2 position-relative`}>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      className="form-control"
                      placeholder="Enter Your Name"
                    />
                    <div className={styles.icon}>
                      <i className="fa-brands fa-mailchimp"></i>
                    </div>
                  </div>
                </div>

                {/* User email */}
                <div className="mb-4">
                  <label htmlFor="email">Email</label>
                  <div className={`${styles.inputBox} mb-2 position-relative`}>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                    />
                    <div className={styles.icon}>
                      <i className="fa-regular fa-paper-plane"></i>
                    </div>
                  </div>
                </div>

                {/* Phone number */}
                <div className="mb-4">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <div className={`${styles.inputBox} mb-2 position-relative`}>
                    <input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="form-control"
                      placeholder={"01012345678"}
                    />
                    <div className={styles.icon}>
                      <i className="fa-solid fa-phone"></i>
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label htmlFor="password">Password</label>
                  <div className={`${styles.inputBox} mb-2 position-relative`}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter Your password"
                    />
                    <div className={styles.icon}>
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <div onClick={togglePasswordVisibility}>
                      {showPassword ? (
                        <i
                          className={`${styles.showPassword} fa-solid fa-eye position-absolute  `}
                        ></i>
                      ) : (
                        <i
                          className={`${styles.showPassword} fa-regular fa-eye-slash position-absolute`}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="mb-4">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className={`${styles.inputBox} mb-2 position-relative`}>
                    <input
                      type={showConfirmPass ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="form-control"
                      placeholder="Confirm Your password"
                    />
                    <div className={styles.icon}>
                      <i className="fa-solid fa-key"></i>
                    </div>
                    <div onClick={toggleConfirmPasswordVisibility}>
                      {showConfirmPass ? (
                        <i
                          className={`${styles.showPassword} fa-solid fa-eye position-absolute  `}
                        ></i>
                      ) : (
                        <i
                          className={`${styles.showPassword} fa-regular fa-eye-slash position-absolute`}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn w-100 ${styles.signInBtn}  mt-5 py-2 text-white rounded-3`}
                >
                  Register
                </button>
              </form>
            </div>
            <div
              className={`${styles.rightSide} w-50 rounded-end-4 d-flex justify-content-center align-items-end `}
            >
              <img src={loginPic} className="w-50" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
