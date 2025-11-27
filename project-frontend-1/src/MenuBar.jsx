import { Component } from "react";
import "./MenuBar.css";

export default class MenuBar extends Component {
  constructor() {
    super();
    this.state = {
      active: null,
      showMenu: true,
    };
  }

  handleMenuClick(mid) {
    this.setState({ active: mid });
    this.props.onMenuClick(mid);
  }

  render() {
    const { active } = this.state;

    return (
      <div className="menubar">

        <div
          className="menuLogo"
          onClick={() => this.setState({ showMenu: !this.state.showMenu })}
        >
          <img src="./menu.png" alt="menu" />
          MENU
        </div>

        {this.state.showMenu && (
          <ul className="menuTabs fullWidth">
            <li
              className={active === "1" ? "active" : ""}
              onClick={() => this.handleMenuClick("1")}
            >
              📌 Job Posting
            </li>

            <li
              className={active === "2" ? "active" : ""}
              onClick={() => this.handleMenuClick("2")}
            >
              🔍 Job Search
            </li>

            <li
              className={active === "3" ? "active" : ""}
              onClick={() => this.handleMenuClick("3")}
            >
              👤 My Profile
            </li>
          </ul>
        )}
      </div>
    );
  }
}
