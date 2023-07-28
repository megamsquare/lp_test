"use client";

import React from "react";
import styles from "@/app/form.module.css";
import { useRouter } from "next/navigation";

export default function Register() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const registerUserUrl = "http://localhost:3001/api/v1/auth/register";
  
  const router = useRouter();

  const onSubmitRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const registerUser = {
      firstName,
      lastName,
      email,
      username,
      password,
    }

    const res = await fetch(registerUserUrl, {
      method: 'POST',
      body: JSON.stringify(registerUser),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((res) => {
      return res.json()
    }).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    });

    console.log(res);
    router.push('/auth/signIn');
  };

  return (
    <div className={styles.formPage}>
      <div className={styles.formBox}>
        <form onSubmit={onSubmitRegister}>
          <label className={styles.label} htmlFor="firstNameInput">
            First Name
          </label>
          <input
            type="text"
            id="firstNameInput"
            className={styles.input}
            value={firstName}
            placeholder="Enter First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="lastNameInput" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            id="lastNameInput"
            className={styles.input}
            value={lastName}
            placeholder="Enter Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label htmlFor="emailInput" className={styles.label}>
            Email
          </label>
          <input
            type="text"
            id="emailInput"
            className={styles.input}
            value={email}
            placeholder="Enter Enail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="usernameInput" className={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="usernameInput"
            className={styles.input}
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="passwordInput" className={styles.label}>
            Password
          </label>
          <input
            type="pasword"
            id="passwordInput"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
