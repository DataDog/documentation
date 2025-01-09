---
aliases:
- /continuous_integration/static_analysis/rules/java-security/spring-csrf-requestmapping
- /static_analysis/rules/java-security/spring-csrf-requestmapping
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/spring-csrf-requestmapping
  language: Java
  severity: Warning
  severity_rank: 2
title: Spring CSRF unrestricted RequestMapping
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/spring-csrf-requestmapping`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [352](https://cwe.mitre.org/data/definitions/352.html)

## Description
Classes that contain methods annotated with `RequestMapping` are by default mapped to all the HTTP request methods. 

Spring Security's CSRF protection is not enabled by default for the HTTP request methods `GET`, `HEAD`, `TRACE`, and `OPTIONS`.

For this reason, requests or routes with `RequestMapping`, and not narrowing the mapping to the HTTP request methods `POST`, `PUT`, `DELETE`, or `PATCH`, makes them vulnerable to CSRF attacks.

#### Learn More

 - [Spring CSRF unrestricted RequestMapping](https://find-sec-bugs.github.io/bugs.htm#SPRING_CSRF_UNRESTRICTED_REQUEST_MAPPING)

## Non-Compliant Code Examples
```java
@Controller
public class UnsafeController {

    @RequestMapping("/path")
    public void writeData() {
        // State-changing operations performed within this method.
    }
}
```

## Compliant Code Examples
```java
@Controller
public class SafeController {

    /**
     * For methods without side-effects use @GetMapping.
     */
    @GetMapping("/path")
    public String readData() {
        // No state-changing operations performed within this method.
        return "";
    }

    /**
     * For state-changing methods use either @PostMapping, @PutMapping, @DeleteMapping, or @PatchMapping.
     */
    @PostMapping("/path")
    public void writeData() {
        // State-changing operations performed within this method.
    }
}
```
