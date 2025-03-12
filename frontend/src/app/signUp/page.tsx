'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdAnalytics, MdPerson, MdEmail, MdLock } from "react-icons/md";
import styles from "./signUp.module.css";
import Link from "next/link";

type IconType = "person" | "email" | "lock" | "lock-outline";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: IconType;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = React.memo(
  ({ label, icon, error, autoFocus, ...props }) => {
    const renderIcon = () => {
      switch (icon) {
        case "person":
          return <MdPerson size={20} color="#007AFF" className={styles.inputIcon} />;
        case "email":
          return <MdEmail size={20} color="#007AFF" className={styles.inputIcon} />;
        case "lock":
        case "lock-outline":
          return <MdLock size={20} color="#007AFF" className={styles.inputIcon} />;
        default:
          return null;
      }
    };

    return (
      <div className={styles.inputContainer}>
        {/* Render the label so that it's used */}
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

export default function SignupScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise<void>((resolve) => setTimeout(resolve, 1500));
      router.push("/"); // navigate to home page (adjust as needed)
    } catch {
      // Optionally, show an error message to your user here.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <MdAnalytics size={40} color="#007AFF" />
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>
          Join InvestmentAI and start your investment journey
        </p>
      </header>
      {/* Using a div instead of a form */}
      <div className={styles.formContainer}>
        <InputField
          label="Full Name"
          icon="person"
          placeholder="Enter your full name"
          value={formData.fullName}
          autoFocus={true}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          error={errors.fullName}
        />

        <InputField
          label="Email"
          icon="email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          error={errors.email}
        />

        <InputField
          label="Password"
          icon="lock"
          placeholder="Create a password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          icon="lock-outline"
          placeholder="Confirm your password"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          error={errors.confirmPassword}
        />
      </div>
      <button
        onClick={handleSignup}
        className={`${styles.button} ${isLoading ? styles.buttonDisabled : ""}`}
        disabled={isLoading}
      >
        {isLoading ? "Creating Account..." : "Sign Up"}
      </button>
      <div className={styles.loginLink} onClick={() => router.push("/logIn")}>
        <p className={styles.loginText}>
          Already have an account?{" "}
          <Link href="/logIn">
            <span className={styles.loginTextBold}>Log In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}