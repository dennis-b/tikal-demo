import React from "react";
import useFetch from "react-fetch-hook";

import ListingMap from './components/MapComponent'
import { AppLoader, Root } from "../../Components";
import { StHeader } from "./components/styled";
import { Typography } from "@material-ui/core";

export function HomeContainer() {
    // const { isLoading, data } = useFetch("http://localhost:3003/listings");
    const { isLoading, data } = useFetch("https://gentle-anchorage-17471.herokuapp.com/listings");

    
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
