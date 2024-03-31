import React from "react";

const CategoryForm = ({ category, setCategory, submitHandler }) => {
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="mb-3 w-75">
          <input
            type="text"
            className="form-control"
            placeholder="Please Input Category Name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Add new Category
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
