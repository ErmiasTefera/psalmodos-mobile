import { Track } from "react-native-track-player";

export interface BaseModel {
    id: string;
    created_by_id?: string;
    modified_by_id?: string;
    created_at?: Date;
    updated_at?: Date;
    is_active?: boolean;
}

export interface TrackObject extends Track {
    id: string;
}