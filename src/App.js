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
2. React application consists of many hierarchical components.
React applications have component hierarchies (also called component trees). There is usually one
uppermost entry point component (e.g. App) that spans a tree of components below it. The App
is the parent component of the List and Search, so the List and Search are child components of
the App component and sibling components to each other.
In a component tree, there is always a root component (e.g. App), and the components that 
don’t render any other components are called leaf components (e.g. List/Search component in our
current source code). All components can have zero, one, or many child components.
3. The App component doesn’t receive any parameters in its function signature yet. In
the upcoming sections, you will learn how to pass information (props) from one component to
another component. These props will be accessible via the function’s signature as parameters
then.
3. the App component returns code that resembles HTML. You will see how this new
syntax, called JSX, allows you to combine JavaScript and HTML for displaying highly dynamic
and interactive content in a browser.
5. Comments inside react component need to be multi-line comment wrapped in curly braces.*/
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
      {/*new Items component can be used in the App component where we have been
      using the inlined functionality previously.
      Creating an instance of Items component */}
      <Items />
      {/*creating an instance of Search component */}
      <Search />
    </div>
  );
} //END App()

/**Components are the foundation of every React application. Components should scale with application’s
size. Instead of making one component larger and more complex, split one component into multiple 
components eventually. Components encapsulate meaningful tasks while contributing to the greater good of a larger React application. Extracting a component is a task that should be performed very often. It’s always the case that a component will grow in size and complexity*/
function Items() {
  return (
    /*use the built-in JavaScript map method for arrays to iterate over each item 
      of the array (itemArray) and return each item's title.
      Within the map function, we have access to each item and its properties. */
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
  );
}

/**Once we’ve defined a component, we can use it as an HTML element anywhere in our JSX. The
element produces a component instance of your component, or in other words, the component gets
instantiated. You can create as many component instances as you want. It’s not much different from
a JavaScript class definition and usage. However, technically a JavaScript class and React component
are not the same, just their usage makes it convenient to demonstrate their similarities.

This is an Arrow function (for more details see chapter: React Component Definition (Advanced) in The Road to React book by Robin Wieruch). 
An arrow function expression is a compact alternative to a traditional function expression, but is limited and can't be used in all situations. 
If an arrow function’s only purpose is to return a value and it doesn’t have any business logic in between, you can remove the block body (curly braces) of the function. In a concise body, an
implicit return statement is attached, so you can remove the return statement.
See also:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions */
const Search = () => (
  <div>
    <label htmlFor="search">Search: </label>
    <input id="search" type="text" />
  </div>
);

export default App;
