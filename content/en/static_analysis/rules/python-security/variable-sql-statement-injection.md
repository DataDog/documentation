---
dependencies: []
disable_edit: true
kind: documentation
meta:
  category: Security
  id: python-security/variable-sql-statement-injection
  language: Python
  severity: Error
title: Avoid SQL injections
---
## Metadata
**ID:** `python-security/variable-sql-statement-injection`

**Language:** Python

**Severity:** Error

**Category:** Security

## Description
Check for declarations of variables for a SQL statement where we have potential SQL injections.

## Non-Compliant Code Examples
```python
def db_init_users():

    users = [
        ('admin', 'SuperSecret'),
        ('elliot', '123123123'),
        ('tim', '12345678')
    ]

    conn = sqlite3.connect('db_users.sqlite')
    c = conn.cursor()
    c.execute("CREATE TABLE users (username text, password text, failures int, mfa_enabled int, mfa_secret text)")

    for u,p in users:
        c.execute("INSERT INTO users (username, password, failures, mfa_enabled, mfa_secret) VALUES ('%s', '%s', '%d', '%d', '%s')" %(u, p, 0, 0, ''))

    conn.commit()
    conn.close()
```

```python
def get_product_by_id(db_connection, product_id):
    cursor = db_connection.cursor()
    res = cursor.execute(f"SELECT id, title from products WHERE id={product_id}")
    data = res.fetchone()
    if data is not None:
        return Product(data[0], data[1])
    else:
        return None

def xss_reflected_page(request, app):
    search = request.args.get('search')

    products = app.db_helper.execute_read(
        f"SELECT * FROM products WHERE name LIKE :search",
        { 'search': f'%{search}%' }
    )

    products = list(
        map(
            lambda p: {
                'id': p[0],
                'name': p[1],
                'price': p[2]
            },
            products
        )
    )

    return render_template(
        'xss-reflected.html',
        products=products
    )
```

```python
stmt = "UPDATE analysis_results SET running_time_sec='{0}' WHERE id={1}".format(nsec, id)

stmt = "UPDATE analysis_results SET running_time_sec='%s' WHERE id=%s" % (nsec, id)

stmt = "UPDATE analysis_results SET"\
        "running_time_sec='%s' WHERE id=%s" % nsec



```

```python
v = "UPDATE bar SET plop={0}".format(plip)
```

```python
v = "UPDATE bar SET plop={0}".format(plip)

cursor.execute("UPDATE bar SET plop={0}".format(plip))

cursor.execute("UPDATE `bar` SET plop={0}".format(plip))
```

```python
v = f"DELETE FROM bar WHERE plop={bli}"

cursor.execute(f"DELETE FROM bar WHERE plop={bli}")

cursor.execute("DELETE FROM bar WHERE plop=%s", bli)
```

```python
v = f"SELECT foo FROM bar WHERE plop={bli}"
```

```python
v = "SELECT foo FROM bar WHERE plop={0}".format(bli)
```

## Compliant Code Examples
```python
def db_init_users():

    users = [
        ('admin', 'SuperSecret'),
        ('elliot', '123123123'),
        ('tim', '12345678')
    ]

    conn = sqlite3.connect('db_users.sqlite')
    c = conn.cursor()

    for u,p in users:
        c.execute("INSERT INTO users (username, password, failures, mfa_enabled, mfa_secret) VALUES ('%s', '%s', '%d', '%d', '%s')", (u, p, 0, 0, ''))

    conn.commit()
    conn.close()
```

```python
v = "SELECT foo FROM bar WHERE plop=%s"
cursor.execute(v, (my_valie))

cursor.execute("UPDATE `bar` SET foo=%s", ("baz"))
```
