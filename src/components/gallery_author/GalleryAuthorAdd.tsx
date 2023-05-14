import {useCallback, useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import {Autocomplete, Button, Card, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {GalleryAuthor} from "../../models/GalleryAuthor";
import {Author} from "../../models/Author";
import {Gallery} from "../../models/Gallery";
import {debounce} from "lodash";


export const GalleryAuthorAdd = () => {
    const navigate = useNavigate();

    const [gallery_author, setGalleryAuthor] = useState<GalleryAuthor>({
        id: 0,
        author: 1,
        gallery: 1,
        starting_exposition: "",
        ending_exposition: "",
        nb_participants: 1,
        invited: 1
    });

	const addGalleryAuthor = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/galleryauthor/`, gallery_author);
            navigate("/galleryauthor");
        }catch (error){
            console.log(error);
        }
    };

    const [authors, setAuthors] = useState<Author[]>([]);
    const [lastGetLocationsCall, setLastGetLocationsCall] = useState<number>(0);

    const fetchSuggestions = async (query: string) => {
        try {
            const currentLastGetAuthorsCall = lastGetLocationsCall;
            setLastGetLocationsCall((prev) => prev + 1);
            console.log("giees");
            console.log(query);
            const response = await axios.get(
                `${BACKEND_API_URL}/author/autocomplete/?query=${query}`
            );
            const data = await response.data;

            if (currentLastGetAuthorsCall === lastGetLocationsCall) setAuthors(data);
        } catch (error) {
            console.log(error);
        }
    };

    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [lastGetGalleriesCall, setLastGetGalleriesCall] = useState<number>(0);

    const fetchSuggestions2 = async (query: string) => {
        try {
            const currentLastGetAuthorsCall = lastGetGalleriesCall;
            setLastGetGalleriesCall((prev) => prev + 1);
            console.log("giees");
            console.log(query);
            const response = await axios.get(
                `${BACKEND_API_URL}/gallery/autocomplete/?query=${query}`
            );
            const data = await response.data;

            if (currentLastGetAuthorsCall === lastGetGalleriesCall) setGalleries(data);
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

    const debouncedFetchSuggestions2 = useCallback(debounce(fetchSuggestions2, 100), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions2.cancel();
        };
    }, [debouncedFetchSuggestions2]);


    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/galleryauthor/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addGalleryAuthor}>
                        <Autocomplete
                            disableClearable={true}
                            options={authors}
                            filterOptions={(x) => x}
                            getOptionLabel={(option) =>
                                option.name + " " + option.date_birth
                            }
                            onInputChange={(e, value) => debouncedFetchSuggestions(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Author" variant="outlined"/>
                            )}
                            onChange={(e, value) => {
                                if (value) {
                                    console.log(value.id);
                                    setGalleryAuthor({...gallery_author, author: value.id});
                                }
                            }}
                            disablePortal
                            className="autocomplete-blend"
                        />

                        <Autocomplete
                            disableClearable={true}
                            options={galleries}
                            filterOptions={(x) => x}
                            getOptionLabel={(option) =>
                                option.name + " " + option.theme
                            }
                            onInputChange={(e, value) => debouncedFetchSuggestions2(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Gallery" variant="outlined"/>
                            )}
                            onChange={(e, value) => {
                                if (value) {
                                    console.log(value.id);
                                    setGalleryAuthor({...gallery_author, gallery: value.id});
                                }
                            }}
                            disablePortal
                            className="autocomplete-blend"
                        />

                        <TextField
                            id="starting_exposition"
                            label="Starting Exposition"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setGalleryAuthor({...gallery_author, starting_exposition: event.target.value})}
                        />

                        <TextField
							id="ending_exposition"
							label="Ending Exposition"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setGalleryAuthor({ ...gallery_author, ending_exposition: event.target.value})}
						/>

                        <TextField
							id="nb_participants"
							label="Number of participants"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setGalleryAuthor({ ...gallery_author, nb_participants: parseInt(event.target.value) })}
						/>

                        <TextField
							id="invited"
							label="Invited"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setGalleryAuthor({ ...gallery_author, invited: parseInt(event.target.value) })}
						/>

                        {/*<Autocomplete*/}
						{/*	id="location_id"*/}
						{/*	options={locations}*/}
						{/*	getOptionLabel={(option) => `${option.city} - ${option.country}`}*/}
						{/*	renderInput={(params) => <TextField {...params} label="Location" variant="outlined" />}*/}
						{/*	filterOptions={(x) => x}*/}
						{/*	onInputChange={handleInputChange}*/}
						{/*	onChange={(event, value) => {*/}
						{/*		if (value) {*/}
						{/*			console.log(value);*/}
						{/*			setGallery({ ...gallery, location_id: value.id });*/}
						{/*		}*/}
						{/*	}}*/}
						{/*/>*/}

                        <Button type="submit">Add Gallery</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )


}