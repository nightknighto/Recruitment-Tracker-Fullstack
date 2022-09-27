import { useEffect, useState } from 'react'
import styles from '../../styles/Names-Categories.module.css'
import IRecruitmentData from '../../utils/interfaces/RecruitmentData'
import NamesItem from './Names-item'

export default function NamesCategories({ data, selectedObj }: NamesCategoriesProps) {

    return (
        <div>
            <section>
                <h3>Pending</h3>
                {
                    data.map( obj => (
                        <NamesItem object={obj} className={styles.name} selected={selectedObj === obj} />
                    ))
                }
            </section>
            <section>
                <h3>Accepted</h3>
                {/* <NamesItem name='Sami Zayn ▶' className={styles.name} /> */}
            </section>
            <section>
                <h3>Refused</h3>
                {/* <NamesItem name='Thundertaker &rarr;' className={styles.name} /> */}
            </section>  
        </div>
    )
}

interface NamesCategoriesProps {
    data: IRecruitmentData[]
    selectedObj: IRecruitmentData | null
}