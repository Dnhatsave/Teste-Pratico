export interface ConvertBaseDTO {
    time_last_update_unix: string;
    time_last_update_utc: string;
    time_next_update_unix: string;
    time_next_update_utc: string;
    base_code: string;
    target_code:string;
    conversion_rate: number;

}