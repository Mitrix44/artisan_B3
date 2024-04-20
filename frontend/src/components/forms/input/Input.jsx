import PropTypes from 'prop-types'
export default function Input ({ label, name, value, onChange, placeholder, error, type = 'text' }) {
  return (
    <div>
      <label>
        {label}
        <input name={name} value={value} onChange={onChange} placeholder={placeholder} type={type} />
      </label>
      {error && (<p style={{ color: 'red' }}>{error}</p>)}
    </div>
  )
}
Input.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  error: PropTypes.string
}
