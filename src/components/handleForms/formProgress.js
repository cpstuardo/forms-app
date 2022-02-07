import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { url_backend } from "../../utils/global";
import { useHistory } from "react-router-dom";
import FormTable from "../tables/formTable";
import BarPlot from "../plots/barPlot";
import SnackbarAlert from "../snackbarAlert";

const FormProgress = (props) => {
  const history = useHistory();
  const [answers, setAnswers] = useState([]);
  const [usersProgress, setUsersProgress] = useState([]);
  const [openSnackDelete, setOpenSnackDelete] = useState(false);
  const [openSnackFail, setOpenSnackFail] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    };
    fetch(
      url_backend +
        "form/forms?page=" +
        (page + 1) +
        "&limit=" +
        limit +
        filters,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTotal(data.meta.totalItems);
        setAnswers(
          data.items.map((d) => {
            d.user = d.user.name;
            return d;
          })
        );
      });
    fetch(url_backend + "form/countByUser", requestOptions)
      .then((response) => response.json())
      .then((data) => setUsersProgress(data));
  }, [openSnackDelete, filters, limit, page]);

  return (
    <div>
      <SnackbarAlert
        openSnack={openSnackDelete}
        setOpenSnack={setOpenSnackDelete}
        msg={"Encuesta eliminada exitosamente"}
        type="success"
      />
      <SnackbarAlert
        openSnack={openSnackFail}
        setOpenSnack={setOpenSnackFail}
        msg={"Acción fallida"}
        type="error"
      />
      <br />
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Progreso de la encuesta
      </Typography>
      <BarPlot data={usersProgress} screenWidth={props.width} />
      <br />
      <FormTable
        rows={answers}
        setOpenSnackDelete={setOpenSnackDelete}
        setOpenSnackFail={setOpenSnackFail}
        setFilters={setFilters}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        total={total}
      />
      <Button
        variant="contained"
        onClick={() => history.goBack()}
        sx={{ mt: 3, ml: 1 }}
      >
        Volver
      </Button>
    </div>
  );
};
export default FormProgress;
