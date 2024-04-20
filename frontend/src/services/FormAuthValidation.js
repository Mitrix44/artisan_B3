import { isLength } from 'validator'

export const validateRegisterForm = (formData) => {
  const errors = {}
  if (typeof formData === 'object') {
    // Checking firstName
    if (!isLength(formData.firstName, { min: 2, max: undefined })) {
      errors.firstName = 'FirstName is invalid'
    }
    if (!isLength(formData.lastName, { min: 2, max: undefined })) {
      errors.lastName = 'LastName is invalid'
    }
  } else {
    throw new Error('Invalid parameter type')
  }
  return errors
}
