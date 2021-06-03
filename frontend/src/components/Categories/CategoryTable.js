import React, { useContext, useState } from "react";

import {
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Avatar,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VisibilityIcon from "@material-ui/icons/Visibility";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import CategoryContext from "./CategoryContext";
import CategoryController from "./CategoryController";

import ConfirmDialog from "../Common/ConfirmDialog";

import { getRandomColor } from "../../utils/";

function CategoryTable() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const {
    reloadFlagMemo: { reloadFlag, setReloadFlag },
    categoriesMemo: {
      categories,
      // setCategories
    },
    categorySelectedMemo: { categorySelected, setCategorySelected },
    currentAction: {
      // categoryAction,
      setCategoryAction,
    },
  } = useContext(CategoryContext);

  const onView = (category) => {
    setCategorySelected(category);
    setCategoryAction("view");
  };

  const onEdit = (category) => {
    setCategorySelected(category);
    setCategoryAction("edit");
  };

  const onDelete = (category) => {
    setCategorySelected(category);
    setConfirmOpen(true);
  };

  const deleteCategory = async () => {
    await CategoryController.deleteCategory(categorySelected._id);
    setCategoryAction(undefined);
    setCategorySelected({});
    setReloadFlag(reloadFlag + 1);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Nombre</TableCell>
              <TableCell align="right">Desciption</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category._id}>
                <TableCell align="center">
                  <Avatar style={{ background: getRandomColor() }}>
                    {`${category.name.charAt(0).toUpperCase()}`}
                  </Avatar>
                </TableCell>
                <TableCell component="th" scope="row">
                  {category.name}
                </TableCell>
                <TableCell align="right">{category.description}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Ver categoría" arrow>
                    <IconButton onClick={() => onView(category)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Editar categoría" arrow>
                    <IconButton onClick={() => onEdit(category)}>
                      <EditRoundedIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar categoría" arrow>
                    <IconButton onClick={() => onDelete(category)}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        title="Borrar Categoría?"
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={deleteCategory}
      >
        <TableContainer>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell align="left">
                  <HighlightOffIcon color="secondary" />
                </TableCell>
                <TableCell align="right">
                  Desea eliminar la categoría?
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </ConfirmDialog>
    </div>
  );
}

export default CategoryTable;
