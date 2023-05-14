import {Location} from "./Location";
import {GalleryAuthor} from "./GalleryAuthorObj";

export interface Gallery{
    id: number;
    name: string;
    location?: Location ;
    location_id?: number;
    theme: string;
    street: string;
    capacity: number;
    authors?: GalleryAuthor[];
}
