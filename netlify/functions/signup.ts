import { Handler, HandlerEvent } from '@netlify/functions';
import Airtable from 'airtable';
const { AIRTABLE_KEY } = process.env;
const base = new Airtable({ apiKey: AIRTABLE_KEY }).base('apptf65PASczhtDdc');

const handler: Handler = async (event: HandlerEvent, context: any) => {
  try {
    const data = JSON.parse(event.body || '');

    if (!data.email) {
      return {
        statusCode: 400,
        body: 'Please include email.',
      };
    }

    await base('tblMiBONpYr2tSxYB').create({
      Email: data.email,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Thanks for signing up!',
      }),
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      body: err.message,
    };
  }
};

export { handler };
