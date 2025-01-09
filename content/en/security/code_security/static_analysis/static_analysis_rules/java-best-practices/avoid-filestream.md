---
aliases:
- /continuous_integration/static_analysis/rules/java-best-practices/avoid-filestream
- /static_analysis/rules/java-best-practices/avoid-filestream
dependencies: []
disable_edit: true
group_id: java-best-practices
meta:
  category: Best Practices
  id: java-best-practices/avoid-filestream
  language: Java
  severity: Info
  severity_rank: 4
title: Avoid creating FileStream directly
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `java-best-practices/avoid-filestream`

**Language:** Java

**Severity:** Info

**Category:** Best Practices

## Description
The classes that creates `FileInputStream` and `FileOutputStream` triggers too much garbage collection. Instead, use methods from the `nio` package that cause less garbage collection.

#### Learn More

 - [JDK-8080225: # FileInput/OutputStream/FileChannel cleanup should be improved](https://bugs.openjdk.org/browse/JDK-8080225)

## Non-Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        String filename = "/path/to/file.txt";
        FileInputStream fis = new FileInputStream(filename);
        FileOutputStream fos = new FileOutputStream(filename);
        FileReader fr = new FileReader(filename);
        FileWriter fw = new FileWriter(filename);

        String s = new String("woeijf");
    }
}
```

## Compliant Code Examples
```java
class Main {
    public static void main(String[] args) {
        String filename = "/path/to/file.txt";
        try(InputStream is = Files.newInputStream(Paths.get(filename))) {
        }
        try(OutputStream os = Files.newOutputStream(Paths.get(filename))) {
        }
        try(BufferedReader br = Files.newBufferedReader(Paths.get(filename), StandardCharsets.UTF_8)) {
        }
        try(BufferedWriter wr = Files.newBufferedWriter(Paths.get(filename), StandardCharsets.UTF_8)) {
        }
    }
}
```
