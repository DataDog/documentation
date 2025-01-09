---
aliases:
- /continuous_integration/static_analysis/rules/java-security/path-traversal-file-read
- /static_analysis/rules/java-security/path-traversal-file-read
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/path-traversal-file-read
  language: Java
  severity: Error
  severity_rank: 1
title: Potential path traversal from request
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/path-traversal-file-read`

**Language:** Java

**Severity:** Error

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
The filename of the file being opened comes from an input parameter. If an unfiltered parameter is passed to the API, any location on the filesystem can be read.

#### Learn More

 - [Potential File Traversal](https://find-sec-bugs.github.io/bugs.htm#PATH_TRAVERSAL_IN)
 - [CWE-22 - Improper Limitation of a Pathname to a Restricted Directory](https://cwe.mitre.org/data/definitions/22.html)

## Non-Compliant Code Examples
```java
class MyClass {

    @GET
    @Path("/images/{image}")
    @Produces("images/*")
    public Response getImage(@javax.ws.rs.PathParam("image") String image) {
        File file = new File("resources/images/", image); //Weak point

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

class MyClass {

    @GET
    @Path("/images/{image}")
    @Produces("images/*")
    public Response getImage(@javax.ws.rs.PathParam("image") String image) {
        File file = new File("resources/images/", FilenameUtils.getName(image)); //Fix

        if (!file.exists()) {
            return Response.status(Status.NOT_FOUND).build();
        }

        return Response.ok().entity(new FileInputStream(file)).build();
    }

    @GET
    @Path("/images/{image}")
    @Produces("images/*")
    public Response getImage(@javax.ws.rs.PathParam("image") String image) {
        File file = new File("resources/images/", image2); //Weak point

        if (!file.exists()) {
            return Response.status(Status.NOT_FOUND).build();
        }

        return Response.ok().entity(new FileInputStream(file)).build();
    }

}

```
