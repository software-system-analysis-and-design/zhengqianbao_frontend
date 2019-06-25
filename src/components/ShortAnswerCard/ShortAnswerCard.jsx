import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const style = {
  card: {
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 24
  },
  textField: {
    marginTop: 15
  }
};

function ShortAnswerCard(props) {
  const {classes, content, warning, callback} = props;
  const [input, setInput] = React.useState("");

  const handleChange = event => {
    setInput(event.target.value);
    callback(event.target.value);
  }

  let error = (input === "") && warning;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2">
          {content.title}
        </Typography>
        <TextField
          id="outlined-textarea"
          label="Answer"
          placeholder="Placeholder"
          multiline
          fullWidth
          className={classes.textField}
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          error={error}
          helperText={warning && error ? "回答不可为空" : null}
        />
      </CardContent>
    </Card>
  );
}

export default withStyles(style)(ShortAnswerCard);
