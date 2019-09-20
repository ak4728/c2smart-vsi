import React from "react";
import { Button } from "antd";
import VirtualEarthDataView from "./VirtualEarthDataView";
import NJTransitDataView from "./NJTransitDataView";
import NY511DataView from "./NY511DataView";
import TwitterDataView from "./TwitterDataView";


class DataViewMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputList: [
        <Button key="VirtualEarth" onClick={() => this.renderDataView("VirtualEarth")}>
          VirtualEarth
        </Button>,
        <Button key="NJTransit" onClick={() => this.renderDataView("NJTransit")}>
          NJTransit
        </Button>,
        <Button key="NY511" onClick={() => this.renderDataView("NY511")}>
          NY511
        </Button>,
        <Button key="Twitter" onClick={() => this.renderDataView("Twitter")}>
        Twitter
        </Button>,
        <Button key="D" onClick={() => this.renderDataView("D")}>DataViewD</Button>,
       ]
     };
    this.renderDataView = this.renderDataView.bind(this);
  }

  renderDataView(name) {
    switch (name) {
      case "VirtualEarth":
        this.setState({
          inputList: <VirtualEarthDataView />
        });
        break;
      case "NJTransit":
        this.setState({
          inputList: <NJTransitDataView />
        });
        break;
      case "NY511":
        this.setState({
          inputList: <NY511DataView />
        });
        break;
      case "Twitter":
        this.setState({
          inputList: <TwitterDataView />
        });
        break;
      default:
      return null;    
    }
  }

  render() {
    return (
      <div className="popuptext" id="data">
        {this.state.inputList}
      </div>
    );
  }
}

export const API_URL = '/c2smart-vsi/';

export default DataViewMenu;