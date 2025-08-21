import axios from 'axios'

export interface OrthoPreRegistrationForm {
  dental_clinic?: string
  first_name: string
  last_name: string
  email: string
  keyin_email: string
  mobile_phone: string
  home_phone: string
  address1: string
  address2: string
  city: string
  province: string
  postcode: string
  country: string
  subject: string
  active_da: boolean
  completed_da: boolean
  resident: boolean
  eligible: boolean
  declaration: boolean
}

export const createOrthoPreRegistration = async (orthoData: OrthoPreRegistrationForm) => {
  const response = await axios.post('/api/v1/admin/table/pre-registrations/ortho', orthoData)
  return response.data
}
