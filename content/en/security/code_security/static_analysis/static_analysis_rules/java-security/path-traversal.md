---
aliases:
- /continuous_integration/static_analysis/rules/java-security/path-traversal
- /static_analysis/rules/java-security/path-traversal
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/path-traversal
  language: Java
  severity: Warning
  severity_rank: 2
title: Prevent path traversal
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/path-traversal`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
This rule prevents security vulnerabilities that allow an attacker to read, write, or delete files on the server that they should not have access to. This type of attack, known as Path Traversal or Directory Traversal, involves manipulating variables that reference files with `../` sequences and its variations.

The potential harm of this vulnerability is significant, as it can lead to unauthorized access to sensitive data, corruption of system files, or even complete takeover of the server. It is, therefore, crucial to implement safeguards against path traversal attacks in your code.

In Java, you can avoid path traversal vulnerabilities by not using user input directly to access file paths. If you must use user input, ensure that it is properly sanitized. For example, you could use a whitelist of acceptable inputs, or strip out or deny any input containing '..' or similar sequences. In the provided code, the user input (param) is used to construct a file path (fileName), but it is first checked to ensure that it does not contain any path traversal sequences. This makes the code compliant with the 'Prevent path traversal' rule.

## Non-Compliant Code Examples
```java
import org.apache.commons.io.FilenameUtils;

class Compliant {
    @GET
    @Path("/images/{image}")
    @Produces("images/*")
    public Response getImage(@javax.ws.rs.PathParam("image") String image) {
        File file = new File("resources/images/", image);

        if (!file.exists()) {
            return Response.status(Status.NOT_FOUND).build();
        }

        return Response.ok().entity(new FileInputStream(file)).build();
    }
}

```

## Compliant Code Examples
```java
import org.apache.commons.io.FilenameUtils;

class Compliant {
    @GET
    @Path("/images/{image}")
    @Produces("images/*")
    public Response getImage(@javax.ws.rs.PathParam("image") String image) {
        File file = new File(
            "resources/images/",
            // Use of sanitizer:
            FilenameUtils.getName(image)
        );

        if (!file.exists()) {
            return Response.status(Status.NOT_FOUND).build();
        }

        return Response.ok().entity(new FileInputStream(file)).build();
    }
}

```
