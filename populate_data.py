import datetime
import os
import uuid

import django
from faker.providers import DynamicProvider

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'art.settings')

django.setup()

from faker import Faker
import random

fake = Faker()

NO_RECORDS = 1000000
NO_RECORDS_INTERMEDIARY = 10000000

filename = {
    "location": "location_insert_data.sql",
    "gallery": "gallery_insert_data.sql",
    "author": "author_insert_data.sql",
    "gallery_author": "gallery_author_insert_data.sql",
    "art": "art_insert_data.sql",
    "drop_constraints_indexes": "drop_constraints_indexes.sql",
    "add_constraints_indexes": "add_constraints_indexes.sql"
}


# def drop_constraints_indexes():
#     file = open(filename["drop_constraints_indexes"], "w")
#
#     file.write("ALTER TABLE api_location DROP CONSTRAINT IF EXISTS PK_Location;\n")
#
#     file.write("ALTER TABLE api_employee DROP CONSTRAINT IF EXISTS PK_Employee;\n")
#
#     file.write("ALTER TABLE rest_api_event DROP CONSTRAINT IF EXISTS PK_Event;\n")
#     file.write("ALTER TABLE rest_api_event DROP CONSTRAINT IF EXISTS FK_Event_Location;\n")
#     file.write("DROP INDEX IF EXISTS IDX_Event_LocationID;\n")
#
#     file.write("ALTER TABLE rest_api_eventassignment DROP CONSTRAINT IF EXISTS PK_EventAssignment;\n")
#     file.write("ALTER TABLE rest_api_eventassignment DROP CONSTRAINT IF EXISTS FK_EventAssignment_Event;\n")
#     file.write("ALTER TABLE rest_api_eventassignment DROP CONSTRAINT IF EXISTS PK_EventAssignment_Employee;\n")
#     file.write("DROP INDEX IF EXISTS IDX_EventAssignment_EventID;\n")
#     file.write("DROP INDEX IF EXISTS IDX_EventAssignment_EmployeeID;\n")
#
#     file.write("ALTER TABLE rest_api_employeeprivateinfo DROP CONSTRAINT IF EXISTS FK_EmployeePrivateInfo_Employee;\n")
#
#     file.close()
#
#
# def add_constraints_indexes():
#     file = open(filename["add_constraints_indexes"], "w")
#
#     file.write("ALTER TABLE rest_api_location ADD CONSTRAINT PK_Location PRIMARY KEY(id);\n")
#
#     file.write("ALTER TABLE rest_api_employee ADD CONSTRAINT PK_Employee PRIMARY KEY(id);\n")
#
#     file.write("ALTER TABLE rest_api_event ADD CONSTRAINT PK_Event PRIMARY KEY(id);\n")
#     file.write(
#         "ALTER TABLE rest_api_event ADD CONSTRAINT FK_Event_Location FOREIGN KEY(location_id) REFERENCES rest_api_location(id) ON DELETE CASCADE;\n")
#
#     file.write("ALTER TABLE rest_api_eventassignment ADD CONSTRAINT PK_EventAssignment PRIMARY KEY(id);\n")
#     file.write(
#         "ALTER TABLE rest_api_eventassignment ADD CONSTRAINT FK_EventAssignment_Event FOREIGN KEY(event_id) REFERENCES rest_api_event(id) ON DELETE CASCADE;\n")
#     file.write(
#         "ALTER TABLE rest_api_eventassignment ADD CONSTRAINT FK_EventAssignment_Employee FOREIGN KEY(employee_id) REFERENCES rest_api_employee(id) ON DELETE CASCADE;\n")
#
#     file.write(
#         "ALTER TABLE rest_api_employeeprivateinfo ADD CONSTRAINT FK_EmployeePrivateInfo_Employee FOREIGN KEY(employee_id) REFERENCES rest_api_employee(id) ON DELETE CASCADE;\n")
#
#     file.write("CREATE INDEX IDX_Event_LocationID ON rest_api_event(location_id);\n")
#     file.write("CREATE INDEX IDX_EventAssignment_EventID ON rest_api_eventassignment(event_id);\n")
#     file.write("CREATE INDEX IDX_EventAssignment_EmployeeID ON rest_api_eventassignment(employee_id);\n")
#
#     file.close()


def location_insert_data():
    file = open(filename["location"], "w")
    file.write("DELETE FROM api_location;\n")
    file.write("DBCC CHECKIDENT('[api_location]', RESEED, 0); GO")


    batch_values = ""

    print("Generating SQL queries for inserting data in the Location table...")

    for i in range(NO_RECORDS):
        country = fake.country()
        while 'Cote d' in country or 'Ivoire' in country or 'Lao People' in country:
            country = fake.country()
        city = fake.city()
        to_visit = fake.text()
        batch_values += f"('{country}', '{city}', '{to_visit}'),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO api_location (country, city, to_visit) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def gallery_insert_data():
    file = open(filename["gallery"], "w")
    file.write("DELETE FROM api_gallery;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Gallery table...")

    for i in range(NO_RECORDS):
        name = fake.name()
        location_id = random.randint(0, NO_RECORDS)
        theme = fake.word()
        street = fake.address()
        capacity = random.randint(3000, 10000)

        batch_values += f"('{name}', {location_id}, '{theme}', '{street}', {capacity}),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO api_gallery (name, location_id, theme, street, capacity) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def author_insert_data():
    file = open(filename["author"], "w")
    file.write("DELETE FROM api_author;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Author table...")

    for i in range(NO_RECORDS):
        name = fake.name()
        da = ''
        da2 = ''
        c = random.randint(1000, 1980)
        da += str(c)
        da2 += str(random.randint(c+20, 2000))
        da += '-'
        da2 += '-'
        da += str(random.randint(1, 12))
        da2 += str(random.randint(1, 12))
        da += '-'
        da2 += '-'
        da += str(random.randint(1, 28))
        da2 += str(random.randint(1, 28))
        date_birth = da
        date_death = da2
        period = fake.word()
        originated = fake.country()
        while 'Cote d' in originated or 'Ivoire' in originated or 'Lao People' in originated:
            originated = fake.country()

        batch_values += f"('{name}', '{date_birth}', '{date_death}', '{period}', '{originated}'),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO api_author (name, date_birth, date_death, period, originated) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()


def gallery_author_insert_data():
    file = open(filename["gallery_author"], "w")
    file.write("DELETE FROM api_galleryauthor;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the GalleryAuthor table...")

    for i in range(NO_RECORDS_INTERMEDIARY):
        starting_exposition = str(fake.date_between(datetime.date(2023, 1, 1), datetime.date(2024, 1, 1)))
        ending_exposition = str(fake.date_between(datetime.date(2023, 1, 1), datetime.date(2024, 1, 1)))
        nb_participants = random.randint(100, 500)
        invited = random.randint(10, 50)

        author_id = random.randint(0, NO_RECORDS - 1)
        gallery_id = random.randint(0, NO_RECORDS - 1)

        batch_values += f"({author_id}, {gallery_id}, '{starting_exposition}', '{ending_exposition}', {nb_participants}, {invited}),"

        if (i + 1) % 10000 == 0:
            print(i)
            file.write(
                f"INSERT INTO api_galleryauthor (author_id, gallery_id, starting_exposition, ending_exposition, nb_participants, invited) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()

def art_insert_data():
    file = open(filename["art"], "w")
    file.write("DELETE FROM api_art;\n")

    batch_values = ""

    print("Generating SQL queries for inserting data in the Art table...")

    for i in range(NO_RECORDS):
        title = fake.word()
        author_id = random.randint(0, NO_RECORDS)
        year = random.randint(1000, 2000)
        type = fake.word()
        material = fake.word()
        gallery_id= random.randint(0, NO_RECORDS)

        batch_values += f"('{title}', {author_id}, {year}, '{type}', '{material}', {gallery_id}),"
        if (i + 1) % 1000 == 0:
            file.write(
                f"INSERT INTO api_art(title, author_id, year, type, material, gallery_id) VALUES {batch_values[:-1]};\n")
            batch_values = ""

    file.close()

if __name__ == '__main__':
    # # drop_constraints_indexes()
    # # add_constraints_indexes()
    # location_insert_data()
    # gallery_insert_data()
    #author_insert_data()
    gallery_author_insert_data()

    # art_insert_data()

