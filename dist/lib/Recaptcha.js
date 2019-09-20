"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Config = __importStar(require("../lib/Config"));
exports.validateRecaptcha = async (captcha) => {
    const recaptchaSecret = Config.get('GOOGLE_RECAPTCHA_TOKEN');
    const headers = { 'Access-Control-Allow-Origin': '*' };
    try {
        const recaptchaResponse = await axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captcha}`);
        console.log(recaptchaResponse.data);
        if (recaptchaResponse.data.success === false) {
            const recaptchaFailedErrResponse = {
                headers: headers,
                statusCode: 200,
                body: JSON.stringify({
                    status: 'fail',
                    message: 'Captcha validation failed. Refresh the page & try again!',
                })
            };
            return { error: true, errorResponse: recaptchaFailedErrResponse };
        }
        return { error: false, errorResponse: null };
    }
    catch (error) {
        const recaptchaErrResponse = {
            headers: headers,
            statusCode: 500,
            body: JSON.stringify({
                status: 'fail',
                message: 'Error attempting to validate recaptcha.',
                error: error
            }),
        };
        return { error: true, errorResponse: recaptchaErrResponse };
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjYXB0Y2hhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9SZWNhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHNEQUF3QztBQUczQixRQUFBLGlCQUFpQixHQUFHLEtBQUssRUFBRSxPQUFlLEVBQUUsRUFBRTtJQUd6RCxNQUFNLGVBQWUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFHN0QsTUFBTSxPQUFPLEdBQUcsRUFBQyw2QkFBNkIsRUFBRSxHQUFHLEVBQUMsQ0FBQztJQUVyRCxJQUFJO1FBQ0YsTUFBTSxpQkFBaUIsR0FBc0IsTUFBTSxlQUFLLENBQUMsSUFBSSxDQUFDLDBEQUEwRCxlQUFlLGFBQWEsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMvSixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBSXBDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUMsTUFBTSwwQkFBMEIsR0FBRztnQkFDakMsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNuQixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsMERBQTBEO2lCQUNwRSxDQUFDO2FBQ0gsQ0FBQztZQUVGLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSwwQkFBMEIsRUFBQyxDQUFDO1NBQ2xFO1FBRUQsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzlDO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxNQUFNLG9CQUFvQixHQUFHO1lBQzNCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE9BQU8sRUFBRSx5Q0FBeUM7Z0JBQ2xELEtBQUssRUFBRSxLQUFLO2FBQ2IsQ0FBQztTQUNILENBQUM7UUFFRixPQUFPLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQztLQUM1RDtBQUNILENBQUMsQ0FBQyJ9