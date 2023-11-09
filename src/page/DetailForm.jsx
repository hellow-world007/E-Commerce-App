import React, { useRef } from "react";

const DetailForm = (props) => {

  const sizeRef = useRef();
  const colorRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    const sizeInput = sizeRef.current.value;
    const colorInput = colorRef.current.value;

    props.onSearch(sizeInput, colorInput, props.id);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="adjustSize">Lens Width and Frame Size</label>
        <br />
        <select
          id="adjustSize"
          required
          ref={sizeRef}
        >
          <option value="28 mm">28 mm</option>
          <option value="36 mm">36 mm</option>
          <option value="42 mm">42 mm</option>
        </select>

        <label htmlFor="adjustColor" className="choose">
          Choose color
        </label>
        <br />
        <select
          id="adjustColor"
          required
          ref={colorRef}
        >
          <option value="red">red</option>
          <option value="green">green</option>
          <option value="black">black</option>
          <option value="white">white</option>
          <option value="orange">orange</option>
        </select>
        <button className="adjust-details">Update</button>
      </form>
    </div>
  );
};

export default DetailForm;
