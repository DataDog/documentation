---
aliases:
- /continuous_integration/static_analysis/rules/java-security/permissive-cors
- /static_analysis/rules/java-security/permissive-cors
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/permissive-cors
  language: Java
  severity: Warning
  severity_rank: 2
title: Avoid overly permissive CORS
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/permissive-cors`

**Language:** Java

**Severity:** Warning

**Category:** Security

## Description
Do not set overly permissive CORS requests. Restrict the host allowed to communicate with to prevent potential malicious requests in your application.

#### Learn More

 - [Fetch Living Standard](https://fetch.spec.whatwg.org/)
 - [Enable Cross-Origin Resource Sharing](https://enable-cors.org/)

## Non-Compliant Code Examples
```java
class NotCompliant {
    @GET
    @Path("/some/path")
    public Response getRoute() {
        response.addHeader("Access-Control-Allow-Origin: *");
    }
}
```

```java
class NotCompliant {
    @GET
    @Path("/some/path")
    public Response getRoute() {
        response.addHeader("Access-Control-Allow-Origin", "*");
    }
}
```

## Compliant Code Examples
```java
class NotCompliant {
    @GET
    @Path("/some/path")
    public Response getRoute() {
        response.addHeader("Access-Control-Allow-Origin", "https://developer.mozilla.org");
    }
}
```

```java
class NotCompliant {
    @GET
    @Path("/some/path")
    public Response getRoute() {
        response.addHeader("Access-Control-Allow-Origin: https://developer.mozilla.org");
    }
}
```
