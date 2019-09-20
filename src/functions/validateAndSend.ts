import { Context, Callback, Handler, APIGatewayProxyResult } from 'aws-lambda';
import { sendMessage } from '../lib/Twilio';
import { validateRecaptcha } from '../lib/Recaptcha';
import { IEvent } from '../types';
import * as Config from '../lib/Config';

export const validateAndSend: Handler = async (event: IEvent, context: Context, callback: Callback) => {
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

  const recaptchaResponse = await validateRecaptcha(event.body.captcha);
  if (recaptchaResponse.error) {
    return callback(null, recaptchaResponse.errorResponse);
  }
  const twilioResponse = await sendMessage(event.body.to, event.body.message, callback);
  if (twilioResponse.error) {
    return callback(null, twilioResponse.errorResponse);
  }

  return callback(null, twilioResponse.successResponse);
};
