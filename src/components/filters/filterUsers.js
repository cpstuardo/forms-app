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
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../App.css";

const FilterUsers = ({
  id,
  open,
  anchorEl,
  handleClose,
  namesOptions,
  rolesOptions,
  setFilters,
}) => {
  const [openName, setOpenName] = React.useState(false);
  const [openRole, setOpenRole] = React.useState(false);
  const [names, setNames] = React.useState(namesOptions);
  const [roles, setRoles] = React.useState(rolesOptions);

  const updateFilters = () => {
    // Recorrer names y recorrer roles
    console.log("actualizar filtros");
  };

  const handleChangeName = (event) => {
    setNames({
      ...names,
      [event.target.name]: event.target.checked,
    });
    updateFilters();
  };

  const handleChangeRole = (event) => {
    setRoles({
      ...roles,
      [event.target.name]: event.target.checked,
    });
    updateFilters();
  };

  const handleClickName = () => {
    setOpenName(!openName);
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
          <ListItemButton onClick={handleClickName}>
            <ListItemText primary="Nombre" />
            {openName ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openName} timeout="auto" unmountOnExit>
            <Box sx={{ display: "flex", marginTop: -3, marginBottom: -4 }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  {Object.keys(names).map((name) => {
                    return (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={names[name]}
                            onChange={handleChangeName}
                            name={name}
                          />
                        }
                        label={name}
                        key={name}
                      />
                    );
                  })}
                </FormGroup>
              </FormControl>
            </Box>
          </Collapse>

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
      </div>
    </Popover>
  );
};

export default FilterUsers;
