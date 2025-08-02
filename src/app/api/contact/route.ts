import { ContactSchema, contactSchemaType } from "~/schema";
import { appendToGoogleSheets } from "~/lib/google-sheets";

async function handlePostRequest(request: Request): Promise<Response> {
  try {
    const data = (await request.json()) as contactSchemaType;
    const form = ContactSchema.safeParse(data);

    if (form.error) {
      return new Response(JSON.stringify(form.error.formErrors.fieldErrors), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    await appendToGoogleSheets(data);

    return new Response(JSON.stringify({ success: true, message: "Data saved successfully" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request: Request): Promise<Response> {
  return handlePostRequest(request);
}
