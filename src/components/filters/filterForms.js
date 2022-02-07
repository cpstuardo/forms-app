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

const FilterForms = ({
  id,
  open,
  anchorEl,
  handleClose,
  genderOptions,
  regionOptions,
  comunaOptions,
  setFilters,
  setPage,
}) => {
  const [openRegion, setOpenRegion] = React.useState(false);
  const [regions, setRegions] = React.useState(regionOptions);
  const [openComuna, setOpenComuna] = React.useState(false);
  const [comunas, setComunas] = React.useState(comunaOptions);
  const [openGender, setOpenGender] = React.useState(false);
  const [genders, setGenders] = React.useState(genderOptions);

  const updateFilters = () => {
    const filter = [];
    const filterGender = ["&gender="];
    const filterRegion = ["&region="];
    const filterComuna = ["&comuna="];

    Object.keys(genders).map((gender) => {
      if (genders[gender]) {
        filterGender.push(gender);
      }
    });
    Object.keys(regions).map((region) => {
      if (regions[region]) {
        filterRegion.push(region);
      }
    });
    Object.keys(comunas).map((comuna) => {
      if (comunas[comuna]) {
        filterComuna.push(comuna);
      }
    });
    if (filterGender.length !== 1) {
      filter.push(filterGender);
    }
    if (filterRegion.length !== 1) {
      filter.push(filterRegion);
    }
    if (filterComuna.length !== 1) {
      filter.push(filterComuna);
    }

    const strFilter = filter.join("");
    if (filter.length === 0) {
      setFilters("");
    } else {
      setFilters(strFilter);
    }
    setPage(0);
  };

  const removeFilters = () => {
    Object.keys(genders).map((gender) => {
      genders[gender] = false;
    });
    Object.keys(regions).map((region) => {
      regions[region] = false;
    });
    Object.keys(comunas).map((comuna) => {
      comunas[comuna] = false;
    });
    updateFilters();
  };

  const handleChangeRegion = (event) => {
    setRegions({
      ...regions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickRegion = () => {
    setOpenRegion(!openRegion);
  };

  const handleChangeComuna = (event) => {
    setComunas({
      ...comunas,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickComuna = () => {
    setOpenComuna(!openComuna);
  };

  const handleChangeGender = (event) => {
    setGenders({
      ...genders,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickGender = () => {
    setOpenGender(!openGender);
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
          <ListItemButton onClick={handleClickGender}>
            <ListItemText primary="Género" />
            {openGender ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openGender} timeout="auto" unmountOnExit>
            <Box sx={{ display: "flex", marginTop: -3, marginBottom: -4 }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                {Object.keys(genders).map((gender) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={genders[gender]}
                          onChange={handleChangeGender}
                          name={gender}
                        />
                      }
                      label={gender}
                      key={gender}
                    />
                  );
                })}
              </FormControl>
            </Box>
          </Collapse>

          <ListItemButton onClick={handleClickRegion}>
            <ListItemText primary="Región" />
            {openRegion ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openRegion} timeout="auto" unmountOnExit>
            <Box sx={{ display: "flex", marginTop: -3, marginBottom: -4 }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                {Object.keys(regions).map((region) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={regions[region]}
                          onChange={handleChangeRegion}
                          name={region}
                        />
                      }
                      label={region}
                      key={region}
                    />
                  );
                })}
              </FormControl>
            </Box>
          </Collapse>

          <ListItemButton onClick={handleClickComuna}>
            <ListItemText primary="Comuna" />
            {openComuna ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openComuna} timeout="auto" unmountOnExit>
            <Box sx={{ display: "flex", marginTop: -3, marginBottom: -4 }}>
              <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                {Object.keys(comunas).map((comuna) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={comunas[comuna]}
                          onChange={handleChangeComuna}
                          name={comuna}
                        />
                      }
                      label={comuna}
                      key={comuna}
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

export default FilterForms;
