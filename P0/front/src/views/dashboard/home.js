import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getEvents, createNewEvent } from "../../core/events";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 24, 4.0),
  createData("Eclair", 262, 16.0, 24, 6.0, 24, 4.0),
  createData("Cupcake", 305, 3.7, 67, 4.3, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 24, 4.0),
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [event, setEvent] = useState({});

  const [events, setEvents] = useState([]);

  const [category, setCategory] = useState("");
  const [isVirtual, setVirtual] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleVirtual = (event) => {
    setVirtual(event.target.value);
  };

  useEffect(() => {
    const getAllEvents = async () => {
      const token = localStorage.getItem("jwt");
      const response = await getEvents(token);
      console.log(events);
      setEvents(response.data.data.events);
    };
    if (open) {
      handleClose();
    }

    if (event) {
      const token = localStorage.getItem("jwt");
      createNewEvent(token, event);
      setEvent(event);
    }
    getAllEvents();
  }, [event]);

  const getInputData = (eventHandler) => {
    console.log(eventHandler);
    eventHandler.preventDefault();
    const data = new FormData(eventHandler.currentTarget);
    let newEvent = {
      name: data.get("name"),
      category: category,
      place: data.get("place"),
      address: data.get("address"),
      isVirtual: isVirtual === "Yes",
      startDate: startDate,
      endDate: startDate,
    };
    setEvent(newEvent);
  };

  return (
    <Container maxWidth="xl">
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box
          sx={{ ...style, width: 500 }}
          component="form"
          onSubmit={getInputData}
          noValidate
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="name"
            name="name"
            autoComplete="name"
            autoFocus
          />
          <InputLabel id="demo-simple-select-label" fullWidth>
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            fullWidth
            onChange={handleChange}
          >
            <MenuItem value={"CONFERENCIA"}>CONFERENCIA</MenuItem>
            <MenuItem value={"SEMINARIO"}>SEMINARIO</MenuItem>
            <MenuItem value={"CONGRESO"}>CONGRESO</MenuItem>
            <MenuItem value={"CURSO"}>CURSO</MenuItem>
          </Select>
          <TextField
            margin="normal"
            required
            fullWidth
            id="place"
            label="place"
            name="place"
            autoComplete="place"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="address"
            name="address"
            autoComplete="address"
            autoFocus
          />
          <InputLabel id="demo-simple-select-label" fullWidth>
            Is Virtual
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isVirtual}
            label="Category"
            fullWidth
            onChange={handleVirtual}
          >
            <MenuItem value={"Yes"}>Yes</MenuItem>
            <MenuItem value={"No"}>No</MenuItem>
          </Select>
          <InputLabel id="demo-simple-select-label" fullWidth>
            Start Date
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Basic example"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <InputLabel id="demo-simple-select-label" fullWidth>
            End Date
          </InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Basic example"
              value={endDate}
              onChange={(newValue) => {
                setEndDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button type="submit">Crear</Button>
        </Box>
      </Modal>
      {events.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Place</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Is Virtual</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {events.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.place}</TableCell>
                  <TableCell align="right">{row.address}</TableCell>
                  <TableCell align="right">
                    {row.isVirtual ? "Yes" : "No"}
                  </TableCell>
                  <TableCell align="right">{row.startDate}</TableCell>
                  <TableCell align="right">{row.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}

      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      </Box>
    </Container>
  );
}
