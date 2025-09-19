export const submitContactForm = async (formData: {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  message: string;
}) => {
  try {
    const response = await fetch(`${proccess.env.NEXT_PUBLIC_SERVER_URL}/api/contact-form`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to submit form.');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
};
