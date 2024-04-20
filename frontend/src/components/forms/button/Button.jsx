import PropTypes from 'prop-types'
export default function Button ({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['submit', 'reset', 'button'])
}
