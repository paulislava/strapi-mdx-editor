import { InputProps } from '@strapi/strapi/admin';
import * as React from 'react';

const Input = React.forwardRef((props: any, ref: any) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } = props; // these are just some of the props passed by the content-manager

  const handleChange = (e: any) => {
    onChange({
      target: { name, type: attribute.type, value: e.currentTarget.value },
    });
  };

  return (
    <label>
      {intlLabel}
      <input
        ref={ref}
        name={name}
        disabled={disabled}
        value={value}
        required={required}
        onChange={handleChange}
      />
    </label>
  );
});

export default Input;
