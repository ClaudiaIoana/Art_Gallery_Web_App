import { useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import axios from "axios";
import { Button, Card, CardContent, IconButton, TextField} from "@mui/material";
import {Container} from "@mui/system";
import {Link, useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Author} from "../../models/Author";


export const AuthorAdd = () => {
    const navigate = useNavigate();

    const [author, setAuthor] = useState<Author>({
        id: 0,
        name: "",
        date_birth: "",
        date_death: "",
        period: "",
        originated: "",
    });

	const addAuthor = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/author/`, author);
            navigate("/author");
        }catch (error){
            console.log(error);
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{mr: 3}} to={`/author/`}>
                        <ArrowBackIcon/>
                    </IconButton>{" "}
                    <form onSubmit={addAuthor}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) =>{
                                if (!/^\d{4}-\d{2}-\d{2}$/.test(event.target.value)) {
                                    console.log("yes");
                                    setLocalError({
                                        ...localError,
                                        publication_date: "Enter valid date",
                                    });
                                } else if (
                                    Number(event.target.value.substring(0, 4)) <
                                    Number(book.author.DOB?.substring(0, 4))
                                ) {
                                    setLocalError({
                                        ...localError,
                                        publication_date:
                                            "The year entered must be after the date of birth of the author",
                                    });
                                } else if (Number(event.target.value.substring(0, 4)) > 2023)
                                    setLocalError({
                                        ...localError,
                                        publication_date:
                                            "The year entered must be before the current year",
                                    });
                                else {
                                    setLocalError({
                                        ...localError,
                                        publication_date: "",
                                    });
                                }
                            }
                setBook({ ...book, publication_date: event.target.value });
              }}=> setAuthor({...author, name: event.target.value})}
                        />
                        <TextField
                            id="date_birth"
                            label="Date of Birth"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setAuthor({...author, date_birth: event.target.value})}
                        />

                        <TextField
                            id="date_death"
                            label="Date of Death"
                            variant="outlined"
                            fullWidth
                            sx={{mb: 2}}
                            onChange={(event) => setAuthor({...author, date_death: event.target.value})}
                        />

                        <TextField
							id="period"
							label="Period"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAuthor({ ...author, period: event.target.value})}
						/>

                        <TextField
							id="originated"
							label="Originated"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setAuthor({ ...author, originated: event.target.value })}
						/>


                        {/*<Autocomplete*/}
						{/*	id="location_id"*/}
						{/*	options={locations}*/}
						{/*	getOptionLabel={(option) => `${option.city} - ${option.country}`}*/}
						{/*	renderInput={(params) => <TextField {...params} label="Location" variant="outlined" />}*/}
						{/*	filterOptions={(x) => x}*/}
						{/*	onInputChange={handleInputChange}*/}
						{/*	onChange={(event, value) => {*/}
						{/*		if (value) {*/}
						{/*			console.log(value);*/}
						{/*			setGallery({ ...gallery, location_id: value.id });*/}
						{/*		}*/}
						{/*	}}*/}
						{/*/>*/}

                        <Button type="submit">Add Author</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    )


}