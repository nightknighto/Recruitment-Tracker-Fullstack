import { useEffect, useState } from 'react'
import styles from '../../styles/Names-Categories.module.css'
import IRecruitmentData from '../../utils/interfaces/RecruitmentData'
import NamesItem from './Names-item'

export default function NamesCategories({ data, selectedObj }: NamesCategoriesProps) {

    const pendingApps = data.filter( app => app.status === "pending")
    const acceptedApps = data.filter( app => app.status === "accepted")
    const rejectedApps = data.filter( app => app.status === "rejected")

    return (
        <div>
            <section>
                { pendingApps.length > 0 && 
                    <>
                        <h3>Pending</h3>
                        {
                            pendingApps.map( obj => (
                                <NamesItem object={obj} className={styles.name} selected={selectedObj === obj} key={obj._id}/>
                            ))
                        }
                    </>
                }
            </section>
            <section>
                { acceptedApps.length > 0 && 
                    <>
                        <h3>Accepted</h3>
                        {/* <NamesItem name='Sami Zayn ▶' className={styles.name} /> */}
                        {
                            acceptedApps.map( obj => (
                                <NamesItem object={obj} className={styles.name} selected={selectedObj === obj} key={obj._id}/>
                            ))
                        }
                    </>
                }
            </section>
            <section>
                { rejectedApps.length > 0 && 
                    <>
                        <h3>Rejected</h3>
                {/* <NamesItem name='Thundertaker &rarr;' className={styles.name} /> */}
                        {
                            rejectedApps.map( obj => (
                                <NamesItem object={obj} className={styles.name} selected={selectedObj === obj} key={obj._id}/>
                            ))
                        }
                    </>
                }
            </section>
        </div>
    )
}

interface NamesCategoriesProps {
    data: IRecruitmentData[]
    selectedObj: IRecruitmentData | null
}