import React, { useReducer } from 'react';

const PROPERTIES = {
  NAME: 'name',
  PREPARATION_TIME: 'preparation_time',
  TYPE: 'type',
  NO_OF_SLICES: 'no_of_slices',
  DIAMETER: 'diameter',
  SPICINESS_SCALE: 'spiciness_scale',
  SLICES_OF_BREAD: 'slices_of_bread',
}

function deleteOptionals(state, propertiesToDelete) {
  propertiesToDelete.forEach(el => {
    delete state[el];
  })
  return state;
}

function reducer(state, action) {

  switch (action.property) {
    case PROPERTIES.NAME:
      return {...state, name: action.payload.value}

    case PROPERTIES.PREPARATION_TIME:
      return {...state, preparation_time: action.payload.value}

    case PROPERTIES.TYPE:
      return { ...state, type: action.payload.value}

    case PROPERTIES.NO_OF_SLICES:
      state = deleteOptionals(state, 
        [PROPERTIES.SPICINESS_SCALE,
        PROPERTIES.SLICES_OF_BREAD]);
      return {...state, no_of_slices: action.payload.value}

    case PROPERTIES.DIAMETER:
      state = deleteOptionals(state, 
        [PROPERTIES.SPICINESS_SCALE,
        PROPERTIES.SLICES_OF_BREAD]);
      return {...state, diameter: action.payload.value}

    case PROPERTIES.SPICINESS_SCALE:
      state = deleteOptionals(state, 
        [PROPERTIES.NO_OF_SLICES,
        PROPERTIES.DIAMETER,
        PROPERTIES.SLICES_OF_BREAD]);
      return {...state, spiciness_scale: action.payload.value}

    case PROPERTIES.SLICES_OF_BREAD:
      state = deleteOptionals(state, 
        [PROPERTIES.NO_OF_SLICES,
        PROPERTIES.DIAMETER,
        PROPERTIES.SPICINESS_SCALE]);
      return {...state, slices_of_bread: action.payload.value}

    default:
      return state;
  }
}

const Form = () => {

  const [state, dispatch] = useReducer(reducer, {});

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    fetch("https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
    { method: 'POST', 
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(state),
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  const onChange = (e) => {
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

export default Form;
