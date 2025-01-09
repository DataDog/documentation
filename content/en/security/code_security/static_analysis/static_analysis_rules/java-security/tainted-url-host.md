---
aliases:
- /continuous_integration/static_analysis/rules/java-security/tainted-url-host
- /static_analysis/rules/java-security/tainted-url-host
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/tainted-url-host
  language: Java
  severity: Error
  severity_rank: 1
title: Prevent SSRF
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/tainted-url-host`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [918](https://cwe.mitre.org/data/definitions/918.html)

## Description
No description found

## Non-Compliant Code Examples
```java
@RequestMapping("/redirect")
public void redirect(@RequestParam() String url, String a) throws MalformedURLException {
    URL newUrl = new URL(url);  // Bad: User-controlled input used directly
    URL newUrl = new URL(url + "/path");
}

@RequestMapping("/api")
public void apiEndpoint(@RequestParam String host) {
    String url1 = "http://" + host + "/api/resource";  // Bad: User input concatenated into URL

    String url2 = "http://".concat(host);

    String url3 = "https://";
    url3 += host;

    String url4 = String.format("https://%v", host);

    String url5 = "https://%v";

    String url6 = String.format(url5, host)
}

@RequestMapping("/fetch")
public void fetchData(@RequestParam String endpoint) {
    StringBuilder sb = new StringBuilder("https://example.com");
    sb.append(endpoint);  // Bad: User input appended to base URL
}
```

## Compliant Code Examples
```java
@RequestMapping("/safe-redirect")
public void safeRedirect(@RequestParam String path) throws MalformedURLException {
    String baseUrl = "https://safe.example.com";
    URL newUrl = new URL(baseUrl + URLEncoder.encode(path, "UTF-8"));  // Good: User input only affects the path, not the host
}
```
