import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Location} from "../../models/Location";
import { useEffect, useState } from "react";


export const LocationEdit = () => {
    const { locationId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [location, setLocation] = useState<Location>({
        id: 0,
        country: "",
        city: "",
        to_visit: ""
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/locations/${locationId}/`)
            .then((response) => {
                setLocation(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const updateLocation = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/locations/${locationId}/`, location);
            navigate("/locations/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/locations/");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/locations/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateLocation} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Country
                            </FormLabel>
                            <TextField
                                id="country"
                                label={location.country}
                                defaultValue={location.country}
                                variant="outlined"
                                onChange={(event) => setLocation({ ...location, country: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                City
                            </FormLabel>
                            <TextField
                                id="city"
                                label={location.city}
                                defaultValue={location.city}
                                variant="outlined"
                                onChange={(event) => setLocation({ ...location, city: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Description
                            </FormLabel>
                            <TextField
                                id="to_visit"
                                label={location.to_visit}
                                defaultValue={location.to_visit}
                                variant="outlined"
                                onChange={(event) => setLocation({ ...location, to_visit: event.target.value })}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateLocation} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}