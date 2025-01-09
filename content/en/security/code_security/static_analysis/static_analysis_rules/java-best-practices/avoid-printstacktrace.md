---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/avoid-printstacktrace
- /static_analysis/rules/java-best-practices/avoid-printstacktrace
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/avoid-printstacktrace
  language: Java
  severity: Warning
  severity_rank: 2
title: Avoid using printStackTrace()
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/avoid-printstacktrace`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
Use a logging framework instead of `printStackTrace()` when handling exceptions. `printStackTrace()` can be useful during development for quick debugging, but it is not suitable for production code.

## Non-Compliant Code Examples
```java
class Foo {
    void bar() {
        try {
            // removed for brevity
        } catch (MyException myException) {
            myException.printStackTrace();
        } catch (Exception e) {
            if ("foo" != "bar") {
                e.printStackTrace();               
            }
        }
    }
}
```

## Compliant Code Examples
```java
class Foo {
    void bar() {
        try {
            // removed for brevity
        } catch (MyException myException) {
            myException.printStackTrace();
        } catch (Exception e) {
            if ("foo" != "bar") {
                e.printStackTrace();               
            }
        }
    }
}


```

```java
import java.util.logging.Logger;

class Foo {
    private static final Logger logger = Logger.getLogger(Foo.class.getName());

    void bar() {
        try {
            // Code that may throw an exception
            throw new RuntimeException("Something went wrong!");
        } catch (Exception e) {
            // Log the exception using the Java logger
            logger.severe("An error occurred:");
            logger.severe(e.toString());

            if ("foo" != "bar") {
                // Log the exception again if needed
                logger.severe("An error occurred in an additional context:");
                logger.severe(e.toString());
            }
        }
    }
}
```
