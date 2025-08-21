import { Application } from './ProgramTypes'

export interface User {
  id?: string
  email: string
  password: string
  role?: ROLE
  lead_id?: string
  profile?: Profile
  applications?: Application
  created_at?: string
  updated_at?: string
}

enum ROLE {
  GUEST = 0,
  APPLICANT = 1,
  STUDENT = 2,
  INSTRUCTOR = 3,
  STAFF = 4,
  ADMIN = 5
}

interface Profile {
  id: string
  first_name: string
  last_name: string
  mobile_phone: string
  home_phone?: string
  address1: string
  address2?: string
  city: string
  province: string
  postcode: string
  country: string
  user: User
  userId: string
  created_at: string
  updated_at: string
}
