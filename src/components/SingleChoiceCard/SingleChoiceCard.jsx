import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";

const style = {
  card: {
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    fontSize: 24
  },
  formControl: {
    margin: 3
  },
  group: {
    margin: 1
  }
};

function SingleChoiceCard(props) {
  // "const" for formal; "let" for test
  const { classes, content, warning, callback} = props;

  const [value, setValue] = React.useState(-1);

  function handleChange(event) {
    callback(event.target.value);
    setValue(parseInt(event.target.value));
  }

  let error = value < 0 || value >= content.arr.length;

  let radio = [];
  for (let i = 0; i < content.arr.length; i++) {
    radio.push(
      <FormControlLabel
        control={<Radio color="primary" />}
        label={content.arr[i]}
        value={i}
      />
    );
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} variant="h5" component="h2">
          {content.title}
        </Typography>
        <FormControl
          error={error}
          component="fieldset"
          className={classes.formControl}
        >
          <RadioGroup
            className={classes.group}
            value={value}
            onChange={handleChange}
          >
            {radio}
          </RadioGroup>
          {warning && error && <FormHelperText>必须选择一个选项</FormHelperText>}
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default withStyles(style)(SingleChoiceCard);
