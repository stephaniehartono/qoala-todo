import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import './Left.css';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const THEME = createMuiTheme({
   typography: {
    "fontFamily": "\"Nunito\", \"OpenSans\", sans-serif",
    "fontSize": 90,
    "fontWeight": 700,
   }
});

class Left extends Component {
  render(){
    return (
      <div className="Left">
        <div className="left-content-up">
          <ThemeProvider theme={THEME}>
            <Typography>Hello,<br /> you!</Typography>
          </ThemeProvider>
        </div>
      </div>
    );
  }
}



export default Left;
