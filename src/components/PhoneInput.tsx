/* eslint-disable @typescript-eslint/no-explicit-any */
import InputMask from 'react-input-mask'

export const PhoneInputField: React.FC<{ field: any; form: any; [key: string]: any }> = ({ field, form, ...props }) => {
  return (
    <InputMask
      {...field}
      {...props}
      mask="(999) 999-9999"
      maskChar="_"
      className={`w-full p-2 border rounded ${
        form.errors[field.name] && form.touched[field.name] ? 'border-keyin-red' : 'border-gray-300'
      }`}
    />
  )
}
