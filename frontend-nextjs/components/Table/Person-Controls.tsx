import React, { MouseEventHandler, useEffect, useState } from 'react'
import styles from '../../styles/PersonControls.module.css'

export default function PersonControls() {
    const [open, setOpen] = useState(false)

    useEffect( () => {
        document.body.style.overflow = open? "hidden" : "auto"
    }, [open])

    function toggleControls() {
        setOpen(!open)
    }
    
    function closeModal() {
        setOpen(false)
    }

    const innerModalPreventPropagation: MouseEventHandler = (e) => {
        e.stopPropagation()
    }


    return (
        <>
        <div className={styles.controls} onClick={toggleControls}>
            <img src="https://picsum.photos/200" alt="controls"/>
            controls
        </div>
        { open && 
            <div className={styles.modalBackground} onClick={closeModal}>
                <div className={styles.modal} onClick={innerModalPreventPropagation}>
                    Status
                    <select defaultValue="">
                        <option value="accepted">Accepted</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>
        }
        </>
    )
}