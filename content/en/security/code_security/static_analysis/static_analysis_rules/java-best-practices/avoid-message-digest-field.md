---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/avoid-message-digest-field
- /static_analysis/rules/java-best-practices/avoid-message-digest-field
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/avoid-message-digest-field
  language: Java
  severity: Notice
  severity_rank: 3
title: Avoid declaring a field type as MessageDigest
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/avoid-message-digest-field`

**Language:** Java

**Severity:** Notice

**Category:** Best Practices

## Description
When you designate a `MessageDigest` instance as a class member, you enable direct access for multiple threads in your program. It is important to exercise caution when sharing instances among threads without proper synchronization.

Instead of sharing a single `MessageDigest` instance, consider generating new instances when necessary and using them locally within the specific context where they are needed. This practice offers two benefits. First, it guarantees that each thread operates on its own instance, thereby minimizing the possibility of interference between threads. Second, it sidesteps the intricacies of managing synchronized access to a shared instance.

## Non-Compliant Code Examples
```java
public class Foo {
    private final MessageDigest sharedMd; // should avoid this
    
    public Foo() throws Exception {
        sharedMd = MessageDigest.getInstance("SHA-256");
    }
    
    public byte[] bar(byte[] data) {
        // Incorrect outcomes could arise from sharing a 
        // MessageDigest without synchronized access.
        sharedMd.reset();
        sharedMd.update(data);
        return sharedMd.digest();
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    public byte[] bar(byte[] data) throws Exception {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(data);
        return md.digest();
    }
}
```
