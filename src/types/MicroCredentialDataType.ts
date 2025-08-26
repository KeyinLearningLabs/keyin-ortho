import axios from 'axios'

import { Program, Programs } from '../types/ProgramTypes'

export type MicrocredentialDataType = {
  img: string
  title: string
  selectionName: string
  startDate: string
  endDate: string
  duration: string
  hours: string
  schedule: Array<string>
  description: string
  whosItFor?: string
  careerPaths: Array<string>
}

export type MCClassesSelectorType = {
  programName: string
  cohort: string
  startDate?: string
  holidayBreak?: string
  endDate?: string
  instructionalHours: string
  selectionName: string
  dates: string[]
  preregistered: boolean
  closed: boolean
  cancelled: boolean
}

export interface MicrocredentialCard {
  name: string
  order: number
  cohort: number
  start_date: Date
  end_date: Date
  holiday_start_date: Date
  holiday_end_date: Date
  instructional_hours: number
  selection_name: string
  schedule: string[]
  preregistered: boolean
  is_closed: boolean
  is_cancelled?: boolean // Optional boolean
  is_hidden?: boolean // Optional boolean
}

export interface MCDescriptionCard {
  key: string
  id: string
  program: Programs
  information: MicrocredentialDataType
  buttonText: string
}

const CHUNK_SIZE = 100

const chunkArray = (array: unknown[], size: number) => {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

export const getMicroCredentials = async () => {
  try {
    const response = await axios.get('/api/v2/programs/microcredential')
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getMicroCredentialById = async (id: string) => {
  try {
    const response = await axios.get(`/api/v2/programs/microcredential/user/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createMicrocredentialApplication = async (payload: unknown) => {
  try {
    const response = await axios.post('/api/v1/applications/microcredential', payload)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getQuestionnaireById = async (id: string) => {
  try {
    const response = await axios.get(`/api/v1/questionnaires/${id}`)
    return response.data
  } catch (error) {
    console.error(`Failed to fetch questionnaire with ID ${id}:`, error)
  }
}

// export const getQuestionnairesByIds = async (ids: string[]) => {
//   try {
//     const questionnairePromises = ids.map((id) => getQuestionnaireById(id));
//     const questionnaires = await Promise.all(questionnairePromises);
//     return questionnaires.filter(
//       (questionnaire) => questionnaire !== undefined
//     );
//   } catch (error) {
//     console.error("Failed to fetch questionnaires:", error);
//   }
// };

export interface MicrocredentialApplicationPayload {
  firstName: string
  lastName: string
  email: string
  keyinemail: string
  mobilePhone: string
  homePhone: string
  address: string
  address2: string
  city: string
  province: string
  postCode: string
  country: string
  subject_id: string
  campus: string
  startMonth: string
  startYear: string
  PromoCode: string
  levelOfEducation: string
  lastStep: string[]
  citizen: string
  entitlement: string
  residency: string
  eligible: string
  aboutUs: string
  declaration: string
}

export interface MicroCredential {
  id: string
  name: string
  card_img: string
}

export interface MicroCredentialDetail {
  id: string
  name: string
  card_img: string
  cohort: string
  instructional_hours: string
  program_id: string
}
