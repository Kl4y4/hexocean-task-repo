import React, { useState } from 'react';
import { useForm } from "react-hook-form";

function deleteOptionals(state, propertiesToDelete) {
  propertiesToDelete.forEach(el => {
    delete state[el];
  })
  return state;
}

function ExForm() {

  const [fetchSuccess, setFetchSuccess] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const type = watch("type");

  const resetForm = () => {
    setFetchSuccess(true);
    let fields = document.querySelectorAll('input');
    fields.forEach(el => el.value = '');
  }

  const onSubmit = (data) => {
    switch (data.type) {
      case 'pizza':
        data = deleteOptionals(data, ['spiciness_scale', 'slices_of_bread']);
        break;
      case 'soup':
        data = deleteOptionals(data, ['no_of_slices', 'diameter', 'slices_of_bread']);
        break;
      case 'sandwich':
        data = deleteOptionals(data, ['no_of_slices', 'diameter', 'spiciness_scale']);
        break;
    }
    console.log(data);
    fetch("https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
    { method: 'POST', 
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(data),
    })
    .then(response => {
      response.status === 200 && resetForm();
    })
    .catch(error => console.log('error', error));
  }

  return <>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label>Dish name
        <input placeholder="..." {...register("name", { minLength: 3, required: true })} />
      </label>
      
      {errors.name && 
        <span  className="error-message">Must be filled with at least 3 characters!</span>}

      <label> Preparation time
        <input type="time" list="preparation-time-suggestions"
        step="1" min="00:00:01"
        {...register("preparation_time", { required: true })} />
      </label>

      <label> Dish type
        <select {...register("type")}>
          <option value="pizza" selected>Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
        </select>
      </label>

      {type === "pizza" &&
      <>
        <label> Number of slices
          <input type="number" step="1"
          {...register("no_of_slices", {required: true, min: 1 })} />
        </label>
        <label> Diameter
          <input type="number"
          {...register("diameter", {required: true, min: 1 })} />
        </label>
      </>}

      {type === "soup" && 
      <label> Spiciness scale
        <input type="number" list="spiciness_scale_list" step="1"
          {...register("spiciness_scale",
          {required: true, min: 1, max: 10 })} />
      </label>}

      {type === "sandwich" &&
        <label> Slices of bread
          <input type="number" step="1"
          {...register("slices_of_bread", {required: true, min: 1 })} />
        </label>}

      {(errors.no_of_slices || errors.diameter || errors.spiciness_scale || errors.slices_of_bread) 
      && <span className="error-message">Required field(s) not filled!</span>}
      
      <input type="submit" value="Submit" />
      {fetchSuccess
      && <span style={{ 'text-align': 'center' }}>Form submitted successfully!</span>}
    </form>
  </>
}

export default ExForm;