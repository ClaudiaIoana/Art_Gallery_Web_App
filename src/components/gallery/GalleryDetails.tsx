import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Gallery} from "../../models/GalleryObj";

export const GalleryDetails = () => {
	const { galleryId } = useParams();
	const [gallery, setGallery] = useState<Gallery>();

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/gallery/${galleryId}`);
			const gallery = await response.json();
			setGallery(gallery);
		};
		fetchCourse();
	}, [galleryId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/gallery/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Gallery Details</h1>
					<p>Gallery Name: {gallery?.name}</p>
					<p>Gallery Location: {gallery?.location?.city}</p>
                    <p>Gallery Theme: {gallery?.theme} </p>
                    <p>Gallery Street: {gallery?.street}</p>
					<p>Gallery Capacity: {gallery?.capacity}</p>
					<p>Gallery Authors:</p>
					<ul>
						{gallery?.authors?.map((galleryauthor) => (
							<li key={galleryauthor.gallery?.id}>{galleryauthor.author?.name}</li>
						))}
					</ul>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/gallery/${galleryId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/gallery/${galleryId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
