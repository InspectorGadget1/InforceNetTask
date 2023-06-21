export interface ShortURL {
    id: number;
    shortenedURL: string;
    destinationURL: string;
    createdDate: string;
    createdBy: string;
}
export interface ShortURLDto {
    destinationURL: string;
    createdBy?: string;
}

