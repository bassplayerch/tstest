import { useCallback, useState } from "react";

export const useInput = (initial = '') => {
    const isNumber = typeof initial === "number";
    const [value, setValue] = useState(initial);
    const onChange = useCallback(e => setValue(e.target.value), []);
  
    return {
      value,
      setValue,
      hasValue:
        value !== undefined &&
        value !== null &&
        (!isNumber ? value.trim && value.trim() !== "" : true),
      clear: useCallback(() => setValue(""), []),
      onChange,
      bindToInput: {
        onChange,
        value
      },
      bind: {
        onChange: setValue,
        value
      }
    };
  };