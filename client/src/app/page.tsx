import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.flex}>
        <Link className={styles.card} href={"/auth/register"}>
          <h2>
            Click Here to Sign Up <span>-&gt;</span>
          </h2>
          <p>This link will let you access the system</p>
        </Link>
        <Link className={styles.card} href={"/auth/signIn"}>
          <h2>
            <span>&lt;-</span> Click Here to Sign In
          </h2>
          <p>You can anly sign inwhen you have sign up on the system</p>
        </Link>
      </div>
    </main>
  );
}
