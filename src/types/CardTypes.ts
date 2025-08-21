import { MicrocredentialDataType } from '../types/MicroCredentialDataType'
import { Programs } from '../types/ProgramTypes'

export interface MicrocredentialCard {
  name: string
  order: number
  cohort: number
  semester: string
  start_date: Date
  end_date: Date
  holiday_start_date: string
  holiday_end_date: string
  instructional_hours: number
  selection_name: string
  schedule: string[]
  preregistered: boolean
  is_closed: boolean
  is_cancelled?: boolean
  is_hidden?: boolean
  capacity: number
  total_capacity: number
}

export interface MCDescriptionCard {
  key: string
  id: string
  program: Programs
  information: MicrocredentialDataType
  buttonText: string
}
