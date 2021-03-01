import React, { useState, useImperativeHandle } from "react";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return { toggleVisibility };
  });

  return (
    <>
      {!visible ? (
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      ) : (
        <div>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      )}
    </>
  );
});

export default Togglable;
