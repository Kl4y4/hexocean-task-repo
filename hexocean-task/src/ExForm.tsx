import React from 'react';
import { useForm } from "react-hook-form";

function ExForm() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const type = watch("type");

  const onSubmit = (data) => {
    console.log(data);
  }

  return <>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Dish name" {...register("name", { minLength: 3 })} />
      {errors.name && 
        <span className="error-message">This field must be at least 3 characters long!</span>}

      <input type="time" list="preparation-time-suggestions" 
      step="1" min="00:00:01" 
      {...register("preparation_time", { required: true })} />

      <select {...register("type")}>
        <option value="pizza">pizza</option>
        <option value="soup">soup</option>
        <option value="sandwich">sandwich</option>
      </select>

      {type === "pizza" &&
      <span>
        <input type="number" step="1" placeholder="# of slices"
        {...register("no_of_slices", {required: true, min: 1 })} /> <br />
        <input type="number" placeholder="Diameter"
        {...register("diameter", {required: true })} />
      </span>}

      {type === "soup" && 
      <input type="number" list="spiciness_scale_list" step="1"
        placeholder="Spiciness scale"
        {...register("spiciness_scale", 
        {required: true, min: 1, max: 10 })} />}

      {type === "sandwich" &&
        <input type="number" step="1" placeholder="# of slices"
        {...register("slices_of_bread", {required: true, min: 1 })} />}

      {(errors.no_of_slices || errors.diameter || errors.spiciness_scale || errors.slices_of_bread) 
      && <span className="error-message">Required field(s) not filled!</span>}
      
      <input type="submit" />
    </form>
  </>
}

export default ExForm;