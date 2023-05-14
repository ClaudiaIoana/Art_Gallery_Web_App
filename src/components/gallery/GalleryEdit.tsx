import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import {Gallery} from "../../models/Gallery";


export const GalleryEdit = () => {
    const { galleryId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [gallery, setGallery] = useState<Gallery>({
        id: 0,
        name: "",
        theme: "",
        street: "",
        capacity: 0,
        location: 1,
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/gallery/${galleryId}/`)
            .then((response) => {
                setGallery(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);


    const updateGallery = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(gallery.location)
        try {
            await axios.put(`${BACKEND_API_URL}/gallery/${galleryId}/`, gallery);
            navigate("/gallery/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/gallery/");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/gallery/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateGallery} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Name
                            </FormLabel>
                            <TextField
                                id="name"
                                label={gallery.name}
                                defaultValue={gallery.name}
                                variant="outlined"
                                onChange={(event) => setGallery({ ...gallery, name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Theme
                            </FormLabel>
                            <TextField
                                id="theme"
                                label={gallery.theme}
                                defaultValue={gallery.theme}
                                variant="outlined"
                                onChange={(event) => setGallery({ ...gallery, theme: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Street
                            </FormLabel>
                            <TextField
                                id="street"
                                label={gallery.street}
                                defaultValue={gallery.street}
                                variant="outlined"
                                onChange={(event) => setGallery({ ...gallery, street: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Capacity
                            </FormLabel>
                            <TextField
                                id="capacity"
                                label={gallery.capacity}
                                defaultValue={gallery.capacity}
                                variant="outlined"
                                onChange={(event) => setGallery({ ...gallery, capacity: parseInt(event.target.value) })}
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