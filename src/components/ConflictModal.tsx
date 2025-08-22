import React from 'react'
import { ConflictMessage } from '../services/Registration'
import moment from 'moment'

interface ConflictModalProps {
  onClose: () => void
  conflictDetails: ConflictMessage | null
}

const ConflictModal: React.FC<ConflictModalProps> = ({ onClose, conflictDetails }) => {
  const formatTime = (time: string) => {
    if (!time) return ''
    return moment(time, 'HH:mm').format('h:mm A')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-keyin-black bg-opacity-30">
      {!conflictDetails || !conflictDetails.hasConflict ? (
        <div className="w-full max-w-md p-6 rounded-lg shadow-lg bg-keyin-white">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl font-bold text-keyin-red">Duplicate Email Found</h2>
            <button onClick={onClose} className="text-keyin-gray hover:text-keyin-gray-hover">
              ✕
            </button>
          </div>
          <p className="mb-4 text-keyin-gray">
            The email you have submitted is already registered for this program. To register for a different program,
            please close this message and return to the registration page to select your desired program and cohort.
          </p>
          <p className="mb-4 text-keyin-gray">
            If you require assistance, please contact us at{' '}
            <a href="mailto:dentalupskilling@keyin.com " className="font-semibold text-keyin-bright-blue">
              dentalupskilling@keyin.com
            </a>
            .
          </p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 font-semibold rounded text-keyin-white bg-keyin-bright-blue focus:outline-none focus:ring-2 hover:brightness-90 hover:shadow-md"
            >
              Close
            </button>
          </div>
        </div>
      ) : conflictDetails.hasConflict && conflictDetails.type === 'timeslot' ? (
        <div className="w-full max-w-md bg-keyin-white rounded-lg shadow-lg">
          {/* Header with close button */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-2 bg-keyin-yellow bg-opacity-20 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-keyin-yellow"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-medium">Scheduling Conflict Detected!</h2>
            </div>
            <button onClick={onClose} className="text-keyin-gray hover:text-keyin-gray-hover">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="mb-3 text-keyin-black">
              It looks like you have already registered for another program that overlaps with the selected cohort's
              schedule.
            </p>

            {/* Info box */}
            <div className="p-3 mb-4 bg-keyin-bright-blue bg-opacity-10 rounded">
              <div className="flex mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0 w-5 h-5 mr-2 text-keyin-bright-blue"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-keyin-bright-blue">Please review the details below</p>
              </div>

              <div className="ml-7 text-keyin-dark-blue">
                <p>
                  <span className="font-semibold">Selected Program:</span> {conflictDetails.conflictDetails.target.name}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Selected Cohort:</span> {conflictDetails.conflictDetails.target.day}{' '}
                  {formatTime(conflictDetails.conflictDetails.target.start_time)} -{' '}
                  {formatTime(conflictDetails.conflictDetails.target.end_time)}
                </p>
                <p>
                  <span className="font-semibold">Conflicting Program:</span>{' '}
                  {conflictDetails.conflictDetails.existing.name}
                </p>
                <p>
                  <span className="font-semibold">Conflicting Cohort:</span>{' '}
                  {conflictDetails.conflictDetails.existing.day}{' '}
                  {formatTime(conflictDetails.conflictDetails.existing.start_time)} -{' '}
                  {formatTime(conflictDetails.conflictDetails.existing.end_time)}
                </p>
              </div>
            </div>

            <p className="mb-4 text-keyin-gray">Please review your schedule and make any necessary adjustments.</p>
          </div>

          {/* Footer with button */}
          <div className="flex justify-center p-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 font-medium text-keyin-white bg-keyin-bright-blue rounded hover:bg-keyin-blue focus:outline-none focus:ring-2 focus:ring-keyin-bright-blue"
            >
              Cancel Selection
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xl bg-keyin-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-8 h-8 mr-2 bg-keyin-yellow bg-opacity-20 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-keyin-yellow"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-medium">Conflict Detected!</h2>
            </div>
            <button onClick={onClose} className="text-keyin-gray hover:text-keyin-gray-hover">
              ✕
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <p className="text-keyin-gray">
              You are already enrolled in a cohort for this program. If you would like to change your cohort, please
              contact{' '}
              <a href="mailto:dentalupskilling@keyin.com " className="font-semibold text-keyin-bright-blue">
                dentalupskilling@keyin.com
              </a>
              .
            </p>{' '}
          </div>
          <div className="flex justify-center p-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 font-medium text-keyin-white bg-keyin-bright-blue rounded hover:bg-keyin-blue focus:outline-none focus:ring-2 focus:ring-keyin-bright-blue"
            >
              Cancel Selection
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConflictModal
