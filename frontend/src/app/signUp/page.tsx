'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdAnalytics, MdPerson, MdEmail, MdLock } from "react-icons/md";
import styles from "./signUp.module.css";
import Link from "next/link";
// Use the core Auth0 export so you can redirect to the Universal Login page.
import { loginWithRedirect } from "@auth0/nextjs-auth0";

type IconType = "person" | "email" | "lock" | "lock-outline";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: IconType;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = React.memo(
  ({ label, icon, error, autoFocus, ...props }) => {
    const renderIcon = () => {
      switch (icon) {
        case "person":
          return (
            <MdPerson size={20} color="#007AFF" className={styles.inputIcon} />
          );
        case "email":
          return (
            <MdEmail size={20} color="#007AFF" className={styles.inputIcon} />
          );
        case "lock":
        case "lock-outline":
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

export default function SignupScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    userName: "",
    password: "",
    reenterPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.Name.trim()) {
      newErrors.Name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.userName.trim()) {
      newErrors.userName = "Username is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    if (!formData.reenterPassword) {
      newErrors.reenterPassword = "Re-enter password is required";
    }
    if (
      formData.password &&
      formData.reenterPassword &&
      formData.password !== formData.reenterPassword
    ) {
      newErrors.reenterPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      // Redirect to Auth0's Universal Login with the "signup" screen hint.
      router.push("/api/auth/login?screen_hint=signup");
    } catch (error) {
      console.error("Auth0 signup failed:", error);
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
      <div className={styles.formContainer}>
        <InputField
          label="Name"
          icon="person"
          placeholder="Enter your name"
          value={formData.Name}
          onChange={(e) =>
            setFormData({ ...formData, Name: e.target.value })
          }
          error={errors.Name}
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
          label="Username"
          icon="person"
          placeholder="Enter your username"
          value={formData.userName}
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
          error={errors.userName}
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
        <InputField
          label="Re-enter Password"
          icon="lock"
          placeholder="Re-enter your password"
          type="password"
          value={formData.reenterPassword}
          onChange={(e) =>
            setFormData({ ...formData, reenterPassword: e.target.value })
          }
          error={errors.reenterPassword}
        />
      </div>
      <button onClick={handleSignup} className={styles.button}>
        Sign Up with Auth0
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