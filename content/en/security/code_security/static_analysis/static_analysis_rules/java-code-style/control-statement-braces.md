---
aliases:
- /continuous_integration/static_analysis/rules/java-code-style/control-statement-braces
- /static_analysis/rules/java-code-style/control-statement-braces
dependencies: []
disable_edit: true
group_id: java-code-style
meta:
  category: Code Style
  id: java-code-style/control-statement-braces
  language: Java
  severity: Notice
  severity_rank: 3
title: Enforce using control statement brackets
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-code-style/control-statement-braces`

**Language:** Java

**Severity:** Notice

**Category:** Code Style

## Description
Omitting braces `{}` is valid in multiple statements, such as, for loops, if statements, and while loops. However, enforcing the use of control braces throughout your codebase will make the code more consistent and can make it easier to add statements in the future.

## Non-Compliant Code Examples
```java
public class Foo {
    int x = 0;

    public void bar() {
        String message;
        if (randomNumber < something)
            message = "foo";
        else
            message = "bar";

        if (randomNumber < something) {
            message = "foo";
        }
        else
            message = "bar";

        if (randomNumber < something)
            message = "foo";
        else {
            message = "bar";
        }
    }
}
```

```java
public class Foo {
    int x = 0;

    public void bar() {
        // while loop - no braces
        while (true)
            x++;

        // for loop - no braces
        for (int i = 0; i < 42; i++)
            x++;

        // if only - no braces
        if (true)
            x++;
        
        // if/else - no braces
        if (true)
            x++;
         else 
            x--;
        
        // do/while - no braces
        do
            i++;
        while (true);
        
        // case - no braces - allowed by default
        switch(i) {
            case (i < 42):
                return "foo";
            default: 
                return "bar";
        }
    }
}
```

## Compliant Code Examples
```java
public class Foo {
    List list = new ArrayList();

    public void bar() {
        String message;
        if(list.size() == 0) {
            message = "empty";
        } else if (list.size() == 1) {
            message = "solo";
        } else {
            message = "multiple";
        }
    }
}
```

```java
public class Foo {
    int x = 0;

    public void bar() {
        // while loop - with braces
        while (true) {
            x++;
        }

        // for loop - with braces
        for (int i = 0; i < 42; i++) {
            x++;
        }

        // if only - with braces
        if (true) {
            x++;
        }
            
        // if/else - with braces
        if (true) {
            x++;
        } else {
            x--;
        }
    
        // do/while - with braces
        do {
            i++;
        }
        while (true);
        
        // case - with braces
        switch(i) {
            case (i < 42) {
                return "foo";
            }
            default {
                return "bar"
            }
        }
    }
}
```
