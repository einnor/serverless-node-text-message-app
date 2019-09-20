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
    const recaptchaResponse = await Recaptcha_1.validateRecaptcha(event.body.captcha);
    if (recaptchaResponse.error) {
        return callback(null, recaptchaResponse.errorResponse);
    }
    const twilioResponse = await Twilio_1.sendMessage(event.body.to, event.body.message, callback);
    if (twilioResponse.error) {
        return callback(null, twilioResponse.errorResponse);
    }
    return callback(null, twilioResponse.successResponse);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVBbmRTZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy92YWxpZGF0ZUFuZFNlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsMENBQTRDO0FBQzVDLGdEQUFxRDtBQUVyRCxzREFBd0M7QUFFM0IsUUFBQSxlQUFlLEdBQVksS0FBSyxFQUFFLEtBQWEsRUFBRSxPQUFnQixFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUVwRyxNQUFNLE9BQU8sR0FBRyxFQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBQyxDQUFDO0lBRXJELElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxNQUFNLEVBQUU7UUFDckMsS0FBSyxDQUFDLElBQUksR0FBRztZQUNYLFNBQVMsRUFBRSx5Q0FBeUM7WUFDcEQsU0FBUyxFQUFFLG1DQUFtQztZQUM5QyxJQUFJLEVBQUUsY0FBYztTQUNyQixDQUFBO0tBQ0Y7SUFHRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztLQUM1QztJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7S0FDdkM7SUFFRCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sNkJBQWlCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0RSxJQUFJLGlCQUFpQixDQUFDLEtBQUssRUFBRTtRQUMzQixPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDeEQ7SUFDRCxNQUFNLGNBQWMsR0FBRyxNQUFNLG9CQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEYsSUFBSSxjQUFjLENBQUMsS0FBSyxFQUFFO1FBQ3hCLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDckQ7SUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQyJ9