export interface IBody {
  captcha: string;
  to: string;
  message: string;
};

export interface IEvent {
  body: IBody;
};

export interface RecaptchaResponse extends IBody {
  success: boolean;
};
