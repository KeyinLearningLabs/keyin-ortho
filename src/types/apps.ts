import axios from 'axios'
import { RegistrationDocumentResponse } from './Documents'

export function getToken(tokenName: string) {
  const tokens = localStorage.getItem(tokenName)
  if (tokens) return tokens
  return ''
}

export const getAppById = async (id: string) => {
  try {
    const response = await axios.get(`/api/v3/apps/${id}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getAllApps = async () => {
  try {
    const token = getToken('accessToken')
    const headers = {
      Authorization: `Bearer ${token}`
    }

    const response = await axios.post('/api/v4/apps', undefined, { headers })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export interface RegistrationResponse {
  id: string
  user_id: string
  program_id: string
  program_name?: string
  semester: string
  year: string
  documents: RegistrationDocumentResponse[]
}
