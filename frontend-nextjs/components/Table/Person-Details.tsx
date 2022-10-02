import Image from 'next/image';
import styles from '../../styles/TableBody.module.css'
import IRecruitmentData from '../../utils/interfaces/RecruitmentData'
import PersonControls from './Person-Controls';

export default function PersonDetails({ object }: PersonDetailsProps) {

    if(!object) return null;

    const {
        _id,
        collegeID,
        status,
        submissionTime,
        email,
        knowledge,
        name,
        otherStudentActivites,
        otherTrackInterest,
        phone,
        track,
        trackReason,
        year,
        otherTrackInterestReason
    } = object

    return (
        <div className={styles.description}>
            <header>
                <div>
                    <h2>{name}</h2>
                    <h3>Track: {track}. Status: {status}</h3>
                </div>
                <PersonControls />
            </header>
            <div>
                <div className={styles.twoItemsContainer}>
                    <section className={styles.twoItems}>
                        <div>
                            <p>Email: {email}</p>
                            <p>Phone: {phone}</p>
                        </div>
                        <div>
                            <p>Year: {year}</p>
                            <p>Submission Date: {submissionTime}</p>
                        </div>
                    </section>
                </div>
                <section>
                    <h3>Knowledge</h3>
                    <p>{knowledge}</p>
                    <h3>Reason for choosing the track</h3>
                    <p>{trackReason}</p>
                    { otherTrackInterest && 
                        (<>
                            <h3>Other track interested in</h3>
                            <p>{otherTrackInterest}</p>
                        </>)
                    }
                    { otherTrackInterestReason && 
                        (<>
                            <h3>Reason for the other track</h3>
                            <p>{otherTrackInterestReason}</p>
                        </>)
                    }
                    <h3>Previous student activities history</h3>
                    <p>{otherStudentActivites}</p>
                </section>
            </div>
        </div>

    )
}

interface PersonDetailsProps {
    object: IRecruitmentData | null
}