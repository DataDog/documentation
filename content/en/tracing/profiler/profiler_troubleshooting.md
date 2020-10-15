---
title: Profiler Troubleshooting
kind: documentation
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---
## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 14.04.3)
- Runtime type, version, and vendor (for example, Java OpenJDK 11 AdoptOpenJDK)

## Java 8 support

The following OpenJDK 8 vendors are supported for Continuous Profiling because they include JDK Flight Recorder in their latest versions: 

| Vendor                      | JDK version that includes Flight Recorder                      |
| --------------------------- | -------------------------------------------------------------- |
| Azul                        | u212 (u262 is recommended)                                     |
| AdoptOpenJDK                | u262                                                           |
| RedHat                      | u262                                                           |
| Amazon (Corretto)           | u262                                                           |
| Bell-Soft (Liberica)        | u262                                                           |
| Upstream builds             | u272                                                           |

If your vendor is not on the list, [open a support ticket][2], we can let you know if we're planning to support it or if we already offer beta support.

## Removing sensitive information from profiles

If your system properties contain sensitive information such as user names or passwords, turn off the system property event by creating a `jfp` override template file with `jdk.InitialSystemProperty` disabled:

{{< code-block lang="text" filename="example-template.jfp" >}}
jdk.InitialSystemProperty#enabled=false
{{< /code-block >}}

## Exceptions overwhelming the profiler

The Datadog exception profiler will normally have a very small footprint and overhead. But if a lot of exceptions are created and thrown, it can cause significant overhead for the profiler. This can happen, for example, when you use exceptions for control flow.  If you have an unusually high exception rate, temporarily turn off exception profiling until you’ve had a chance to fix what's causing them. 

To disable exception profiling, start the tracer with the `-Ddd.integration.throwables.enabled=false` JVM setting.

Remember to turn this setting back on after you've returned to a more typical rate of exceptions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
