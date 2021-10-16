import Nav from "./HNav"
import styles from '../styles/Layout.module.css'
import Particles from '../comp/P2Particles'

const Layout = ({ children }: { children: any }) => {
  return (
    <div className={styles.container}>
      <div className={styles.pbackground}>
        <Particles />
      </div>
      <main className={styles.main}>{children}</main>
      <div> <br /> <br /> <br /> </div>
    </div>
  )
}

export default Layout