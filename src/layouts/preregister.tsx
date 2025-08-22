/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputMask from 'react-input-mask'
import countries from '../types/CountryData'
import { createOrthoPreRegistration, OrthoPreRegistrationForm } from '../services/Preregistration'
import ConflictModal from '../components/ConflictModal'

const PhoneInputField: React.FC<{ field: any; form: any; [key: string]: any }> = ({ field, form, ...props }) => {
  return (
    <InputMask
      {...field}
      {...props}
      mask="(999) 999-9999"
      maskChar="_"
      className={`w-full p-2 border rounded ${
        form.errors[field.name] && form.touched[field.name] ? 'border-keyin-red-500' : 'border-gray-300'
      }`}
    />
  )
}

const PreRegister = () => {
  const countryList = countries[0]
  const [userType, setUserType] = useState('individual')
  const [showModal, setShowModal] = useState(false)
  const [conflictModal, setShowConflictModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [submitAttempted, setSubmitAttempted] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [submissionData, setSubmissionData] = useState<any>(null)

  // Question refs for scrolling to errors
  const questionRefs = {
    dental_clinic: useRef<HTMLDivElement>(null),
    personal_info: useRef<HTMLDivElement>(null),
    contact_info: useRef<HTMLDivElement>(null),
    address: useRef<HTMLDivElement>(null),
    location: useRef<HTMLDivElement>(null),
    program: useRef<HTMLDivElement>(null),
    timeslot: useRef<HTMLDivElement>(null),
    active_da: useRef<HTMLDivElement>(null),
    completed_da: useRef<HTMLDivElement>(null),
    resident: useRef<HTMLDivElement>(null),
    eligible: useRef<HTMLDivElement>(null),
    declaration: useRef<HTMLDivElement>(null)
  }
  const [formValues, setFormValues] = useState({
    dental_clinic: '',
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
    active_da: null,
    completed_da: null,
    resident: null,
    eligible: null,
    declaration: false
  })

  // Function to scroll to first error
  const scrollToFirstError = (errors: any, touched: any) => {
    const errorFieldPriority = [
      'dental_clinic',
      'first_name',
      'last_name',
      'email',
      'keyin_email',
      'mobile_phone',
      'home_phone',
      'address1',
      'address2',
      'city',
      'province',
      'postcode',
      'country',
      'subject',
      'active_da',
      'completed_da',
      'resident',
      'eligible',
      'declaration'
    ]

    for (const field of errorFieldPriority) {
      if ((errors as any)[field] && (touched as any)[field]) {
        let refKey = field

        // Map specific fields to their question sections
        if (['first_name', 'last_name'].includes(field)) refKey = 'personal_info'
        else if (['email', 'keyin_email'].includes(field)) refKey = 'contact_info'
        else if (['mobile_phone', 'home_phone'].includes(field)) refKey = 'contact_info'
        else if (['address1', 'address2'].includes(field)) refKey = 'address'
        else if (['city', 'province', 'postcode', 'country'].includes(field)) refKey = 'location'
        else if (field === 'nl_resident') refKey = 'eligibility'
        else if (field === 'gov_enabler_approval_confirmed') refKey = 'gov_enabler'

        const ref = questionRefs[refKey as keyof typeof questionRefs]
        if (ref?.current) {
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
          break
        }
      }
    }
  }

  // Handle form submit button click
  const handleSubmitClick = () => {
    setSubmitAttempted(true)
    setHasScrolled(false) // Reset scroll tracking for new submit attempt
  }

  // Initial form values based on user type
  const getInitialValues = (): OrthoPreRegistrationForm => {
    return formValues
  }

  // Validation schema - updated for phone format
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    keyin_email: Yup.string().email('Invalid email'),
    address1: Yup.string().required('Address is required'),
    address2: Yup.string(),
    city: Yup.string().required('City is required'),
    province: Yup.string().required('Province is required'),
    postcode: Yup.string().required('Postal code is required'),
    country: Yup.string().required('Country is required'),
    mobile_phone: Yup.string()
      // Changed validation to match the mask format
      .matches(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number')
      .required('Mobile phone is required'),
    subject: Yup.string().required('Program is required').notOneOf([''], 'Program is required'),
    active_da: Yup.boolean().nullable().required('Please select an option'),
    completed_da: Yup.boolean().nullable().required('Please select an option'),
    resident: Yup.boolean().nullable().required('Please select an option'),
    eligible: Yup.boolean().nullable().required('Please select an option'),
    declaration: Yup.boolean().oneOf([true], 'You must agree to the terms')
  })

  // Handle form submission
  const handleSubmit = async (values: any): Promise<void> => {
    setSubmitAttempted(true)
    setLoading(true)
    setError(null)

    // Format phone numbers to remove mask characters before submission
    const formattedPhoneNumber = values.mobile_phone.replace(/\D/g, '')
    const formattedHomePhone = values.home_phone.replace(/\D/g, '')

    // Build new payload for ortho pre-registration
    const orthoPayload = {
      ...values,
      mobile_phone: formattedPhoneNumber,
      home_phone: formattedHomePhone,
      active_da: values.active_da === null ? false : Boolean(values.active_da),
      completed_da: values.completed_da === null ? false : Boolean(values.completed_da),
      resident: values.resident === null ? false : Boolean(values.resident),
      eligible: values.eligible === null ? false : Boolean(values.eligible),
      declaration: values.declaration === null ? false : Boolean(values.declaration)
    }

    try {
      await createOrthoPreRegistration(orthoPayload)
      setSuccess(true)
    } catch (err: any) {
      const isDuplicateEmail =
        (err.response && err.response.status === 409) ||
        (err.response?.data?.message && err.response.data.message.includes('Email already registered'))

      if (isDuplicateEmail) {
        setShowConflictModal(true)
      } else {
        setError('Failed to submit registration. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl min-h-screen p-6 mw-1280 bg-keyin-white">
      {error && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 bg-keyin-black">
          <div className="flex flex-col p-3 rounded-md bg-keyin-white">
            <div className="p-6 mb-4 bg-green-100 rounded-lg">
              <h2 className="mb-4 text-2xl font-bold text-green-800">Application Submitted Successfully!</h2>
              <p className="text-green-700">
                Thank you for pre-registering for the Hospitality Newfoundland and Labrador Micro-Credential program!
                Your pre-registration has been received.
              </p>
              <p>
                <strong>What Happens Next?</strong>
              </p>
              <ul className="ml-4 list-disc list-inside">
                <li>
                  You will receive an <strong>email confirmation </strong> shortly.{' '}
                </li>
                <li>
                  Once cohort schedules are finalized, you will be <strong>notified via email</strong> with{' '}
                  <strong>priority access</strong> to officially select your class time.{' '}
                </li>
                <li>In the meantime, keep an eye on your inbox for updates! </li>
              </ul>
              <p>
                If you have any questions, feel free to reach out to us at{' '}
                <a href="mailto:dentalupskilling@keyin.com " className="font-semibold text-keyin-bright-blue">
                  dentalupskilling@keyin.com
                </a>{' '}
                We look forward to supporting you on your learning journey!{' '}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setSuccess(false)
                  setSubmissionData(null)
                  window.location.href = '/'
                }}
                className="w-1/3 px-6 py-2 font-semibold rounded text-keyin-white bg-keyin-blue hover:brightness-90 hover:shadow-md focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <>
        <div className="flex flex-col pb-4 text-left gap-y-3">
          <h2 className="text-3xl text-center text-keyin-bright-blue">
            Welcome to the Orthodontic Module for Dental Assistants Pre-Registration!
          </h2>
          <span>To Complete your Pre-Registration Submission:</span>
          <span>
            1.<strong className="font-semibold"> Complete all required fields</strong> in the form below.
          </span>
          <span>
            2. <strong className="font-semibold">Select the program(s)</strong> you're interested in— Orthodontic
            Module.
          </span>
          <span>
            3. Click <strong className="font-semibold">Submit.</strong>
          </span>
          <span>
            Once your pre-registration is received, you'll get an email confirming that you're on the list. When cohort
            scheduling opens, you'll receive <strong className="font-semibold">priority access</strong> to choose your
            preferred start dates and finalize your registration.
          </span>
          <span>
            Need help? Email:{' '}
            <a href="mailto:dentalupskilling@keyin.com" className="underline text-keyin-blue">
              dentalupskilling@keyin.com
            </a>{' '}
            and we'll be happy to assist.
          </span>
          <span>
            <strong className="font-semibold">
              🚀 Secure your spot today and get ready for an exciting learning experience!{' '}
            </strong>
          </span>
        </div>
        <Formik initialValues={getInitialValues()} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, values, setFieldValue }) => {
            // Use useEffect hook for scroll handling
            useEffect(() => {
              if (submitAttempted && !hasScrolled) {
                const hasErrors = Object.keys(errors).some((key) => (errors as any)[key] && (touched as any)[key])
                if (hasErrors) {
                  const timer = setTimeout(() => {
                    scrollToFirstError(errors as any, touched as any)
                    setHasScrolled(true) // Mark that we've scrolled for this submit attempt
                  }, 100)
                  return () => clearTimeout(timer)
                } else {
                  // Reset submit attempted if no errors (successful submission)
                  setSubmitAttempted(false)
                  setHasScrolled(false)
                }
              }
            }, [errors, touched, submitAttempted, hasScrolled])

            return (
              <Form className="space-y-4">
                <div ref={questionRefs.dental_clinic}>
                  <label className="block mb-1 font-medium">Dental Clinic Name (Optional)</label>
                  <Field
                    name="dental_clinic"
                    type="text"
                    value={values.dental_clinic}
                    className={`w-full p-2 border rounded ${
                      errors.dental_clinic && touched.dental_clinic ? 'border-keyin-red-500' : 'border-gray-300'
                    }`}
                  />
                  <ErrorMessage
                    name="dental_clinic"
                    component="div"
                    className="mt-1 text-sm font-semibold text-keyin-red"
                  />
                </div>

                <div ref={questionRefs.personal_info} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 font-medium">First Name*</label>
                    <Field
                      name="first_name"
                      type="text"
                      value={values.first_name}
                      className={`w-full p-2 border rounded ${
                        errors.first_name && touched.first_name ? 'border-keyin-red-500' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage
                      name="first_name"
                      component="div"
                      className="mt-1 text-sm font-semibold text-keyin-red"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Last Name*</label>
                    <Field
                      name="last_name"
                      type="text"
                      value={values.last_name}
                      className={`w-full p-2 border rounded ${
                        errors.last_name && touched.last_name ? 'border-keyin-red-500' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage
                      name="last_name"
                      component="div"
                      className="mt-1 text-sm font-semibold text-keyin-red"
                    />
                  </div>
                </div>
                <div ref={questionRefs.contact_info} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 font-medium">Email*</label>
                    <Field
                      name="email"
                      type="email"
                      value={values.email}
                      className={`w-full p-2 border rounded ${
                        errors.email && touched.email ? 'border-keyin-red-500' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage name="email" component="div" className="mt-1 text-sm font-semibold text-keyin-red" />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Keyin Email (Optional)</label>
                    <Field
                      name="keyin_email"
                      type="email"
                      value={values.keyin_email}
                      className={`w-full p-2 border rounded ${
                        errors.keyin_email && touched.keyin_email ? 'border-keyin-red-500' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage
                      name="keyin_email"
                      component="keyin_email"
                      className="mt-1 text-sm font-semibold text-keyin-red"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 font-medium">Mobile Phone*</label>
                    {/* Replaced the standard Field with our custom phone input */}
                    <Field
                      name="mobile_phone"
                      component={PhoneInputField}
                      placeholder="(___) ___-____"
                      value={values.mobile_phone}
                    />
                    <ErrorMessage
                      name="mobile_phone"
                      component="div"
                      className="mt-1 text-sm font-semibold text-keyin-red"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Home Phone</label>
                    {/* Replaced the standard Field with our custom phone input */}
                    <Field
                      name="home_phone"
                      component={PhoneInputField}
                      placeholder="(___) ___-____"
                      value={values.home_phone}
                    />
                    <ErrorMessage
                      name="home_phone"
                      component="div"
                      className="mt-1 text-sm font-semibold text-keyin-red"
                    />
                  </div>
                </div>
                <div ref={questionRefs.address}>
                  <label className="block mb-1 font-medium">Address*</label>
                  <Field
                    name="address1"
                    type="text"
                    value={values.address1}
                    className={`w-full p-2 border rounded ${
                      errors.address1 && touched.address1 ? 'border-keyin-red-500' : 'border-gray-300'
                    }`}
                  />
                  <ErrorMessage name="address1" component="div" className="mt-1 text-sm font-semibold text-keyin-red" />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Address Line 2</label>
                  <Field
                    name="address2"
                    value={values.address2}
                    type="text"
                    className={`w-full p-2 border rounded ${
                      errors.address2 && touched.address2 ? 'border-keyin-red-500' : 'border-gray-300'
                    }`}
                  />
                  <ErrorMessage name="address2" component="div" className="mt-1 text-sm font-semibold text-keyin-red" />
                </div>
                <div ref={questionRefs.location} className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 font-medium">City*</label>
                    <Field
                      name="city"
                      type="text"
                      value={values.city}
                      className={`w-full p-2 border rounded ${
                        errors.city && touched.city ? 'border-keyin-red-500' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage name="city" component="div" className="mt-1 text-sm font-semibold text-keyin-red" />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Province*</label>
                    <Field
                      name="province"
                      type="text"
                      value={values.province}
                      className={`w-full p-2 border rounded ${
                        errors.province && touched.province ? 'border-keyin-red-500' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage
                      name="province"
                      component="div"
                      className="mt-1 text-sm font-semibold text-keyin-red"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-1 font-medium">Postal Code*</label>
                    <Field
                      name="postcode"
                      type="text"
                      value={values.postcode}
                      className={`w-full p-2 border rounded ${
                        errors.postcode && touched.postcode ? 'border-keyin-red-500' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage
                      name="postcode"
                      component="div"
                      className="mt-1 text-sm font-semibold text-keyin-red"
                    />
                  </div>
                  <div>
                    <label>Country*</label>
                    <Field
                      as="select"
                      name="country"
                      values={values.country}
                      className={`p-2 border border-keyin-light-gray rounded w-full ${
                        errors.country && touched.country ? 'border-keyin-red' : ''
                      }`}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('country', e.target.value)
                      }}
                    >
                      <option value="">Select Country</option>
                      {countryList.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="-mt-4 text-sm font-semibold text-keyin-red"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <p className="text-sm italic">
                    To confirm your eligibility to register for the program, please answer the following questions:
                  </p>
                </div>
                <div ref={questionRefs.program} className="mt-6">
                  <h2 className="mb-2 text-lg font-medium">Program Name*</h2>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field name="subject" type="radio" value="Orthodontic Module" />
                      <span className="ml-2">Orthodontic Module</span>
                    </label>
                  </div>
                  <ErrorMessage name="subject" component="div" className="mt-1 text-sm font-semibold text-keyin-red" />
                </div>

                <div ref={questionRefs.active_da} className="mt-6">
                  <p className="pb-3 text-keyin-green">
                    Do you hold an active registration as a Level II Dental Assistant in Newfoundland and Labrador?*
                  </p>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field
                        name="active_da"
                        type="radio"
                        value="true"
                        checked={values.active_da === true}
                        onChange={() => setFieldValue('active_da', true)}
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field
                        name="active_da"
                        type="radio"
                        value="false"
                        checked={values.active_da === false}
                        onChange={() => setFieldValue('active_da', false)}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="active_da"
                    component="div"
                    className="mt-1 text-sm font-semibold text-keyin-red"
                  />
                </div>

                <div ref={questionRefs.completed_da} className="mt-6">
                  <p className="pb-3 text-keyin-green">Have you completed foundational dental assisting education?*</p>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field
                        name="completed_da"
                        type="radio"
                        value="true"
                        checked={values.completed_da === true}
                        onChange={() => setFieldValue('completed_da', true)}
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field
                        name="completed_da"
                        type="radio"
                        value="false"
                        checked={values.completed_da === false}
                        onChange={() => setFieldValue('completed_da', false)}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="completed_da"
                    component="div"
                    className="mt-1 text-sm font-semibold text-keyin-red"
                  />
                </div>

                <div ref={questionRefs.resident} className="mt-6">
                  <p className="pb-3 text-keyin-green">Are you a resident of Newfoundland and Labrador?*</p>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field
                        name="resident"
                        type="radio"
                        value="true"
                        checked={values.resident === true}
                        onChange={() => setFieldValue('resident', true)}
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field
                        name="resident"
                        type="radio"
                        value="false"
                        checked={values.resident === false}
                        onChange={() => setFieldValue('resident', false)}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage name="resident" component="div" className="mt-1 text-sm font-semibold text-keyin-red" />
                </div>

                <div ref={questionRefs.eligible} className="mt-6">
                  <p className="pb-3 text-keyin-green">Are you eligible to work in Newfoundland and Labrador?*</p>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field
                        name="eligible"
                        type="radio"
                        value="true"
                        checked={values.eligible === true}
                        onChange={() => setFieldValue('eligible', true)}
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="flex items-center p-0 m-0 cursor-pointer">
                      <Field
                        name="eligible"
                        type="radio"
                        value="false"
                        checked={values.eligible === false}
                        onChange={() => setFieldValue('eligible', false)}
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                  <ErrorMessage name="eligible" component="div" className="mt-1 text-sm font-semibold text-keyin-red" />
                </div>

                <div ref={questionRefs.declaration} className="flex flex-col gap-y-3">
                  <h2>Participant Declaration</h2>
                  <p>
                    In submitting this application, I agree to be bound by the{' '}
                    <a href="https://www.keyin.com/privacy">Privacy Policy</a>, rules and regulations set forth by Keyin
                    College and that the above information is complete and accurate.
                  </p>
                  <label className="flex items-center p-0 m-0 cursor-pointer">
                    <Field name="declaration" type="checkbox" />
                    <span className="ml-2">Agree</span>
                  </label>
                  <ErrorMessage
                    name="declaration"
                    component="div"
                    className="mt-1 text-sm font-semibold text-keyin-red"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    onClick={handleSubmitClick}
                    disabled={loading}
                    className="px-6 py-2 font-semibold text-keyin-white rounded bg-keyin-bright-blue hover:brightness=[90] focus:outline-none hover:shadow-md"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </>

      {conflictModal && <ConflictModal onClose={() => setShowConflictModal(false)} conflictDetails={null} />}
    </div>
  )
}

export default PreRegister
