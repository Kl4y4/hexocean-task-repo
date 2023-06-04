const React = window.React;
const { useState } = window.React;
const { Dish, Pizza, Sandwich, Soup } = window.ts;

function App() {
  return <>
    <h1> Hello world! </h1>
    <Form />
  </>
}

const Form = () => {

  const [name, setName] = useState('');
  const [preparation_time, setPreparationTime] = useState('');
  const [type, setType] = useState('');
  const [no_of_slices, setNoOfSlices] = useState(1);
  const [diameter, setDiameter] = useState(1);
  const [spiciness_scale, setSpicinessScale] = useState(1);
  const [slices_of_bread, setSlicesOfBread] = useState(1);
  const setters = {
    setName,
    setPreparationTime,
    setType,
    setNoOfSlices,
    setDiameter,
    setSpicinessScale,
    setSlicesOfBread
  }

  const currentDish : typeof Dish = {
    name,
    preparation_time,
    type,
    no_of_slices,
    diameter,
    spiciness_scale,
    slices_of_bread
  }

  const onSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(currentDish);
  }

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setters["set" + e.target.name](e.target.value);
    console.log();
  }

  return <>
    <form onSubmit={onSubmit} id="form">
      <input name="Name" type="text"
      value={name} onChange={onChange} />
      <input name="PreparationTime" type="time" list="preparation-time-suggestions" 
      step="1" min="00:00:01" 
      value={preparation_time} onChange={onChange} />
      <select name="Type"
      value={type} onChange={onChange}>
        <option value="pizza">pizza</option>
        <option value="soup">soup</option>
        <option value="sandwich">sandwich</option>
      </select>

      {type == "pizza" && 
        <>
          <input name="NoOfSlices" type="number" value={no_of_slices} onChange={onChange} required />
          <input name="Diameter" type="number" value={diameter} onChange={onChange} required />
        </>
      }
      {type == "soup" && <input name="SpicinessScale" type="number" value={spiciness_scale} onChange={onChange} required />}
      {type == "sandwich" && <input name="SlicesOfBread" type="number" value={slices_of_bread} onChange={onChange} required />}
      
      <input type="submit" value="Send" />
    </form>
  </>
}
