import React from "react";
import { Input, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import PollList from "./poll_list";
import PollForm from "../poll-form";

class SideBar extends React.Component {
  state = {
    openModal: false,
  };
  toggleModal = () => {
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    return (
      <div style={{ background: "#efefef", padding: "10px" }}>
        <div className="d-flex mb-5">
          <Input
            type="search"
            placeholder="Search"
            value={this.props.searchTerm}
            onChange={(e) => this.props.handleSearch(e.target.value)}
          />
          <Button color="success" className="ms-2" onClick={this.toggleModal}>
            New
          </Button>
        </div>
        <h3 className="text-center">List of Polls</h3>
        <hr />
        <PollList polls={this.props.polls} selectPoll={this.props.selectPoll} />

        <Modal
          isOpen={this.state.openModal}
          toggle={this.toggleModal}
          unmountOnClose={true}
        >
          <ModalHeader toggle={this.toggleModal}>Create A New Poll</ModalHeader>
          <ModalBody>
            <PollForm submit={this.props.addNewPoll} modalClose={this.toggleModal}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default SideBar;
