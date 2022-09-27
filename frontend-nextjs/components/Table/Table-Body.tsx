import React, { useState, useEffect } from 'react'
import styles from '../../styles/TableBody.module.css'
import IRecruitmentData from '../../utils/interfaces/RecruitmentData'
import * as RecruitmentDataAPI from '../../utils/apis/RecruitmentDataAPI'
import NamesAdd from './Names-Add'
import NamesCategories from './Names-Categories'
import NamesSearchbar from './Names-Searchbar'
import PersonDetails from './Person-Details'

export const changeSelectionContext = React.createContext<((targ: IRecruitmentData) => void)>(() => {})

export default function TableBody() {
    const [data, setData] = useState<IRecruitmentData[]>([])
    const [selectedObj, setSelectedObj] = useState<IRecruitmentData | null>(data[1])

    useEffect( () => {
        // self-invoking function
        (async () => {
            const getData = await RecruitmentDataAPI.getAllData()
            setData(getData);
        })()
        
    }, [])

    function changeSelection(target: IRecruitmentData) {
        if(selectedObj !== target) {
            setSelectedObj(target)
        } else {
            setSelectedObj(null)
        }
    }

    return (
        <changeSelectionContext.Provider value={changeSelection}>
            <main className={styles.main}>
                <div className={styles.namesList}>
                    <NamesSearchbar />
                    <NamesCategories data={data} selectedObj={selectedObj}/>
                    <NamesAdd />      
                </div>
                <PersonDetails object={selectedObj} />
            </main>
        </changeSelectionContext.Provider>

    )
}