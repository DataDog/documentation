---
title: Sending Traces to Datadog
kind: documentation
description: "Get Started with Datadog APM"
aliases:
    - /tracing/setup
    - /tracing/send_traces/
    - /tracing/setup/
    - /tracing/environments/
    - /tracing/setup/environment
    - /tracing/setup/first_class_dimensions
    - /tracing/getting_further/first_class_dimensions/
    - /agent/apm/
    - /tracing/setup_overview/
further_reading:
- link: "tracing/trace_collection/compatibility"
  tag: "Documentation"
  text: "Compatibility requirements"
---


To configure your application to send traces to Datadog:

## Step 1 - Configure the Datadog Agent for APM

<div class="alert alert-info"><strong>Beta</strong>: If you use <a href="/tracing/trace_collection/single-step-apm">Single Step APM Instrumentation</a> when you install or update your Agent to the latest version, <strong>you're done!</strong> With this option, APM is configured in the Agent and all your services on that host, VM, or Docker container are automatically instrumented and report APM traces to Datadog. <a href="/tracing/services">Start exploring!</a></div>

If you don't use the Single Step APM Instrumentation option, APM-specific configurations are required on both the Tracer and Agent to ensure that traces can be properly received from containerized, serverless, or certain other environments. Ensure you have followed instructions for both components. 

Select your language:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,php,cpp,dotnet-core,dotnet-framework" >}}
{{< programming-lang lang="java" >}}
### Compatibility requirements

The latest Java Tracer supports all JVMs version 8 and higher. For additional information about JVM versions below 8, read [Supported JVM runtimes][10].

For a full list of Datadog's Java version and framework support (including legacy and maintenance versions), read [Compatibility Requirements][1].

### Installation and getting started

#### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default, the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

##### Containers

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

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file

##### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.

[1]: /tracing/serverless_functions/

##### Other environments

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], [AWS Elastic Beanstalk][3], and [Azure App Service][4].

For other environments, refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[4]: /infrastructure/serverless/azure_app_services/#overview
[5]: /integrations/
[6]: /help/

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

### Compatibility requirements
The latest Python Tracer supports CPython versions 2.7 and 3.5-3.10.

For a full list of Datadog's Python version and framework support (including legacy and maintenance versions), read the [Compatibility Requirements][1] page.

### Installation and getting started

#### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data by default at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After the application is instrumented, the trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   If a different socket, host, or port is required, use the `DD_TRACE_AGENT_URL` environment variable. Some examples:

   ```
   DD_TRACE_AGENT_URL=http://custom-hostname:1234
   DD_TRACE_AGENT_URL=unix:///var/run/datadog/apm.socket
   ```

   The connection for traces can also be configured in code:

   ```python
   from ddtrace import tracer

   # Network sockets
   tracer.configure(
       https=False,
       hostname="custom-hostname",
       port="1234",
   )

   # Unix domain socket configuration
   tracer.configure(
       uds_path="/var/run/datadog/apm.socket",
   )
   ```

   Similarly, the trace client attempts to send stats to the `/var/run/datadog/dsd.socket` Unix domain socket. If the socket does not exist then stats are sent to `http://localhost:8125`.

   If a different configuration is required, the `DD_DOGSTATSD_URL` environment variable can be used. Some examples:
   ```
   DD_DOGSTATSD_URL=udp://custom-hostname:1234
   DD_DOGSTATSD_URL=unix:///var/run/datadog/dsd.socket
   ```
   The connection for stats can also be configured in code:

   ```python
   from ddtrace import tracer

   # Network socket
   tracer.configure(
     dogstatsd_url="udp://localhost:8125",
   )

   # Unix domain socket configuration
   tracer.configure(
     dogstatsd_url="unix:///var/run/datadog/dsd.socket",
   )
   ```
{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/

#### Other environments

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For other environments, refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[5]: /integrations/
[6]: /help/

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
Ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

### Compatibility requirements

The Go Tracer requires Go `1.17+` and Datadog Agent `>= 5.21.1`. For a full list of Datadog's Go version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your now instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace traffic at `localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. After the application is instrumented, the trace client attempts to send traces to the Unix domain socket `/var/run/datadog/apm.socket` by default. If the socket does not exist, traces are sent to `http://localhost:8126`.

   A similar rule applies to all metrics sent by the Go tracer (including Runtime Metrics and internal telemetry): the client attempts to send Dogstatsd data to the Unix domain socket `/var/run/datadog/dsd.socket` and defaults to `http://localhost:8125` if that does not exist.

   If you require different hosts or ports, use one or more of the following environment variables. The examples show the defaults, but you can set them to other values as well.

   ```
   DD_AGENT_HOST=localhost   # The host to send traces and metrics to. Defaults to localhost.
   DD_TRACE_AGENT_PORT=8126  # The port to send traces to. Defaults to 8126.
   DD_DOGSTATSD_PORT=8125    # The port to send Dogstatsd metrics to. Defaults to 8125.
   ```

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/

#### Other environments

Tracing is available for a number of other environments, such as  [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For other environments, refer to the [Integrations][5] documentation for that environment and [contact support][6] if you are encountering any setup issues.

[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[5]: /integrations/
[6]: /help/

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

## Compatibility requirements

The latest Node.js Tracer supports versions `>=14`. For a full list of Datadog's Node.js version and framework support (including legacy and maintenance versions), see the [Compatibility Requirements][1] page.

## Installation and getting started

### Configure the Datadog Agent for APM

Install and configure the Datadog Agent to receive traces from your instrumented application. By default the Datadog Agent is enabled in your `datadog.yaml` file under `apm_config` with `enabled: true` and listens for trace data at `http://localhost:8126`. For containerized environments, follow the links below to enable trace collection within the Datadog Agent.

#### Containers

1. Set `apm_non_local_traffic: true` in the `apm_config` section of your main [`datadog.yaml` configuration file][1].

2. See the specific setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}
</br>

3. The tracing client sends traces to `localhost:8126` by default. If this is not the correct host and port for your Agent, set the `DD_TRACE_AGENT_HOSTNAME` and `DD_TRACE_AGENT_PORT` environment variables by running:

    ```sh
    DD_TRACE_AGENT_HOSTNAME=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
    ```

   To use Unix domain sockets, specify the entire URL as a single environment variable, `DD_TRACE_AGENT_URL`.

   If you require a different socket, host, or port, use the `DD_TRACE_AGENT_URL` environment variable or the `DD_TRACE_AGENT_HOST` and `DD_TRACE_AGENT_PORT` environment variables. Some examples:

   ```sh
   DD_AGENT_HOST=<HOSTNAME> DD_TRACE_AGENT_PORT=<PORT> node server
   DD_TRACE_AGENT_URL=http://<HOSTNAME>:<PORT> node server
   DD_TRACE_AGENT_URL=unix:<SOCKET_PATH> node server
   ```

{{< site-region region="us3,us5,eu,gov,ap1" >}}

4. Set `DD_SITE` in the Datadog Agent to {{< region-param key="dd_site" code="true" >}} to ensure the Agent sends data to the right Datadog location.

{{< /site-region >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file

#### AWS Lambda

To set up Datadog APM in AWS Lambda, see the [Tracing Serverless Functions][1] documentation.


[1]: /tracing/serverless_functions/

#### Other Environments

Tracing is available for other environments, including [Heroku][1], [Cloud Foundry][2], and [AWS Elastic Beanstalk][3].

For other environments, see the [Integrations][5] documentation for that environment and [contact support][6] if you encounter setup issues.

Read [tracer settings][3] for a list of initialization options.


[1]: /agent/basic_agent_usage/heroku/#installation
[2]: /integrations/cloud_foundry/#trace-collection
[3]: /integrations/amazon_elasticbeanstalk/
[5]: /integrations/
[6]: /help/

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
PHP
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}
C++
{{< /programming-lang >}}
{{< programming-lang lang="dotnet-core" >}}
.NET Core
{{< /programming-lang >}}
{{< programming-lang lang="dotnet-framework" >}}
.Net Framework
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Step 2 - Instrument your application 

When you add the Datadog tracing library to your code, it instruments the service and sends traces to the Datadog Agent. The Agent then sends the traces to the Datadog backend to be displayed in the UI.

{{< img src="tracing/visualization/troubleshooting_pipeline.png" alt="The APM pipeline">}}

Depending on the programming language and infrastructure you use, you have the following options to instrument your application.

### Option 1 - Add the library directly to your application code

For setup instructions, select your language:

{{< programming-lang-wrapper langs="java,python,ruby,go,nodejs,php,cpp,dotnet-core,dotnet-framework" >}}
{{< programming-lang lang="java" >}}

#### Choose your instrumentation method

After you deploy or install and configure your Datadog Agent, the next step is to instrument your application. You can do this in the following ways, depending on the infrastructure your app runs on, the language it's written in, and the level of configuration you require.

See the following pages for supported deployment scenarios and languages:

- [Inject the instrumentation library locally][11] (at the Agent);
- [Inject the instrumentation library from the Datadog UI][12] (beta); or
- Add the tracing library directly in the application, as described in the [Install the tracer](#install-the-tracer) section. Read more about [compatibility information][1].

##### Instrument your application

<div class="alert alert-info">If you are collecting traces from a Kubernetes application, or from an application on a Linux host or container, as an alternative to the following instructions, you can inject the tracing library into your application. Read <a href="/tracing/trace_collection/library_injection_local">Injecting Libraries</a> for instructions.</div>

After the agent is installed, to begin tracing your applications:

1. Download `dd-java-agent.jar` that contains the latest tracer class files, to a folder that is accessible by your Datadog user:

   ```shell
   wget -O dd-java-agent.jar https://dtdg.co/latest-java-tracer
   ```

   **Note:** To download the latest build of a specific **major** version, use the `https://dtdg.co/java-tracer-vX` link instead, where `X` is the desired major version.
   For example, use `https://dtdg.co/java-tracer-v1` for the latest version 1 build. Minor version numbers must not be included. Alternatively, see Datadog's [Maven repository][3] for any specific version.

2. To run your app from an IDE, Maven or Gradle application script, or `java -jar` command, with the Continuous Profiler, deployment tracking, and logs injection (if you are sending logs to Datadog), add the `-javaagent` JVM argument and the following configuration options, as applicable:

    ```text
    java -javaagent:/path/to/dd-java-agent.jar -Ddd.profiling.enabled=true -XX:FlightRecorderOptions=stackdepth=256 -Ddd.logs.injection=true -Ddd.service=my-app -Ddd.env=staging -Ddd.version=1.0 -jar path/to/your/app.jar
    ```

    **Note:** Enabling profiling may impact your bill depending on your APM bundle. See the [pricing page][4] for more information.

| Environment Variable      | System Property                     | Description|
| --------- | --------------------------------- | ------------ |
| `DD_ENV`      | `dd.env`                  | Your application environment (`production`, `staging`, etc.) |
| `DD_SERVICE`   | `dd.service`     | The name of a set of processes that do the same job. Used for grouping stats for your application. |
| `DD_VERSION` | `dd.version` |  Your application version (for example, `2.5`, `202003181415`, `1.3-alpha`, etc.) |
| `DD_PROFILING_ENABLED`      | `dd.profiling.enabled`          | Enable the [Continous Profiler][5] |
| `DD_LOGS_INJECTION`   | `dd.logs.injection`     | Enable automatic MDC key injection for Datadog trace and span IDs. See [Advanced Usage][6] for details. <br><br>**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_LOGS_INJECTION` in the [Service Catalog][17] UI. |
| `DD_TRACE_SAMPLE_RATE` | `dd.trace.sample.rate` |   Set a sampling rate at the root of the trace for all services. <br><br>**Beta**: Starting in version 1.18.3, if [Agent Remote Configuration][16] is enabled where this service runs, you can set `DD_TRACE_SAMPLE_RATE` in the [Service Catalog][17] UI.     |
| `DD_TRACE_SAMPLING_RULES` | `dd.trace.sampling.rules` |   Set a sampling rate at the root of the trace for services that match the specified rule.    |

Additional [configuration options](#configuration) are described below.


##### Add the Java Tracer to the JVM

Use the documentation for your application server to figure out the right way to pass in `-javaagent` and other JVM arguments. Here are instructions for some commonly used frameworks:

###### Spring Boot

If your app is called `my_app.jar`, create a `my_app.conf`, containing:

```text
JAVA_OPTS=-javaagent:/path/to/dd-java-agent.jar
```

For more information, see the [Spring Boot documentation][1].


[1]: https://docs.spring.io/spring-boot/docs/current/reference/html/deployment.html#deployment-script-customization-when-it-runs

###### Tomcat

Open your Tomcat startup script file, for example `setenv.sh` on Linux, and add:

```text
CATALINA_OPTS="$CATALINA_OPTS -javaagent:/path/to/dd-java-agent.jar"
```

Or on Windows, `setenv.bat`:

```text
set CATALINA_OPTS=%CATALINA_OPTS% -javaagent:"c:\path\to\dd-java-agent.jar"
```
If a `setenv` file does not exist, create it in the `./bin` directory of the Tomcat project folder.


###### JBoss

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

###### Jetty

If you use `jetty.sh` to start Jetty as a service, edit it to add:

```text
JAVA_OPTIONS="${JAVA_OPTIONS} -javaagent:/path/to/dd-java-agent.jar"
```

If you use `start.ini` to start Jetty, add the following line (under `--exec`, or add `--exec` line if it isn't there yet):

```text
-javaagent:/path/to/dd-java-agent.jar
```

###### WebSphere

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

**Note**

- If you're adding the `-javaagent` argument to your `java -jar` command, it needs to be added _before_ the `-jar` argument, as a JVM option, not as an application argument. For example:

   ```text
   java -javaagent:/path/to/dd-java-agent.jar -jar my_app.jar
   ```

     For more information, see the [Oracle documentation][7].

- Never add `dd-java-agent` to your classpath. It can cause unexpected behavior.

#### Automatic instrumentation

Automatic instrumentation for Java uses the `java-agent` instrumentation capabilities [provided by the JVM][8]. When a `java-agent` is registered, it can modify class files at load time.

**Note:** Classes loaded with remote ClassLoader are not instrumented automatically.

Instrumentation may come from auto-instrumentation, the OpenTracing API, or a mixture of both. Instrumentation generally captures the following info:

- Timing duration is captured using the JVM's NanoTime clock unless a timestamp is provided from the OpenTracing API
- Key/value tag pairs
- Errors and stack traces which are unhandled by the application
- A total count of traces (requests) flowing through the system

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][9] for details.

{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

#### Choose your instrumentation method

After you deploy or install and configure your Datadog Agent, the next step is to instrument your application. You can do this in the following ways, depending on the infrastructure your app runs on, the language it's written in, and the level of configuration you require.

See the following pages for supported deployment scenarios and languages:

- [Inject the instrumentation library locally][11] (at the Agent);
- [Inject the instrumentation library from the Datadog UI][12] (beta); or
- Add the tracing library directly in the application, as described in the [Install the tracer](#install-the-tracer) section. Read more about [compatibility information][1].

#### Instrument your application

<div class="alert alert-info">If you are collecting traces from a Kubernetes application, as an alternative to the following instructions, you can inject the tracing library into your application using the Cluster Agent Admission Controller. Read <a href="/tracing/trace_collection/library_injection_local">Injecting Libraries Using Admission Controller</a> for instructions.</div>

Once the agent is installed, to begin tracing applications written in Python, install the Datadog Tracing library, `ddtrace`, using pip:

```python
pip install ddtrace
```

**Note:** This command requires pip version `18.0.0` or greater. For Ubuntu, Debian, or another package manager, update your pip version with the following command:

```python
pip install --upgrade pip
```

Then to instrument your Python application use the included `ddtrace-run` command. To use it, prefix your Python entry-point command with `ddtrace-run`.

For example, if your application is started with `python app.py` then:

```shell
ddtrace-run python app.py
```

Once you've finished setup and are running the tracer with your application, you can run `ddtrace-run --info` to check that configurations are working as expected. Note that the output from this command does not reflect configuration changes made during runtime in code.

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

##### Upgrading to v1

If you are upgrading to ddtrace v1, review the [upgrade guide][4] and the [release notes][5] in the library documentation for full details.

{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}
Ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

#### Activate Go integrations to create spans

Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of libraries and frameworks. A list of these packages can be found in the [Compatibility Requirements][1] page. Import these packages into your application and follow the configuration instructions listed alongside each [Integration][1].

#### Library configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][3] for details.

For configuration instructions and details about using the API, see the Datadog [API documentation][4].

{{< /programming-lang >}}
{{< programming-lang lang="nodejs" >}}

#### Choose your instrumentation method

After you deploy or install and configure your Datadog Agent, the next step is to instrument your application. You can do this in the following ways, depending on the infrastructure your app runs on, the language it's written in, and the level of configuration you require.

See the following pages for supported deployment scenarios and languages:

- [Inject the instrumentation library locally][11] (at the Agent);
- [Inject the instrumentation library from the Datadog UI][12] (beta); or
- Add the tracing library directly in the application, as described in the [Install the tracer](#install-the-tracer) section. Read more about [compatibility information][1].


#### Instrument your application

After the Agent is installed, follow these steps to add the Datadog tracing library to your Node.js applications:

1. Install the Datadog Tracing library using npm for Node.js 14+:

    ```sh
    npm install dd-trace --save
    ```
    If you need to trace end-of-life Node.js version 12, install version 2.x of `dd-trace` by running:
    ```
    npm install dd-trace@latest-node12
    ```
    For more information on our distribution tags and Node.js runtime version support, see the [Compatibility Requirements][1] page.
    If you are upgrading from a previous major version of the library (0.x, 1.x, or 2.x) to another major version (2.x or 3.x), read the [Migration Guide][5] to assess any breaking changes.

2. Import and initialize the tracer either in code or via command line arguments. The Node.js tracing library needs to be imported and initialized **before** any other module.

   Once you have completed setup, if you are not receiving complete traces, including missing URL routes for web requests, or disconnected or missing spans, **confirm step 2 has been correctly done**. The tracing library being initialized first is necessary for the tracer to properly patch all of the required libraries for automatic instrumentation.

   When using a transpiler such as TypeScript, Webpack, Babel, or others, import and initialize the tracer library in an external file and then import that file as a whole when building your application.

#### Adding the tracer in code

##### JavaScript

```javascript
// This line must come before importing any instrumented module.
const tracer = require('dd-trace').init();
```

##### TypeScript and bundlers

For TypeScript and bundlers that support EcmaScript Module syntax, initialize the tracer in a separate file in order to maintain correct load
order.

```typescript
// server.ts
import './tracer'; // must come before importing any instrumented module.

// tracer.ts
import tracer from 'dd-trace';
tracer.init(); // initialized in a different file to avoid hoisting.
export default tracer;
```

If the default config is sufficient, or all configuration is done
via environment variables, you can also use `dd-trace/init`, which loads and
initializes in one step.

```typescript
import 'dd-trace/init';
```

#### Adding the tracer via command line arguments

Use the `--require` option to Node.js to load and initialize the tracer in one
step.

```sh
node --require dd-trace/init app.js
```

**Note:** This approach requires using environment variables for all
configuration of the tracer.

#### Bundling

`dd-trace` works by intercepting `require()` calls that a Node.js application makes when loading modules. This includes modules that are built-in to Node.js, like the `fs` module for accessing the filesystem, as well as modules installed from the NPM registry, like the `pg` database module.

Bundlers crawl all of the `require()` calls that an application makes to files on disk. It replaces the `require()` calls with custom code and combines all of the resulting JavaScript into one "bundled" file. When a built-in module is loaded, such as `require('fs')`, that call can then remain the same in the resulting bundle.

APM tools like `dd-trace` stop working at this point. They can continue to intercept the calls for built-in modules but don't intercept calls to third party libraries. This means that when you bundle a `dd-trace` app with a bundler it is likely to capture information about disk access (through `fs`) and outbound HTTP requests (through `http`), but omit calls to third party libraries. For example:
- Extracting incoming request route information for the `express` framework. 
- Showing which query is run for the `mysql` database client.

A common workaround is to treat all third party modules that the APM needs to instrument as being "external" to the bundler. With this setting the instrumented modules remain on disk and continue to be loaded with `require()` while the non-instrumented modules are bundled. However, this results in a build with many extraneous files and starts to defeat the purpose of bundling.

Datadog recommends you have custom-built bundler plugins. These plugins are able to instruct the bundler on how to behave, inject intermediary code and intercept the "translated" `require()` calls. As a result, more packages are included in the bundled JavaScript file. 

**Note**: Some applications can have 100% of modules bundled, however native modules still need to remain external to the bundle.

##### Esbuild support

This library provides experimental esbuild support in the form of an esbuild plugin, and requires at least Node.js v16.17 or v18.7. To use the plugin, make sure you have `dd-trace@3+` installed, and then require the `dd-trace/esbuild` module when building your bundle.

Here's an example of how one might use `dd-trace` with esbuild:

```javascript
const ddPlugin = require('dd-trace/esbuild')
const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['app.js'],
  bundle: true,
  outfile: 'out.js',
  plugins: [ddPlugin],
  platform: 'node', // allows built-in modules to be required
  target: ['node16']
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
```

#### Configuration

If needed, configure the tracing library to send application performance telemetry data as you require, including setting up Unified Service Tagging. Read [Library Configuration][4] for details.

{{< /programming-lang >}}
{{< programming-lang lang="php" >}}
PHP
{{< /programming-lang >}}
{{< programming-lang lang="cpp" >}}
C++
{{< /programming-lang >}}
{{< programming-lang lang="dotnet-core" >}}
.NET Core
{{< /programming-lang >}}
{{< programming-lang lang="dotnet-framework" >}}
.Net Framework
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

To instrument an application written in a language that does not have official library support, see the list of [community tracing libraries][2].

### Option 2 - Inject the library locally at the Agent

For Kubernetes, hosts, and containers, you can inject the tracing library locally at the Agent without modifying your application code. For more information and instructions, read [Injecting Libraries Locally][4].

- For Kubernetes, you can inject the library into applications written in Java, Python, Node.js, .NET, and Ruby.
- **Beta**: For Linux hosts and containers, you can inject the library into applications written in Java, Python, Node.js, and .NET.

### Option 3 - Inject the library remotely from the Datadog UI


For Kubernetes, you can inject the Java, Python, and Node.js tracing libraries from the Datadog UI. For more information and instructions, read [Injecting Libraries Remotely][5].

## APM setup tutorials

The following tutorials guide you through setting up distributed tracing for a sample application on various infrastructure scenarios, with both automatic and custom instrumentation, using the direct method ([Option 1](#option-1---add-the-library-directly-to-your-application-code)):

{{< whatsnext desc="Choose your language and environment:" >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Python Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-containers" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Python Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-python-container-agent-host" >}}<img src="/images/integrations_logos/python-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing for a Python Application in a Container and an Agent on a Host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Java Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-containers" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Java Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-container-agent-host" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing for a Java Application in a Container and an Agent on a Host{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-gke" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-gke-icon.png" /> Enabling Tracing for a Java Application on GKE{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-eks" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-eks-icon.png" /> Enabling Tracing for a Java Application on AWS EKS{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-ec2" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Enabling Tracing for a Java Application in AWS ECS with EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-aws-ecs-fargate" >}}<img src="/images/integrations_logos/java-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Enabling Tracing for a Java Application in AWS ECS with Fargate{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-java-admission-controller" >}}<img src="/images/integrations_logos/java-avatar.png" /> Enabling Tracing for a Java Application with the Admission Controller{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-host" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-host-icon.png" /> Enabling Tracing on a Go Application on the Same Host as Datadog Agent{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-containers" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-container-icon.png" /> Enabling Tracing on a Go Application and Datadog Agent in Containers{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-ec2" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-ec2-icon.png" /> Enabling Tracing for a Go Application in AWS ECS with EC2{{< /nextlink >}}
    {{< nextlink href="tracing/guide/tutorial-enable-go-aws-ecs-fargate" >}}<img src="/images/integrations_logos/golang-avatar.png" /> <img src="/images/tracing/guide/tutorials/tutorial-fargate-icon.png" /> Enabling Tracing for a Go Application in AWS ECS with Fargate{{< /nextlink >}}

{{< /whatsnext >}}
## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/compatibility/
[2]: /developers/community/libraries/#apm-tracing-client-libraries
[3]: /profiler/enabling/
[4]: /tracing/trace_collection/library_injection_local/
[5]: /tracing/trace_collection/library_injection_remote/