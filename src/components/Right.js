import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import './Right.css';
import SortIcon from '@material-ui/icons/Sort';
import Card from './Card';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import DateTimePicker from 'react-datetime-picker';

class Right extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      anchor: "right",
      task: {
        date: new Date(),
        title: "",
        desc: "",
      },
      taskArr: [],
      errors: {
        title: "",
        desc: ""
      },
    };

    // this.handleClick = this.handleClick.bind(this);
    // this.handleTitle = this.handleTitle.bind(this);
    // this.handleDes = this.handleDesc.bind(this);
    // this.handleTime = this.handleTime.bind(this);
    // this.handleDate = this.handleTime.bind(this);
  }

  // componentDidMount() {
  //   this.hydrateStateWithLocalStorage();
  //
  //   // add event listener to save state to localStorage
  //   // when user leaves/refreshes the page
  //   window.addEventListener(
  //     "beforeunload",
  //     this.saveStateToLocalStorage.bind(this)
  //   );
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener(
  //     "beforeunload",
  //     this.saveStateToLocalStorage.bind(this)
  //   );
  //
  //   // saves if component has a chance to unmount
  //   this.saveStateToLocalStorage();
  // }
  //
  // hydrateStateWithLocalStorage() {
  //   // for all items in state
  //   for (let key in this.state) {
  //     // if the key exists in localStorage
  //     if (localStorage.hasOwnProperty(key)) {
  //       // get the key's value from localStorage
  //       let value = localStorage.getItem(key);
  //
  //       // parse the localStorage string and setState
  //       try {
  //         value = JSON.parse(value);
  //         this.setState({ [key]: value });
  //       } catch (e) {
  //         // handle empty string
  //         this.setState({ [key]: value });
  //       }
  //     }
  //   }
  // }
  //
  // saveStateToLocalStorage() {
  //   // for every item in React state
  //   for (let key in this.state) {
  //     // save to localStorage
  //     localStorage.setItem(key, JSON.stringify(this.state[key]));
  //   }
  // }

  handleClick = () => {
    this.setState((oldstate) => {
        var a = oldstate;
        a.open = true;
        return a;
      });
  }

  handleTitle = (event) => {
    this.setState({
      task:
        {
          date: this.state.task.date,
          title: event.target.value,
          desc:  this.state.task.desc ,
        }
      });
  }

  handleDesc = (event) => {
    this.setState({
      task:
        {
          date: this.state.task.date,
          title: this.state.task.title,
          desc: event.target.value,
        }
      });
  }

  handleDateChange = date => this.setState({
    task:
      {
        date: date,
        title: this.state.task.title,
        desc: this.state.task.desc,
      }
    }
  );

  handleDelete = (index) => {
    this.setState((oldState) => {
      var a = oldState;
      var arr = [...a.taskArr];
      arr.splice(index, 1);
      a.taskArr = arr;
      return a;
    });
  }

  handleClose = () => {
    this.setState((oldstate) => {
        var a = oldstate;
        a.open = false;
        a.errors.title = "";
        a.errors.desc = "";
        return a;
      });
  }

  handleSave = () => {
    if(this.state.task.title == "" && this.state.task.desc == "" &&
       this.state.task.date != new Date()){
       this.setState((oldState) => {
         var a = oldState;
         a.open = false;
         return a;
       });
    }
    else {
      var situation1 = !this.state.task.title.match(/^^[a-zA-Z0-9 ]*$/);
      var situation2 = this.state.task.title.length < 3 ||
                       this.state.task.title.length > 30;
      var situation3 = this.state.task.desc.length < 3 ||
                       this.state.task.desc.length > 255;
      var situation4 = !this.state.task.desc.match(/^^[a-zA-Z0-9 ]*$/);
      if(situation1){
        this.setState({
          errors: {
            title: "Alphanumeric"
          },
          open: true
        }
      )}
      else if(situation2){
        this.setState({
          errors: {
            title: "Length"
          },
          open: true
        }
      )}
      else if(situation1 && situation2){
        this.setState({
          errors: {
            title: "Both"
          },
          open: true
        }
      )}
      else if(situation3){
        this.setState({
          errors: {
            desc: "Length"
          },
          open: true
        }
      )}
      else if(situation4){
        this.setState({
          errors: {
            desc: "Alphanumeric"
          },
          open: true
        }
      )}
      else if(situation3 && situation4){
        this.setState({
          errors: {
            desc: "Both"
          },
          open: true
        }
      )}
      else {
        var joined = this.state.taskArr.concat(this.state.task);
        this.setState((oldState) => {
          var a = oldState;
          a.taskArr = joined;
          a.open = false;
          a.errors.title = "";
          a.errors.desc = "";
          return a;
        });
      }
    }
  }

  render(){
    // console.log(moment(this.state.task.date).format("DD-MMM-YYYY, h:mma"));
    return (
      <div className="Right">
          <div className="right-content-up">
            <div className="add-button">
              <Button
                color="default"
                variant="outlined"
                startIcon={<AddIcon/>}
                onClick={this.handleClick}
              >
              Add task
              </Button>
            </div>
            <div className="sort-button">
              <Button
                variant="contained"
                color="primary"
                startIcon={<SortIcon />}
              >
              Sort by
              </Button>
            </div>
          </div>
          <div className="right-content-down">
          {this.state.taskArr.map((task, i) =>
            <Card item={task} index={i} idx={this.handleDelete}/>
          )}
          </div>
          <Drawer anchor={this.state.anchor} open={this.state.open}>
            <div className="drawer">
              <div className="upper-drawer-content">
                <div className="header-content">
                  MAKE YOUR DAY <br/> MORE <br/> STRUCTURED
                </div>
              </div>
              <div className="middle-drawer-content">
                <div className="content">
                  <TextField
                    id="outlined-basic"
                    label="Title"
                    variant="outlined"
                    onChange={this.handleTitle}
                    />
                    {this.state.errors.title != "" && this.state.errors.title}
                </div>
                <div className="content">
                  <TextField
                    id="outlined-basic"
                    label="Description"
                    variant="outlined"
                    onChange={this.handleDesc} />
                    {this.state.errors.desc != "" && this.state.errors.desc}
                </div>
                <div className="content">
                  <DateTimePicker
                    value={this.state.task.date}
                    onChange={this.handleDateChange}
                  />
                </div>
              </div>
              <div className="lower-drawer-content">
                <Button
                  color="default"
                  //variant="outlined"
                  onClick={this.handleClose}
                >
                Cancel
                </Button>
                <Button
                  color="default"
                  variant="outlined"
                  onClick={this.handleSave}
                >
                Save
                </Button>
              </div>
            </div>
          </Drawer>
        </div>
    );
  }
}



export default Right;
