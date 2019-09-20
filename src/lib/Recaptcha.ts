import { Callback} from 'aws-lambda';
import axios from 'axios';
import * as Config from '../lib/Config';
import { RecaptchaResponse } from '../types';

export const validateRecaptcha = async (captcha: string, callback: Callback) => {

  // Load environment variable
  const recaptchaSecret = Config.get('GOOGLE_RECAPTCHA_TOKEN');

  // Required in responses for CORS support to work
  const headers = {'Access-Control-Allow-Origin': '*'};

  try {
    const recaptchaResponse: RecaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captcha}`);
    console.log(recaptchaResponse.data);

    // const parsedBody = JSON.parse(body);

    if (recaptchaResponse.data.success === false) {
      const recaptchaFailedErrResponse = {
        headers: headers,
        statusCode: 200,
        body: JSON.stringify({
          status: 'fail',
          message: 'Captcha validation failed. Refresh the page & try again!',
        })
      };

      return callback(null, recaptchaFailedErrResponse);
    }
  } catch (error) {
    const recaptchaErrResponse = {
      headers: headers,
      statusCode: 500,
      body: JSON.stringify({
        status: 'fail',
        message: 'Error attempting to validate recaptcha.',
        error: error
      }),
    };

    return callback(null, recaptchaErrResponse);
  }
};
