const { useState } = window.React;

function App() {
  return <>
    <h1> Hello world! </h1>
    <Form />
  </>
}

const Form = () => {

  const [dishProperties, setProperties] = useState(['', '', 'pizza', '', '']);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(dishProperties);
  }

  const onChange = (e, updatedIndex) => {
    const updatedDish = dishProperties.map((el, ind) => ind == updatedIndex ? e.target.value : el);
    if (dishProperties[2] != "pizza") updatedDish[5] = '';
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

      {dishProperties[2] == "pizza" && 
        <>
          <input type="number" value={dishProperties[4]} onChange={(e) => {onChange(e, 4)}} required />
          <input type="number" value={dishProperties[5]} onChange={(e) => {onChange(e, 5)}} required />
        </>
      }
      {dishProperties[2] == "soup" && <input type="number" value={dishProperties[4]} onChange={(e) => {onChange(e, 4)}} required />}
      {dishProperties[2] == "sandwich" && <input type="number" value={dishProperties[4]} onChange={(e) => {onChange(e, 4)}} required />}

      <input type="submit" value="Send" />
    </form>
  </>
}
