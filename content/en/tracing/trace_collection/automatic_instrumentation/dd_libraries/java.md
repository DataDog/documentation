---
title: Tracing Java Applications
kind: documentation
aliases:
    - /tracing/java
    - /tracing/languages/java
    - /agent/apm/java/
    - /tracing/setup/java
    - /tracing/setup_overview/java
    - /tracing/setup_overview/setup/java
    - /tracing/trace_collection/dd_libraries/java/
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: "Source Code"
      text: 'Datadog Java APM source code'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
## Compatibility requirements

The latest Java Tracer supports all JVMs version 8 and higher. For additional information about JVM versions below 8, read [Supported JVM runtimes][10].

For a full list of Datadog's Java version and framework support (including legacy and maintenance versions), read [Compatibility Requirements][1].

## Getting started

Before you begin, make sure you've already [installed and configured the Agent][18].

### Instrument your application

After you install and configure your Datadog Agent, the next step is to add the tracing library directly in the application to instrument it. Read more about [compatibility information][1].

To begin tracing your applications:

1. Download `dd-java-agent.jar` that contains the latest tracer class files, to a folder that is accessible by your Datadog user:

{{< tabs >}}
{{% tab "Wget" %}}
   ```shell
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "cURL" %}}
   ```shell
   curl -Lo dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   ```
{{% /tab %}}
{{% tab "Dockerfile" %}}
   ```dockerfile
   ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
   ```
{{% /tab %}}
{{< /tabs >}}

   **Note:** To download the latest build of a specific **major** version, use the `https://dtdg.co/java-tracer-vX` link instead, where `X` is the desired major version.
   For example, use `https://dtdg.co/java-tracer-v1` for the latest version 1 build. Minor version numbers must not be included. Alternatively, see Datadog's [Maven repository][3] for any specific version.

   **Note**: Release Candidate versions are made available in GitHub [DataDog/dd-trace-java releases][21]. These have "RC" in the version and are recommended for testing outside of your production environment. You can [subscribe to GitHub release notifications][20] to be informed when new Release Candidates are available for testing. If you experience any issues with Release Candidates, reach out to [Datadog support][22].

2. To run your app from an IDE, Maven or Gradle application script, or `java -jar` command, with the Continuous Profiler, deployment tracking, and logs injection (if you are sending logs to Datadog), add the `-javaagent` JVM argument and the following configuration options, as applicable:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```
    If you have a strong need to reduce the size of your image and omit modules, you can use the [jdeps][19] command to identify dependencies. However, required modules can change over time, so do this at your own risk.

    <div class="alert alert-danger">Enabling profiling may impact your bill depending on your APM bundle. See the <a href="https://docs.datadoghq.com/account_management/billing/apm_tracing_profiler/">pricing page</a> for more information.</div>

| Environment Variable      | System Property                     | Description|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | Your application environment (`production`, `staging`, etc.) |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Enable automatic MDC key injection for Datadog trace and span IDs. See [Advanced Usage][6] for details. <br><br>**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_LOGS_INJECTION` in the [Service Catalog][17] UI. |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Enable the [Continuous Profiler][5] |
| `DD_SERVICE`   | `dd.service`     | The name of a set of processes that do the same job. Used for grouping stats for your application. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Set a sampling rate at the root of the trace for all services. <br><br>**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_TRACE_SAMPLE_RATE` in the [Service Catalog][17] UI.     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Set a sampling rate at the root of the trace for services that match the specified rule.    |
| `DD_VERSION` | `dd.version` |  Your application version (for example, `2.5`, `202003181415`, or `1.3-alpha`) |

Additional [configuration options](#configuration) are described below.


### Add the Java Tracer to the JVM

Use the documentation for your application server to figure out the right way to pass in `-javaagent` and other JVM arguments. Here are instructions for some commonly used frameworks:

{{< tabs >}}
{{% tab "Spring Boot" %}}

If your app is called `my_app.jar`, create a `my_app.conf`, containing:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

For more information, see the [Spring Boot documentation][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs
{{% /tab %}}
{{% tab "Tomcat" %}}

Open your Tomcat startup script file, for example `setenv.sh` on Linux, and add:

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```
Hi, according to this support ticket, windows services doesn't use setenv.bat to update env variables.link: https://datadog.zendesk.com/agent/tickets/1600757

Or on Windows, `setenv.bat`:

```text
set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```
If a `setenv` file does not exist, create it in the `./bin` directory of the Tomcat project folder.

{{% /tab %}}
{{% tab "JBoss" %}}

- In standalone mode:

  Add the following line to the end of `standalone.conf`:

```text
JAVA_OPTS="$JAVA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

- In standalone mode and on Windows, add the following line to the end of `standalone.conf.bat`:

```text
set "JAVA_OPTS=%JAVA_OPTS% -javaagent:X:/path/to/dd-java-agent.jar"
```

- In domain mode:

  Add the following line in the file `domain.xml`, under the tag server-groups.server-group.jvm.jvm-options:

```text
<option value="-javaagent:/path/to/dd-java-agent.jar"/>
```

For more details, see the [JBoss documentation][1].


[1]: https://access.redhat.com/documentation/en-us/red_hat_jboss_enterprise_application_platform/7.0/html/configuration_guide/configuring_jvm_settings
{{% /tab %}}
{{% tab "Jetty" %}}

If you use `jetty.sh` to start Jetty as a service, edit it to add:

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

If you use `start.ini` to start Jetty, add the following line (under `--exec`, or add `--exec` line if it isn't there yet):

```text
-javaagent:/path/to/dd-java-agent.jar
```

{{% /tab %}}
{{% tab "WebSphere" %}}

In the administrative console:

1. Select **Servers**. Under **Server Type**, select **WebSphere application servers** and select your server.
2. Select **Java and Process Management > Process Definition**.
3. In the **Additional Properties** section, click **Java Virtual Machine**.
4. In the **Generic JVM arguments** text field, enter:

```text
-javaagent:/path/to/dd-java-agent.jar
```

For additional details and options, see the [WebSphere docs][1].

[1]: https://www.ibm.com/support/pages/setting-generic-jvm-arguments-websphere-application-server
{{% /tab %}}
{{< /tabs >}}

**Note**

- If you're adding the `-javaagent` argument to your `java -jar` command, it needs to be added _before_ the `-jar` argument, as a JVM option, not as an application argument. For example:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     For more information, see the [Oracle documentation][7].

- Never add `dd-java-agent` to your classpath. It can cause unexpected behavior.

## Automatic instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][8]. When a `java-agent` is registered, it can modify class files at load time.

**Note:** Classes loaded with remote ClassLoader are not instrumented automatically.

Instrumentation may come from auto-instrumentation, the OpenTracing API, or a mixture of both. Instrumentation generally captures the following info:

- Timing duration is captured using the JVM's NanoTime clock unless a timestamp is provided from the OpenTracing API
- Key/value tag pairs
- Errors and stack traces which are unhandled by the application
- A total count of traces (requests) flowing through the system

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][9] for details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /tracing/compatibility_requirements/java
[2]: https://app.datadoghq.com/apm/service-setup
[3]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[4]: /account_management/billing/apm_tracing_profiler/
[5]: /profiler/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/
[7]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[8]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[9]: /tracing/trace_collection/library_config/java/
[10]: /tracing/trace_collection/compatibility/java/#supported-jvm-runtimes
[11]: /tracing/trace_collection/library_injection_local/
[16]: /agent/remote_config/
[17]: https://app.datadoghq.com/services
[18]: /tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
[19]: https://docs.oracle.com/en/java/javase/11/tools/jdeps.html
[20]: https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/managing-subscriptions-for-activity-on-github/viewing-your-subscriptions
[21]: https://github.com/DataDog/dd-trace-java/releases
[22]: https://docs.datadoghq.com/getting_started/support/
