import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, User, Lock, Phone, Calendar, Users, Mail } from "lucide-react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuth();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupDob, setSignupDob] = useState("");
  const [signupGender, setSignupGender] = useState("");
  const [signupMobile, setSignupMobile] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Format mobile number (remove spaces and ensure it's numeric)
  const formatMobileNumber = (value: string) => {
    return value.replace(/\D/g, "").slice(0, 10);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await apiRequest("/api/auth/login", {
        method: "POST",
        auth: false,
        json: { email: loginEmail.trim(), password: loginPassword },
      });

      if (res.ok && (res.data as any)?.success) {
        const token = (res.data as any)?.token || "";
        const user = (res.data as any)?.user || {};
        if (token) setAuth(token, user);
        toast.success((res.data as any)?.message || "Login successful!");
        onOpenChange(false);
        setLoginEmail("");
        setLoginPassword("");
        
        // Redirect based on role
        setTimeout(() => {
          const userRole = user?.app_role || user?.role || "customer";
          if (userRole === "admin") {
            window.location.href = "/admin";
          } else if (userRole === "worker") {
            window.location.href = "/worker/dashboard";
          } else {
            window.location.href = "/account";
          }
        }, 100);
      } else {
        const data = (res as any).ok ? (res as any).data : (res as any).data;
        toast.error(data?.message || data?.error || "Login failed.");
      }
    } catch (error: any) {
      console.error("Login error details:", error);
      
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        toast.error("Cannot connect to server. Please try again later.");
      } else {
        const errorMessage = error.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!signupName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    if (!signupEmail.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!signupDob) {
      toast.error("Please select your date of birth");
      return;
    }
    if (!signupGender) {
      toast.error("Please select your gender");
      return;
    }
    if (!signupMobile || signupMobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!signupPassword || signupPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    
    // Starting signup request...

    // Validate gender format (convert to proper case)
    const formatGender = (gender: string) => {
      if (!gender) return "";
      const lower = gender.toLowerCase();
      if (lower === "male") return "Male";
      if (lower === "female") return "Female";
      if (lower === "other") return "Other";
      return gender; // Return as-is if already formatted
    };

    try {
      const requestBody = {
        name: signupName.trim(),
        email: signupEmail.trim(),
        dob: signupDob,
        gender: formatGender(signupGender),
        mobileno: signupMobile,
        password: signupPassword,
      };

      const res = await apiRequest("/api/auth/signup", { method: "POST", auth: false, json: requestBody });

      if (res.ok && (res.data as any)?.success) {
        const token = (res.data as any)?.token || "";
        const user = (res.data as any)?.user || {};
        if (token) setAuth(token, user);
        toast.success((res.data as any)?.message || "Account created successfully!");
        setIsLogin(true);
        setLoginEmail(signupEmail.trim());
        setSignupName("");
        setSignupEmail("");
        setSignupDob("");
        setSignupGender("");
        setSignupMobile("");
        setSignupPassword("");
      } else {
        const data = (res as any).ok ? (res as any).data : (res as any).data;
        toast.error(data?.message || data?.error || "Signup failed.");
      }
    } catch (error: any) {
      console.error("Signup error details:", error);
      
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        toast.error("Cannot connect to server. Please try again later.");
      } else {
        const errorMessage = error.message || "An error occurred. Please try again.";
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    // Reset forms when switching
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupDob("");
    setSignupGender("");
    setSignupMobile("");
    setSignupPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border animate-scale-in">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl font-bold text-center text-foreground animate-fade-in">
            {isLogin ? "Welcome Back" : "Create Account"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground animate-fade-in">
            {isLogin
              ? "Sign in to your account to continue"
              : "Join BRIMSTONE and start your natural beauty journey"}
          </DialogDescription>
        </DialogHeader>

        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4 animate-fade-in-up">
            <div className="space-y-2">
              <Label htmlFor="login-email" className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="login-email"
                type="email"
                placeholder="Enter your email address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="bg-background border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password" className="text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="bg-background border-input"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={switchMode}
                className="text-primary hover:underline font-medium"
              >
                Sign Up
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4 animate-fade-in-up">
            <div className="space-y-2">
              <Label htmlFor="signup-name" className="text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                Full Name
              </Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="Enter your full name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                className="bg-background border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                Email Address
              </Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="Enter your email address"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                className="bg-background border-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="signup-dob" className="text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Date of Birth
                </Label>
                <Input
                  id="signup-dob"
                  type="date"
                  value={signupDob}
                  onChange={(e) => setSignupDob(e.target.value)}
                  required
                  className="bg-background border-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-gender" className="text-foreground flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Gender
                </Label>
                <Select value={signupGender} onValueChange={setSignupGender} required>
                  <SelectTrigger className="bg-background border-input">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-mobile" className="text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                Mobile Number
              </Label>
              <Input
                id="signup-mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={signupMobile}
                onChange={(e) => setSignupMobile(formatMobileNumber(e.target.value))}
                required
                minLength={10}
                maxLength={10}
                className="bg-background border-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-foreground flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </Label>
              <Input
                id="signup-password"
                type="password"
                placeholder="Create a password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                minLength={6}
                className="bg-background border-input"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                type="button"
                onClick={switchMode}
                className="text-primary hover:underline font-medium"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
