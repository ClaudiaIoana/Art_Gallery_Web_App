import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Card, CardContent, IconButton, CardActions, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import {BACKEND_API_URL} from "../../constants";


export const ArtDelete = () => {
    const {artId} = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        await axios.delete(`${BACKEND_API_URL}/art/${artId}`);
        navigate("/art/");
    };

    const handleCancel = (event: {preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/art/");
    };

    return(
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/art/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					Are you sure you want to delete this art? This cannot be undone!
                </CardContent>
                <CardActions>
					<Button onClick={handleDelete}>Delete it</Button>
					<Button onClick={handleCancel}>Cancel</Button>
				</CardActions>
            </Card>
        </Container>
    )
}