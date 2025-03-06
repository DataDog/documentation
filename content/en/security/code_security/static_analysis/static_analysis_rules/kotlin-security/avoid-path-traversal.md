---
aliases:
- /code_analysis/static_analysis_rules/kotlin-security/avoid-path-traversal
- /continuous_integration/static_analysis/rules/kotlin-security/avoid-path-traversal
- /static_analysis/rules/kotlin-security/avoid-path-traversal
dependencies: []
disable_edit: true
group_id: kotlin-security
meta:
  category: Security
  id: kotlin-security/avoid-path-traversal
  language: Kotlin
  severity: Error
  severity_rank: 1
title: Avoid building paths from untrusted data
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `kotlin-security/avoid-path-traversal`

**Language:** Kotlin

**Severity:** Error

**Category:** Security

**CWE**: [22](https://cwe.mitre.org/data/definitions/22.html)

## Description
This rule highlights the importance of avoiding the construction of file paths from untrusted data, such as user input. This is a critical security practice because malicious users can exploit such vulnerabilities to traverse directories (also known as path traversal attacks), gaining unauthorized access to files outside of the intended directory.

The rule helps prevent potential data breaches, unauthorized access to sensitive information, and system compromise. It enforces the principle of least privilege, ensuring that an application only accesses the resources it needs to function properly.

To adhere to this rule, always sanitize and validate user input before using it to construct file paths. For instance, use canonicalization to resolve any '..' sequences in the path, and ensure the resulting path is within the intended directory. Avoid direct concatenation of user input into file paths. Instead, consider using a safer method, such as `File(baseDir, fileName)`, which implicitly handles path normalization. You can also use an allowlist of allowed paths or a blocklist of disallowed paths to control access.

## Non-Compliant Code Examples
```kotlin
// Non-compliant: Unsafe file path handling
class FileService {
    private val baseDir = "/app/files/"
    
    fun readUserFile(request: ApplicationCall) {
        // WARNING: Direct use of user input in file paths
        val userPath = request.parameters["path"]
        val file = File(userPath)  // Unsafe direct use of user input
        file.readText()
    }
}
```

## Compliant Code Examples
```kotlin
class SecureFileService {
    private val baseDir = "/app/files/"
    
    suspend fun getFile(call: ApplicationCall) {
        val fileName = call.parameters["fileName"] ?: throw BadRequestException("Missing fileName")
        
        // Normalize and validate path
        val normalizedPath = File(fileName).normalize().toString()
        if (normalizedPath.contains("..")) {
            throw SecurityException("Path traversal attempted")
        }
        
        val safePath = baseDir + normalizedPath.replace("../", "")
        val absolutePath = File(safePath).canonicalPath
        
        // Verify file is within allowed directory
        if (!absolutePath.startsWith(File(baseDir).canonicalPath)) {
            throw SecurityException("Access denied to path outside base directory")
        }
        
        val file = File(absolutePath)
        if (file.exists()) {
            call.respondFile(file)
        } else {
            call.respond(HttpStatusCode.NotFound)
        }
    }
}

// Usage in a route
get("/download/{fileName}") {
    secureFileService.getFile(call)
}
```
