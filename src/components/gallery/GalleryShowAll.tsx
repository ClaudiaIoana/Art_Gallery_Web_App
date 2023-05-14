import {useEffect, useState} from "react";
import {Gallery} from "../../models/Gallery";
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
    Tooltip, Box, Container, Toolbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const GalleryShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [galleries, setGallery] = useState<Gallery[]>([]);

    const [refreshUsers, setRefreshUsers] = useState(false);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const totalPages = Math.ceil(1000000 / 100);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        setLoading(true);
        setRefreshUsers(false);
        axios.get(`${BACKEND_API_URL}/gallery?page=${pageNumber}`)
            .then((response) => {
                setGallery(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, [refreshUsers, pageNumber]);

    if (galleries.length == 0) {
        return <div>No galleries</div>;
    }

    const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);

    setLoading(true);
    fetch(`${BACKEND_API_URL}/gallery/?page=${newPage}`)
      .then((response) => response.json())
      .then((data) => {
        setGallery(data);
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
            fetch(`${BACKEND_API_URL}/gallery/?page=${currentPage + 1}`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(currentPage);
                    setGallery(data);
                    setLoading(false);
                });
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            console.log(currentPage);
            setLoading(true);
            fetch(`${BACKEND_API_URL}/gallery/?page=${currentPage - 1}`)
                .then((response) => response.json())
                .then((data) => {
                    setGallery(data);
                    setLoading(false);
                });
        }
    };



    return (
        <Container>
            <h1>Galleries List</h1>
            {!loading && galleries.length === 0 && <p>No galleries found</p>}
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
                        window.location.href = '/gallery/add/';
                    }}
                >
                    <Tooltip title="Add a new gallery" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
                </Toolbar>
            )}
            {!loading && galleries.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Theme</TableCell>
                                <TableCell align="center">Street</TableCell>
                                <TableCell align="center">Capacity</TableCell>
                                <TableCell align="center">Location</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {galleries.map((gallery: Gallery, index) => (
                                <tr key={index}>
                                    <TableCell align="center">{gallery.id}</TableCell>
                                    <TableCell align="center">{gallery.name}</TableCell>
                                    <TableCell align="center">{gallery.theme}</TableCell>
                                    <TableCell align="center">{gallery.street}</TableCell>
                                    <TableCell align="center">{gallery.capacity}</TableCell>
                                    <TableCell align="center">{gallery.location?.toString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/gallery/${gallery.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View gallery details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/gallery/${gallery.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/gallery/${gallery.id}/delete`;
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
