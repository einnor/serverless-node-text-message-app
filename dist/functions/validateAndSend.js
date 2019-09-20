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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVBbmRTZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy92YWxpZGF0ZUFuZFNlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsMENBQTRDO0FBQzVDLGdEQUFxRDtBQUVyRCxzREFBd0M7QUFFM0IsUUFBQSxlQUFlLEdBQVksS0FBSyxFQUFFLEtBQWEsRUFBRSxPQUFnQixFQUFFLFFBQWtCLEVBQUUsRUFBRTtJQUNwRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssTUFBTSxFQUFFO1FBQ3JDLEtBQUssQ0FBQyxJQUFJLEdBQUc7WUFDWCxTQUFTLEVBQUUseUNBQXlDO1lBQ3BELFNBQVMsRUFBRSxtQ0FBbUM7WUFDOUMsSUFBSSxFQUFFLGNBQWM7U0FDckIsQ0FBQTtLQUNGO0lBR0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7UUFDZixNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FDNUM7SUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDdkIsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3ZDO0lBRUQsTUFBTSxpQkFBaUIsR0FBRyxNQUFNLDZCQUFpQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEUsSUFBSSxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7UUFDM0IsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3hEO0lBQ0QsTUFBTSxjQUFjLEdBQUcsTUFBTSxvQkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RGLElBQUksY0FBYyxDQUFDLEtBQUssRUFBRTtRQUN4QixPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0tBQ3JEO0lBRUQsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN4RCxDQUFDLENBQUMifQ==