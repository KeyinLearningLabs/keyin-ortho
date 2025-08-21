import type { Questionnaire } from './QuestionnaireTypes'
import type { User } from './UserTypes'

export interface Programs {
  id: string
  name: string
  abbreviated_name: string
  category: string
  subcategory: string
  subjects: Subjects[]
  created_at: string
  updated_at: string
  order: number
}

export interface Program {
  id: string
  name: string
  card_img: string
  m_card_img: string
  Questionnaire: Questionnaire[]
}

export interface Subjects {
  id: string
  name: string
  order: number
  cohort: number
  semester: number
  start_date: string
  end_date: string
  holiday_start_date: string
  holiday_end_date: string
  instructional_hours: number
  selection_name: string
  teams_link: string
  schedule: string[]
  preregistered: boolean
  is_closed: boolean
  is_cancelled: boolean
  is_hidden: boolean
  created_at: string
  updated_at: string
  Program: Programs
  programId: string
  preferred_start_year: string
  preferred_start_month: string
}

export interface Application {
  id: string
  user: User
  user_id: string
  ppaLink: string
  status: string
  classSelection: Array<string>
  subject: Subjects
  opportunity_id?: string
  created_at: string
  updated_at: string
}

export type ProgramShowcaseData = {
  category: string
  featured: boolean
}

export type ProgramRequirementsData = {
  data: object | undefined
}

export type ProgramRequirementsInfo = {
  title: string
  AdmissionRequirements?: ProgramRequirementsDetails
  AdministrationRequirements?: ProgramRequirementsDetails
  MatureStudentsRequirements?: ProgramRequirementsDetails
  ABEentraceRequirements?: ProgramRequirementsDetails
  Semester1?: ProgramRequirementsDetails
  Semester2?: ProgramRequirementsDetails
  Semester3?: ProgramRequirementsDetails
  Semester4?: ProgramRequirementsDetails
  Semester5?: ProgramRequirementsDetails
}

export type ProgramRequirementsDetails = {
  title: string
  subtitle: string
  subtitle2: string
  subtitle3: string
  Heading: string
  Heading2: string
  details: Array<string>[]
  optionalDetails: ProgramRequirementsOptionalDetails
  nestedDetails: Array<string>[]
  statement: string
}

export type ProgramRequirementsOptionalDetails = {
  title: string
  subtitle: string
  details: Array<string>[]
  details2: Array<string>[]
}
export interface Campus {
  campus_name: string
  intake: Array<Intake>
}

export interface Months {
  month: string
  available: boolean
}

export interface Intake {
  year: string
  months: Array<Months>
}

export interface ProgramIntake {
  program: string
  campus: Array<Campus>
}

export interface ProgramCard {
  index: number
  programName: string
  image: string
  applicationDueDate: string
  averageSalary: string
  programURL: string
}

export interface QuestionnaireProgramCard {
  index: number
  programName: string
  image: string
}
