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
  active_da: boolean | null
  completed_da: boolean | null
  resident: boolean | null
  eligible: boolean | null
  declaration: boolean | null
}

export const createOrthoPreRegistration = async (orthoData: OrthoPreRegistrationForm) => {
  try {
    const response = await axios.post('/api/v1/admin/pre-registration/ortho', orthoData)
    console.log('✅ API call successful:', response.data)
    return response.data
  } catch (error: any) {
    throw error
  }
}
