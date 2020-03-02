---
title: Profiling Java Applications
kind: documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

The Datadog Profiler requires [Java Flight Recorder][1]. The Datadog Profiling library supports the Java JRE 11 and higher of both Oracle JDK and OpenJDK. Early-access versions of Java aren't supported. All JVM-based languages, i.e. Scala, Groovy, Kotlin, Clojure, etc. are supported.

Java profiling and tracing are shipped within the same `dd-java-agent.jar` library. In order to use tracing or profiling, you must enable these functions. To enable tracing, follow the [enable tracing documentation][2].

## Getting Started

To begin profiling applications written in any JVM based runtime:

1. Download `dd-java-agent.jar`, which contains the Java Agent class files:

    ```shell
    wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
    ```

2. Add the following JVM argument when starting your application in your IDE, Maven or Gradle application script, or `java -jar` command:

    ```shell
    -javaagent:<PATH>/dd-java-agent.jar
    ```

3. Enable profiling by adding `-Ddd.profiling.enabled=true` to the JVM command line (in addition to any existing APM Agent parameters), or use the `DD_PROFILING_ENABLED=true` environment variable.

4. Because profiles are sent directly to Datadog without using the Datadog Agent, you must pass a valid [Datadog API key][3] by either:

    - Adding `-Ddd.profiling.api-key.file=<PATH>`, or use the `DD_PROFILING_API_KEY_FILE=<PATH>` environment variable. This file should only contain the API key as a string.
    - Setting the `DD_PROFILING_API_KEY=<DATADOG_API_KEY>` environment variable.

5. Visualize your profiles in the [Datadog APM > Profiling page][4].

**Note**: The `-javaagent` needs to be run before the `-jar` file, adding it as a JVM option, not as an application argument. For more information, see the [Oracle documentation][5]:

```shell
# Good:
java -javaagent:dd-java-agent.jar ... -jar my-service.jar -more-flags
# Bad:
java -jar my-service.jar -javaagent:dd-java-agent.jar ...
```

## Profile Types

{{< img src="tracing/profiling/profile.png" alt="A specific profile">}}

Once enabled, the following profile types are collected:

| Profile type             | Definition                                                                                                                                                                                                                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CPU in Java Code         | Shows the time each method spent running on the CPU. It includes JVM bytecode, but not native code called from within the JVM.                                                                                                                                                                     |
| Allocation               | Shows the amount of heap memory allocated by each method, including allocations which were subsequently freed.                                                                                                                                                                                     |
| Wall Time in Native Code | Shows the elapsed time spent in native code. Elapsed time includes time when code is running on CPU, waiting for I/O, and anything else that happens while the method is running. This profile does not include time spent running JVM bytecode, which is typically most of your application code. |
| Class load               | Shows the number of classes loaded by each method.                                                                                                                                                                                                                                                 |
| Error                    | Shows the number of errors thrown by each method.                                                                                                                                                                                                                                                  |
| File I/O                 | Shows the time each method spent reading and writing files.                                                                                                                                                                                                                                        |
| Lock                     | Shows the time each method spent waiting for a lock.                                                                                                                                                                                                                                               |
| Socket I/O               | Shows the time each method spent handling socket I/O.                                                                                                                                                                                                                                              |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
[2]: /tracing/setup/java/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://app.datadoghq.com/profiling
[5]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
