import { Typography } from "@mui/material";
import { useContext } from "react";
import { changeSelectionContext } from "../../pages/table";
import IRecruitmentData from "../../utils/interfaces/RecruitmentData";

export default function NamesItem({
    object,
    selected,
}: NamesItemProps) {
    const changeSelection = useContext(changeSelectionContext);

    function onClick() {
        changeSelection(object);
    }

    return (
        <Typography
            variant="h6"
            onClick={onClick}
            sx={{
                backgroundColor: selected ? "primary.main" : "transparent",
                color: selected ? "primary.contrastText" : "text.primary",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
            }}
        >
            {object.name}
        </Typography>
    );
}

interface NamesItemProps {
    object: IRecruitmentData;
    selected?: boolean;
}
