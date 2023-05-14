import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip, Box, Toolbar, Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {Art} from "../../models/Art";
import axios from "axios";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";


export const ArtShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [arts, setArt] = useState<Art[]>([]);
    const [refreshUsers, setRefreshUsers] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const totalPages = Math.ceil(1000000 / 100);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        setLoading(true);
        setRefreshUsers(false);
        axios.get(`${BACKEND_API_URL}/art?page=${pageNumber}`)
            .then((response) => {
                setArt(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [refreshUsers, pageNumber]);

    if (arts.length == 0) {
        return <div>No arts</div>;
    }


    const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    setLoading(true);
    fetch(`${BACKEND_API_URL}/art/?page=${newPage}`)
      .then((response) => response.json())
      .then((data) => {
        setArt(data);
        setLoading(false);
      });
  };

    const pageNumbers = [];
    for (
        let i = Math.max(1, currentPage - 5);
        i <= Math.min(totalPages, currentPage + 5);
        i++
    ) {
        pageNumbers.push(i);
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            console.log(currentPage);
            setLoading(true);
            fetch(`${BACKEND_API_URL}/art/?page=${currentPage + 1}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(currentPage);
                    setArt(data);
                    setLoading(false);
                });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            console.log(currentPage);
            setLoading(true);
            fetch(`${BACKEND_API_URL}/art/?page=${currentPage - 1}`)
                .then((response) => response.json())
                .then((data) => {
                    setArt(data);
                    setLoading(false);
                });
        }
    };


    return (
        <Container>
            <h1>Arts List</h1>
            {!loading && arts.length === 0 && <p>No arts found</p>}
            {!loading && (
                <Toolbar>
                    <div>
                        {currentPage > 1 && (
                            <button onClick={() => handlePageChange(currentPage - 1)}>
                                Previous
                            </button>
                        )}
                        {pageNumbers[0] > 1 && (
                            <>
                                <button onClick={() => handlePageChange(1)}>1</button>
                                {/* {pageNumbers[0] > 2 && <span>...</span>} */}
                                {pageNumbers[0] > 2 && (
                                    <>
                                        <button onClick={() => handlePageChange(2)}>2</button>
                                        {pageNumbers[0] > 3 && (
                                            <>
                                                <button onClick={() => handlePageChange(3)}>3</button>
                                                {pageNumbers[0] > 4 && (
                                                    <>
                                                        <button onClick={() => handlePageChange(4)}>
                                                            4
                                                        </button>
                                                        {pageNumbers[0] > 5 && (
                                                            <>
                                                                <button onClick={() => handlePageChange(5)}>
                                                                    5
                                                                </button>
                                                                {pageNumbers[0] > 5 && <span>...</span>}
                                                            </>
                                                        )}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        {pageNumbers.map((pageNumber) => (
                            <button
                                style={{
                                    margin: "3px",
                                    backgroundColor: currentPage === pageNumber ? "grey" : "",
                                    pointerEvents: currentPage === pageNumber ? "none" : "auto",
                                }}
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                        {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                            <>
                                {pageNumbers[pageNumbers.length - 2] < totalPages - 2 && (
                                    <>
                                        {pageNumbers[pageNumbers.length - 3] < totalPages - 3 && (
                                            <>
                                                {pageNumbers[pageNumbers.length - 4] <
                                                    totalPages - 4 && (
                                                        <>
                                                            {pageNumbers[pageNumbers.length - 5] <
                                                                totalPages - 5 && (
                                                                    <>
                                                                        {pageNumbers[pageNumbers.length - 5] <
                                                                            totalPages - 6 && <span>...</span>}
                                                                        <button
                                                                            onClick={() =>
                                                                                handlePageChange(totalPages - 4)
                                                                            }
                                                                        >
                                                                            {totalPages - 4}
                                                                        </button>
                                                                    </>
                                                                )}
                                                            <button
                                                                onClick={() => handlePageChange(totalPages - 3)}
                                                            >
                                                                {totalPages - 3}
                                                            </button>
                                                        </>
                                                    )}
                                                <button
                                                    onClick={() => handlePageChange(totalPages - 2)}
                                                >
                                                    {totalPages - 2}
                                                </button>
                                            </>
                                        )}
                                        <button onClick={() => handlePageChange(totalPages - 1)}>
                                            {totalPages - 1}
                                        </button>
                                    </>
                                )}
                                <button onClick={() => handlePageChange(totalPages)}>
                                    {totalPages}
                                </button>
                            </>
                        )}
                        {currentPage < totalPages && (
                            <button onClick={() => handlePageChange(currentPage + 1)}>
                                Next
                            </button>
                        )}
                    </div>
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/art/add/';
                    }}
                >
                    <Tooltip title="Add a new art" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
                </Toolbar>
            )}
            {!loading && arts.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Author</TableCell>
                                <TableCell align="center">Year</TableCell>
                                <TableCell align="center">Type</TableCell>
                                <TableCell align="center">Material</TableCell>
                                <TableCell align="center">Gallery</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {arts.map((art: Art, index) => (
                                <tr>
                                    <TableCell align="center">{art.id}</TableCell>
                                    <TableCell align="center">{art.title}</TableCell>
                                    <TableCell align="center">{art.author.toString()}</TableCell>
                                    <TableCell align="center">{art.year}</TableCell>
                                    <TableCell align="center">{art.type}</TableCell>
                                    <TableCell align="center">{art.material}</TableCell>
                                    <TableCell align="center">{art.gallery.toString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/art/${art.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View art details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/art/${art.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/art/${art.id}/delete`;
                                            }}
                                        >
                                            <DeleteForeverIcon sx={{color: "red"}} />
                                        </IconButton>
                                    </TableCell>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};
