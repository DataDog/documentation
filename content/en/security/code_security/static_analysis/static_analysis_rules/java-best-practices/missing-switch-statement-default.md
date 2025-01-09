---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/missing-switch-statement-default
- /static_analysis/rules/java-best-practices/missing-switch-statement-default
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/missing-switch-statement-default
  language: Java
  severity: Warning
  severity_rank: 2
title: Switch statements should have a default case
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/missing-switch-statement-default`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
To improve the understandability your `switch` statement, it is recommended to make your statements exhaustive by incorporating a `default` case.

## Non-Compliant Code Examples
```java
class Foo {
    public String getValue() {
        int num = 10;
        System.out.println("foobar");
        switch (num) {
            case 1:
                return "One";
            case 2:
                return "Two";
            case 3:
                return "Three";
        }
    }

    public String getValue() {
        int num = 10;
        switch (num) {
            case 1:
                return "One";
            case 2:
                return "Two";
            case 3:
                return "Three";
        }
    }
}


```

```java
class Foo {
    public String getValue(int num) {
        switch (num) {
            case 1:
                return "One";
            case 2:
                return "Two";
            case 3:
                return "Three";
        }
    }
    public String getValue2(MyType num) {
        switch (num) {
            case 1:
                return "One";
            case 2:
                return "Two";
            case 3:
                return "Three";
        }
    }
}

class Bar {
    public String getValue(int num) {
        if (something) {
            switch (num) {
                case 1: // a comment
                    return "One";
                case 2:
                    return "Two"; // another comment
                case 3:
                    return "Three";
            }
        } else {
            if (somethingElse) {
                switch (num) {
                    case 'j': // a comment
                        return "One";
                    case 2.3:
                        return "Two"; // another comment
                    case 3:
                        return "Three";
                }
            }
        }
        
    }
}


```

## Compliant Code Examples
```java
class Foo {
    public String getValue(int num) {
        switch (num) {
            case 1:
                return "One";
            case 2:
                return "Two";
            case 3:
                return "Three";
            default:
                return "Unknown"
        }
    }
}

class Bar {
    public String getValue(int num) {
        switch (num) {
            case 1: // a comment
                return "One";
            case 2:
                return "Two"; // another comment
            case 3:
                return "Three";
            default:
                return "Unknown"
        }
    }
}

class Bar {
    public String getValue(int num) {
        return switch (num) {
            case 1 -> "one";
            case 2 -> "two";
            default -> "unknown";
        }
    }
}
```
