import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import {GalleryAuthor} from "../../models/GalleryAuthor";


export const GalleryAuthorEdit = () => {
    const { galleryauthorId } = useParams();
    const navigate = useNavigate();

    const [galleryauthor, setGalleryAuthor] = useState<GalleryAuthor>({
        id: 0,
        author: 1,
        gallery: 1,
        starting_exposition: "",
        ending_exposition: "",
        nb_participants: 0,
        invited: 0,
    });

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/galleryauthor/${galleryauthorId}/`)
            .then((response) => {
                setGalleryAuthor(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const updateGallery = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(galleryauthor.author)
        try {
            await axios.put(`${BACKEND_API_URL}/galleryauthor/${galleryauthorId}/`, galleryauthor);
            navigate("/galleryauthor/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/galleryauthor/");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/galleryauthor/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateGallery} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        {/*<Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>*/}
                        {/*    <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>*/}
                        {/*        Author**/}
                        {/*    </FormLabel>*/}
                        {/*    <TextField*/}
                        {/*        id="author"*/}
                        {/*        variant="outlined"*/}
                        {/*        onChange={(event) => setGalleryAuthor({ ...galleryauthor, author: parseInt(event.target.value) })}*/}
                        {/*    />*/}
                        {/*</Container>*/}

                        {/*<Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>*/}
                        {/*    <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>*/}
                        {/*        Gallery**/}
                        {/*    </FormLabel>*/}
                        {/*    <TextField*/}
                        {/*        id="gallery"*/}
                        {/*        variant="outlined"*/}
                        {/*        onChange={(event) => setGalleryAuthor({ ...galleryauthor, gallery: parseInt(event.target.value) })}*/}
                        {/*    />*/}
                        {/*</Container>*/}

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Starting exposition
                            </FormLabel>
                            <TextField
                                id="starting_exposition"
                                label={galleryauthor.starting_exposition}
                                defaultValue={galleryauthor.starting_exposition}
                                variant="outlined"
                                onChange={(event) => setGalleryAuthor({ ...galleryauthor, starting_exposition: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Ending exposition
                            </FormLabel>
                            <TextField
                                id="ending_exposition"
                                label={galleryauthor.ending_exposition}
                                defaultValue={galleryauthor.ending_exposition}
                                variant="outlined"
                                onChange={(event) => setGalleryAuthor({ ...galleryauthor, ending_exposition: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Number of participants
                            </FormLabel>
                            <TextField
                                id="nb_participants"
                                label={galleryauthor.nb_participants}
                                defaultValue={galleryauthor.nb_participants}
                                variant="outlined"
                                onChange={(event) => setGalleryAuthor({ ...galleryauthor, nb_participants: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Invited
                            </FormLabel>
                            <TextField
                                id="invited"
                                label={galleryauthor.invited}
                                defaultValue={galleryauthor.invited}
                                variant="outlined"
                                onChange={(event) => setGalleryAuthor({ ...galleryauthor, invited: parseInt(event.target.value) })}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateGallery} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}