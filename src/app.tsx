const { useState } = window.React;

function App() {
  return <>
    <h1> Hello world! </h1>
    <Form />
  </>
}

const Form = () => {

  const [dishProperties, setProperties] = useState(['', '', '', '']);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(dishProperties);
  }

  const onChange = (e, i) => {
    const updatedDish = dishProperties.map((el, ind) => ind == i ? e.target.value : el);
    setProperties(updatedDish);
  }

  return <>
    <form onSubmit={onSubmit}>
      <input type="text" value={dishProperties[0]} onChange={(e) => {onChange(e, 0)}} />
      <input type="time" list="preparation-time-suggestions" 
      step="1" min="00:00:01"
      value={dishProperties[1]} onChange={(e) => {onChange(e, 1)}} />
      <select
      value={dishProperties[2]} onChange={(e) => {onChange(e, 2)}}>
        <option value="pizza">pizza</option>
        <option value="soup">soup</option>
        <option value="sandwich">sandwich</option>
      </select>
      <input type="submit" value="Send" />
    </form>
  </>
}


