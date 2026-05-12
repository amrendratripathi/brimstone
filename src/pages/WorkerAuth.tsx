/**
 * Worker Auth Pages — Login & Signup for the referral portal.
 * Uses Supabase Auth directly.
 */

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Zap } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

function AuthInput({
  label, type = "text", value, onChange, placeholder, required,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string; required?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isPass = type === "password";
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-white/70">{label}{required && <span className="text-violet-400 ml-0.5">*</span>}</label>
      <div className="relative">
        <input
          type={isPass && show ? "text" : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all text-sm"
        />
        {isPass && (
          <button type="button" onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

export function WorkerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Please fill all fields"); return; }
    setLoading(true);

    const res = await apiRequest("/api/auth/login", {
      method: "POST", auth: false, json: { email, password }
    });
    setLoading(false);

    if (res.ok && (res.data as any)?.success) {
      const data = res.data as any;
      setAuth(data.token, data.user);
      toast.success("Welcome back!");
      const role = data.user?.app_role || data.user?.role;
      if (role === "admin") navigate("/admin/referral");
      else if (role === "worker") navigate("/worker/dashboard");
      else {
        toast.error("You do not have worker access yet. Please contact an admin.");
        navigate("/account");
      }
    } else {
      toast.error((res.data as any)?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-[#070711] flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-fuchsia-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-4 shadow-lg shadow-violet-500/30">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Referral Portal</h1>
          <p className="text-white/50 text-sm mt-1">Sign in to your worker account</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <AuthInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
            <AuthInput label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />

            <button type="submit" disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Don't have an account?{" "}
            <Link to="/worker/signup" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Request access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function WorkerSignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { toast.error("Please fill all required fields"); return; }
    if (password !== confirm) { toast.error("Passwords do not match"); return; }
    if (password.length < 6) { toast.error("Password must be at least 6 characters"); return; }

    setLoading(true);
    // Uses the main auth API, creates a customer account. An admin must elevate it to a worker.
    const res = await apiRequest("/api/auth/signup", {
      method: "POST", auth: false, json: { name, email, password, mobileno: phone || "0000000000", dob: "2000-01-01", gender: "Other" }
    });
    setLoading(false);

    if (res.ok && (res.data as any)?.success) {
      toast.success("Account created! Contact an admin to activate your worker status.");
      navigate("/worker/login");
    } else {
      toast.error((res.data as any)?.message || "Failed to create account");
    }
  };

  return (
    <div className="min-h-screen bg-[#070711] flex items-center justify-center p-4">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-fuchsia-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 mb-4 shadow-lg shadow-violet-500/30">
            <Zap className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Join as Worker</h1>
          <p className="text-white/50 text-sm mt-1">Create your referral account</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <AuthInput label="Full Name" value={name} onChange={setName} placeholder="Jane Doe" required />
            <AuthInput label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" required />
            <AuthInput label="Phone (optional)" value={phone} onChange={setPhone} placeholder="+91 98765 43210" />
            <AuthInput label="Password" type="password" value={password} onChange={setPassword} placeholder="Min 8 characters" required />
            <AuthInput label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="Re-enter password" required />

            <button type="submit" disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-violet-500/25 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-white/40 mt-6">
            Already have an account?{" "}
            <Link to="/worker/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
