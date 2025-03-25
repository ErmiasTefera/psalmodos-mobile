import { BaseModel } from "./common.model";

export interface Mezmur extends BaseModel {
    title: string;
    artist?: string;
    duration: number;
    description?: string;
    category_id?: string;
    audio_file_path: string;
    audio_file_name: string;
    audio_file_type: string;
    lyrics: string;
    isPlaying: boolean;
    isLoading: boolean;
}