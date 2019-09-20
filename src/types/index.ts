export interface IBody {
  captcha: string;
  to: string;
  message: string;
};

export interface IEvent {
  body: IBody;
};

export interface RecaptchaData {
  success: boolean;
}

export interface RecaptchaResponse extends IBody {
  data: RecaptchaData;
};
