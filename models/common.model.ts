export interface BaseModel {
    id: string;
    created_by_id?: string;
    modified_by_id?: string;
    created_at?: Date;
    updated_at?: Date;
    is_active?: boolean;
}

export interface TrackObject {
    id: string;
    url: string;
    title: string;
    artist: string;
}