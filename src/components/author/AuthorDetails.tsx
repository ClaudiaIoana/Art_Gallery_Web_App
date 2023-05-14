import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Author} from "../../models/AuthorObj";

export const AuthorDetails = () => {
	const { authorId } = useParams();
	const [author, setAuthor] = useState<Author>();

	useEffect(() => {
		const fetchCourse = async () => {
			const response = await fetch(`${BACKEND_API_URL}/author/${authorId}`);
			const gallery = await response.json();
			setAuthor(gallery);
		};
		fetchCourse();
	}, [authorId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/author/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Author Details</h1>
					<p>Name: {author?.name}</p>
					<p>Date of Birth: {author?.date_birth}</p>
                    <p>Date of Death: {author?.date_death} </p>
                    <p>Period: {author?.period}</p>
					<p>Originated: {author?.originated}</p>
					<p>Author Arts:</p>
					<ul>
						{author?.arts?.map((art) => (
							<li key={art.id}>{art.title}</li>
						))}
					</ul>
					<p>Author Galleries:</p>
					<ul>
						{author?.galleries?.map((galleryauthor) => (
							<li key={galleryauthor.author?.id}>{galleryauthor.gallery?.name}</li>
						))}
					</ul>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/author/${authorId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/author/${authorId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
