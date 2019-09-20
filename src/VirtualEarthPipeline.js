import React from "react";
import { Button, Form, Icon, InputNumber, Input, Row, Col, Radio } from "antd";

class VirtualEarthPipeline extends React.Component {
  // TODO: in the future change to base class, add inheritance
  constructor(props) {
    super(props);
    // TODO: in the future add error check function inside
    this.state = {
      waypointList: [0, 1],
      viaWaypointList: [],
      waypointErrorList: [false, false],
      viaWaypointErrorList: [],
      radioList1: [
        [
          "TravelMode", 
          "travelMode", 
          "Driving", 
          "Driving", 
          "Walking", 
          "Transit"
        ],
        [
          "Optimize",
          "optimize",
          "time",
          "distance",
          "time",
          "timeWithTraffic",
          "timeAvoidClosure"
        ],
        [
          "DistanceUnit", 
          "distanceUnit", 
          "Kilometer", 
          "Mile", 
          "Kilometer"
        ],
      ],
      radioList2: [
        [
          "TimeType",
          "timeType",
          "",
          "",
          "Arrival",
          "Departure",
          "LastAvailable"
        ],
        ["MaxSolutions", "maxSolutions", "1", "1", "2", "3"],
        [
          "Avoid",
          "avoid",
          "",
          "",
          "highways",
          "tolls",
          "minimizeHighways",
          "minimizeTolls"
        ],
        [
          "RouteAttributes",
          "routeAttributes",
          "",
          "",
          "excludeItinerary",
          "routePath",
          "transitStops",
          "routeSummariesOnly",
          "all"
        ],
        ["RoutePathOutput", "routePathOutput", "", "", "Points"],
      ]
    };
    this.formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      }
    };
    this.formButtonLayout = {
      wrapperCol: {
        xs: { span: 8, offset: 4 },
        sm: { span: 8, offset: 4 }
      }
    };
    this.keyID = 2;
  }

  renderWaypoint(i, keyID, waypointName) {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 }
      }
    };
    
    return (
      <Form.Item 
        {...formItemLayout} 
        label={waypointName + i}
        key = {keyID}
      >
        <Row>
          {getFieldDecorator(waypointName + keyID + "Lat", {
            rules: [
              {
                required: true,
                message: "Please input the latitude"
              }
            ]
          })(
            <Col span={4} xs={8}>
              <span>Latitude: </span>
              <InputNumber min={-90} max={90} />
            </Col>
          )}
          
          {getFieldDecorator(waypointName + keyID + "Lon", {
            rules: [
              {
                required: true,
                message: "Please input the longitude"
              }
            ]
          })(
            <Col span={6} xs={8}>
              <span>Longitude: </span>
              <InputNumber min={-180} max={180} />
            </Col>
          )}
          {this.renderDeleteButton(waypointName, keyID)}
        </Row>
      </Form.Item>
    );
  }
  
  renderDeleteButton(waypointName, keyID) {
    if (waypointName === "waypoint") {
      return (this.state.waypointList.length > 2 ?
               <Icon
                 className="dynamic-delete-button"
                 type="minus-circle-o"
                 disabled={this.state.waypointList.length <= 2}
                 onClick={this.removePoint("waypoint", keyID)}
               />
              : null);
    } else {
      return <Icon
               className="dynamic-delete-button"
               type="minus-circle-o"
               onClick={this.removePoint("viaWaypoint", keyID)}
             />;
    }
  }

  renderRadio(data) {
    const { getFieldDecorator } = this.props.form;
    const RadioGroup = Radio.Group;
    const RadioButton = Radio.Button;
    const formItemLayout = {
      labelCol: {
        xs: { span: 4 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 20 }
      }
    };
    return (
      <Form.Item {...formItemLayout} label={data[0]}>
        {getFieldDecorator(data[1], {
          initialValue: data[2]
        })(
          <RadioGroup 
            name={data[1]}
          >
            {data.map((el, i) =>
              i > 2 ? <RadioButton value={el}>{el==="" ? "None" : el}</RadioButton> : null
            )}
          </RadioGroup>
        )}
      </Form.Item>
    );
  }
  
  renderOptionalInput() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form.Item {...this.formItemLayout} label='DistanceBeforeFirstTurn'>
          {getFieldDecorator('distanceBeforeFirstTurn', {
          })(
            <InputNumber precision={0} min={0} />
          )}
        </Form.Item>
        <Form.Item {...this.formItemLayout} label='Heading'>
          {getFieldDecorator('heading', {
          })(
            <InputNumber min={0} max={359} precision={0} />
          )}
        </Form.Item>
        <Form.Item {...this.formItemLayout} label='Tolerance'>
          {getFieldDecorator('tolerance', {
            rules: [{ required: false }],
          })(
            <Input />
          )}
        </Form.Item>
      </div>
    );
  }

  // TODO: add code for switching mode
  handleSelectionChange(e, data) {
    e.preventDefault();
    switch (data) {
      case "travelMode":
        //alert("hello");
        break;
      default:
        return;
    }
  }

  addPoint = waypointName => e => {
    e.preventDefault();
    const waypointList = this.state.waypointList;
    const viaWaypointList = this.state.viaWaypointList;
    if (waypointName === "waypoint") {
      if (this.state.waypointList.length === 25) {
        alert("The max way point length is 25.");
        return;
      }
      waypointList.push(this.keyID++);
    } else {
      if (this.state.viaWaypointList.length === 10) {
        alert("The max via way point length is 10.");
        return;
      }
      viaWaypointList.push(this.keyID++);
    }

    this.setState({
      waypointList: waypointList,
      viaWaypointList: viaWaypointList
    });
  };

  removePoint = (waypointName, k) => e => {
    e.preventDefault();
    let waypointList = this.state.waypointList;
    let viaWaypointList = this.state.viaWaypointList;
    if (waypointName === "waypoint") {
      if (waypointList.length <= 2) {
        alert("At least two points are required!");
        return;
      }
      waypointList = waypointList.filter(key => key !== k);
    } else {
      viaWaypointList = viaWaypointList.filter(key => key !== k);
    }

    this.setState({
      waypointList: waypointList,
      viaWaypointList: viaWaypointList
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Form.Item {...this.formItemLayout} label="API Key">
          {getFieldDecorator("apiKey", {
            rules: [
              {
                required: true,
                message: "API key is required"
              }
            ]
          })(<Input />)}
        </Form.Item>
        {this.state.radioList1.map(el => this.renderRadio(el))}
        {this.state.waypointList.map((k, i) =>
          this.renderWaypoint(i, k, "waypoint")
        )}       
        {this.state.viaWaypointList.map((k, i) =>
          this.renderWaypoint(i, k, "viaWaypoint")
        )}
        <Form.Item {...this.formButtonLayout}>
          <Button onClick={this.addPoint("waypoint")} >
            <Icon type="plus" /> Add Way Point
          </Button>
          <Button onClick={this.addPoint("viaWaypoint")} >
            <Icon type="plus" /> Add Via Way Point
          </Button>
        </Form.Item>
        
        {this.state.radioList2.map(el => this.renderRadio(el))}
        {this.renderOptionalInput()}

      </div>
    );
  }
}

export default VirtualEarthPipeline;