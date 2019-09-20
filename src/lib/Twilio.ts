import Twilio from 'twilio';
import { Callback } from 'aws-lambda';
import * as Config from '../lib/Config';

export const sendMessage = (to: string, message: string, callback: Callback) => {
  // Load environment variables
  const twilioAccountSid = Config.get('TWILIO_ACCOUNT_SID');
  const twilioAuthToken = Config.get('TWILIO_AUTH_TOKEN');
  const twilioPhoneNumber = Config.get('TWILIO_PHONE_NUMBER');

  // Twilio client
  const twilioClient = Twilio(twilioAccountSid, twilioAuthToken);

  // Required in responses for CORS support to work
  const headers = {'Access-Control-Allow-Origin': '*'};

  // Try to actually send the message
  const sms = {
    to,
    body: message,
    from: twilioPhoneNumber,
  };

  twilioClient.messages.create(sms, (error, data) => {
    if (error) {
      const twilioErrResponse = {
        headers: headers,
        statusCode: 200,
        body: JSON.stringify({
          status: 'fail',
          message: error.message,
          error: error
        })
      };

      return callback(null, twilioErrResponse);
    }

    // If no errors: Return success response!
    const successResponse = {
      headers: headers,
      statusCode: 200,
      body: JSON.stringify({
        status: 'success',
        message: 'Text message successfully sent!',
        body: data.body,
        created: data.dateCreated
      })
    };

    callback(null, successResponse);
  });
};
