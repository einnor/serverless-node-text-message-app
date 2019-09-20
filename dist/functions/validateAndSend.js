"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Twilio_1 = require("../lib/Twilio");
const Recaptcha_1 = require("../lib/Recaptcha");
exports.validateAndSend = async (event, context, callback) => {
    const headers = { 'Access-Control-Allow-Origin': '*' };
    if (!event.body) {
        throw new Error('Request body is invalid');
    }
    if (!event.body.captcha) {
        throw new Error('Captcha is invalid');
    }
    try {
        const recaptchaResponse = await Recaptcha_1.validateRecaptcha(event.body.captcha, callback);
        if (recaptchaResponse) {
            Twilio_1.sendMessage(recaptchaResponse.to, recaptchaResponse.message, callback);
        }
    }
    catch (error) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVBbmRTZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy92YWxpZGF0ZUFuZFNlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSwwQ0FBNEM7QUFDNUMsZ0RBQXFEO0FBR3hDLFFBQUEsZUFBZSxHQUFZLEtBQUssRUFBRSxLQUFhLEVBQUUsT0FBZ0IsRUFBRSxRQUF5QyxFQUFFLEVBQUU7SUFFM0gsTUFBTSxPQUFPLEdBQUcsRUFBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUdyRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztLQUM1QztJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDdkM7SUFFRCxJQUFJO1FBQ0YsTUFBTSxpQkFBaUIsR0FBNkIsTUFBTSw2QkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUUxRyxJQUFJLGlCQUFpQixFQUFFO1lBQ3JCLG9CQUFXLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN4RTtLQUNGO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLFdBQVcsR0FBRztZQUNsQixPQUFPLEVBQUUsT0FBTztZQUNoQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxLQUFLLEVBQUUsS0FBSzthQUNiLENBQUM7U0FDSCxDQUFDO1FBRUYsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDIn0=