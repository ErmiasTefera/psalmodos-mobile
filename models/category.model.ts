import { BaseModel } from "./common.model";

export interface Category extends BaseModel {
    name: string;
    description?: string;
    number_of_mezmurs: number;
    last_updated_at: string;
}