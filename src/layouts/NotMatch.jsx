import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function NotFound() {
  return (
    <Toolbar>
      <Grid container alignItems="center" spacing={8}>
        <Grid item xs>
          <Typography color="inherit" variant="h3">
            404 Not Found.
          </Typography>
        </Grid>
      </Grid>
    </Toolbar>
  );
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};
export default NotFound;
