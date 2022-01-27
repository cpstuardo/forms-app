import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {"Copyright © "}
    <Link color="inherit" href="https://www.yachayconsulting.cl/">
      Yachay Consulting
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default Copyright;
