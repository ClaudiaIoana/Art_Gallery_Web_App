import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Gallery management
					</Typography>
					<Button
						variant={path.startsWith("/locations/") ? "outlined" : "text"}
						to="/locations"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Locations
					</Button>
					<Button
						variant={path.startsWith("/gallery/") ? "outlined" : "text"}
						to="/gallery"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Galleries
					</Button>
					<Button
						variant={path.startsWith("/author/") ? "outlined" : "text"}
						to="/author"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Authors
					</Button>
					<Button
						variant={path.startsWith("/art/") ? "outlined" : "text"}
						to="/art"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Arts
					</Button>
					<Button
						variant={path.startsWith("/galleryauthor/") ? "outlined" : "text"}
						to="/galleryauthor"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Galleries and Authors
					</Button>
					<Button
						variant={path.startsWith("/art-filter/") ? "outlined" : "text"}
						to="/art-filter/"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Art Filter
					</Button>
					<Button
						variant={path.startsWith("/author_report/") ? "outlined" : "text"}
						to="/author_report/"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Statistic
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};