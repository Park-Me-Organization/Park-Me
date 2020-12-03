import { set, differenceInMinutes } from "date-fns";
import React from "react";
import { format } from "date-fns";
import TimeRange from "react-timeline-range-slider";
import { Redirect } from "react-router-dom";

const now = new Date();
const getTodayAtSpecificHour = (hour = 9) =>
  set(now, { hours: hour, minutes: 0 });
const timelineInterval = [
  getTodayAtSpecificHour(0),
  getTodayAtSpecificHour(24)
];

class ReservationDetails extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.state.parkingData);
    this.state = {
      error: false,
      disabledIntervals: [
        {
          start: getTodayAtSpecificHour(0),
          end: getTodayAtSpecificHour(
            this.props.location.state.parkingData.hours.opening
          )
        },
        {
          start: getTodayAtSpecificHour(
            this.props.location.state.parkingData.hours.opening
          ),
          end: getTodayAtSpecificHour(now.getHours())
        },
        {
          start: getTodayAtSpecificHour(
            this.props.location.state.parkingData.hours.closing
          ),
          end: getTodayAtSpecificHour(24)
        }
      ],
      selectedInterval: [getTodayAtSpecificHour(), getTodayAtSpecificHour(15)],
      toUserInfo: false,
      finalRegistrationInfo: {
        name: this.props.location.state.parkingData.name,
        hours: this.props.location.state.parkingData.hours,
        address: this.props.location.state.parkingData.address
      }
    };
    this.handleClick = this.handleClick.bind(this);
  }

  errorHandler = ({ error }) => this.setState({ error });
  onChangeCallback = selectedInterval =>
    this.setState({ selectedInterval }, () => {});

  handleClick(e) {
    console.log(differenceInMinutes(this.state.selectedInterval[0], this.state.selectedInterval[1])/60.0)
    this.setState({
      toUserInfo: true,
      finalRegistrationInfo: {
        parkingData:{
          lotName: this.props.location.state.parkingData.name,
        hours: this.props.location.state.parkingData.hours,
        address: this.props.location.state.parkingData.address,
        startReservation: format(
          this.state.selectedInterval[0],
          " MMM dd, hh:mm a"
        ),
        endReservation: format(
          this.state.selectedInterval[1],
          " MMM dd, hh:mm a"
        ), price: this.props.location.state.parkingData.price,
        total: (this.props.location.state.parkingData.price * (differenceInMinutes(this.state.selectedInterval[0], this.state.selectedInterval[1])/60.0))*-1
        }
        
      }
    });
  }

  render() {
    if (this.state.toUserInfo === true) {
      return (
        <Redirect
          to={{
            pathname: "/userinfo",
            state: this.state.finalRegistrationInfo
          }}
        />
      );
    }
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <div
          style={{
            fontFamily: "Roboto Slab",
            color: "#606367",
            fontSize: "1.2rem",
            margin: "20px 0",
            textAlign: "center"
          }}
        >
          <h1 style={{ fontFamily: "Roboto Slab" }}>
            How long do you want to stay?{" "}
          </h1>
          <span style={{ textAlign: "center" }}>
            {format(this.state.selectedInterval[0], " MMM dd, hh:mm a")} to
            {format(this.state.selectedInterval[1], " MMM dd, hh:mm a")}
          </span>
        </div>

        <TimeRange
          error={this.state.error}
          ticksNumber={24}
          selectedInterval={this.state.selectedInterval}
          timelineInterval={timelineInterval}
          onUpdateCallback={this.errorHandler}
          onChangeCallback={this.onChangeCallback}
          disabledIntervals={this.state.disabledIntervals}
        />
        <button
          className="btn btn-primary"
          style={{
            backgroundColor: "#1A2637",
            borderColor: "white",
            fontFamily: "Roboto Slab",
            marginTop: "40px",
            width: "300px"
          }}
          onClick={this.handleClick}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default ReservationDetails;
