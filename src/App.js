import * as React from "react";

/*Since we don’t need anything from within the App component that will be used to define
variable 'title' – for example parameters coming from the component’s
function signature – we can define the variable outside of the App component.
RULE OF THUMB: If a variable does not need anything from within the function component’s 
body (e.g. parameters), then define it outside of the component which avoids redefining 
it on every function call.*/
const title = "first react app";
//why const?
/*  avoid var, because of its weird issues with scoping/hoisting
    use const as a default (signals variable shouldn't change)
    use let when variable should be re-assigned */

/**1. This React component, called the App component, is just a JavaScript function. In contrast
to JavaScript functions, it’s defined in PascalCase. This kind of component is commonly
called a function component. Function components are the modern way of using components
in React, however, be aware that there are other variations of React components too. 
2. The App component doesn’t receive any parameters in its function signature yet. In
the upcoming sections, you will learn how to pass information (props) from one component to
another component. These props will be accessible via the function’s signature as parameters
then.
3. the App component returns code that resembles HTML. You will see how this new
syntax, called JSX, allows you to combine JavaScript and HTML for displaying highly dynamic
and interactive content in a browser.*/
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
