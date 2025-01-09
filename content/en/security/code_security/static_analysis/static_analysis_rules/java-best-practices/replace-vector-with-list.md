---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/replace-vector-with-list
- /static_analysis/rules/java-best-practices/replace-vector-with-list
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/replace-vector-with-list
  language: Java
  severity: Warning
  severity_rank: 2
title: Replace Vector with List
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/replace-vector-with-list`

**Language:** Java

**Severity:** Warning

**Category:** Best Practices

## Description
Replace your `Vector` class usage with the newer `java.util.ArrayList`, unless you need expensive thread-safe operations. 

`Vector` uses unnecessary synchronization, which can slow down single-threaded applications whereas `ArrayList` can perform better in such cases. In addition, it offers modern features which make the transition easy while retaining flexibility for thread safety when needed.

## Non-Compliant Code Examples
```java
public class Foo {
    void bar() {
        Vector vector1 = new Vector(); // consider using java.util.List instead
        Vector<Integer> vector2 = new Vector<>();
    }
}
```

## Compliant Code Examples
```java
package com.dd.logs.rum.sessionreducer;

import static io.vavr.API.Vector;

import com.dd.logs.launcher.Features;
import com.dd.logs.launcher.ModuleLauncher;
import com.dd.logs.rule_engine.reducer.main.ReducerWorkloadBundle;
import com.dd.logs.usage.UsageComponent;
import com.dd.logs.usage.UsageTrackerClientBundle;
import com.dd.logs.workload.assigner.AssignerClientBundle;
import io.vavr.collection.Vector;
import java.util.List;

public class Main {

  public static void main(String[] args) {
    new ModuleLauncher(
            List.of(
                new AssignerClientBundle(),
                new UsageTrackerClientBundle(UsageComponent.SESSIONIZATION),
                new ReducerWorkloadBundle(new RumReducerWorkloadBundleParams())),
            // disconnected from mongo
            Features.builder().withKafka().build())
        .launchOrExit();

    Vector<String> x = returnSomeVavrVector();
    x.stdout();
  }

  private static Vector<String> returnSomeVavrVector() {
    return Vector();
  }
}
```

```java
public class Foo {
    void bar() {
        List list = new ArrayList();
        List<Integer> list2 = new ArrayList<>();
    }
}
```
