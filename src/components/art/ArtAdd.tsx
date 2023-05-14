import {useCallback, useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import {Autocomplete, Button, Card, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {debounce} from "lodash";
import {Art} from "../../models/Art";
import {Location} from "../../models/Location";
import {Author} from "../../models/Author";
import {Gallery} from "../../models/Gallery";


export const ArtAdd = () => {
    const navigate = useNavigate();

    const [art, setArt] = useState<Art>({
        id: 0,
        title: "",
        author: 1,
        year: 0,
        type: "",
        material: "",
        gallery: 1,
    });

	const addArt = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/art/`, art);
            navigate("/art");
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
                    <IconButton component={Link} sx={{mr: 3}} to={`/art/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addArt}>
                        <TextField
                            id="title"
                            label="Title"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setArt({...art, title: event.target.value})}
                        />

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
                                    setArt({...art, author: value.id});
                                }
                            }}
                            disablePortal
                            className="autocomplete-blend"
                        />

                        <TextField
                            id="year"
                            label="Year"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setArt({...art, year: parseInt(event.target.value)})}
                        />

                        <TextField
							id="type"
							label="Type"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setArt({ ...art, type: event.target.value})}
						/>

                        <TextField
							id="material"
							label="Material"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setArt({ ...art, material: event.target.value })}
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
                                    setArt({...art, gallery: value.id});
                                }
                            }}
                            disablePortal
                            className="autocomplete-blend"
                        />

                        <Button type="submit">Add Art</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )


}