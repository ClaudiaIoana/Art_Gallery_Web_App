from django.test import TestCase
from rest_framework.test import APITestCase, APIClient
from rest_framework import status

from api.models import Art, Location, Gallery, Author, GalleryAuthor



class ArtByYearTest(APITestCase):
    def setUp(self):
        self.location = Location.objects.create(id=1, country='c1', city='c2')
        self.gallery = Gallery.objects.create(id=1, name='n1', location=self.location, theme='t1', street='s1', capacity=100)
        self.author = Author.objects.create(id=1, name='n', date_birth='2002-2-2', date_death='2002-2-2', period='p1',
                                            originated='o')
        self.art1 = Art.objects.create(
            id=1, title='The Starry Night1', author=self.author, year=1889, type='painting', material='oil', gallery=self.gallery
        )
        self.art2 = Art.objects.create(
            id=2, title='The Starry Night2', author=self.author, year=1886, type='painting', material='oil', gallery=self.gallery
        )
        self.art3 = Art.objects.create(
            id=3, title='The Starry Night3', author=self.author, year=1884, type='painting', material='oil', gallery=self.gallery
        )

    def test_art_by_year(self):
        response = self.client.get('/api/art-filter/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['title'], 'The Starry Night1')

    def test_art_by_year_no_result(self):
        response = self.client.get('/api/art-filter/?var=1895')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)


class AuthorByPeriodTest(TestCase):
    def setUp(self):
        self.client = APIClient()

        self.author1 = Author.objects.create(
            id=1, name='Vincent Willem van Gogh', date_birth='1853-03-30', date_death='1890-06-29',
            period='postimpresionism', originated='neerlandez'
        )
        self.author2 = Author.objects.create(
            id=2, name='Leonardo da Vinci', date_birth='1452-04-15', date_death='1519-05-02',
            period='renasterea', originated='italian'
        )
        self.location = Location.objects.create(id=1, country='c1', city='c2')
        self.gallery1 = Gallery.objects.create(
            id=1, name='Padro', location=self.location, theme='art', street='s1', capacity=100
        )
        self.gallery2 = Gallery.objects.create(
            id=2, name='National Gallery', location=self.location, theme='art', street='s1', capacity=1003
        )
        self.galleryauthor1 = GalleryAuthor.objects.create(
            id=1, author=self.author1, gallery=self.gallery1, starting_exposition='2020-03-30',
            ending_exposition='2020-04-30', nb_participants=34, invited=40
        )
        self.galleryauthor1 = GalleryAuthor.objects.create(
            id=2, author=self.author2, gallery=self.gallery2, starting_exposition='2020-03-30',
            ending_exposition='2020-04-30', nb_participants=34, invited=40
        )
        self.galleryauthor3 = GalleryAuthor.objects.create(
            id=3, author=self.author1, gallery=self.gallery2, starting_exposition='2020-03-30',
            ending_exposition='2020-04-30', nb_participants=34, invited=40
        )

    def test_gallery_by_author(self):
        response = self.client.get('/api/gallery/report/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['name'], 'National Gallery')
        self.assertEqual(response.data[0]['theme'], 'art')
        self.assertEqual(response.data[0]['street'], 's1')
        self.assertEqual(response.data[0]['capacity'], 1003)
        self.assertEqual(response.data[0]['nb_authors'], 2)

        self.assertEqual(response.data[1]['name'], 'Padro')
        self.assertEqual(response.data[1]['theme'], 'art')
        self.assertEqual(response.data[1]['street'], 's1')
        self.assertEqual(response.data[1]['capacity'], 100)
        self.assertEqual(response.data[1]['nb_authors'], 1)




