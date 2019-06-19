import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import {withStyles} from "@material-ui/core/styles";

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

function MultiChoiceCard(props) {
  const {classes, content, warning, callback} = props;

  let defaultChecked = {};
  for (let i = 0; i < content.arr.length; i++) {
    defaultChecked = {...defaultChecked, [i]:false};
  }
  const [checked, setChecked] = React.useState(defaultChecked);

  const getAnswer = () => {
    let ret = [];
    for (let i = 0; i < checked.length; i++) {
      if (checked[i]) {
        ret.push(i);
      }
    }
    return ret.join("&");
  };
  const handleChange = (index) => (event) => {
    setChecked({...checked, [index]:event.target.checked});
    callback(getAnswer());
  };

  function count(arr) {
    let number = 0;
    for (let i = 0; i < Object.keys(arr).length; i++) {
      if (arr[i]) number++;
    }
    return number;
  }

  let number = count(checked);
  let error = number < content.minNum || number > content.maxNum;
  let checkbox = [];
  for (let i = 0; i < content.arr.length; i++) {
    checkbox.push(
      <FormControlLabel
        control={<Checkbox checked={checked[i]} onChange={handleChange(i)} value={i}/>}
        label={content.arr[i]}
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
          <FormGroup>
            {checkbox}
          </FormGroup>
          {warning && error && <FormHelperText>请选择{content.minNum === content.maxNum ? content.minNum : content.minNum + "--" + content.maxNum}个选项</FormHelperText>}
        </FormControl>
      </CardContent>
    </Card>
  );
}

export default withStyles(style)(MultiChoiceCard);