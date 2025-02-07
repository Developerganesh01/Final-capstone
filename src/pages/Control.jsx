
import styles from "./styles/control.module.css";
export default function Control()
{

  return (
    <div className={styles["control-container"]}>
      <div className={styles["control-unit--01"]}>
        <div className={styles["control-switch"]}>
          <input type="checkbox" id="switch-01"/>
          <label htmlFor="switch-01">-</label>
        </div>
      </div>
      <div className={styles["control-unit--02"]}>
        <div className={styles["control-switch"]}>
          <input type="checkbox" id="switch-02"/>
          <label htmlFor="switch-02">-</label>
        </div>
      </div>
      <div className={styles["control-unit--03"]}>
        <div className={styles["control-switch"]}>
          <input type="checkbox" id="switch-03"/>
          <label htmlFor="switch-03">-</label>
        </div>
      </div>
    </div>
  )

}