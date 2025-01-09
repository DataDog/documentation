---
aliases:
- /continuous_integration/static_analysis/rules/java-security/spring-request-file-tainted
- /static_analysis/rules/java-security/spring-request-file-tainted
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/spring-request-file-tainted
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid user-input file
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/spring-request-file-tainted`

**Language:** Java

**Severity:** Notice

**Category:** Security

**CWE**: [23](https://cwe.mitre.org/data/definitions/23.html)

## Description
An attacker could try to pass a filename of content that could traverse the server path and control system files. Make sure all user-inputs is checked and sanitized before use.

#### Learn More

 - [CWE-23 - Relative Path Traversal](https://cwe.mitre.org/data/definitions/23.html)

## Non-Compliant Code Examples
```java
class Test {
  @PostMapping(value = "/fileupload")
  public ModelAndView importFile(@RequestParam("file") MultipartFile myFile) throws IOException {
    var user = (WebGoatUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    var destinationDir = new File(fileLocation, user.getUsername());
    destinationDir.mkdirs();
    myFile.transferTo(new File(destinationDir, myFile.getOriginalFilename()));
    log.debug("File saved to {}", new File(destinationDir, myFile.getOriginalFilename()));

    return new ModelAndView(
        new RedirectView("files", true),
        new ModelMap().addAttribute("uploadSuccess", "File uploaded successful"));
  }
}
```
