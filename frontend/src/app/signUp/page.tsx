'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdAnalytics, MdPerson, MdEmail, MdLock } from "react-icons/md";
import styles from "./signUp.module.css";
import Link from "next/link";
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
            <MdPerson
              size={20}
              color="#007AFF"
              className={styles.inputIcon}
            />
          );
        case "email":
          return (
            <MdEmail
              size={20}
              color="#007AFF"
              className={styles.inputIcon}
            />
          );
        case "lock":
        case "lock-outline":
          return (
            <MdLock
              size={20}
              color="#007AFF"
              className={styles.inputIcon}
            />
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
  // With Auth0, you generally use Universal Login so the form state doesn’t get sent to your local API.
  // However, if you want to collect some extra fields you can do so and pass them as query parameters.
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    userName: "",
    password: "",
    reenterPassword: "",
    // Password fields can be omitted if you want Auth0 to manage them.
    // If you collect them, be sure to send them securely.
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }
    try {
      // Redirect to Auth0 Universal Login with the "signup" screen hint.
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
          label="Username"
          icon="person"
          placeholder="Enter your username"
          value={formData.userName}
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
          error={errors.userName} 
        /><InputField
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
        onChange={(e) => setFormData({ ...formData, reenterPassword: e.target.value })}
        error={errors.reenterPassword}
      />
      </div>
      <button
        onClick={handleSignup}
        className={styles.button}
      >
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