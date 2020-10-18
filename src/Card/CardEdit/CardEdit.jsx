import React, { useState, useEffect } from "react";
import "./CardEdit.scss";

export default function CardEdit(props) {
  const [card, setCard] = useState({
    title: props.title,
    body: props.body,
    number: props.number,
  });

  useEffect(() => {
    setCard({
      title: props.title,
      body: props.body,
      number: props.number,
    });
  }, [props.title, props.body, props.number]);

  const onSubmit = (event) => {
    props.onEdit(card, props.index);
    event.preventDefault();
  };

  return (
    <div className="CardEdit">
      <h3>Edit card #{props.index + 1}</h3>
      <small onClick={props.onHide} className="hide">
        Hide
      </small>
      <form onSubmit={onSubmit}>
        <div className="form-item">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={card.title}
            onChange={(e) => setCard({ ...card, title: e.target.value })}
          />
        </div>
        <div className="form-item">
          <label htmlFor="body">Text:</label>
          <textarea
            id="body"
            name="body"
            cols="30"
            rows="10"
            onChange={(e) => setCard({ ...card, body: e.target.value })}
            value={card.body}
          />
        </div>
        <div className="form-item">
          <label htmlFor="number">Number:</label>
          <input
            id="number"
            type="number"
            value={card.number ?? 0}
            onChange={(e) => setCard({ ...card, number: +e.target.value })}
          />
        </div>
        <div className="form-item">
          <button type="submit">Save changes</button>
        </div>
      </form>
    </div>
  );
}
