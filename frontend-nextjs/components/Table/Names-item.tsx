import { useContext } from "react"
import IRecruitmentData from "../../utils/interfaces/RecruitmentData"
import { changeSelectionContext } from "./Table-Body"

export default function NamesItem({ object, className, selected }: NamesItemProps) {

    const changeSelection = useContext(changeSelectionContext)

    function onClick() {
        changeSelection(object)
    }

    return (
        <p {...{className}} style={selected? {color: 'red'} : {}} onClick={onClick}>{object.name}</p>
    )
}

interface NamesItemProps {
    object: IRecruitmentData,
    className: string,
    selected?: boolean
}