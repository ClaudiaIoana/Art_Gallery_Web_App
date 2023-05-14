import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import {Location} from "../../models/Location";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const LocationDetails = () => {
	const { locationId } = useParams();
	const [location, setCourse] = useState<Location>();

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/locations/${locationId}`);
			const location = await response.json();
			setCourse(location);
		};
		fetchCourse();
	}, [locationId]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/locations/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Location Details</h1>
					<p>Location Country: {location?.country}</p>
					<p>Location City: {location?.city}</p>
					<p>Location Description:</p>
					<p>{location?.to_visit}</p>
					<p>Location Galleries:</p>
					<ul>
						{location?.galleries?.map((gallery) => (
							<li key={gallery.id}>{gallery.name}</li>
						))}
					</ul>
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/locations/${locationId}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/locations/${locationId}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};
