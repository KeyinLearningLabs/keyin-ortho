import axios from 'axios'

export interface Program {
  id: string
  name: string
  abbreviated_name?: string
  category: string
  subcategory?: string[]
  order: number
  created_at: string
  updated_at: string
  card_img?: string
  m_card_img?: string
  academic_requirements?: JSON
  administration_requirements?: JSON
  additional_requirements?: JSON
  mature_students_requirements?: JSON
  language_proficiency_requirements?: JSON
  field_placement_requirements?: JSON
  preclinical_requirements?: JSON
  qualification?: string
  academic_weeks?: number
  work_term_weeks?: number
}

export const getAllPrograms = async (): Promise<Program[]> => {
  const response = await axios.get('/api/v1/programs')

  return response.data
}
