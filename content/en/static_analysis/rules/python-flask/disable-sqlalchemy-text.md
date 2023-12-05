---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-flask/disable-sqlalchemy-text
  language: Python
  severity: Warning
title: Do not use text() as it leads to SQL injection
---
## Metadata
**ID:** `python-flask/disable-sqlalchemy-text`

**Language:** Python

**Severity:** Warning

**Category:** Security

## Description
The `text` function from SQLAlchemy lets you build custom SQL statements. It is recommended to use the ORM functions to build queries and avoid building custom queries, which are vulnerable to SQL injections.

#### Learn More

 - [CWE-89: Improper Neutralization of Special Elements used in an SQL Command](https://cwe.mitre.org/data/definitions/89.html)

## Non-Compliant Code Examples
```python
from sqlalchemy.sql import text


con = engine.connect()

data = ( { "id": 1, "title": "The Hobbit", "primary_author": "Tolkien" },
            { "id": 2, "title": "The Silmarillion", "primary_author": "Tolkien" },
)

statement = text("""INSERT INTO book(id, title, primary_author) VALUES(:id, :title, :primary_author)""")

for line in data:
    con.execute(statement, **line)
```

## Compliant Code Examples
```python
con = engine.connect()

data = ( { "id": 1, "title": "The Hobbit", "primary_author": "Tolkien" },
            { "id": 2, "title": "The Silmarillion", "primary_author": "Tolkien" },
)

statement = text("""INSERT INTO book(id, title, primary_author) VALUES(:id, :title, :primary_author)""")

for line in data:
    con.execute(statement, **line)
```

```python
from sqlalchemy import text

BOOKS = meta.tables['books']
query = sqlalchemy.select(BOOKS).where(BOOKS.c.genre == 'fiction')
result = engine.execute(query).fetchall()


```
