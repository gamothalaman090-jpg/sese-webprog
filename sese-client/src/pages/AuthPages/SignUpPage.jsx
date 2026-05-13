import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import { createUser } from "../../services/UserService";

const inputClasses =
    "mt-1.5 w-full border-2 border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-zinc-400 focus:border-[#0a0a0a] focus:bg-white";

const SignUpPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!firstName || !lastName || !username || !age || !gender || !contactNumber || !address || !email || !password) {
            return setError("All fields are required.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return setError("Please enter a valid email address.");
        }

        if (password.length < 8) {
            return setError("Password must be at least 8 characters long.");
        }

        try {
            // Default new sign-ups to "viewer" role
            await createUser({
                firstName,
                lastName,
                username,
                age,
                gender,
                contactNumber,
                address,
                email,
                password,
                type: "viewer",
                isActive: true
            });
            
            setSuccess("Account created successfully! Redirecting to login...");
            
            // Wait for 2 seconds before redirecting
            setTimeout(() => {
                navigate("/auth/signin");
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create account.");
        }
    };

    return (
        <>
            {/* Section marker */}
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#71717a] mb-4">
                §02 — Registration
            </p>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#0a0a0a] leading-[1.1]">
                Create<br />Account.
            </h1>
            <p className="mt-3 text-sm leading-7 text-[#52525b] max-w-sm">
                Join the archive. Set up your credentials and start exploring the full collection.
            </p>

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 text-sm border-l-4 border-red-500">
                    {error}
                </div>
            )}

            {success && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 text-sm border-l-4 border-green-500">
                    {success}
                </div>
            )}

            {/* Divider */}
            <div className="w-8 h-0.5 bg-[#0a0a0a] mt-6 mb-8" />

            <form className="space-y-5" onSubmit={handleSignUp}>
                {/* Name Grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            placeholder="Eunich"
                            className={inputClasses}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="last-name" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            type="text"
                            placeholder="Sese"
                            className={inputClasses}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Username & Age Grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="username" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="eunichsese"
                            className={inputClasses}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="age" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                            Age
                        </label>
                        <input
                            id="age"
                            type="number"
                            placeholder="21"
                            className={inputClasses}
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Gender & Contact Grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="gender" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                            Gender
                        </label>
                        <select
                            id="gender"
                            className={inputClasses}
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="contact" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                            Contact Number
                        </label>
                        <input
                            id="contact"
                            type="tel"
                            placeholder="09123456789"
                            className={inputClasses}
                            value={contactNumber}
                            onChange={(e) => setContactNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="signup-email" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                        Email Address
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        placeholder="you@example.com"
                        className={inputClasses}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Address */}
                <div>
                    <label htmlFor="address" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                        Full Address
                    </label>
                    <input
                        id="address"
                        type="text"
                        placeholder="123 Street, City, Country"
                        className={inputClasses}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="signup-password" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                        Password
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        className={inputClasses}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                    <p className="mt-1.5 text-[10px] leading-5 text-zinc-400">
                        Minimum 8 characters — letters, numbers, and symbols.
                    </p>
                </div>

                {/* Terms & Conditions */}
                <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 shrink-0 border-2 border-zinc-400 accent-[#0a0a0a] cursor-pointer"
                        />
                        <span className="text-[11px] leading-5 text-[#71717a] group-hover:text-[#52525b] transition-colors">
                            I agree to the{" "}
                            <button type="button" className="font-bold text-[#0a0a0a] border-b border-[#0a0a0a] hover:text-[#71717a] hover:border-[#71717a] transition-colors cursor-pointer">
                                Terms of Service
                            </button>{" "}
                            and{" "}
                            <button type="button" className="font-bold text-[#0a0a0a] border-b border-[#0a0a0a] hover:text-[#71717a] hover:border-[#71717a] transition-colors cursor-pointer">
                                Privacy Policy
                            </button>
                        </span>
                    </label>
                </div>

                {/* Primary CTA */}
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full rounded-none py-3.5 text-[10px] tracking-[0.24em] mt-2"
                >
                    Create Account
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-4 pt-1">
                    <div className="flex-1 h-px bg-zinc-200" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-400">Or continue with</span>
                    <div className="flex-1 h-px bg-zinc-200" />
                </div>

                {/* Social Login */}
                <div className="grid gap-3 sm:grid-cols-2">
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full rounded-none py-3 text-[10px] tracking-[0.2em] gap-2.5"
                    >
                        {/* Google SVG */}
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                        Google
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        className="w-full rounded-none py-3 text-[10px] tracking-[0.2em] gap-2.5"
                    >
                        {/* Apple SVG */}
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        Apple
                    </Button>
                </div>

                {/* Footer */}
                <div className="mt-6 border-t-2 border-zinc-200 pt-6 text-sm text-[#52525b]">
                    Already have an account?{" "}
                    <Link
                        to="/auth/signin"
                        className="font-bold text-[#0a0a0a] transition-colors hover:text-[#71717a] border-b-2 border-[#0a0a0a] hover:border-[#71717a] pb-0.5"
                    >
                        Log In
                    </Link>
                </div>
            </form>
        </>
    );
};

export default SignUpPage;