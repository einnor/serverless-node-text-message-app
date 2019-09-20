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
exports.validateRecaptcha = async (captcha, callback) => {
    const recaptchaSecret = Config.get('GOOGLE_RECAPTCHA_TOKEN');
    const headers = { 'Access-Control-Allow-Origin': '*' };
    try {
        const recaptchaResponse = await axios_1.default.post(`https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${captcha}`);
        console.log(recaptchaResponse);
        if (recaptchaResponse.success === false) {
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
        return recaptchaResponse;
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
        return callback(null, recaptchaErrResponse);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjYXB0Y2hhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9SZWNhcHRjaGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLHNEQUF3QztBQUczQixRQUFBLGlCQUFpQixHQUFHLEtBQUssRUFBRSxPQUFlLEVBQUUsUUFBa0IsRUFBRSxFQUFFO0lBRzdFLE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUc3RCxNQUFNLE9BQU8sR0FBRyxFQUFDLDZCQUE2QixFQUFFLEdBQUcsRUFBQyxDQUFDO0lBRXJELElBQUk7UUFDRixNQUFNLGlCQUFpQixHQUFzQixNQUFNLGVBQUssQ0FBQyxJQUFJLENBQUMsMERBQTBELGVBQWUsYUFBYSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9KLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUkvQixJQUFJLGlCQUFpQixDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDdkMsTUFBTSwwQkFBMEIsR0FBRztnQkFDakMsT0FBTyxFQUFFLE9BQU87Z0JBQ2hCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNuQixNQUFNLEVBQUUsTUFBTTtvQkFDZCxPQUFPLEVBQUUsMERBQTBEO2lCQUNwRSxDQUFDO2FBQ0gsQ0FBQztZQUVGLE9BQU8sUUFBUSxDQUFDLElBQUksRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1NBQ25EO1FBRUQsT0FBTyxpQkFBaUIsQ0FBQztLQUMxQjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsTUFBTSxvQkFBb0IsR0FBRztZQUMzQixPQUFPLEVBQUUsT0FBTztZQUNoQixVQUFVLEVBQUUsR0FBRztZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNuQixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUseUNBQXlDO2dCQUNsRCxLQUFLLEVBQUUsS0FBSzthQUNiLENBQUM7U0FDSCxDQUFDO1FBRUYsT0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUM7S0FDN0M7QUFDSCxDQUFDLENBQUMifQ==