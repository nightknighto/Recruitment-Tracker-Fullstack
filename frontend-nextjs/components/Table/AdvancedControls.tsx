import { Box, Button, TextareaAutosize, Tooltip, Typography } from "@mui/material"
import { useContext, useEffect, useRef, useState } from "react"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { getUserRole } from "../../utils/services/auth";
import { DataContext } from "../../pages/_app";
import RecruitmentDataAPI from "../../utils/apis/RecruitmentDataAPI";

const massEmailPlaceholder = `email1@yahoo.com
email2@yahoo.com
email3@yahoo.com`

export default function AdvancedControls() {
    const [massEmailsOpen, setMassEmailsOpen] = useState<boolean>(false)
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [role, setRole] = useState<string>('basic')
    const { data, changeData } = useContext(DataContext)

    useEffect( () => {
        setRole(getUserRole() || 'basic')
    }, [])


    const handleMassEmailsOpen = () => {
        setMassEmailsOpen(true)
    }

    const handleMassEmailsClose = () => {
        setMassEmailsOpen(false)
    }
    
    const handleMassEmailsSubmit = () => {
        if(!data || !textAreaRef.current) return;

        const emails = textAreaRef.current.value.split('\n').map(email => email.trim())
        const matchedEmails = emails.filter(email => data.find(person => person.email.toLowerCase() === email.toLowerCase() && person.status === 'pending'))
        const matchedIds = matchedEmails.map(email => data.find(person => person.email.toLowerCase() === email.toLowerCase())?._id || '')
        // TODO: give feedback about the number of matched emails
        // TODO: add error handler

        RecruitmentDataAPI.setMultipleStatuses(matchedIds, 'emailed')

        const newData = [...data]
        matchedIds.forEach(_id => {
            const item = newData.find((item) => item._id === _id)

            if(item) {
                item.status = 'emailed'
            }
        })
        changeData(newData)

        handleMassEmailsClose()

    }

    return (
        <div>
            <Typography component="h3" variant="h5" color="primary.dark">Advanced</Typography>
            <Box paddingTop={2}>
                <Tooltip title="Quickly sets multiple people from Pending to Emailed status." arrow>
                    <span>
                        <Button variant="contained" onClick={handleMassEmailsOpen} disabled={role === 'basic'}>Mass Emails</Button>
                    </span>
                </Tooltip>
            </Box>
            <div>
                <Dialog open={massEmailsOpen} onClose={handleMassEmailsClose}>
                    <DialogTitle>Mass Emails</DialogTitle>
                    <DialogContent>
                        <DialogContentText gutterBottom variant="body1">
                            If you have sent emails to multiple people, you can quickly set their status to Emailed by just using their email addresses instead of manually setting each person&apos;s status.
                            Their Status must be Pending though!
                        </DialogContentText>
                        <Typography>
                            Put the email addresses of the people you&apos;ve emailed below, 1 per line. The status of each person will change from Pending to Emailed.
                        </Typography>
                        <Box paddingTop={2}>
                            <TextareaAutosize 
                                ref={textAreaRef}
                                maxRows={10}
                                aria-label="maximum height"
                                placeholder={massEmailPlaceholder}
                                style={{ width: "100%" }}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleMassEmailsClose}>Cancel</Button>
                        <Button onClick={handleMassEmailsSubmit}>Confirm</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div> 
    )
}