import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useHistory } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { url_backend } from "../../utils/global";
import FilterForms from "../filters/filterForms";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "id",
    label: "ID",
  },
  {
    id: "name",
    label: "Nombre",
  },
  {
    id: "rut",
    label: "RUT",
  },
  {
    id: "age",
    label: "Edad",
  },
  {
    id: "gender",
    label: "Género",
  },
  {
    id: "address",
    label: "Dirección",
  },
  {
    id: "comuna",
    label: "Comuna",
  },
  {
    id: "region",
    label: "Región",
  },
  {
    id: "score",
    label: "Calificación",
  },
  {
    id: "comments",
    label: "Comentarios",
  },
  {
    id: "userId",
    label: "Encuestador",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          key={"actions"}
          align={"center"}
          padding={"normal"}
          sortDirection={false}
          sx={{ width: "45%" }}
        >
          Acciones
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = ({
  genderOptions,
  regionOptions,
  comunaOptions,
  setFilters,
  setPage,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Respuestas
      </Typography>

      <Tooltip title="Filtrar">
        <IconButton aria-describedby={id} onClick={handleClick}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <FilterForms
        open={open}
        handleClose={handleClose}
        id={id}
        anchorEl={anchorEl}
        genderOptions={genderOptions}
        regionOptions={regionOptions}
        comunaOptions={comunaOptions}
        setFilters={setFilters}
        setPage={setPage}
        handleClose={handleClose}
      />
    </Toolbar>
  );
};

export default function EnhancedTable({
  rows,
  setOpenSnackFail,
  setOpenSnackDelete,
  setFilters,
  page,
  setPage,
  limit,
  setLimit,
  total,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const history = useHistory();
  const [genders, setGenders] = React.useState({});
  const [regions, setRegions] = React.useState({});
  const [comunas, setComunas] = React.useState({});

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    history.push(`/${id}/formEdit`);
  };

  const handleDelete = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify({ id }),
    };
    fetch(url_backend + "form/form", requestOptions).then((response) => {
      if (response.status === 200) {
        setOpenSnackDelete(true);
      } else {
        setOpenSnackFail(true);
      }
    });
  };

  React.useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    };
    fetch(url_backend + "form/options", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        data.genders.map((dict_gender) => {
          genders[dict_gender["gender"]] = false;
        });
        data.regions.map((dict_region) => {
          regions[dict_region["region"]] = false;
        });
        data.comunas.map((dict_comuna) => {
          comunas[dict_comuna["comuna"]] = false;
        });
      });
  }, []);

  const emptyRows = page > 0 ? Math.max(0, limit - rows.length) : 0;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginBottom: -10 }}>
      <Paper sx={{ width: "95%", mb: 10 }}>
        <EnhancedTableToolbar
          genderOptions={genders}
          regionOptions={regions}
          comunaOptions={comunas}
          setFilters={setFilters}
          setPage={setPage}
        />
        <TableContainer style={{ maxHeight: 800 }}>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
            stickyHeader
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={total}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy)).map(
                (row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell id={labelId} align="center">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.rut}</TableCell>
                      <TableCell align="center">{row.age}</TableCell>
                      <TableCell align="left">{row.gender}</TableCell>
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">{row.comuna}</TableCell>
                      <TableCell align="left">{row.region}</TableCell>
                      <TableCell align="center">{row.score}</TableCell>
                      <TableCell align="left">{row.comments}</TableCell>
                      <TableCell align="left">{row.user}</TableCell>
                      <TableCell align="center">
                        <Tooltip title="Editar encuesta">
                          <IconButton onClick={() => handleEdit(row.id)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar encuesta">
                          <IconButton
                            onClick={() => handleDelete(row.id)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 43 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={total}
          labelRowsPerPage={"Filas por página"}
          rowsPerPage={limit}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
