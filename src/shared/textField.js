import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const TextFieldPrimary = styled(TextField)(({ theme }) => ({
    input: { color: theme.palette.primary.main},
    "label": { color:theme.palette.primary.main},
}))