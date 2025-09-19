import { getPayload } from 'payload';
import config  from '@payload-config';
import { NextResponse } from 'next/server'

interface ContactFormSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const payload = await getPayload({ config });

    // Parse the JSON body from the incoming request
    const formData: ContactFormSubmission = await req.json();


    // Basic server-side validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      const init: any = { status: 400 };
      return NextResponse.json(
        { error: "First Name, Last Name, Email, and Message are required." },
        init
      );
    }

    // Create a new document in the 'contact-forms' collection
    await payload.create<any>({
      collection: "contact-form",
      data: formData,
    });

    return NextResponse.json({ message: "Form submitted successfully!" });
  } catch (err: any) {

    console.error("Error submitting contact form:", err);
    const init: any = { status: 500 };
    return NextResponse.json(
      { error: "Internal Server Error" },
      init
    );
  }
}
