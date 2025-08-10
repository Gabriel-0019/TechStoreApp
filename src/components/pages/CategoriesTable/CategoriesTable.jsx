import { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import {
  AddCategory,
  EditCategory,
  GetCategories,
} from "../../../api/categories/categories";

const CategoriesTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryActive, setNewCategoryActive] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await GetCategories();
        setData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleOpenAddModal = () => {
    setNewCategoryName("");
    setNewCategoryActive(true);
    setOpenAddModal(true);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
  };

  const handleOpenEditModal = (row) => {
    setNewCategoryName(row.categoryName);
    setNewCategoryActive(row.isActive);
    setId(row.id);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setNewCategoryName("");
    setId(0);
    setNewCategoryActive(false);
  };

  const handleEditCategory = async () => {
    setSaving(true);
    setError("");

    try {
      let result = await EditCategory({
        id: id,
        categoryName: newCategoryName,
        isActive: newCategoryActive,
      });

      if (result === false) {
        setError("Ocurrió un error al guardar la categoría");
        return;
      }

      setOpenEditModal(false);
      const updatedCategories = await GetCategories();
      setData(updatedCategories);
      setError(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNewCategory = async () => {
    setSaving(true);
    setError("");

    try {
      let result = await AddCategory({
        categoryName: newCategoryName,
        isActive: newCategoryActive,
      });

      if (result === false) {
        setError("Ocurrió un error al guardar la categoría");
        return;
      }

      setOpenAddModal(false);
      const updatedCategories = await GetCategories();
      setData(updatedCategories);
      setError(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <CircularProgress />;

  const columns = [
    {
      field: "categoryName",
      headerName: "Nombre",
      flex: 1,
    },
    {
      field: "isActive",
      headerName: "Activo",
      flex: 1,
      renderCell: (params) => (params.value ? "Sí" : "No"),
    },
    {
      field: "createdAt",
      headerName: "Fecha de Creación",
      width: 150,
      flex: 1,
      valueFormatter: (params) => {
        if (!params) return "";
        return dayjs(params).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "modifiedAt",
      headerName: "Fecha de modificación",
      width: 150,
      flex: 1,
      valueFormatter: (params) => {
        if (!params) return "";
        return dayjs(params).format("DD/MM/YYYY hh:mm A");
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleOpenEditModal(params.row)}
        >
          <EditIcon />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Lista de Categorías
        <Button
          color="primary"
          onClick={handleOpenAddModal}
          style={{ marginLeft: 16 }}
        >
          <AddIcon />
        </Button>
      </Typography>

      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          getRowId={(row) => row.id}
          disableSelectionOnClick
        />
      </div>

      <Dialog open={openAddModal} onClose={handleCloseAddModal}>
        <DialogTitle>Agregar Nueva Categoría</DialogTitle>
        {error && (
          <>
            <Alert severity="error">{error}</Alert>
          </>
        )}
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
          <Button onClick={handleCloseAddModal} disabled={saving}>
            Cancelar
          </Button>
          <Button
            onClick={handleSaveNewCategory}
            disabled={!newCategoryName.trim()}
            variant="contained"
            color="primary"
            startIcon={saving ? <CircularProgress size={20} /> : null}
          >
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Agregar Nueva Categoría</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ID"
            fullWidth
            value={id}
            disabled
            style={{ display: "none" }}
            onChange={(e) => setId(e.target.value)}
          />
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
          <Button onClick={handleCloseEditModal} disabled={saving}>
            Cancelar
          </Button>
          <Button
            onClick={handleEditCategory}
            disabled={!newCategoryName.trim()}
            variant="contained"
            color="primary"
            startIcon={saving ? <CircularProgress size={20} /> : null}
          >
            {saving ? "Guardando..." : "Guardar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoriesTable;
