// STATE PROPERTY YOK VE TAMAMEN PROPS OBJECT  UZERİNDEN ÇALIŞIYORUZ (To display data and notify changes)
import React, { Component } from "react";

class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log("prevProps", prevProps);
    console.log("prevState", prevState);
    // if (prevProps.counter.value !== this.prevProps.counter.value) {   //YANİ Props veya State update durumuna göre Ajax calls çağırabiliriz.
    //   // AJAX calls to get new data from server
    //   console.log("prevProps updated"); }
  }

  componentWillUnmount() {
    // This method is called just before a component removed from the DOM
    // Bir componenti Delete yaptığımızda App componentin Statei değişir  ve Entire Component Tree rerendered olur
    // Bu durumda 1 tane eksik countera sahip yeni bir Virtual DOM olur. React bunu eski Virtual DOM ile karşılaştırır
    // Ve bir componentin (counter) silindiğini anlar ve bu counterı DOMdan silemden önce componentWillUnmount u çağırır
    // Böylece her türlü cleanup işini yaparız. (Timers, listeners...vb. DOMa aktarılmadan önce silinir).YANİ Memory Leaks olmaz.

    console.log("Component-Unmount");
  }

  render() {
    console.log("Counter-Rendered");
    return (
      <div className="row">
        <div className="col-1">
          <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        </div>
        <div className="col">
          <button
            onClick={() => this.props.onIncrement(this.props.counter)}
            className="btn btn-secondary btn-sm"
          >
            {" "}
            +{" "}
          </button>
          <button
            onClick={() => this.props.onDecrement(this.props.counter)}
            className="btn btn-secondary btn-sm m-2"
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
          >
            {" "}
            -{" "}
          </button>
          <button
            onClick={() => this.props.onDelete(this.props.counter.id)}
            className="btn btn-danger btn-sm"
          >
            {" "}
            Delete{" "}
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? <h4>Zero</h4> : value;
  }
}
export default Counter;

// burdaki m-2 butonun hem sağına hem soluna margin verir
