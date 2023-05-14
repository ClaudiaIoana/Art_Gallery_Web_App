import {Location} from "./Location";
import {GalleryAuthor} from "./GalleryAuthor";

export interface Gallery{
    id: number;
    name: string;
    location?: Location | number;
    location_id?: number;
    theme: string;
    street: string;
    capacity: number;
    authors?: GalleryAuthor[];
}
