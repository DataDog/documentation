---
aliases:
- /continuous_integration/static_analysis/rules/java-security/sql-injection
- /static_analysis/rules/java-security/sql-injection
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/sql-injection
  language: Java
  severity: Warning
  severity_rank: 2
title: Avoid SQL injection
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/sql-injection`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [89](https://cwe.mitre.org/data/definitions/89.html)

## Description
This rule detects potential SQL injections. SQL Injection is a common application layer attack technique used by hackers to steal or manipulate data from the database. It occurs when an application includes untrusted data in a SQL command that is part of a query.

SQL injection can lead to serious data breaches, unauthorized access, data corruption, and in some cases, even complete system takeover. It is crucial to ensure your code is immune to such vulnerabilities.

Adhering to good coding practices can help avoid SQL injection. Always use parameterized queries or prepared statements instead of concatenating user input into SQL commands. For instance, use `PreparedStatement` with placeholders (`?`) in Java to ensure user input is appropriately sanitized before it is included in a SQL command. Avoid exposing detailed error messages that might reveal underlying database structure. Regularly update and patch your systems, and consider using a web application firewall for an additional layer of security.

## Non-Compliant Code Examples
```java
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.DriverManager;

public class NonCompliant {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        String param = "<default>";
        java.util.Enumeration<String> headers = request.getHeaders("X-Some-Header");

        if (headers != null && headers.hasMoreElements()) {
            param = headers.nextElement();
        }

        param = java.net.URLDecoder.decode(param, "UTF-8");

        String sql = "INSERT INTO users (username, password) VALUES ('foo','" + param + "')";

        java.sql.Connection connection = DriverManager.getConnection("<url>", "<user>", "<password>");
        java.sql.Statement statement = connection.createStatement();

        statement.executeUpdate(sql);

        connection.close();
    }
}

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NonCompliant2 {

    @PostMapping("/")
    public void handlePost(@RequestHeader("X-Some-Header") String headerValue) {
        String sql = "INSERT INTO users (username, password) VALUES ('foo','" + headerValue + "')";
        java.sql.Connection connection = DriverManager.getConnection("<url>", "<user>", "<password>");
        java.sql.Statement statement = connection.createStatement();

        statement.executeUpdate(sql);
    }
}

```

## Compliant Code Examples
```java
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.DriverManager;

public class Compliant {
    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        String param = "<default>";
        java.util.Enumeration<String> headers = request.getHeaders("X-Some-Header");

        if (headers != null && headers.hasMoreElements()) {
            param = headers.nextElement();
        }

        param = java.net.URLDecoder.decode(param, "UTF-8");

        String sql = "INSERT INTO users (username, password) VALUES ('foo', ?)";

        java.sql.Connection connection = DriverManager.getConnection("<url>", "<user>", "<password>");
        java.sql.PreparedStatement statement = connection.prepareStatement(sql);
        statement.setString(1, param);
        statement.executeUpdate();
        connection.close();
    }
}

```
