/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { useState } from 'react'
import * as Yup from 'yup'

export interface MCRegistration {
  id: string
  company_name?: string
  user_id: string
  subject?: string
  subject_id: string
  timeslot: string[]
  created_at: string
  updated_at: string
}

export interface EmployeeMCRegistration {
  id?: string
  company_id: string
  first_name: string
  last_name: string
  email: string
  subject?: string
  subject_id?: string
  created_at?: string
  updated_at?: string
}

export interface EmployerMCRegistration {
  id: string
  company_name?: string
  number_of_staff?: number
  user_id: string
  subject_id: string
  timeslot: string[]
  subject?: string
  employees?: EmployeeMCRegistration[]
  created_at: string
  updated_at: string
}

export interface RegistrationForm {
  selectedSubjectId?: string
  selectedFrontlineSubjectId?: string
  selectedMarketingSubjectId?: string
  company_name?: string
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
  subject?: string
  subject_id: string
  employees?: EmployeeMCRegistration[]
  declaration?: boolean
  hnl_member?: boolean | null
  nl_resident?: boolean | null
  work_eligible?: boolean | null
  gov_enabler_approval_confirmed?: boolean
}

export interface ConflictMessage {
  hasConflict: boolean
  type?: 'program' | 'timeslot'
  conflictDetails: ConflictDetails
}

interface ConflictDetails {
  existing: {
    name: string
    day: string
    start_time: string
    end_time: string
  }
  target: {
    name: string
    day: string
    start_time: string
    end_time: string
  }
}

const initialFormValues = {
  company_name: '',
  first_name: '',
  last_name: '',
  email: '',
  keyin_email: '',
  address1: '',
  address2: '',
  city: '',
  province: '',
  mobile_phone: '',
  home_phone: '',
  postcode: '',
  country: '',
  subject: '',
  subject_id: '',
  selectedSubjectId: '',
  selectedFrontlineSubjectId: '',
  selectedMarketingSubjectId: '',
  timeslot: [],
  employees: [],
  declaration: false,
  hnl_member: null,
  nl_resident: null,
  work_eligible: null,
  gov_enabler_approval_confirmed: false
}

const initialEmployeeValues = {
  first_name: '',
  last_name: '',
  email: '',
  subject: ''
}

export const useRegistrationForm = (userType: string) => {
  const [formValues, setFormValues] = useState(initialFormValues)
  const [employeeFormValues, setEmployeeFormValues] = useState(initialEmployeeValues)
  const [employees, setEmployees] = useState<EmployeeMCRegistration[]>([])
  const [submissionData, setSubmissionData] = useState<RegistrationForm | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isWaitlist, setIsWaitlist] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [conflictModal, setShowConflictModal] = useState(false)
  const [showAddEmployees, setShowAddEmployees] = useState(false)
  const [conflictDetails, setConflictDetails] = useState<ConflictMessage | null>(null)

  const getInitialValues = (): RegistrationForm => {
    return formValues
  }

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .trim()
      .min(1, 'First name cannot be empty')
      .matches(/^[a-zA-Z\s]+$/, 'First name can only contain letters and spaces')
      .required('First name is required'),
    last_name: Yup.string()
      .trim()
      .min(1, 'Last name cannot be empty')
      .matches(/^[a-zA-Z\s]+$/, 'Last name can only contain letters and spaces')
      .required('Last name is required'),
    email: Yup.string().trim().email('Invalid email').required('Email is required'),
    keyin_email: Yup.string().trim().email('Invalid email').nullable(),
    address1: Yup.string().trim().min(1, 'Address cannot be empty').required('Address is required'),
    address2: Yup.string().trim().nullable(),
    city: Yup.string().trim().min(1, 'City cannot be empty').required('City is required'),
    province: Yup.string().trim().min(1, 'Province cannot be empty').required('Province is required'),
    postcode: Yup.string().trim().min(1, 'Postal code cannot be empty').required('Postal code is required'),
    country: Yup.string().trim().min(1, 'Country cannot be empty').required('Country is required'),
    mobile_phone: Yup.string()
      .matches(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Mobile phone must be in format (000) 000-0000')
      .required('Mobile phone is required'),
    home_phone: Yup.string()
      .matches(/^\(\d{3}\)\s\d{3}-\d{4}$/, 'Home phone must be in format (000) 000-0000')
      .nullable(),
    company_name: Yup.string(),
    subject: Yup.string().required('Subject is required'),
    declaration: Yup.boolean().oneOf([true], 'You must agree to the terms'),
    hnl_member: Yup.boolean().nullable().required('Please select an option'),
    nl_resident: Yup.boolean().nullable().required('Please select an option'),
    work_eligible: Yup.boolean().nullable().required('Please select an option'),
    gov_enabler_approval_confirmed: Yup.boolean(),
    selectedSubjectId: Yup.string().when('subject', {
      is: (subject: string) => subject && subject !== 'Both',
      then: (schema) => schema.required('Please select a cohort'),
      otherwise: (schema) => schema.nullable()
    }),
    selectedFrontlineSubjectId: Yup.string().when('subject', {
      is: 'Both',
      then: (schema) => schema.required('Please select a cohort for Frontline Workers'),
      otherwise: (schema) => schema.nullable()
    }),
    selectedMarketingSubjectId: Yup.string().when('subject', {
      is: 'Both',
      then: (schema) => schema.required('Please select a cohort for Marketing'),
      otherwise: (schema) => schema.nullable()
    })
  })

  const employeeValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    subject: Yup.string().required('subject is required')
  })

  const handleSubmit = async (values: any): Promise<void> => {
    const formattedPhoneNumber = values.mobile_phone ? values.mobile_phone.replace(/\D/g, '') : ''
    const formattedPhoneNumber2 = values.home_phone ? values.home_phone.replace(/\D/g, '') : ''

    setLoading(true)
    setError(null)

    try {
      const payload: RegistrationForm = {
        company_name: values.company_name,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        keyin_email: values.keyin_email,
        mobile_phone: formattedPhoneNumber,
        home_phone: formattedPhoneNumber2,
        address1: values.address1,
        address2: values.address2,
        city: values.city,
        province: values.province,
        postcode: values.postcode,
        country: values.country,
        //subject: values.subject,
        subject_id: values.selectedSubjectId, // Set subject_id to selectedSubjectId

        //employees: values.employees,
        declaration: values.declaration,
        hnl_member: values.hnl_member === null ? false : Boolean(values.hnl_member),
        nl_resident: values.nl_resident === null ? false : Boolean(values.nl_resident),
        work_eligible: values.work_eligible === null ? false : Boolean(values.work_eligible),
        gov_enabler_approval_confirmed: Boolean(values.gov_enabler_approval_confirmed)
      }

      const response = await createRegistration(payload)

      if (response.is_waitlist === true) {
        setIsWaitlist(true)
      } else {
        setSuccess(true)
      }
    } catch (err: any) {
      setShowConflictModal(true)
      setConflictDetails(err.response.data.message)
      if (err.response && err.response.status === 409) {
        console.log(err.response)
        const stringed = err.response.data.message
        setConflictDetails(JSON.parse(stringed))
        setShowConflictModal(true)
      } else {
        setError('Failed to submit registration. Please try again.')
      }
      console.error('Error submitting registration:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    formValues,
    setFormValues,
    employeeFormValues,
    setEmployeeFormValues,
    employees,
    setEmployees,
    submissionData,
    setSubmissionData,
    loading,
    setLoading,
    error,
    setError,
    success,
    isWaitlist,
    setSuccess,
    showModal,
    setShowModal,
    conflictModal,
    setShowConflictModal,
    showAddEmployees,
    setShowAddEmployees,
    getInitialValues,
    validationSchema,
    employeeValidationSchema,
    handleSubmit,
    conflictDetails
  }
}

export const useUIHelpers = (
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setShowAddEmployees: React.Dispatch<React.SetStateAction<boolean>>,
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeMCRegistration[]>>,
  setSubmissionData: React.Dispatch<React.SetStateAction<RegistrationForm | null>>,
  setShowConflictModal: React.Dispatch<React.SetStateAction<boolean>>,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const handleSuccessClose = () => {
    setSuccess(false)
    setShowAddEmployees(false)
    setEmployees([])
    setSubmissionData(null)
    window.location.href = '/'
  }

  const modalActions = {
    closeConflictModal: () => setShowConflictModal(false),
    closeReferralModal: () => setShowModal(false),
    showAddEmployees: () => {
      setShowModal(false)
      setShowAddEmployees(true)
    },
    hideAddEmployees: () => setShowAddEmployees(false)
  }

  const onContinue = () => {
    setShowModal(false)
    setShowAddEmployees(true)
    setEmployees([])
    setSubmissionData(null)
    setShowConflictModal(false)
    document.location.reload()
  }

  return {
    handleSuccessClose,
    modalActions,
    onContinue
  }
}

export const createRegistration = async (values: Partial<RegistrationForm>): Promise<any> => {
  const response = await axios.post('/api/v1/admin/microcredential/registration', values)
  return response.data
}

export const getIndividualPreRegistration = async (id: string) => {
  try {
    const response = await axios.get(`/api/v1/admin/pre-registration/individual/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getEmployerPreRegistration = async (id: string) => {
  const response = await axios.get(`/api/v1/admin/pre-registration/employer/${id}`)
  return response.data
}

export const getEmployeePreRegistration = async (id: string) => {
  const response = await axios.get(`/api/v1/admin/pre-registration/employee/${id}`)
  return response.data
}

export const getPreRegistrations = async (id: string) => {
  const response = await axios.get(`/api/v1/admin/pre-registration/phase2/${id}`)
  return response.data
}
