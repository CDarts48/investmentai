'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdAnalytics, MdEmail, MdLock } from "react-icons/md";
import styles from "./logIn.module.css";
import Link from "next/link";

type IconType = "email" | "lock";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: IconType;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = React.memo(
  ({ label, icon, error, autoFocus, ...props }) => {
    const renderIcon = () => {
      switch (icon) {
        case "email":
          return (
            <MdEmail size={20} color="#007AFF" className={styles.inputIcon} />
          );
        case "lock":
          return (
            <MdLock size={20} color="#007AFF" className={styles.inputIcon} />
          );
        default:
          return null;
      }
    };

    return (
      <div className={styles.inputContainer}>
        <label className={styles.inputLabel}>{label}</label>
        <div className={styles.inputWrapper}>
          {renderIcon()}
          <input
            autoFocus={autoFocus}
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            placeholder={props.placeholder}
            {...props}
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default function LoginScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }
  
    setIsLoading(true);
    try {
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      router.push("/");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Login error:", err.message);
        // Optionally, show an error message to your user here.
      } else {
        console.error("An unknown error occurred during login.");
      }
    } finally {
      setIsLoading(false);
    }
  };
    
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <MdAnalytics size={40} color="#007AFF" />
        <h1 className={styles.title}>Login To Your Account</h1>
        <p className={styles.subtitle}>Continue your investment journey</p>
      </header>
      <div className={styles.formContainer}>
        <InputField
          label="Email"
          icon="email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          autoFocus
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={errors.email}
        />
        <InputField
          label="Password"
          icon="lock"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
        />
      </div>
      <button
        onClick={handleLogin}
        className={`${styles.button} ${isLoading ? styles.buttonDisabled : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Logging In..." : "Sign In"}
      </button>
      <div
        className={styles.loginLink}
        onClick={() => router.push("/signUp")}
      >
        <p className={styles.loginText}>
          Don&apos;t have an account?{" "}
          <Link href="/signUp">
            <span className={styles.loginTextBold}>Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
}