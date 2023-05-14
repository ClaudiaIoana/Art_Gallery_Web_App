import {Art} from "./Art";
import {GalleryAuthor} from "./GalleryAuthor";

export interface Author {
    id: number;
    name: string;
    date_birth: string;
    date_death: string;
    period: string;
    originated: string;
    arts?: Art[];
    galleries?: GalleryAuthor[];
}
