"use client";
import React, { useEffect, useState } from "react";
import styles from "@/app/dashboard.module.css";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isEditable, setIsEditable] = useState(false);
  
  const { data: session } = useSession()

  const handleEdit = () => {
    setIsEditable(!isEditable);
  };

  const getUserUrl = "http://localhost:3001/api/v1/user/getById"
  const updateUserUrl = "http://localhost:3001/api/v1/user/updateUser"


  const onSubmitUpdate =async () => {
    const updateInfo = {
      firstName,
      lastName,
      email,
      username
    }

    const res = await fetch(updateUserUrl+`/${session?.user.id}`, {
      method: 'POST',
      body: JSON.stringify(updateInfo),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.user.accessToken}`
      })
    }).then((res) => {
      return res.json()
    }).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    })

    console.log(res);
    handleEdit();
  }

  useEffect(() => {
    if (session?.user.id) {
      const userId = session.user.id
      const getLoginUserDetails = async (user: string) => {
        await fetch(getUserUrl+`/${user}`, {
          method:"GET",
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.user.accessToken}`
          })
        }).then((res) => {
          return res.json()
        }).then((resp) => {
          setFirstName(resp.data.firstName)
          setLastName(resp.data.lastName)
          setEmail(resp.data.email)
          setUsername(resp.data.username)
        }).catch((err) => {
          console.error(err)
        })
      }

      getLoginUserDetails(userId)
    }
  }, [session?.user.accessToken, session?.user.id])

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard_row}>
        <div className={styles.dashboard_item}>
          <p className={styles.dashboard_title}>First name</p>
          {!isEditable ? (
            <p className={styles.dashboard_subtitle}>{firstName}</p>
          ) : (
            <input
              type="text"
              id="firstNameInput"
              className={styles.input}
              value={firstName}
              placeholder="Enter First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          )}
        </div>
        <div className={styles.dashboard_item}>
          <p className={styles.dashboard_title}>Last name</p>
          {!isEditable ? (
            <p className={styles.dashboard_subtitle}>{lastName}</p>
          ) : (
            <input
              type="text"
              id="lastNameInput"
              className={styles.input}
              value={lastName}
              placeholder="Enter Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className={styles.dashboard_row}>
        <div className={styles.dashboard_item}>
          <p className={styles.dashboard_title}>Email</p>
          {!isEditable ? (
            <p className={styles.dashboard_subtitle}>{email}</p>
          ) : (
            <input
              type="text"
              id="emailInput"
              className={styles.input}
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className={styles.dashboard_row}>
        <div className={styles.dashboard_item}>
          <p className={styles.dashboard_title}>Username</p>
          {!isEditable ? (
            <p className={styles.dashboard_subtitle}>{username}</p>
          ) : (
            <input
              type="text"
              id="usernameInput"
              className={styles.input}
              value={username}
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className={styles.dashboard_row}>
        {!isEditable ? (<div className={styles.dashboard_button} onClick={handleEdit}>
          Edit
        </div>) : (
          <div className={styles.dashboard_button} onClick={onSubmitUpdate}>
          Save
        </div>
        )}
        {/* <div className={styles.dashboard_button} onClick={handleEdit}>
          {!isEditable ? "Edit" : "Save"}
        </div> */}
      </div>
    </div>
  );
}
