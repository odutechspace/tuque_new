import { CollectionConfig } from 'payload';

const ContactForm: CollectionConfig = {
  slug: 'contact-form',
  admin: {
    useAsTitle: 'firstName',
  },
  access: {
    create: () => true,

    read: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      required: true,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      required: true,
    },
  ],
};

export default ContactForm;
