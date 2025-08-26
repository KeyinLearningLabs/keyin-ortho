import axios from 'axios'
import { getToken } from '../types/apps'

const token = getToken('accessToken')
const Authheaders = { headers: { Authorization: `Bearer ${token}` } }

export const getAllDocumentsByAppId = async (id: string): Promise<DocumentResponse[] | undefined> => {
  try {
    const response = await axios.get(`/api/v3/documentsByAppId/${id}`)

    return response.data
  } catch (error) {
    console.error(error) // Should this really be silently failing and returning undefined implicitly? We should probably re-throw here!
  }
}

export const getAllDocumentsByRegistrationId = async (
  id: string
): Promise<RegistrationDocumentResponse[] | undefined> => {
  try {
    const response = await axios.get(`/api/v3/documentsByRegistrationId/${id}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const approveDocumentById = async (id: string) => {
  try {
    const response = await axios.put(`/api/v3/admin/documents/approve-document/${id}`, null, Authheaders)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const denyDocumentById = async (id: string, note: string) => {
  try {
    const response = await axios.put(
      `/api/v3/admin/documents/deny-document/${id}`,
      {
        note: note
      },
      Authheaders
    )
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getDocumentById = async (id: string) => {
  try {
    const response = await axios.get(`/api/v3/documents/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const createRequiredDocument = async (document: {
  name: string
  tooltip: string
  type: string
  programId: string
}) => {
  const payload = {
    name: document.name,
    tooltip: document.tooltip,
    description: null,
    order: 1,
    type: document.type,
    program_id: document.programId
  }
  try {
    const response = await axios.post('/api/v3/admin/documents/required', payload, Authheaders)
    return response.data
  } catch (error) {
    console.error('Error adding required document:', error)
    throw error
  }
}

export const getAllDocumentsByAppIdInOrder = async (id: string): Promise<DocumentResponse[] | undefined> => {
  return (await getAllDocumentsByAppId(id))?.sort((a, b) => a.order - b.order)
}

export const uploadDomesticDocument = async (
  formData: FormData,
  { setUploadProgress }: { setUploadProgress?: (percent: number) => void }
) => {
  const token = getToken('accessToken')
  const headers = {
    Authorization: `Bearer ${token}`
  }
  try {
    const response = await axios.post('/api/v4/documents/upload', formData, {
      headers,
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          if (setUploadProgress) {
            setUploadProgress(percentCompleted)
          }
        }
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const adminUploadDomesticDocument = async (formData: FormData) => {
  try {
    const response = await axios.post('/api/v3/documents/upload', formData, Authheaders)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getPDFBuffer = async (id: string) => {
  try {
    const response = await axios.get(`/api/v3/admin/documents/preview-document/${id}`, Authheaders)

    return response.data
  } catch (error) {
    return error
  }
}

export const printDocumentByIds = async (id_array: string[], printed_by: string) => {
  try {
    const token = getToken('accessToken')
    const headers = {
      Authorization: `Bearer ${token}`
    }

    const payload = {
      id_array,
      printed_by
    }

    const response = await axios.post('/api/v3/admin/documents/print', payload, { headers })

    return response.data
  } catch (error) {
    return error
  }
}

export const printStudentDocumentByIds = async (id_array: string[], printed_by: string) => {
  try {
    const token = getToken('accessToken')
    const headers = {
      Authorization: `Bearer ${token}`
    }

    const payload = {
      id_array,
      printed_by
    }

    const response = await axios.post('/api/v3/documents/print', payload, { headers })

    return response.data
  } catch (error) {
    return error
  }
}

export const getDocumentIdArray = async (id_array: DocumentResponse[]) => {
  try {
    // Array to hold all PDF buffers
    const document_ids: string[] = []

    // Fetch all PDF buffers for each id
    for (let i = 0; i < id_array.length; i++) {
      const id = id_array[i]

      if (id.url !== '' && id.url !== null && id.url !== undefined) {
        document_ids.push(id.id)
      }
    }

    return document_ids
  } catch (error) {
    console.error('Error in PrintAllDocuments:', error)
    throw error
  }
}

export const getDocumentsByProgramId = async (programId: string) => {
  try {
    const response = await axios.get(`/api/v3/admin/required-documents/${programId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }
}

export const getRequiredDocumentById = async (id: string) => {
  try {
    const response = await axios.get(`/api/v3/admin/required-document/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching document:', error)
    throw error
  }
}

export const updateRequiredDocument = async (payload: RequiredDocuments) => {
  try {
    const response = await axios.put(`/api/v3/admin/required-document/${payload.id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data
  } catch (error) {
    console.error('Error updating required document:', error)
    throw error
  }
}

export const updateDocumentHiddenStatus = async (id: string, isHidden: boolean) => {
  try {
    const response = await axios.put(
      `/api/v3/admin/required-document/hide/${id}`,
      { is_hidden: isHidden },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error) {
    console.error('Error updating document hidden status:', error)
    throw error
  }
}

export interface DocumentDescription {
  links: string[]
}

export interface DocumentResponse {
  id: string
  name: string
  url: string
  order: number
  tooltip: string
  description: DocumentDescription
  status: Status
  printed: boolean
  printed_by: string
  print_date: Date
  application_id?: string
  type: string[]
  updated_at?: string
}

export interface RequiredDocuments {
  required_documents: unknown
  modified_by: string
  is_hidden: boolean
  id: string
  name: string
  order: number
  tooltip: string
  type: string
}

export interface RegistrationDocumentResponse {
  id: string
  name: string
  url: string
  order: number
  tooltip: string
  status: Status
  registration_id: string
}

export interface ApplicationDocumentResponse {
  id: string
  name: string
  url: string
  order: number
  tooltip: string
  status: Status
  application_id: string
}

export enum Status {
  NOT_SUBMITTED = 'NOT_SUBMITTED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  VERIFIED = 'VERIFIED',
  RESUBMIT = 'RESUBMIT',
  PRINTED = 'PRINTED'
}

export interface ApplicationEmail {
  documents: DocumentResponse[]
}

export interface FilesState {
  id: string
  name: string
  file?: File | undefined
  submitted: Status | string
}

export interface DocumentList {
  pelmo?: boolean
  firstReceipt?: boolean
  secondReceipt?: boolean
  transcript?: boolean
  hsTranscript?: boolean
  hsDiploma?: boolean
  resume?: boolean
  ref1?: boolean
  ref2?: boolean
  volunteer?: boolean
  employment?: boolean
  optional?: boolean
  visa?: boolean
  url?: string
}

export interface clickCheckbox {
  open?: boolean
  document?: DocumentResponse
  setOpen?: (value: boolean) => void
  setPreview?: (value: DocumentResponse) => void
  className?: string
  index: string
  printed_by?: string
}

export interface ResubmitEmail {
  firstName: string
  lastName: string
  documentName: string
  app_id: string
  note?: string
}

export interface PreviewDocument {
  // documentData: DocumentResponse
  id: string
  url: string
  status: Status
  open: boolean
  email: string
  firstName: string
  lastName: string
  semester?: string
  year?: string
  program_name: string
  openModal: () => void
  closeModal: () => void
  setOpen: (value: boolean) => void
}

export interface RequiredDocumentsRequestHeaders {
  programName: string
  type: string
}
