import React from "react";
import {Form,FormGroup,FormFeedback,Input,Label,Button} from 'reactstrap'

class ParticipationForm extends React.Component{
    state={
        name:'',
        selectedOption:'',
        errors:{}
    }
    handleChange = event =>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }
}