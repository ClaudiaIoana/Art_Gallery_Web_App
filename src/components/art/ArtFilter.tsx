import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    Button,
} from "@mui/material";
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {Art} from "../../models/Art";


export const ArtFilter = () => {
    const [loading, setLoading] = useState(true)
    const [art, setArt] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/art-filter/`)
            .then(res => res.json())
            .then(data => {
                setArt(data);
                setLoading(false);
            })
    }, []);

    console.log(art);

    const sortArt = () => {
        const sortedPlayers = [...art].sort((a: Art, b: Art) => {
            if (a.year < b.year) {
                return -1;
            }
            if (a.year > b.year) {
                return 1;
            }
            return 0;

        })
        console.log(sortedPlayers);
        setArt(sortedPlayers);
    }


    return (
        <Container>

            <h1 style={{marginTop: "65px"}}>All arts filtered by year</h1>

            {loading && <CircularProgress/>}

            {!loading && art.length == 0 && <div>No arts found</div>}
            {!loading && (
                <Button sx={{color: "white"}} onClick={sortArt}>
                    Sort art by year
                </Button>
            )}

            {!loading && art.length > 0 && (

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 800}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center"
                                           style={{color: "#2471A3", fontWeight: 'bold'}}>Title</TableCell>
                                <TableCell align="center"
                                           style={{color: "#2471A3", fontWeight: 'bold'}}>Year</TableCell>
                                <TableCell align="center"
                                           style={{color: "#2471A3", fontWeight: 'bold'}}>Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {art.map((arts: Art, index) => (
                                <TableRow key={arts.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{arts.title}</TableCell>
                                    <TableCell align="center">{arts.year}</TableCell>
                                    <TableCell align="center">{arts.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            }
        </Container>

    );
};