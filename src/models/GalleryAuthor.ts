import {Author} from "./Author";
import {Gallery} from "./Gallery";

export interface GalleryAuthor{
    id: number;
    author: Author | number;
    gallery: Gallery | number;
    starting_exposition: string;
    ending_exposition: string;
    nb_participants: number;
    invited: number;
}
