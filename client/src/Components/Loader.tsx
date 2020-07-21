import React from "react";
import { Root } from "./styled";
import { CircularProgress } from "@material-ui/core";

export function AppLoader() {
    return (
        <Root justify="center" align="center">
            <CircularProgress />
        </Root>
    )
}
