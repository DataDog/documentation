---
title: Java Compatibility Requirements 
kind: documentation
code_lang: java
type: multi-code-lang
code_lang_weight: 0
---

## Language and framework compatibility

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

<div class="alert alert-info">If you don't see your framework of choice listed, let us know! Fill out <a href="https://forms.gle/gHrxGQMEnAobukfn7">this short form to send details</a>.</div>

## ASM capabilities support

The following ASM capabilities are supported in the Java library, for the specified tracer version:

| ASM capability                   | Minimum Java tracer version |
| -------------------------------- | ----------------------------|
| Threat Detection <br/> --> Business logic API  | 1.8.0 <br/>   |
| Threat Protection <br/> --> IP blocking <br/> --> Suspicious request blocking <br> --> User blocking   | 1.9.0<br/><br/><br/>     |
| Risk Management <br/> --> Third-party vulnerability detection <br/> --> Custom code vulnerability detection | 1.1.4 <br/><br/> |

The minimum tracer version to get all supported ASM capabilities for Java is 1.9.0.

**Note**: Threat Protection requires enabling [Remote Configuration][2], which is included in the listed minimum tracer version.  

[1]: /tracing/trace_collection/compatibility/java/
[2]: /agent/guide/how_remote_config_works/#enabling-remote-configuration
