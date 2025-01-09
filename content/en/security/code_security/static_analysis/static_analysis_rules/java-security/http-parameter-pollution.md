---
aliases:
- /continuous_integration/static_analysis/rules/java-security/http-parameter-pollution
- /static_analysis/rules/java-security/http-parameter-pollution
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/http-parameter-pollution
  language: Java
  severity: Warning
  severity_rank: 2
title: Prevent HTTP parameter pollution
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/http-parameter-pollution`

**Language:** Java

**Severity:** Warning

**Category:** Security

## Description
Do not concatenate HTTP parameters. Instead, use a proper API to set each parameter.


#### Learn More

 - [HTTP Parameter Pollution](https://capec.mitre.org/data/definitions/460.html)

## Non-Compliant Code Examples
```java
class Main {
    public void myMethod() {
        String input = request.getParameter("lang");
        GetMethod get = new GetMethod("https://api.endoint/path/to/api");
        get.setQueryString("param1=" + param1Value);

        if (true) {
            get.setQueryString("param1=" + param1Value);
        } else {
            get.setQueryString("param1=" + param1Value);
        }
        get.execute();
    }
}
```

## Compliant Code Examples
```java
class Main {
    public void myMethod() {
        URIBuilder uriBuilder = new URIBuilder("https://api.endoint/path/to/api");
        uriBuilder.addParameter("param1", param1Value);

        HttpGet httpget = new HttpGet(uriBuilder.build().toString());
    }
}
```
