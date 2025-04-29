import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });


    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Reset Password</h2>
                {error && <p className="error">{error}</p>}
                <form >
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>New Password:</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter New password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Change Password</button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
