import { Context, Callback, Handler, APIGatewayProxyResult } from 'aws-lambda';
import { sendMessage } from '../lib/Twilio';
import { validateRecaptcha } from '../lib/Recaptcha';
import { IEvent } from '../types';
import * as Config from '../lib/Config';

export const validateAndSend: Handler = async (event: IEvent, context: Context, callback: Callback<APIGatewayProxyResult>) => {
  // Required in responses for CORS support to work
  const headers = {'Access-Control-Allow-Origin': '*'};

  if (Config.get('NODE_ENV') === 'test') {
    event.body = {
      "captcha": "REPLACE_WITH_VALID_CAPTCHA_FROM_WEBSITE",
      "message": "Woof Garden from Test Environment",
      "to": "254724052900"
    }
  }

  // Validations
  if (!event.body) {
    throw new Error('Request body is invalid');
  }

  if (!event.body.captcha) {
    throw new Error('Captcha is invalid');
  }

  try {
    await validateRecaptcha(event.body.captcha, callback);
    sendMessage(event.body.to, event.body.message, callback);
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
