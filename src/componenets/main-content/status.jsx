import React from "react";
import { Table } from "reactstrap";

class Status extends React.Component {
  
  render() {
    const { statusOn, opinions, options, totalVote } = this.props;
  
    
    return (
      statusOn && totalVote>0 && (
        <Table bordered className="text-center">
          <thead>
            <tr>
              <th>#</th>
              {options.map((opt) => (
                <th>
                  {opt.value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {opinions.map((opinion, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                {options.map((opt) => (
                  <td>
                    {opinion.selectedOption === opt.id ? opinion.name : ""}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th>Total Vote: {totalVote}</th>
              {options.map((opt) => (
                <th>
                  {opt.value} = {opt.vote}
                </th>
              ))}
            </tr>
          </tbody>
        </Table>
      )
    );
  }
}

export default Status;
