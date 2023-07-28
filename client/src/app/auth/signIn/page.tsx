"use client";

import React, { useState } from "react";
import styles from "@/app/form.module.css";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await signIn("credentials", {
      username,
      password,
      redirect: true,
      callbackUrl: "/dashboard",
    });
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.formBox}>
        <form onSubmit={onSubmitLogin}>
          <label htmlFor="emailInput" className={styles.label}>
            Email
          </label>
          <input
            type="text"
            id="emailInput"
            className={styles.input}
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="passwordInput" className={styles.label}>
            Password:
          </label>
          <input
            type="password"
            className={styles.input}
            value={password}
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In!</button>
        </form>
      </div>
    </div>
  );
}
