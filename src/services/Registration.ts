/* eslint-disable @typescript-eslint/no-explicit-any */

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
