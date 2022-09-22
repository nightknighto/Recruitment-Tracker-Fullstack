import styles from '../../styles/Names-Categories.module.css'
import NamesItem from './Names-item'

export default function NamesCategories() {

    return (
        <div>
            <section>
                <h3>Pending</h3>
                <NamesItem name='Mohamed Alaa &rarr;' className={styles.name} />
            </section>
            <section>
                <h3>Accepted</h3>
                <NamesItem name='Sami Zayn ▶' className={styles.name} />
            </section>
            <section>
                <h3>Refused</h3>
                <NamesItem name='Thundertaker' className={styles.name} />
            </section>  
        </div>
    )
}