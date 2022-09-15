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
code_lang: java
type: multi-code-lang
code_lang_weight: 0
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-java'
      tag: 'GitHub'
      text: 'Datadog Java APM source code'
    - link: 'tracing/glossary/'
      tag: 'Documentation'
      text: 'Explore your services, resources, and traces'
---
## Compatibility requirements

The latest Java Tracer supports all JVMs version 7 and higher on all platforms.

For a full list of Datadog’s Java version and framework support (including legacy and maintenance versions), read [Compatibility Requirements][2].

## Installation and getting started

### Follow the in-app documentation (recommended)

Follow the [Quickstart instructions][3] within the Datadog app for the best experience, including:

- Step-by-step instructions scoped to your deployment configuration (hosts, Docker, Kubernetes, or Amazon ECS).
- Dynamically set `service`, `env`, and `version` tags.
- Enable the Continuous Profiler, ingesting 100% of traces, and Trace ID injection into logs during setup.

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default, the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

{{< tabs >}}
{{% tab "Containers" %}}

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After the application is instrumented, the trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable. Some examples follow:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket
   ```

   ```bash
   java -javaagent:<DD-JAVA-AGENT-PATH>.jar -jar <YOUR_APPLICATION_PATH>.jar
   ```

   You can also use system properties:

   ```bash
   java -javaagent:<DD-JAVA-AGENT-PATH>.jar \
       -Ddd.trace.agent.url=$DD_TRACE_AGENT_URL \
       -jar <YOUR_APPLICATION_PATH>.jar
   ```

   Similarly, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist, then stats are sent to `http://localhost:8125`.

{{< site-region region="us3,us5,eu,gov" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
{{% /tab %}}
{{% tab "AWS Lambda" %}}

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/
{{% /tab %}}
{{% tab "Other Environments" %}}

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Service][4].

For other environments, please refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/
{{% /tab %}}
{{< /tabs >}}

### Instrument Your Application

After the agent is installed, to begin tracing your applications:

1. Download `dd-java-agent.jar` that contains the latest Agent class files:

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```
   To access a specific tracer version, visit Datadog's [Maven repository][4].

2. To run your app from an IDE, Maven or Gradle application script, or `java -jar` command, with the Continuous Profiler, deployment tracking, and logs injection (if you are sending logs to Datadog), add the `-javaagent` JVM argument and the following configuration options, as applicable:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -jar path/to/your/app.jar -Ddd.version=1.0
    ```

    **Note:** Enabling profiling may impact your bill depending on your APM bundle. See the [pricing page][5] for more information.

| Environment Variable      | System Property                     | Description|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | Your application environment (`production`, `staging`, etc.) |
| `DD_SERVICE`   | `dd.service`     | The name of a set of processes that do the same job. Used for grouping stats for your application. |
| `DD_VERSION` | `dd.version` |  Your application version (for example, `2.5`, `202003181415`, `1.3-alpha`, etc.) |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Enable the [Continous Profiler][6] |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Enable automatic MDC key injection for Datadog trace and span IDs. See [Advanced Usage][7] for details. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Set a sampling rate at the root of the trace for all services.     |
| `DD_TRACE_SAMPLING_SERVICE_RULES` | `dd.trace.sampling.service.rules` |   Set a sampling rate at the root of the trace for services that match the specified rule.    |

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

     For more information, see the [Oracle documentation][8].

- Never add `dd-java-agent` to your classpath. It can cause unexpected behavior.

## Automatic instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][9]. When a `java-agent` is registered, it can modify class files at load time.

**Note:** Classes loaded with remote ClassLoader are not instrumented automatically.

Instrumentation may come from auto-instrumentation, the OpenTracing API, or a mixture of both. Instrumentation generally captures the following info:

- Timing duration is captured using the JVM's NanoTime clock unless a timestamp is provided from the OpenTracing API
- Key/value tag pairs
- Errors and stack traces which are unhandled by the application
- A total count of traces (requests) flowing through the system

## Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][10] for details.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /profiler/enabling/?code-lang=java
[2]: /tracing/compatibility_requirements/java
[3]: https://app.datadoghq.com/apm/docs
[4]: https://repo1.maven.org/maven2/com/datadoghq/dd-java-agent
[5]: /account_management/billing/apm_tracing_profiler/
[6]: /profiler/
[7]: /tracing/other_telemetry/connect_logs_and_traces/java/
[8]: https://docs.oracle.com/javase/7/docs/technotes/tools/solaris/java.html
[9]: https://docs.oracle.com/javase/8/docs/api/java/lang/instrument/package-summary.html
[10]: /tracing/trace_collection/library_config/java/
