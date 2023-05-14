import './App.css'
import {LocationShowAll} from "./components/location/LocationShowAll";
import {LocationAdd} from "./components/location/LocationAdd";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {LocationDelete} from "./components/location/LocationDelete";
import {LocationDetails} from "./components/location/LocationDetails";
import {LocationEdit} from "./components/location/LocationEdit";
import {ArtFilter} from "./components/art/ArtFilter";
import {AppMenu} from "./components/AppMenu";

import {GalleryShowAll} from "./components/gallery/GalleryShowAll";
import {GalleryDetails} from "./components/gallery/GalleryDetails";
import {GalleryEdit} from "./components/gallery/GalleryEdit";
import {GalleryAdd} from "./components/gallery/GalleryAdd";
import {GalleryDelete} from "./components/gallery/GalleryDelete";
import {AuthorShowAll} from "./components/author/AuthorShowAll";
import {ArtShowAll} from "./components/art/ArtShowAll";
import {GalleryAuthorShowAll} from "./components/gallery_author/GalleryAuthorShowAll";
import {GalleryAuthorDetails} from "./components/gallery_author/GalleryAuthorDetails";
import {AuthorDetails} from "./components/author/AuthorDetails";
import {ArtDetails} from "./components/art/ArtDetails";
import {GalleryAuthorAdd} from "./components/gallery_author/GalleryAuthorAdd";
import {AuthorAdd} from "./components/author/AuthorAdd";
import {ArtAdd} from "./components/art/ArtAdd";
import {ArtDelete} from "./components/art/ArtDelete";
import {AuthorDelete} from "./components/author/AuthorDelete";
import {GalleryAuthorDelete} from "./components/gallery_author/GalleryAuthorDelete";
import {GalleryAuthorEdit} from "./components/gallery_author/GalleryAuthorEdit";
import {AuthorEdit} from "./components/author/AuthorEdit";
import {ArtEdit} from "./components/art/ArtEdit";
import {AuthorByPeriodStatistics} from "./components/statistics/AuthorByPeriod";



function App() {
  return (

      <>
          <BrowserRouter>
              <AppMenu />
              <Routes>
                  <Route path ="/locations/" element = {<LocationShowAll/>}/>
                  <Route path ="/gallery/" element = {<GalleryShowAll/>}/>
                  <Route path ="/author/" element = {<AuthorShowAll/>}/>
                  <Route path ="/art/" element = {<ArtShowAll/>}/>
                  <Route path ="/galleryauthor/" element = {<GalleryAuthorShowAll/>}/>

                  <Route path ="/locations/add/" element = {<LocationAdd/>}/>
                  <Route path ="/gallery/add/" element = {<GalleryAdd/>}/>
                  <Route path ="/galleryauthor/add/" element = {<GalleryAuthorAdd/>}/>
                  <Route path ="/author/add/" element = {<AuthorAdd/>}/>
                  <Route path ="/art/add/" element = {<ArtAdd/>}/>

                  <Route path="/locations/:locationId/delete" element={<LocationDelete/>} />
                  <Route path="/gallery/:galleryId/delete" element={<GalleryDelete/>} />
                  <Route path="/art/:artId/delete" element={<ArtDelete/>} />
                  <Route path="/author/:authorId/delete" element={<AuthorDelete/>} />
                  <Route path="/galleryauthor/:galleryauthorId/delete" element={<GalleryAuthorDelete/>} />

                  <Route path="/locations/:locationId/details" element={<LocationDetails />} />
                  <Route path="/gallery/:galleryId/details" element={<GalleryDetails />} />
                  <Route path="/galleryauthor/:galleryauthorId/details" element={<GalleryAuthorDetails />} />
                  <Route path="/author/:authorId/details" element={<AuthorDetails />} />
                  <Route path="/art/:artId/details" element={<ArtDetails />} />

                  <Route path="/locations/:locationId/edit" element={<LocationEdit />} />
                  <Route path="/gallery/:galleryId/edit" element={<GalleryEdit />} />
                  <Route path="/galleryauthor/:galleryauthorId/edit" element={<GalleryAuthorEdit />} />
                  <Route path="/author/:authorId/edit" element={<AuthorEdit />} />
                  <Route path="/art/:artId/edit" element={<ArtEdit />} />

                  <Route path="/author_report" element={<AuthorByPeriodStatistics />} />

                  <Route path="/art-filter/" element={<ArtFilter />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App;


