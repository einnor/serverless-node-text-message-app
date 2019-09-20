import { Context, Callback, Handler, APIGatewayProxyResult } from 'aws-lambda';
import { sendMessage } from '../lib/Twilio';
import { validateRecaptcha } from '../lib/Recaptcha';
import { IEvent, RecaptchaResponse } from '../types';

export const validateAndSend: Handler = async (event: IEvent, context: Context, callback: Callback<APIGatewayProxyResult>) => {
  // Required in responses for CORS support to work
  const headers = {'Access-Control-Allow-Origin': '*'};

  // Validations
  if (!event.body) {
    throw new Error('Request body is invalid');
  }

  if (!event.body.captcha) {
    throw new Error('Captcha is invalid');
  }

  try {
    const recaptchaResponse: RecaptchaResponse | void = await validateRecaptcha(event.body.captcha, callback);

    if (recaptchaResponse) {
      sendMessage(recaptchaResponse.to, recaptchaResponse.message, callback);
    }
  } catch (error) {
    const errResponse = {
      headers: headers,
      statusCode: 500,
      body: JSON.stringify({
        status: 'fail',
        message: 'Something went wrong.',
        error: error
      }),
    };

    return callback(null, errResponse);
  }
};
