import {Gallery} from "./Gallery";

export interface Location{
    id: number;
    country: string;
    city: string;
    galleries?: Gallery[];
    to_visit: string;
}
