import React, {Component} from 'react';
import './Card.css';
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';

class Card extends Component {

  handleClick = () => {
    this.props.idx(this.props.index);
  }

  render(){
    const dateTime = moment(this.props.item.date).format("DD-MMMM-YYYY, h:mmA").split(',');

    const date = dateTime[0];
    const time = dateTime[1];

    const seperatedDate = date.split('-');

    return (
      <div className="Card">
        <div className="left-content">
          <div className="date">
            <div className="date-content">{seperatedDate[1].toUpperCase()} <br/> {seperatedDate[0]}, {seperatedDate[2]}</div>
          </div>
          <div className="time">
            <div className="time-content">{time}</div>
          </div>
        </div>
        <div className="right-content">
          <div className="delete-button" onClick={this.handleClick}>
            <DeleteIcon/>
          </div>
          <div className="title">
            <div className="title-content">
              {this.props.item.title.toUpperCase()}
            </div>
          </div>
          <div className="desc">
            <div className="desc-content">
              {this.props.item.desc.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default Card;
