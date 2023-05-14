import {Gallery} from "./GalleryObj";
import {Author} from "./AuthorObj";

export interface Art{
    id: number;
    title: string;
    author: Author;
    year: number;
    type: string;
    material: string;
    gallery: Gallery ;
}

