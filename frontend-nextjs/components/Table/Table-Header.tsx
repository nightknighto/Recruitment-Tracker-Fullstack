import styles from '../../styles/TableHeader.module.css'

export default function TableHeader() {

    return (
        <header className={styles.header}>
            <div className={styles.detailDiv}>
                <div>
                    <h2>Table Title</h2>
                </div>
                <div>
                    <button>File</button>
                    <button>File</button>
                    <button>File</button>
                    <button>File</button>
                    <button>File</button>
                </div>
            </div>
            <div>
                <img src="https://picsum.photos/200" alt="profile img"/>
            </div>
        </header>
    )
}