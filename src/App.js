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

// JavaScript Object
/*Object values are written as name : value pairs (name and value separated by a colon).*/
const welcome = {
  greeting: "hey",
  welcomeTitle: title,
};

/*Essentially everything in curly braces in JSX can be used for JavaScript. For example, executing a
function works this way too*/
function getTitle(titleText) {
  return titleText;
}

/*let’s define the array as a variable. Similar as before, we can define a variable outside or inside
the component. The following defines it outside: */
const itemArray = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
]; //end itemArray[]
/*Each item in the array has a title, a url, an author, an identifier (objectID),
 points – which indicate the popularity of an item – and a count of comments (num_comments). */

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
and interactive content in a browser.
4. Comments inside react component need to be multi-line comment wrapped in curly braces*/
function App() {
  return (
    <div>
      <h1>Hello World</h1>
      <hr />
      {/*The returned output of the App component not only resembles HTML, but it
      can also be mixed with JavaScript. In fact, this output is called JSX
      (JavaScript XML), powerfully combines HTML and JavaScript.*/}
      <h3>{title}</h3>
      <h3>
        {welcome.greeting} {welcome.welcomeTitle}
      </h3>
      <h3>hey {getTitle(title)} again!</h3>
      <hr />

      {/*use the built-in JavaScript map method for arrays to iterate over each item 
      of the array (itemArray) and return each item's title.
      Within the map function, we have access to each item and its properties. */}
      <ul>
        {itemArray.map(function (item) {
          return (
            <li key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span>&ensp;- {item.author},</span>
              <span> {item.points} pts,</span>
              <span> {item.num_comments} comments</span>
            </li>
          );
        })}
      </ul>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
  );
}

export default App;
