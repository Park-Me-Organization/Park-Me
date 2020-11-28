import React from 'react';
import {Link} from "react-router-dom"
import Button from '@material-ui/core/Button';

function Btn(props){
    console.log(props.page)
    return(
        <Button component={Link} to={props.page}>
        words
      </Button>
    );
}
export default Btn;