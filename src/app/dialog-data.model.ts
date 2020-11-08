import { UserData } from './auth/user-data.model';

export interface DialogData {
    success: boolean;
    title: string;
    message: string;
    user: UserData
}