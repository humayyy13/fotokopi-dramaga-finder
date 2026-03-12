import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSettingUp, setIsSettingUp] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [setupDone, setSetupDone] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
    } else {
      navigate("/admin");
    }
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSettingUp(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-admin", {
        body: { email, password },
      });
      if (error) {
        setError(error.message || "Gagal membuat admin");
      } else if (data?.error) {
        setError(data.error);
      } else {
        setSetupDone(true);
        setShowSetup(false);
        // Auto login
        await login(email, password);
        navigate("/admin");
      }
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan");
    } finally {
      setIsSettingUp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="bg-card rounded-xl p-8 card-shadow w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-3">
            <Lock className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">SIG Fotocopy Dramaga</p>
        </div>

        <form onSubmit={showSetup ? handleSetup : handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block text-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              placeholder="admin@example.com"
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Masukkan password"
                className="w-full pl-3 pr-10 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {error && <p className="text-destructive text-xs mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            disabled={isSettingUp}
            className="w-full bg-primary text-primary-foreground py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {showSetup ? (isSettingUp ? "Membuat admin..." : "Buat Admin & Login") : "Masuk"}
          </button>
        </form>

        {!showSetup && !setupDone && (
          <button
            onClick={() => setShowSetup(true)}
            className="w-full text-xs text-muted-foreground text-center mt-4 hover:text-foreground transition-colors"
          >
            Belum punya akun admin? Setup di sini
          </button>
        )}
        {showSetup && (
          <button
            onClick={() => setShowSetup(false)}
            className="w-full text-xs text-muted-foreground text-center mt-4 hover:text-foreground transition-colors"
          >
            Sudah punya akun? Login di sini
          </button>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
