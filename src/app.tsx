const React = window.React;
const { useState, useReducer } = window.React;
const { Dish, Pizza, Sandwich, Soup } = window.ts;

function reducer(state, action) {
  switch (action.property) {
    case 'name':
      return { ...state, name: action.payload.value}
    case 'preparation_time':
      return { ...state, preparation_time: action.payload.value}
    case 'type':
      return { ...state, type: action.payload.value}
    case 'no_of_slices':
      delete state.spiciness_scale;
      delete state.slices_of_bread;
      return { ...state, no_of_slices: action.payload.value}
    case 'diameter':
      delete state.spiciness_scale;
      delete state.slices_of_bread;
      return { ...state, diameter: action.payload.value}
    case 'spiciness_scale':
      delete state.no_of_slices;
      delete state.diameter;
      delete state.slices_of_bread;
      return { ...state, spiciness_scale: action.payload.value}
    case 'slices_of_bread':
      delete state.no_of_slices;
      delete state.diameter;
      delete state.spiciness_scale;
      return { ...state, slices_of_bread: action.payload.value}
    default:
      return state;
  }
}

function App() {
  return <>
    <h1> Hello world! </h1>
    <Form />
  </>
}

const Form = () => {

  const [state, dispatch] = useReducer(reducer, {});

  // const [name, setName] = useState('');
  // const [preparation_time, setPreparationTime] = useState('');
  // const [type, setType] = useState('');
  // const [no_of_slices, setNoOfSlices] = useState(1);
  // const [diameter, setDiameter] = useState(1);
  // const [spiciness_scale, setSpicinessScale] = useState(1);
  // const [slices_of_bread, setSlicesOfBread] = useState(1);
  // const setters = {
  //   setName,
  //   setPreparationTime,
  //   setType,
  //   setNoOfSlices,
  //   setDiameter,
  //   setSpicinessScale,
  //   setSlicesOfBread
  // }

  // const currentDish : typeof Dish = {
  //   name,
  //   preparation_time,
  //   type,
  //   no_of_slices,
  //   diameter,
  //   spiciness_scale,
  //   slices_of_bread
  // }

  const onSubmit = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(state);
  }

  // const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
  //   setters["set" + e.target.name](e.target.value);
  //   console.log();
  // }

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    let propertyName = e.target.name;
    let newValue = e.target.value;
    dispatch({ property: propertyName, payload: { value: newValue }})
  }

  return <>
    <form onSubmit={onSubmit} id="form">
      <input name="name" type="text"
      value={state.name || ""} onChange={onChange} />
      <input name="preparation_time" type="time" list="preparation-time-suggestions" 
      step="1" min="00:00:01" 
      value={state.preparation_time || ""} onChange={onChange} />
      <select name="type"
      value={state.type || ""} onChange={onChange}>
        <option value="pizza">pizza</option>
        <option value="soup">soup</option>
        <option value="sandwich">sandwich</option>
      </select>

      {state.type == "pizza" && 
        <>
          <input name="no_of_slices" type="number" value={state.no_of_slices || ""} onChange={onChange} required />
          <input name="diameter" type="number" value={state.diameter || ""} onChange={onChange} required />
        </>
      }
      {state.type == "soup" && <input name="spiciness_scale" type="number" value={state.spiciness_scale || ""} onChange={onChange} required />}
      {state.type == "sandwich" && <input name="slices_of_bread" type="number" value={state.slices_of_bread || ""} onChange={onChange} required />}

      <input type="submit" value="Send" />
    </form>
  </>
}
