import { title } from "process"
import { UserData } from './user-data.model';

export interface DialogData {
    success: boolean;
    title: string;
    message: string;
    user: UserData
}