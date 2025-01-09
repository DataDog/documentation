---
aliases:
- /continuous_integration/static_analysis/rules/ruby-security/sql-injection
- /static_analysis/rules/ruby-security/sql-injection
dependencies: []
disable_edit: true
group_id: ruby-security
meta:
  category: Security
  id: ruby-security/sql-injection
  language: Ruby
  severity: Error
  severity_rank: 1
title: Avoid SQL injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `ruby-security/sql-injection`

**Language:** Ruby

**Severity:** Error

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
This rule pertains to avoiding SQL Injection, which is a serious security vulnerability that can allow attackers to manipulate or control your database. SQL Injection occurs when untrusted data is inserted into a database query without proper sanitization or parameterization.

In the provided non-compliant code, the SQL queries are constructed by string concatenation with user-provided input. This is a dangerous practice as it allows an attacker to inject arbitrary SQL code into the query. For instance, if an attacker provides an 'id' value of "1; DROP TABLE analysis_results;", it could lead to the deletion of an entire table.

To avoid SQL Injection, always use parameterized queries or prepared statements, which ensure that user-provided input is always treated as literal values, not executable code. In Ruby, you can use the 'quote' and 'sanitize' methods provided by ActiveRecord, or use '?' placeholders in your SQL queries to safely include user-provided input. For example, you could write: `ActiveRecord::Base.connection.execute("UPDATE analysis_results SET running_time_sec = ? WHERE id = ?", time, id)`. This ensures that the 'time' and 'id' values are properly escaped, preventing SQL Injection.

## Non-Compliant Code Examples
```ruby
stmt = "UPDATE analysis_results SET running_time_sec=" + time + " WHERE id="+id
stmt = "update analysis_results SET running_time_sec=#{time} WHERE id=#{id}"
stmt = "UPDATE analysis_results SET running_time_sec=%{time} WHERE id=%{id}" % {id: 42, time: 51}


stmt = "UPDATE analysis_results SET running_time_sec=" + time + " WHERE id="+id
stmt = "UPDATE analysis_results SET running_time_sec=#{time} WHERE id=#{id}"
stmt = "UPDATE analysis_results SET running_time_sec=%{time} WHERE id=%{id}" % {id: 42, time: 51}


stmt = "SELECT foo,bar FROM myTable WHERE id="+id
stmt = "SELECT * from mytable WHERE id=#{id}"
stmt = "SELECT plop.foo from my_table WHERE id=%{id}" % {id: 42, time: 51}

stmt = "DELETE FROM myTable WHERE id="+id
stmt = "delete from mytable WHERE id=#{id}"
stmt = "DELETE from my_table WHERE id=%{id}" % {id: 42, time: 51}


stmt = "INSERT INTO myTable VALUES("+id+");"
stmt = "insert into mytable(field1, field2) VALUES (#{field1}, #{field2}})"  
stmt = "insert INTO my_table(field1, field2) VALUES (%{field1},%{field2}) " % {field1: 42, field2: 51}

```
