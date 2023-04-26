import * as React from "react";
import { Fragment } from "react";
import axios from "axios";
import "./App.css";

/*Since we don’t need anything from within the App component that will be used to define
variable 'title' – for example parameters coming from the component’s
function signature – we can define the variable outside of the App component.
RULE OF THUMB: If a variable does not need anything from within the function component’s 
body (e.g. parameters), then define it outside of the component which avoids redefining 
it on every function call.*/
const title = "React.js";
//why const?
/*  avoid var, because of its weird issues with scoping/hoisting
    use const as a default (signals variable shouldn't change)
    use let when variable should be re-assigned */

// JavaScript Object
/*Object values are written as name : value pairs (name and value separated by a colon).*/
const welcome = {
  greeting: "this is",
  welcomeTitle: title,
};

/*Essentially everything in curly braces in JSX can be used for JavaScript. For example, executing a
function works this way too*/
function getTitle(titleText) {
  return titleText;
}

const storiesReducer = (state, action) => {
  switch (action.type) {
    case "STORIES_FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "STORIES_FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "STORIES_FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case "REMOVE_STORY":
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

/*Fetch data from a real remote third-party API. We will use the reliable and informative Hacker
News API to request popular tech stories. */
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

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
  console.log("App renders");

  /*Notify React to re-render the component with the new searchTerm state after the event handler updated it. In order to do so, we need to tell React that searchTerm is a state that changes over time and that whenever it changes React has to re-render its affected component(s).
  React offers us a utility function called useState for it.
  React’s useState function takes an initial state as an argument – where we will use an empty string.
  By providing this initial state to useState, we are telling React that this state will change over time.
  Furthermore, calling this function will return an array with two entries: The first entry (searchTerm)
  represents the current state; the second entry is a function to update this state (setSearchTerm).
  It’s important to note that the useState function is called a React hook. It’s only one of many
  hooks provided by React.*/
  const [searchTerm, setSearchTerm] = React.useState(
    //use the stored value, if a value exists, to set the initial state of the searchTerm in React’s
    //useState Hook. Otherwise, default to our initial state (“”) - empty string.
    localStorage.getItem("searchingFor") || ""
  );

  /*Use React’s useEffect Hook to trigger the side-effect each time the searchTerm changes.
  Using a side-effect to store the recent search from the browser’s local storage and load it upon component initialization.  */
  React.useEffect(() => {
    /*use the local storage to store the searchTerm accompanied by an identifier
    whenever a user types into the HTML input field*/
    localStorage.setItem("searchingFor", searchTerm);
  }, [searchTerm]);

  const [url, setUrl] = React.useState(`${API_ENDPOINT}${searchTerm}`);

  const [stories, dispatchStories] = React.useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  const handleFetchStories = React.useCallback(async () => {
    if (!url) {
      return;
    }
    dispatchStories({ type: "STORIES_FETCH_INIT" });
    try {
      const result = await axios.get(url);
      dispatchStories({
        type: "STORIES_FETCH_SUCCESS",
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: "STORIES_FETCH_FAILURE" });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item) => {
    dispatchStories({ type: "REMOVE_STORY", payload: item });
  };

  const handleSearchInput = (event) => {
    //second entry - setSearchTerm (from a useState()), a function to update the state.
    setSearchTerm(event.target.value);
    console.log(event.target.value);
  }; // arrow function

  const handleSearchSubmit = (event) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
    /*preventDefault is called on the event when submitting the form to 
    prevent a browser reload/refresh. In the past, it was desired to refresh 
    the browser to flush all state and to submit the data to a backend. Nowadays, 
    a library such as React, provides more flexibility in dealing with the submit event.*/
    event.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="headline-primary">Hacker Stories</h1>
      <hr />
      {/*The returned output of the App component not only resembles HTML, but it
      can also be mixed with JavaScript. In fact, this output is called JSX
      (JavaScript XML), powerfully combines HTML and JavaScript.*/}
      <h3>{title}</h3>
      <h3>
        {welcome.greeting} {welcome.welcomeTitle}
      </h3>
      <h3>this is {getTitle(title)} app</h3>
      <hr />
      <br />
      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <br />
      {stories.isError && <p>An error occured...</p>}
      {stories.isLoading ? (
        <p>&ensp;Loading...</p>
      ) : (
        <Items items={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
} //END App()

/**Components are the foundation of every React application. Components should scale with application’s
size. Instead of making one component larger and more complex, split one component into multiple 
components eventually. Components encapsulate meaningful tasks while contributing to the greater good of a larger React application. Extracting a component is a task that should be performed very often. It’s always the case that a component will grow in size and complexity.

What are React props?
Essentially React component props are used to pass data from component to component.
Everything that we pass from a parent component to a child component via a component element’s
HTML attribute can be accessed in the child component. The child component receives an object
parameter (props) which includes all the passed attributes as properties (props).
In conclusion, one can see how props are used to pass information down the component tree.
Following this explanation, information (props) can only be passed from a parent to a child
component and not vice versa.
It's also important to note that React's props are read only (immutable). As a developer, you should never mutate props but only read them in your components. You can derive new values from them though (see computed properties later). After all, props are only used to pass data from a parent to a child component React. Essentially props are just the vehicle to transport data down the component tree.*/
/* *Chapter: Props Handling (Advanced):
Destructuring the props object right away in the function signature of our component. */
function Items({ items, onRemoveItem }) {
  console.log("Items renders");
  return (
    /* use React props to pass the 'storiesArray' to the 'Items' component;
    After passing it to the 'Items' component, we can access it as 'items' property from the 'props' object in the 'Items' component’s function signature;
    Use the built-in JavaScript map method for arrays to iterate over each item 
    of the array (storiesArray) and return each item's title.
    Within the map function, we have access to each item and its properties. */
    <ul>
      {items.map(function (item) {
        return (
          <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
        );
      })}
    </ul>
  );
}

/**Chapter: Props Handling (Advanced):
Refactor Item component from traditional function to arrow function. Destructuring the props object right away in the function signature of the component. */
const Item = ({ item, onRemoveItem }) => {
  console.log("Item renders");
  return (
    <li className="item">
      <span style={{ width: "50%" }}>
        <a href={item.url} target="_blank" rel="noreferrer">
          {item.title}
        </a>
      </span>
      <span style={{ width: "20%" }}>&ensp;- {item.author},</span>
      <span style={{ width: "10%" }}> {item.points} pts,</span>
      <span style={{ width: "10%" }}> {item.num_comments} comments</span>
      <span style={{ width: "10%" }}>
        &nbsp;
        <button
          className="button button_small"
          type="button"
          onClick={() => onRemoveItem(item)}
        >
          Dismiss
        </button>
      </span>
    </li>
  );
};

const SearchForm = ({ searchTerm, onSearchInput, onSearchSubmit }) => (
  <form className="search-form" onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      inputValue={searchTerm}
      onInputChange={onSearchInput}
      //Using just isFocused as an attribute is equivalent to isFocused={true}
      isFocused
    >
      <strong>Search:</strong>
    </InputWithLabel>
    <button className="button_large" type="submit" disabled={!searchTerm}>
      Submit
    </button>
  </form>
);

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
/* *Chapter: Props Handling (Advanced):
React’s props are rarely used in components by themselves; rather, all the information that
is contained in the props object is used. By destructuring the props object right away in the
component’s function signature, we can conveniently access all information without dealing with
its props container.
Destructuring the props object right away in the function signature of our component.*/
const InputWithLabel = ({
  id,
  isFocused,
  children,
  type = "text",
  onInputChange,
  inputValue,
}) => {
  const inputRef = React.useRef();

  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    /*One caveat with JSX, especially when we create a dedicated searchForm component, is that we must introduce a wrapping HTML element (<div></div>) to render it. Another solution is to use a React fragment. A fragment wraps other elements into a single top-level element without adding to the rendered output. As an alternative, you can also use <React.Fragment></React.Fragment> instead of the shorthand <></> All Search elements, input field, label and span should be visible in your browser now. So if you prefer to omit the wrapping <div> or <span> elements, substitute them with an empty tag that is allowed in JSX, and doesn’t introduce intermediate elements in your rendered HTML.
    Fragments are useful because grouping elements with a Fragment has no effect on layout or styles, unlike if you wrapped the elements in another container like a DOM element. Grouping elements in Fragment has no effect on the resulting DOM; it is the same as if the elements were not grouped. Note: Modern React uses <Fragment></Fragment>*/
    <Fragment>
      <label className="label" htmlFor={id}>
        &ensp;{children}{" "}
      </label>
      <input
        className="input"
        id={id}
        type={type}
        onChange={onInputChange}
        autoComplete="off"
        ref={inputRef}
      />
      <span>
        &emsp;Searching for: <em>{inputValue}&nbsp;</em>
      </span>
    </Fragment>
  );
};

export default App;
