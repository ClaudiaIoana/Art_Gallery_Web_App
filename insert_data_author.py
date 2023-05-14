import sqlite3
from pathlib import Path

connection = sqlite3.connect('db.sqlite3')
cursor = connection.cursor()
file = 'author_insert_data.sql'
i = 0

print(f"Executing {file}...")
with open(file, 'r') as f:
    stmt = f.read()
    cursor.execute("DELETE FROM sqlite_sequence WHERE name='api_author'")
    print(i)
    i += 1
    cursor.executescript(stmt)
print(f"Finished!")

cursor.close()

connection.commit()
connection.close()

