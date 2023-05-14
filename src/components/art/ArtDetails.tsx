import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Art} from "../../models/ArtObj";

export const ArtDetails = () => {
	const { artId } = useParams();
	const [art, setArt] = useState<Art>();

	useEffect(() => {
		const fetchCourse = async () => {
			const response = await fetch(`${BACKEND_API_URL}/art/${artId}`);
			const gallery = await response.json();
			setArt(gallery);
		};
		fetchCourse();
	}, [artId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/art/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Art Details</h1>
					<p>Title: {art?.title}</p>
					<p>Author: {art?.author?.name}</p>
                    <p>Year: {art?.year.toString()} </p>
                    <p>Type: {art?.type}</p>
					<p>Material: {art?.material}</p>
					<p>Gallery: {art?.gallery?.name}</p>

				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/art/${artId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/art/${artId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
