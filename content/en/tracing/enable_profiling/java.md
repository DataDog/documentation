---
title: Profiling Java Applications
kind: documentation
aliases:
- /tracing/java
- /tracing/languages/java
- /agent/apm/java/
further_reading:
---

## Installation and Getting Started

To begin profiling applications written in any JVM based runtime, you need to download `dd-java-agent.jar` that contains the Agent class files:

```shell
wget -O dd-java-agent.jar 'https://repository.sonatype.org/service/local/artifact/maven/redirect?r=central-proxy&g=com.datadoghq&a=dd-java-agent&v=LATEST'
```

Finally, add the following JVM argument when starting your application in your IDE, Maven or Gradle application script, or `java -jar` command:

```text
-javaagent:/path/to/the/dd-java-agent.jar
```

**Note**:

* The `-javaagent` needs to be run before the `-jar` file, adding it as a JVM option, not as an application argument. For more information, see the [Oracle documentation][1].

* `dd-trace-java`'s artifacts (`dd-java-agent.jar`, `dd-trace-api.jar`, `dd-trace-ot.jar`) support all JVM-based languages, i.e. Scala, Groovy, Kotlin, Clojure, etc.

* Profiling and tracing are shipped within the same `dd-java-agent.jar` library. However, you can choose if you want to activate tracing or not, and same for profiling. To enable tracing, please follow the [enable tracing documentation][2].

## Enable profiling

Enable profiling by adding `-Ddd.profiling.enabled=true` to the JVM command line (in addition to any existing APM agent parameters).

Because profiles are sent directly to Datadog, you need to pass a [Datadog api key][3] by:
* either adding `-Ddd.profiling.apikey.file=/etc/path-to-api-key-file`. This file should only contain the api key as a string
* or via the `DD_PROFILING_APIKEY` environment variable

## Compatibility

Datadog officially supports the Java JRE 11 and higher of both Oracle JDK and OpenJDK. Datadog does not officially support any early-access versions of Java.

**Note**: Some specific builds will work with Datadog profiling if they support [Java Flight Recorder][4].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[2]: /tracing/setup/java/
[3]: /account_management/api-app-keys/#api-keys
[4]: https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/about.htm
