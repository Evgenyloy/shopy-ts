import { useField } from 'formik';

function handleFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
  if (e.target.parentNode === null) return;
  (e.target.parentNode as Element).classList.add('active');
}

function handleBlur(e: React.FocusEvent<HTMLInputElement, Element>) {
  if (e.target.value) return;
  if (e.target.parentNode === null) return;
  (e.target.parentNode as Element).classList.remove('active');
}

function CustomInput({
  label,
  ...props
}: {
  name: string;
  label: string;
  type: string;
}) {
  const [field, meta] = useField(props);

  return (
    <>
      <input
        autoComplete="on"
        {...props}
        {...field}
        className={
          meta.touched && meta.error
            ? 'checkout__input input-error'
            : 'checkout__input'
        }
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {meta.touched && meta.error ? (
        <div
          data-name="name"
          data-component="div"
          className="checkout__input-error"
        >
          {meta.error}
        </div>
      ) : null}

      <p className="checkout__name-label">{label}</p>
    </>
  );
}

export default CustomInput;
