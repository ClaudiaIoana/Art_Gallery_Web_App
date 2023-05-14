import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import {Author} from "../../models/Author";


export const AuthorEdit = () => {
    const { authorId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [author, setAuthor] = useState<Author>({
        id: 0,
        name: "",
        date_birth: "",
        date_death: "",
        period: "",
        originated: "",
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/author/${authorId}/`)
            .then((response) => {
                setAuthor(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);


    const updateGallery = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/author/${authorId}/`, author);
            navigate("/author/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/author/");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/author/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateGallery} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Name
                            </FormLabel>
                            <TextField
                                id="name"
                                label={author.name}
                                defaultValue={author.name}
                                variant="outlined"
                                onChange={(event) => setAuthor({ ...author, name: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Date of Birth
                            </FormLabel>
                            <TextField
                                id="date_birth"
                                label={author.date_birth}
                                defaultValue={author.date_birth}
                                variant="outlined"
                                onChange={(event) => setAuthor({ ...author, date_birth: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Date of death
                            </FormLabel>
                            <TextField
                                id="date_death"
                                label={author.date_death}
                                defaultValue={author.date_death}
                                variant="outlined"
                                onChange={(event) => setAuthor({ ...author, date_death: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Period
                            </FormLabel>
                            <TextField
                                id="period"
                                label={author.period}
                                defaultValue={author.period}
                                variant="outlined"
                                onChange={(event) => setAuthor({ ...author, period: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Originated
                            </FormLabel>
                            <TextField
                                id="originated"
                                label={author.originated}
                                defaultValue={author.originated}
                                variant="outlined"
                                onChange={(event) => setAuthor({ ...author, originated: event.target.value })}
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