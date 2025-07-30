import { env } from "~/constants/env";
import { ContactSchema, contactSchemaType } from "~/schema";

async function sendDataToGoogleSheets(data: contactSchemaType): Promise<void> {
  // Format date as DD-MM-YYYY h:mma
  const now = new Date();
  const pad = (n: number) => n < 10 ? `0${n}` : n;
  let hours = now.getHours();
  const minutes = pad(now.getMinutes());
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedDate = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${hours}:${minutes}${ampm}`;

  const row = [
    formattedDate,
    ...Object.values(data)
  ];
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([row]),
  };

  const response = await fetch(
    `https://v1.nocodeapi.com/sanskargupta0/google_sheets/${env.NOCODE_API_KEY}?tabId=${env.NOCODE_TAB_ID}`,
    requestOptions
  );

  if (!response.ok) {
    throw new Error("Failed to send data to Google Sheets");
  }

  return await response.json();
}

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

    const result = await sendDataToGoogleSheets(data);

    return new Response(JSON.stringify(result), {
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
