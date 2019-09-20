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
const twilio_1 = __importDefault(require("twilio"));
const Config = __importStar(require("../lib/Config"));
exports.sendMessage = (to, message, callback) => {
    const twilioAccountSid = Config.get('TWILIO_ACCOUNT_SID');
    const twilioAuthToken = Config.get('TWILIO_AUTH_TOKEN');
    const twilioPhoneNumber = Config.get('TWILIO_PHONE_NUMBER');
    const twilioClient = twilio_1.default(twilioAccountSid, twilioAuthToken);
    const headers = { 'Access-Control-Allow-Origin': '*' };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdpbGlvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9Ud2lsaW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLHNEQUF3QztBQUUzQixRQUFBLFdBQVcsR0FBRyxDQUFDLEVBQVUsRUFBRSxPQUFlLEVBQUUsUUFBa0IsRUFBRSxFQUFFO0lBRTdFLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQzFELE1BQU0sZUFBZSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUN4RCxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUc1RCxNQUFNLFlBQVksR0FBRyxnQkFBTSxDQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBRy9ELE1BQU0sT0FBTyxHQUFHLEVBQUMsNkJBQTZCLEVBQUUsR0FBRyxFQUFDLENBQUM7SUFHckQsTUFBTSxHQUFHLEdBQUc7UUFDVixFQUFFO1FBQ0YsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsaUJBQWlCO0tBQ3hCLENBQUM7SUFFRixZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDaEQsSUFBSSxLQUFLLEVBQUU7WUFDVCxNQUFNLGlCQUFpQixHQUFHO2dCQUN4QixPQUFPLEVBQUUsT0FBTztnQkFDaEIsVUFBVSxFQUFFLEdBQUc7Z0JBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ25CLE1BQU0sRUFBRSxNQUFNO29CQUNkLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztvQkFDdEIsS0FBSyxFQUFFLEtBQUs7aUJBQ2IsQ0FBQzthQUNILENBQUM7WUFFRixPQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztTQUMxQztRQUdELE1BQU0sZUFBZSxHQUFHO1lBQ3RCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLE1BQU0sRUFBRSxTQUFTO2dCQUNqQixPQUFPLEVBQUUsaUNBQWlDO2dCQUMxQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQzFCLENBQUM7U0FDSCxDQUFDO1FBRUYsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNsQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyJ9