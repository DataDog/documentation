---
title: Java Compatibility Requirements 
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
---

## Language and framework compatibility

ASM follows the same language and framework support as APM. See the [APM Java Compatibility][1] page more details. 

### Supported Java versions

The Datadog library supports Java JRE 1.8 and higher of both Oracle JDK and OpenJDK, on the following architectures:
- Linux (GNU) x86, x86-64
- Alpine Linux (musl) x86, x86-64
- macOS (Darwin) x86, x86-64
- Windows (msvc) x86, x86-64

Datadog does not officially support any early-access versions of Java.

You can monitor application security for Java apps running in Docker, Kubernetes, AWS ECS, and AWS Fargate.

### Supported frameworks

| Framework Web Server    | Minimum Framework Version   |
| ----------------------- | --------------------------- |
| Servlet Compatible      | 2.3+, 3.0+                  |
| Spring                  | 3.1                         |

**Note**: Many application servers are Servlet compatible and are supported by ASM, such as WebSphere, WebLogic, and JBoss. Also, frameworks like Spring Boot are supported by virtue of using a supported embedded application server (such as Tomcat, Jetty, or Netty).


## ASM capabilities support

The following ASM capabilities are supported in the Java library, for the specified tracer version:

| ASM capability                   | Minimum Java tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | x.x <br/>x.x   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | x.x<br/>x.x<br/>x.x<br/>x.x     |
| SCA   | x.x      |
| IAST    | x.x    |
| Risk Management | 1.1.4 |


[1]: /tracing/trace_collection/compatibility/java/
