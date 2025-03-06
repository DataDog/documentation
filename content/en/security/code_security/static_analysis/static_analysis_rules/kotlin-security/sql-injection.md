---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/sql-injection
- /continuous_integration/static_analysis/rules/kotlin-security/sql-injection
- /static_analysis/rules/kotlin-security/sql-injection
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/sql-injection
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Prevent SQL queries built from strings
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/sql-injection`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
This rule aims to prevent the use of string concatenation or interpolation to build SQL queries in Kotlin. Combining user-provided data with SQL queries without proper sanitization can lead to SQL injection attacks. SQL injection is a common security vulnerability where an attacker can manipulate the query to execute arbitrary SQL commands, potentially leading to data theft, data corruption, or unauthorized access.

The best way to avoid this vulnerability is by using parameterized queries, also known as prepared statements, or a type-safe DSL (Domain-Specific Language) like Exposed in Kotlin. These methods ensure that user-provided input is properly escaped or handled, preventing it from being interpreted as part of the SQL command. This way, the user ID is not directly embedded into the query and is instead safely passed as a separate parameter, eliminating the risk of SQL injection.

## Non-Compliant Code Examples
```kotlin
// Non-compliant: Direct string interpolation in SQL queries
fun getUserUnsafe(call: ApplicationCall) {
    val userId = call.parameters["id"]
    transaction {
        // WARNING: SQL injection vulnerability
        val query = "SELECT * FROM users WHERE id = $userId"
        exec(query) { rs ->  
            rs.next()
            rs.getString("name")
        }
    }
}

// Non-compliant: Using string concatenation for SQL queries
class UserRepository(private val call: ApplicationCall) {
    fun searchUsers() {
        val searchName = call.request.queryParameters["name"]
        val sortOrder = call.request.queryParameters["sort"] ?: "ASC"
        
        // WARNING: Multiple SQL injection vulnerabilities
        val query = "SELECT * FROM users WHERE " +
                   "name LIKE '%" + searchName + "%' " +
                   "ORDER BY name " + sortOrder
                   
        transaction {
            // Dangerous: Using unvalidated user input directly in query
            exec(query) { rs ->
                buildUserList(rs)  // Some result processing
            }
        }
    }
    
    // Also unsafe - concatenating in a separate function
    private fun buildSearchQuery(name: String, sort: String): String {
        return "SELECT id, name, email FROM users " +
               "WHERE name LIKE '%" + name + "%' " +
               "OR email LIKE '%" + name + "%' " +
               "ORDER BY " + sort
    }
}
```

## Compliant Code Examples
```kotlin
// Compliant: Using Exposed DSL and prepared statements
fun getUserSafe(call: ApplicationCall) {
    val userId = call.parameters["id"]?.toIntOrNull() ?: throw BadRequestException("Invalid ID")
    
    transaction {
        // Safe: Using type-safe DSL
        Users.select { Users.id eq userId }
            .map { it[Users.name] }
            .firstOrNull()
    }
    
    // Alternative: Using prepared statement if raw SQL is needed
    transaction {
        exec("SELECT * FROM users WHERE id = ?") { stmt ->
            stmt.setInt(1, userId)
            stmt.executeQuery()
        }
    }
}

// Compliant: Using Exposed table definitions
object Users : Table("users") {
    val id = integer("id").autoIncrement()
    val name = varchar("name", 50)
    override val primaryKey = PrimaryKey(id)
}
```
