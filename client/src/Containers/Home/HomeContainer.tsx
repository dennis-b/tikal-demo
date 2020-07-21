import React from "react";
import useFetch from "react-fetch-hook";

import ListingMap from './components/MapComponent'
import { AppLoader, Root } from "../../Components";
import { StHeader } from "./components/styled";
import { Typography } from "@material-ui/core";

export function HomeContainer() {
    const { isLoading, data } = useFetch(`${process.env.REACT_APP_BASE_URL}/listings`);

    
    if (isLoading) {
        return <AppLoader />
    }

    const { cityData, listings } = data || {};

    return (
        <Root>
            <StHeader>
                <Typography variant="body1" color={"primary"}>
                    {cityData.name} listings
                </Typography>
            </StHeader>
            <ListingMap
                cityData={cityData}
                listings={listings}
            />
        </Root>
    )

}
