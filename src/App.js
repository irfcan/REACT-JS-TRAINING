import React, { Component } from "react";
import NavBar from "./components/navbar";
import "./App.css";
import Counters from "./components/counters";

class App extends Component {
  // MULTIPLE SYNC OLMASI İÇİN RENDERA KADAR OLAN KISIMLAR COUNTERS COMPONENTINDEN BURAYA ALINDI. CUNKU APP COMPONENETİ PARENT.
  state = {
    counters: [
      { id: 1, value: 0 },
      { id: 2, value: 5 },
      { id: 3, value: 0 },
      { id: 4, value: 0 }
    ]
  };

  constructor() {
    // Bu metod sadece 1 defa component ilk defa oluşturulduğunda olur
    super();
    console.log("App-Constructor");
  }

  // constructor(props) {
  //   // Bu metod sadece 1 defa component ilk defa oluşturulduğunda olur
  //   super(props); // We pass props to the constructor of the base class.
  //   console.log("App-Constructor",this.props);
  //   this.state = this.props.something; // Burda this.setState metodunu çağıramayız.hata verir. Çünkü this.setState componenet render edilirken yani DOMa yerleştirilrken  çağrılır
  // }

  // componentDidMount is called after the component is rendered into the DOM and it's the perfect place to make AJAX calls to get data from the server
  componentDidMount() {
    //AJAX Calls
    // this.setState({movie});  gibi olacak
    console.log("App-Mounted");
  }

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };

  handleReset = () => {
    const counters = this.state.counters.map(m => {
      m.value = 0;
      return m;
    });
    this.setState({ counters });
  };

  handleDelete = counterId => {
    const counters = this.state.counters.filter(c => c.id !== counterId);
    this.setState({ counters });
  };

  render() {
    console.log("App-Rendered");
    return (
      <React.Fragment>
        <NavBar
          totalCounters={this.state.counters.filter(x => x.value > 0).length}
        />

        <main className="container">
          <Counters
            //No states in COUNTERS component. It simply receives the Data and Methods to modify the data via props (from App).So it's entirely controlled via parents
            // So this is how we lift the state
            counters={this.state.counters}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onReset={this.handleReset}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
