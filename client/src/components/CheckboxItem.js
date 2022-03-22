const CheckboxItem = ({ item, isChecked, handleChange }) => {
  return (
    <li className="mt-4">
      <span className="pointer">
        <input
          className="form-check-input pointer mx-3"
          type="checkbox"
          id={item._id}
          onChange={(e) => handleChange(e, item)}
          checked={isChecked(item)}
        />
        <label
          className="form-check-label pointer capitalize"
          htmlFor={item._id}
        >
          {item.name}
        </label>
      </span>
    </li>
  );
};

export default CheckboxItem;
