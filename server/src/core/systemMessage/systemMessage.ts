export default class SystemMessage {
    public success: boolean;
    public message: string;
    public data: any;
    constructor(success: boolean, message: string, data: any = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static success(message: string, data: any = null): SystemMessage {
        return new SystemMessage(true, message, data);
    }

    public static error(message: string, data: any = null): SystemMessage {
        return new SystemMessage(false, message, data);
    }

    public static fromJson(json: string): SystemMessage {
        const data = JSON.parse(json);
        return new SystemMessage(data.success, data.message, data.data);
    }

    public toJson(): string {
        return JSON.stringify({ success: this.success, message: this.message, data: this.data });
    }
}