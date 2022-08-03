import { Typography } from "@mui/material";
import { styled } from "@mui/system";

export const HeadingPrimary = styled(Typography)(({theme})=>({
    color: theme.palette.primary.main
}))