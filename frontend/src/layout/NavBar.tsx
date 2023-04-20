import styles from "./NavBar.module.css"
import logo from "../img/Deezer_Logo_RVB_White.svg"

function NavBar() {
  return (
    <nav>
      <div className={styles.logo}>
        <img src={logo} alt="Deezer Logo" />
      </div>
      <div className={styles.login}>
        <button>Login</button>
      </div>
    </nav>
  );
}

export default NavBar;
