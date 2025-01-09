---
aliases:
- /continuous_integration/static_analysis/rules/java-security/files-permissions
- /static_analysis/rules/java-security/files-permissions
dependencies: []
disable_edit: true
group_id: java-security
meta:
  category: Security
  id: java-security/files-permissions
  language: Java
  severity: Warning
  severity_rank: 2
title: Do not give write access to others
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-security/files-permissions`

**Language:** Java

**Severity:** Warning

**Category:** Security

**CWE**: [732](https://cwe.mitre.org/data/definitions/732.html)

## Description
Never give write access to other users.

#### Learn More

 - [Linux Privileges Escalation Guide](https://payatu.com/blog/a-guide-to-linux-privilege-escalation/)
 - [CWE-732](https://cwe.mitre.org/data/definitions/732.html)

## Non-Compliant Code Examples
```java
class Main {
    public test() {
            Set<PosixFilePermission> perms = new HashSet<PosixFilePermission>();
            perms.add(PosixFilePermission.OWNER_READ);
            perms.add(PosixFilePermission.OWNER_WRITE);
            perms.add(PosixFilePermission.OWNER_EXECUTE);
            perms.add(PosixFilePermission.GROUP_READ);
            perms.add(PosixFilePermission.GROUP_EXECUTE);
            perms.add(PosixFilePermission.OTHERS_READ);
            perms.add(PosixFilePermission.OTHERS_EXECUTE);
    }
}
```

```java
class Main {
    public static void main(String[] args) {
        Files.setPosixFilePermissions("file", PosixFilePermissions.fromString("rw-rw-rw-"));
    }
}
```

## Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        Files.setPosixFilePermissions("file", PosixFilePermissions.fromString("rw-rw-r--"));
    }
}
```
