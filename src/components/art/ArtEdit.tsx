import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    FormLabel,
    IconButton,
    TextField,
    colors
} from "@mui/material";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";
import {BACKEND_API_URL} from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {useEffect, useState} from "react";
import {Art} from "../../models/Art";


export const ArtEdit = () => {
    const {artId} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [art, setArt] = useState<Art>({
        id: 0,
        title: "",
        author: 1,
        year: 0,
        type: "",
        material: "",
        gallery: 1,
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/art/${artId}/`)
            .then((response) => {
                setArt(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);


    const updateGallery = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/art/${artId}/`, art);
            navigate("/art/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/art/");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/art/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={updateGallery} style={{display: "flex", flexDirection: "column", padding: "8px"}}>
                        <Container sx={{padding: "3px"}}
                                   style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Title
                            </FormLabel>
                            <TextField
                                id="title"
                                label={art.title}
                                defaultValue={art.title}
                                variant="outlined"
                                onChange={(event) => setArt({...art, title: event.target.value})}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}}
                                   style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Year
                            </FormLabel>
                            <TextField
                                id="year"
                                label={art.year}
                                defaultValue={art.year}
                                variant="outlined"
                                onChange={(event) => setArt({...art, year: parseInt(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}}
                                   style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Type
                            </FormLabel>
                            <TextField
                                id="type"
                                label={art.type}
                                defaultValue={art.type}
                                variant="outlined"
                                onChange={(event) => setArt({...art, type: event.target.value})}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}}
                                   style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Material
                            </FormLabel>
                            <TextField
                                id="material"
                                label={art.material}
                                defaultValue={art.material}
                                variant="outlined"
                                onChange={(event) => setArt({...art, material: event.target.value })}
                            />
                        </Container>

                        <Container sx={{padding: "3px"}}
                                   style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                            <FormLabel style={{marginTop: "15px", fontSize: "18px"}}>
                                Gallery
                            </FormLabel>
                            <TextField
                                id="gallery"
                                label={art.gallery.toString()}
                                variant="outlined"
                                onChange={(event) => setArt({...art, gallery: parseInt(event.target.value) })}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{justifyContent: "center"}}>
                    <Button type="submit" onClick={updateGallery} variant="contained"
                            sx={{backgroundColor: colors.green[500]}}>Update</Button>
                    <Button onClick={handleCancel} variant="contained"
                            sx={{backgroundColor: colors.green[500]}}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}