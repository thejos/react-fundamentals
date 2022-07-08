import * as React from "react";

/*Since we don’t need anything from within the App component that will be used to define
variable 'title' – for example parameters coming from the component’s
function signature – we can define the variable outside of the App component*/
const title = "first react app";
//why const?
/*  avoid var, because of its weird issues with scoping/hoisting
    use const as a default (signals variable shouldn't change)
    use let when variable should be re-assigned */

function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <hr />
      <h3>{title}</h3>
    </div>
  );
}

export default App;
