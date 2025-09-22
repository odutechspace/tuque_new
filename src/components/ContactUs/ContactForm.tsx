'use client'

import { addToast, Button, Input, Textarea } from '@heroui/react'
import React, { useState } from 'react'
import { submitContactForm } from '@/app/service/contact-form.service'
import { Alert } from '@heroui/alert'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    message: '',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setStatusMessage('')
    setIsSuccess(false)

    try {
      await submitContactForm(formData)

      setStatusMessage('Thank you for your message! We will be in touch shortly.')
      addToast({ title: 'Message sent Successfully', color: 'success' })
      setIsSuccess(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: '',
      })
    } catch (error: any) {
      console.error('Error submitting form:', error)
      setStatusMessage(error.message || 'An unexpected error occurred. Please try again.')
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          placeholder="Enter your first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          isRequired
          variant="bordered"
        />
        <Input
          label="Last Name"
          placeholder="Enter your last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          isRequired
          variant="bordered"
        />
      </div>

      <Input
        label="Email Address"
        placeholder="Enter your email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        isRequired
        variant="bordered"
      />

      <Input
        label="Phone Number"
        placeholder="Enter your phone number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        type="tel"
        variant="bordered"
      />

      <Textarea
        label="Message"
        placeholder="Tell us how we can help you..."
        name="message"
        value={formData.message}
        onChange={handleChange}
        isRequired
        variant="bordered"
        minRows={5}
      />

      {statusMessage && (
        <Alert color={isSuccess ? 'success' : 'danger'} description={statusMessage} />
      )}

      <Button
        type="submit"
        color="primary"
        size="lg"
        disabled={isLoading}
        className="w-full font-semibold"
      >
        {isLoading ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  )
}

export default ContactForm
