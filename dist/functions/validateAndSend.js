"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Twilio_1 = require("../lib/Twilio");
const Recaptcha_1 = require("../lib/Recaptcha");
const Config = __importStar(require("../lib/Config"));
exports.validateAndSend = async (event, context, callback) => {
    const headers = { 'Access-Control-Allow-Origin': '*' };
    if (Config.get('NODE_ENV') === 'test') {
        event.body = {
            "captcha": "REPLACE_WITH_VALID_CAPTCHA_FROM_WEBSITE",
            "message": "Woof Garden from Test Environment",
            "to": "254724052900"
        };
    }
    if (!event.body) {
        throw new Error('Request body is invalid');
    }
    if (!event.body.captcha) {
        throw new Error('Captcha is invalid');
    }
    try {
        await Recaptcha_1.validateRecaptcha(event.body.captcha, callback);
        Twilio_1.sendMessage(event.body.to, event.body.message, callback);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVBbmRTZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy92YWxpZGF0ZUFuZFNlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsMENBQTRDO0FBQzVDLGdEQUFxRDtBQUVyRCxzREFBd0M7QUFFM0IsUUFBQSxlQUFlLEdBQVksS0FBSyxFQUFFLEtBQWEsRUFBRSxPQUFnQixFQUFFLFFBQXlDLEVBQUUsRUFBRTtJQUUzSCxNQUFNLE9BQU8sR0FBRyxFQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBQyxDQUFDO0lBRXJELElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxNQUFNLEVBQUU7UUFDckMsS0FBSyxDQUFDLElBQUksR0FBRztZQUNYLFNBQVMsRUFBRSx5Q0FBeUM7WUFDcEQsU0FBUyxFQUFFLG1DQUFtQztZQUM5QyxJQUFJLEVBQUUsY0FBYztTQUNyQixDQUFBO0tBQ0Y7SUFHRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztLQUM1QztJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDdkM7SUFFRCxJQUFJO1FBQ0YsTUFBTSw2QkFBaUIsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN0RCxvQkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzFEO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLFdBQVcsR0FBRztZQUNsQixPQUFPLEVBQUUsT0FBTztZQUNoQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsdUJBQXVCO2dCQUNoQyxLQUFLLEVBQUUsS0FBSzthQUNiLENBQUM7U0FDSCxDQUFDO1FBRUYsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDIn0=