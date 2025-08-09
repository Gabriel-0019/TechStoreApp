import { useEffect, useState } from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";

const CategoriesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryActive, setNewCategoryActive] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://localhost:7103/api/Category");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleOpenAddModal = () => {
    setNewCategoryName("");
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleEdit = (id) => {
    console.log("Editar categoría con ID:", id);
  };

  const handleSaveNewCategory = () => {
    console.log("Guardar categoría:", newCategoryName, newCategoryActive);
    setOpenAddModal(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Lista de Categorías
        <Button color="primary" onClick={handleOpenAddModal}>
          <AddIcon />
        </Button>
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Nombre</strong>
              </TableCell>
              <TableCell>
                <strong>Activo</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha de Creación</strong>
              </TableCell>
              <TableCell>
                <strong>Fecha de modificación</strong>
              </TableCell>
              <TableCell>
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.isActive ? "Sí" : "No"}</TableCell>
                <TableCell>
                  {dayjs(category.createdAt).format("DD/MM/YYYY hh:mm A")}
                </TableCell>
                <TableCell>
                  {dayjs(category.modifiedAt).format("DD/MM/YYYY hh:mm A")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(category.id)}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openAddModal}
        onClose={handleCloseAddModal}
        disableEnforceFocus={false}
        disableAutoFocus={false}
        disableRestoreFocus={false}
      >
        <DialogTitle>Agregar Nueva Categoría</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nombre de la categoría"
            fullWidth
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={newCategoryActive}
                onChange={(e) => setNewCategoryActive(e.target.checked)}
              />
            }
            label="Activo"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddModal}>Cancelar</Button>
          <Button
            onClick={handleSaveNewCategory}
            disabled={!newCategoryName.trim()}
            variant="contained"
            color="primary"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoriesTable;
