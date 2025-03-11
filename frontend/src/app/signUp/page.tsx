import React, { useState } from "react";
import { useRouter } from "next/router";
import { MdAnalytics, MdPerson, MdEmail, MdLock } from "react-icons/md";
import { toast } from "sonner-native";
import styles from "./page.module.css";

export default function SignupScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};

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

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Account created successfully!");
      router.push("/"); // navigate to home page (adjust as needed)
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // InputField component using HTML
  const InputField = ({
    label,
    icon,
    error,
    ...props
  }: {
    label: string;
    icon: "person" | "email" | "lock" | "lock-outline";
    error?: string;
    [x: string]: any;
  }) => {
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
        <div className={styles.inputWrapper}>
          {renderIcon()}
          <input
            className={`${styles.input} ${error ? styles.inputError : ""}`}
            placeholder={props.placeholder}
            {...props}
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
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
      <form className={styles.form} onSubmit={handleSignup}>
        <InputField
          label="Full Name"
          icon="person"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={(errors as any).fullName}
        />

        <InputField
          label="Email"
          icon="email"
          placeholder="Enter your email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={(errors as any).email}
        />

        <InputField
          label="Password"
          icon="lock"
          placeholder="Create a password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={(errors as any).password}
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
          error={(errors as any).confirmPassword}
        />

        <button
          type="submit"
          className={`${styles.button} ${isLoading ? styles.buttonDisabled : ""}`}
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
      <div className={styles.loginLink} onClick={() => router.push("/login")}>
        <p className={styles.loginText}>
          Already have an account? <span className={styles.loginTextBold}>Log In</span>
        </p>
      </div>
    </div>
  );
}