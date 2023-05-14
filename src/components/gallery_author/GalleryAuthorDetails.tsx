import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {GalleryAuthor} from "../../models/GalleryAuthorObj";

export const GalleryAuthorDetails = () => {
	const { galleryauthorId } = useParams();
	const [gallery_author, setGalleryAuthor] = useState<GalleryAuthor>();

	useEffect(() => {
		const fetchCourse = async () => {
			const response = await fetch(`${BACKEND_API_URL}/galleryauthor/${galleryauthorId}`);
			const gallery = await response.json();
			setGalleryAuthor(gallery);
		};
		fetchCourse();
	}, [galleryauthorId]);

	// @ts-ignore
	// @ts-ignore
	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/galleryauthor/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Gallery and Author Details</h1>
					<p>Author: {gallery_author?.author.name}</p>
					<p>Gallery: {gallery_author?.gallery.name}</p>
                    <p>Starting Exposition: {gallery_author?.starting_exposition} </p>
                    <p>Ending Exposition: {gallery_author?.ending_exposition}</p>
					<p>Number Participants: {gallery_author?.nb_participants}</p>
					<p>Invited: {gallery_author?.invited}</p>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/galleryauthor/${galleryauthorId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/galleryauthor/${galleryauthorId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
