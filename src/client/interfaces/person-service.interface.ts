import { Observable } from "rxjs";

export interface PersonsService {
    findOne(data: { id: number }): Observable<any>;
}