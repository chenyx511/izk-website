import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { assetUrl } from "@/lib/asset";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isAuthenticated, isAdmin, isLoading, isLoggingIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const isGithubPages =
    typeof window !== "undefined" &&
    window.location.hostname.endsWith("github.io");

  useEffect(() => {
    if (!isLoading && isAuthenticated && isAdmin) {
      navigate("/admin");
    }
  }, [isAuthenticated, isAdmin, isLoading, navigate]);

  if (!isLoading && isAuthenticated && isAdmin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(username.trim(), password);
      navigate("/admin");
    } catch {
      setError(t("login.error"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] px-4">
      <motion.div
        className="w-full max-w-sm space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center space-y-4">
          <img src={assetUrl("/images/logo.png")} alt="IZK" className="h-16 w-auto rounded-sm mx-auto" />
          <div>
            <h1 className="text-xl font-bold text-white">{t("login.title")}</h1>
            <p className="text-sm text-gray-500">{t("login.subtitle")}</p>
          </div>
          <div className="flex justify-center">
            <LanguageSwitcher variant="admin" />
          </div>
        </div>

        {isGithubPages && (
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200/90 leading-relaxed">
            GitHub Pages 仅提供静态预览，无法连接登录 API。请使用本地或 Render 等完整部署后再登录管理后台。
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">{t("login.username")}</label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="bg-white/5 border-white/10 text-white h-11"
              autoComplete="username"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">{t("login.password")}</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/5 border-white/10 text-white h-11 pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p
              className="text-sm text-red-400 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <Button
            type="submit"
            disabled={isLoggingIn || !username || !password}
            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoggingIn ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t("login.loggingIn")}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <LogIn className="w-4 h-4" /> {t("login.login")}
              </span>
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
