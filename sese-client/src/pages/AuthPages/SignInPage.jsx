import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from "react";
import { loginUser } from "../../services/UserService";

const inputClasses =
    "mt-1.5 w-full border-2 border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-zinc-400 focus:border-[#0a0a0a] focus:bg-white";

const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email || !password) {
            return setError("Email and password are required.");
        }

        try {
            const { data } = await loginUser({ email, password });
            
            setSuccess("Login successful! Redirecting...");
            
            localStorage.setItem("token", data.token);
            localStorage.setItem("firstName", data.firstName);
            localStorage.setItem("type", data.type);
            
            // Wait for 1.5 seconds before redirecting
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        }
    };

    return (
        <>
            {/* Section marker */}
            <p className="text-[10px] font-bold uppercase tracking-[0.45em] text-[#71717a] mb-4">
                §01 — Authentication
            </p>

            {/* Heading */}
            <h1 className="font-display text-4xl sm:text-5xl font-black tracking-tight text-[#0a0a0a] leading-[1.1]">
                Log In.
            </h1>
            <p className="mt-3 text-sm leading-7 text-[#52525b] max-w-sm">
                Sign in to access the archive — projects, case studies, and everything in between.
            </p>

            {/* Error Banner */}
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

            <form className="space-y-5" onSubmit={handleSignIn}>
                {/* Email */}
                <div>
                    <label htmlFor="signin-email" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                        Email Address
                    </label>
                    <input
                        id="signin-email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className={inputClasses}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="signin-password" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#71717a]">
                        Password
                    </label>
                    <input
                        id="signin-password"
                        type="password"
                        placeholder="••••••••"
                        autoComplete="current-password"
                        className={inputClasses}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Primary CTA */}
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full rounded-none py-3.5 text-[10px] tracking-[0.24em] mt-2"
                >
                    Log In
                </Button>

                {/* Footer */}
                <div className="mt-6 border-t-2 border-zinc-200 pt-6 text-sm text-[#52525b]">
                    No account yet?{" "}
                    <Link
                        to="/auth/signup"
                        className="font-bold text-[#0a0a0a] transition-colors hover:text-[#71717a] border-b-2 border-[#0a0a0a] hover:border-[#71717a] pb-0.5"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </>
    );
};

export default SignInPage;