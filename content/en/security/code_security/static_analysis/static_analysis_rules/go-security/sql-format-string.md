---
aliases:
- /continuous_integration/static_analysis/rules/go-security/sql-format-string
- /static_analysis/rules/go-security/sql-format-string
dependencies: []
disable_edit: true
group_id: go-security
meta:
  category: Security
  id: go-security/sql-format-string
  language: Go
  severity: Error
  severity_rank: 1
title: Avoid manually built SQL queries
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `go-security/sql-format-string`

**Language:** Go

**Severity:** Error

**Category:** Security

## Description
Queries vulnerable to SQL injection should be avoided.

Consider this code snippet:

```go
func main () {
    q := fmt.Sprintf("SELECT * FROM users where name = '%s'", username)
	rows, err := db.Query(q)
}
```

In this code snippet, the SQL query is dynamically constructed by directly injecting the `username` variable into the query string using string concatenation. This approach is dangerous because it allows an attacker to manipulate the value of `username` and potentially execute malicious SQL commands.

For example, if an attacker sets the `username` value to `'; DROP TABLE users;--`, the resulting constructed query will be:

```go
SELECT * FROM users where name = ''; DROP TABLE users;--
```

This will result in the execution of two separate SQL statements: the first statement will retrieve all user records, and the second statement will drop the entire `users` table from the database.

To avoid SQL injection vulnerabilities, it is essential to use parameterized queries or prepared statements. These techniques separate the SQL query from user-supplied input and ensure that the input is treated only as data, not as executable SQL code.

Here's an example of how the above code can be modified to use parameterized queries:

```go
func main() {
    q := "SELECT * FROM users WHERE name = ?"
    rows, err := db.Query(q, username)
}
```

By using the `?` placeholder in the SQL query and passing the `username` variable as a query parameter, the database driver takes care of properly escaping the input and preventing SQL injection attacks.

By following best practices and using parameterized queries or prepared statements, you can ensure the security and integrity of your database operations.


## Non-Compliant Code Examples
```go
func (p *Profile) UnsafeQueryGetData(uid string) error {

   /* this funciton use to get data Profile from database with vulnerable query */
   DB, err = database.Connect()

   getProfileSql := fmt.Sprintf(`SELECT p.user_id, p.full_name, p.city, p.phone_number
                        FROM Profile as p,Users as u
                        where p.user_id = u.id
                        and u.id=%s`, uid) //here is the vulnerable query
   rows, err := DB.Query(getProfileSql)
   if err != nil {
      return err //this will return error query to clien hmmmm.
   }
   defer rows.Close()
   //var profile = Profile{}
   for rows.Next() {
      err = rows.Scan(&p.Uid, &p.Name, &p.City, &p.PhoneNumber)
      if err != nil {
         log.Printf("Row scan error: %s", err.Error())
         return err
      }
   }
   return nil
}
```

```go
func main () {
    q := fmt.Sprintf("SELECT * FROM users where name = '%s'", username)
	rows, err := db.Query(q)
}
```

## Compliant Code Examples
```go
func main () {
    q := "SELECT * FROM users where name = 'foobar'"
	rows, err := db.Query(q)
}
```
