import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ConvertBaseDTO } from "../home/models/convert-base.DTO";
import { API_CONFIG } from "src/config/api.config";
import { API_KEY } from "src/config/api.keys";
import { CodesDTO } from "../home/models/codes.DTO";

@Injectable()
export class PairService {

    constructor(
        public http: HttpClient
    ){}

    exchange(base_code: string, target_code: string) : Observable<ConvertBaseDTO[]> {
        return this.http.get<ConvertBaseDTO[]>(`${API_CONFIG.baseUrl}/${API_KEY.private_keys}/pair/${base_code}/${target_code}`);
    }

    getCodes() : Observable<CodesDTO[]>  {
        return this.http.get<CodesDTO[]>(`${API_CONFIG.baseUrl}/${API_KEY.private_keys}/codes`);
    }

    //Challenge
    challenge(code:string) : Observable<ConvertBaseDTO[]>{
        return this.http.get<ConvertBaseDTO[]>(`https://open.er-api.com/v6/latest/${code}`);
    }
}