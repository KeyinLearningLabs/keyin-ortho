export interface Question {
  id: string
  questionnaire_id: number
  type: string
  name: string
  slug: string
  selection: string[]
  order: number
  group?: string
  branching_condition?: string
  bg_img?: string
  next_groups?: string
}

export interface Questionnaire {
  id: number
  name: string
  questions: Question[]
  splash_img: string
  bg_img: string
}

export interface UserFormData {
  first_name: string
  last_name: string
  email: string
  cell_phone: string
  home_phone: string
}

export interface SummaryData {
  userData: {
    first_name: string
    last_name: string
    email: string
    cell_phone: string
    home_phone: string
  }
  questions: { id: string; name: string }[]
  responses: { [key: string]: string | string[] }
}

export interface QuestionnaireData {
  id: number
  name: string
  questions: Question[]
  splash_img: string
  bg_img: string
}

export interface QuestionProps {
  question: Question
  response: string | string[]
  onResponseChange: (questionId: string, response: string | string[]) => void
}
