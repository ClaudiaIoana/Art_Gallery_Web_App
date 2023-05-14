import {useCallback, useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import {Autocomplete, Button, Card, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Gallery} from "../../models/Gallery";
import {debounce} from "lodash";
import {Location} from "../../models/Location";


export const GalleryAdd = () => {
    const navigate = useNavigate();

    const [gallery, setGallery] = useState<Gallery>({
        id: 0,
        name: "",
        theme: "",
        street: "",
        capacity: 0,
        location_id: 1,
        location: 1
    });

    const [locations, setLocations] = useState<Location[]>([]);
    const [lastGetLocationsCall, setLastGetLocationsCall] = useState<number>(0);

    const fetchSuggestions = async (query: string) => {
        try {
            const currentLastGetAuthorsCall = lastGetLocationsCall;
            setLastGetLocationsCall((prev) => prev + 1);
            console.log("giees");
            console.log(query);
            console.log(gallery);
            const response = await axios.get(
                `${BACKEND_API_URL}/locations/autocomplete/?query=${query}`
            );
            const data = await response.data;

            if (currentLastGetAuthorsCall === lastGetLocationsCall) setLocations(data);
        } catch (error) {
            console.log(error);
        }
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 100), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };

    const addGallery = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.post(`${BACKEND_API_URL}/gallery/`, gallery);
            navigate("/gallery");
            console.log(gallery);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/gallery/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addGallery}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGallery({...gallery, name: event.target.value})}
                        />
                        <TextField
                            id="theme"
                            label="Theme"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGallery({...gallery, theme: event.target.value})}
                        />

                        <TextField
                            id="street"
                            label="Street"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGallery({...gallery, street: event.target.value})}
                        />

                        <TextField
                            id="capacity"
                            label="Capacity"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGallery({...gallery, capacity: parseInt(event.target.value)})}
                        />

                        {/*<TextField*/}
                        {/*	id="location"*/}
                        {/*	label="Location"*/}
                        {/*	variant="outlined"*/}
                        {/*	fullWidth*/}
                        {/*	sx={{ mb: 2 }}*/}
                        {/*	onChange={(event) => setGallery({ ...gallery, location: parseInt(event.target.value) })}*/}
                        {/*/>*/}


                        <Autocomplete
                            disableClearable={true}
                            options={locations}
                            filterOptions={(x) => x}
                            getOptionLabel={(option) =>
                                option.city + " " + option.country
                            }
                            onInputChange={(e, value) => debouncedFetchSuggestions(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Location" variant="outlined"/>
                            )}
                            onChange={(e, value) => {
                                if (value) {
                                    console.log(value.id);
                                    setGallery({...gallery, location: value.id});
                                }
                            }}
                            disablePortal
                            className="autocomplete-blend"
                        />

                        <Button type="submit">Add Gallery</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )


}