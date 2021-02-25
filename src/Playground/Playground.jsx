import React from "react";
import Card from "../Card/Card";
import CardEdit from "../Card/CardEdit/CardEdit";
import Counter from "../Counter/Counter";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import "./Playground.scss";

export const Counter2Click = React.createContext(false);

class Playground extends React.Component {
  state = {
    pageName: "React Playground",
    showCards: false,
    counterClicked: false,
    // selectedCard: -1,
    cards: [
      {
        title: "First card",
        body: "Text for first card. Little bit of lorem ipsum will do?",
      },
      {
        title: "Second card",
        number: 72,
        body: "Text for second card. Little bit of lorem ipsum will do?",
      },
      {
        title: "Third card",
        number: 21,
        body: "Here we go with some content... For the third card!",
      },
    ],
  };

  changeTitleHandler = (event, pageName) => {
    pageName =
      pageName ||
      document.querySelector("#title-input").value ||
      this.state.pageName;

    this.setState({ pageName });
  };

  //! Somehow being called while the page is rendering!
  toggleCardsHandler = (event) => {
    this.setState((prevState) => ({ showCards: !prevState.showCards }));
  };

  onChangeCardHeadingHandler = (heading, key) => {
    let cards = [...this.state.cards];
    cards[key].title = heading;

    this.setState({ cards });
  };

  onDeleteCardHandler(key) {
    const cards = [...this.state.cards];
    cards.splice(key, 1);

    this.setState({ cards });
  }

  toggleChildCounterText = () => {
    this.setState((prevState) => ({
      counterClicked: !prevState.counterClicked,
    }));
  };

  onHideCard = () => {
    this.props.history.push("/playground");
  };

  onEditCard = (card, index) => {
    const cards = [...this.state.cards];
    cards[index] = card;

    this.setState({ cards });
  };

  render() {
    let cardsList,
      cardEdit = null;

    if (this.state.showCards) {
      cardsList = this.state.cards.map((card, index) => (
        <ErrorBoundary key={index}>
          {/* Error generates inside of Card component */}
          <Card
            index={index}
            title={card.title}
            number={card.number}
            onChangeTitle={this.changeTitleHandler}
            onChangeHeading={(event) =>
              this.onChangeCardHeadingHandler(event.target.value, index)
            }
            //! Take care of this!!!
            onDeleteCard={this.onDeleteCardHandler.bind(this, index)}
          >
            {card.body}
          </Card>
        </ErrorBoundary>
      ));
    }

    let urlParams = this.props.match.params;
    if (urlParams.cardID) {
      let selectedCard = this.state.cards[urlParams.cardID];

      cardEdit = (
        <CardEdit
          title={selectedCard.title}
          body={selectedCard.body}
          number={selectedCard.number}
          index={+urlParams.cardID}
          onHide={this.onHideCard}
          onEdit={this.onEditCard}
        />
      );
    }

    return (
      <div className="Playground">
        <h1>{this.state.pageName}</h1>

        <div>
          <input id="title-input" style={{ marginRight: 5 }} />
          <button onClick={this.changeTitleHandler} style={{ height: 34 }}>
            Change title
          </button>
          <br />
          <Counter2Click.Provider value={this.state.counterClicked}>
            <Counter />
          </Counter2Click.Provider>
          <br />
          <hr />
          <button onClick={this.toggleCardsHandler} style={{ marginRight: 5 }}>
            {(this.state.showCards ? "Hide" : "Show") + " cards"}
          </button>
          <button onClick={this.toggleChildCounterText}>
            Toggle context counter text
          </button>
          <br />
          <br />
        </div>

        {cardsList}
        <hr />
        {cardEdit}

        {this.props.location.hash === "#surprise" ? (
          <div className="secret" id="surprise">
            SURPRISE!!!
          </div>
        ) : null}
      </div>
    );
  }
}

export default Playground;
