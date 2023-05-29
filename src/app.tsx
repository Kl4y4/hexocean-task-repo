const { useState } = window.React;

function App() {
  return <>
    <h1> Hello world! </h1>
    <Form />
  </>
}

const Form = () => {



  return <>
    <form>
      <input type="text" />
      <input type="time" list="preparation-time-suggestions" step="1" min="00:00:01" max="99:99:99" />
      <select>
        <option value="1">pizza</option>
        <option value="2">soup</option>
        <option value="3">sandwich</option>
      </select>
      <input type="submit" value="Send" />
    </form>
  </>
}


