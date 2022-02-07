import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../App.css";

const FilterUsers = ({
  id,
  open,
  anchorEl,
  handleClose,
  rolesOptions,
  setFilters,
  setPage,
}) => {
  const [openRole, setOpenRole] = React.useState(true);
  const [roles, setRoles] = React.useState(rolesOptions);

  const updateFilters = () => {
    const filter = ["&role="];
    Object.keys(roles).map((role) => {
      if (roles[role]) {
        filter.push(role);
        filter.push(",");
      }
    });
    const strFilter = filter.join("");
    if (filter.length === 1) {
      setFilters("");
    } else {
      setFilters(strFilter);
    }
    setPage(0);
  };

  const removeFilters = () => {
    Object.keys(roles).map((role) => {
      roles[role] = false;
    });
    updateFilters();
  };

  const handleChangeRole = (event) => {
    setRoles({
      ...roles,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickRole = () => {
    setOpenRole(!openRole);
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <div className="filter-users">
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h7"
          id="filterTitle"
          component="div"
        >
          Filtrar
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClickRole}>
            <ListItemText primary="Rol" />
            {openRole ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openRole} timeout="auto" unmountOnExit>
            <Box sx={{ display: "flex", marginTop: -3, marginBottom: -4 }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                {Object.keys(roles).map((role) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={roles[role]}
                          onChange={handleChangeRole}
                          name={role}
                        />
                      }
                      label={role}
                      key={role}
                    />
                  );
                })}
              </FormControl>
            </Box>
          </Collapse>
        </List>
        <Button
          variant="contained"
          onClick={() => {
            updateFilters();
            handleClose();
          }}
          sx={{ mt: 3, ml: 1 }}
        >
          Aplicar
        </Button>
        <Button
          onClick={() => {
            removeFilters();
            handleClose();
          }}
          sx={{ mt: 1, ml: 1 }}
        >
          Eliminar filtros
        </Button>
      </div>
    </Popover>
  );
};

export default FilterUsers;
