import React from "react";
import Radium from "radium";
import "./Card.css";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.onChangeHeading = this.onChangeHeading.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  componentDidMount() {
    if (this.props.index === 1) this.inputRef.current.focus();
  }

  onChangeTitle(event) {
    this.props.onChangeTitle(event, this.props.title);
  }

  onChangeHeading(event) {
    if (String(event.target.value).toLowerCase() === "php") {
      event.target.value = "We don't like elephants";
    }

    this.props.onChangeHeading(event);
  }

  clickHandler = () => {
    this.props.history.push(`/playground/${this.props.index}`);
  };

  render() {
    let inputClasses = ["input"];
    if (String(this.props.title).toLowerCase() === "javascript") {
      inputClasses.push("green");
    } else if (String(this.props.title).toLowerCase() === "python") {
      inputClasses.push("red");
    }

    const cardStyle = {
      boxShadow: "0 4px 5px 0 rgba(0, 0, 0, .14)",
      border: "1px solid #ccc",

      // This works with Radium package
      ":hover": {
        border: "1px solid #aaa",
        boxShadow: "0 4px 15px 0 rgba(0, 0, 0, .25)",
        cursor: "pointer",
      },
    };

    return (
      <div className="Card" style={cardStyle} onClick={this.clickHandler}>
        <h2 className="Card-title">{this.props.title}</h2>
        <div className="Card-children">{this.props.children}</div>
        <br />
        <div>
          <input
            ref={this.inputRef}
            className={inputClasses.join(" ")}
            onChange={this.onChangeHeading}
            value={this.props.title}
          />
          <br />
          <br />
          <button onClick={this.onChangeTitle}>Change Title</button>
        </div>
        <br />
        <div>
          <button
            style={{
              backgroundColor: "crimson",
              color: "#fff",
              borderRadius: "3px",
              border: "1px solid darkred",
              padding: "5px 10px",
            }}
            onClick={this.props.onDeleteCard}
          >
            Delete Card
          </button>
        </div>
        <br />
        <div>
          <strong style={{ display: "block" }}>
            Number:{" "}
            {this.props.number
              ? this.props.number
              : Math.round(Math.random() * 100)}
          </strong>
        </div>
      </div>
    );
  }
}

//* Will give an error in the console if types do not match
Card.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  onChangeTitle: PropTypes.func,
  onChangeHeading: PropTypes.func,
  onDeleteCard: PropTypes.func,
};

export default withRouter(Radium(Card));
