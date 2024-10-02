import React from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import Status from "./status";

class ParticipationForm extends React.Component {
  state = {
    name: "",
    selectedOption: "",
    errors: {},
    statusOn:false
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { errors, isValid } = this.validate();

    if (isValid) {
      this.props.getOpinion({
        pollId: this.props.poll.id,
        name: this.state.name,
        selectedOption: this.state.selectedOption,
      });

      event.target.reset();
      this.setState({
        name: "",
        selectedOption: "",
        errors: {},
      });
    } else {
      this.setState({ errors });
    }
  };

  validate = () => {
    const errors = {};

    if (!this.state.name) {
      errors.name = "Please Provide A Name";
    } else if (this.state.name.length > 20) {
      errors.name = "Name Too Long";
    }

    if (!this.state.selectedOption) {
      errors.selectedOption = "Please Select One Option";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  handleStatus = (event) => {
    this.setState({
      statusOn:!this.state.statusOn
    })
  };

  render() {
    return (
      <Container>
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <div className="d-flex">
              <h4>Options</h4>

              <Button
                color="warning"
                type="button"
                onClick={this.props.toggleModal}
                className="ms-auto"
              >
                Edit
              </Button>

              <Button
                type="button"
                color="danger"
                onClick={() => this.props.deletePoll(this.props.poll.id)}
                className="ms-2"
              >
                Delete
              </Button>
            </div>

            {this.props.poll.options.map((opt) => (
              <FormGroup className="my-2" key={opt.id}>
                <Label className="d-flex">
                  <Input
                    type="radio"
                    id={opt.id}
                    name="selectedOption"
                    value={opt.id}
                    onChange={this.handleChange}
                    invalid={this.state.errors.selectedOption ? true : false}
                  />
                  <text className="mx-2">{opt.value}</text>
                  <span
                    style={{
                      padding: "5px 20px",
                      background: "green",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    className="ms-auto"
                  >
                    {opt.vote}
                  </span>
                  <span
                    style={{
                      padding: "5px 20px",
                      background: "orange",
                      color: "white",
                      borderRadius: "5px",
                    }}
                    className="ms-2"
                  >
                    {this.props.poll.totalVote > 0
                      ? ((100 * opt.vote) / this.props.poll.totalVote).toFixed(
                          2
                        )
                      : 0}
                    %
                  </span>
                </Label>
              </FormGroup>
            ))}
            {this.state.errors.selectedOption && (
              <small style={{ color: "#DC3845" }}>
                {this.state.errors.selectedOption}
              </small>
            )}
            <FormGroup className="my-3">
              <Label>Enter Your Name</Label>
              <Input
                name="name"
                placeholder="Your Name"
                value={this.state.name}
                onChange={this.handleChange}
                invalid={!!this.state.errors.name}
              />
              {this.state.errors.name && (
                <FormFeedback>{this.state.errors.name}</FormFeedback>
              )}
            </FormGroup>
            <Button type="submit">Submit Your Opinion</Button>
            {console.log(this.state.name)}
          </Form>
        </Row>
        <Row className="mt-3">
          <Col md={2}>
            {this.props.poll.totalVote>0 && (
              <Button color="primary" onClick={this.handleStatus}>
                Status
              </Button>
            )}
          </Col>
          <Col md={10}>
            <Status
              statusOn = {this.state.statusOn} 
              totalVote={this.props.poll.totalVote}
              opinions={this.props.poll.opinions}
              options={this.props.poll.options}
              
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ParticipationForm;
