import styles from '../../styles/TableBody.module.css'
import NamesAdd from './Names-Add'
import NamesCategories from './Names-Categories'
import NamesSearchbar from './Names-Searchbar'

export default function TableBody() {

    return (
        <main className={styles.main}>
            <div className={styles.namesList}>
                <NamesSearchbar />
                <NamesCategories />
                <NamesAdd />      
            </div>
            <div className={styles.description}>
                <header>
                    <div>
                        <h2>Thundertaker</h2>
                        <h3>Track: Web. Status: Pending</h3>
                    </div>
                    <div className={styles.controls}>
                        <img src="https://picsum.photos/200" alt="controls"/>
                        controls
                    </div>
                </header>
                <div>
                    <div className={styles.twoItemsContainer}>
                        <section className={styles.twoItems}>
                            <div>
                                <p>Email: thunder@taker.com</p>
                                <p>Phone: 011111111111</p>
                            </div>
                            <div>
                                <p>Year: 5th</p>
                                <p>Submission Date: 25/9/2022</p>
                            </div>
                        </section>
                    </div>
                    <section>
                        <h3>Experience</h3>
                        <p>dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque</p>
                        <h3>Interests</h3>
                        <p>dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque</p>
                        <h3>Notes</h3>
                        <p>dolor sit amet et delectus accommodare his consul copiosae legendos at vix ad putent delectus delicata usu. Vidit dissentiet eos cu eum an brute copiosae hendrerit. Eos erant dolorum an. Per facer affert ut. Mei iisque</p>
                    </section>
                </div>
            </div>
        </main>

    )
}