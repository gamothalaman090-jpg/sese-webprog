import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
    "mt-1.5 w-full border-2 border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-[#0a0a0a] outline-none transition placeholder:text-zinc-400 focus:border-[#0a0a0a] focus:bg-white";

const SignInPage = () => {
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

            {/* Divider */}
            <div className="w-8 h-0.5 bg-[#0a0a0a] mt-6 mb-8" />

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
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
                    />
                    <p className="mt-1.5 text-[10px] leading-5 text-zinc-400">
                        Minimum 8 characters — letters, numbers, and symbols.
                    </p>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between gap-4 text-sm pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                        <input
                            type="checkbox"
                            className="h-4 w-4 border-2 border-zinc-400 accent-[#0a0a0a] cursor-pointer"
                        />
                        <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#71717a] group-hover:text-[#0a0a0a] transition-colors">
                            Remember me
                        </span>
                    </label>
                    <button
                        type="button"
                        className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#71717a] transition-colors hover:text-[#0a0a0a] cursor-pointer border-b border-transparent hover:border-[#0a0a0a] pb-0.5"
                    >
                        Forgot Password?
                    </button>
                </div>

                {/* Primary CTA */}
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full rounded-none py-3.5 text-[10px] tracking-[0.24em] mt-2"
                >
                    Log In
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