---
title: Instrumenting Cloud Run Functions
further_reading:

  - link: 'https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions'
    tag: 'Blog'
    text: 'Cloud Functions is now Cloud Run functions — event-driven programming in one unified serverless platform'

---

## Overview

This page explains how to collect traces, trace metrics, runtime metrics, and custom metrics from your Cloud Run functions.

<div class="alert alert-info">
<strong>Looking for 1st gen Cloud Run functions?</strong> If you're using Cloud Run functions (1st gen), previously known as Cloud Functions (1st gen), see <a href="/serverless/google_cloud_run/functions_1st_gen">Instrumenting 1st Gen Cloud Run Functions</a>.
</div>

<div class="alert alert-info">
<strong>Have you set up your <a href="/integrations/google-cloud-platform/">Google Cloud integration</a>?</strong> Datadog recommends setting up the integration, which collects metrics and logs from Google Cloud services, before proceeding on to instrumentation. Remember to add the <code>cloud asset viewer</code> role to your service account and enable the Cloud Asset Inventory API in Google Cloud.
</div>

## Setup

### Application

{{< tabs >}}
{{% tab "Node.js" %}}
#### Tracing

In your main application, add the `dd-trace-js` library. See [Tracing Node.js applications][1] for instructions.

Set `ENV NODE_OPTIONS="--require dd-trace/init"`. This specifies that the `dd-trace/init` module is required when the Node.js process starts.

#### Profiling
The profiler is shipped within the `dd-trace-js` library. If you are already using APM to collect traces for your application, you can skip installing the library and proceed to enabling the profiler. See [Enabling the Node.js Profiler][5].

#### Metrics
The `dd-trace-js` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/nodejs/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[5]: https://docs.datadoghq.com/profiler/enabling/nodejs?tab=environmentvariables

{{% /tab %}}
{{% tab "Python" %}}
#### Tracing
In your main application, add the `dd-trace-py` library. See [Tracing Python Applications][1] for instructions. You can also use [Tutorial - Enabling Tracing for a Python Application and Datadog Agent in Containers][5].

#### Profiling
The profiler is shipped within the `dd-trace-py` library. If you are already using APM to collect traces for your application, you can skip installing the library and proceed to enabling the profiler. See [Enabling the Python Profiler][7].

#### Metrics
The `dd-trace-py` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container.

To set up logging in your application, see [Python Log Collection][3]. [Python Logging Best Practices][6] can also be helpful. To set up trace log correlation, see [Correlating Python Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/python
[4]: /tracing/other_telemetry/connect_logs_and_traces/python
[5]: /tracing/guide/tutorial-enable-python-containers/
[6]: https://www.datadoghq.com/blog/python-logging-best-practices/
[7]: https://docs.datadoghq.com/profiler/enabling/python

{{% /tab %}}
{{% tab "Java" %}}
#### Tracing
   Download `dd-java-agent.jar`, which contains the latest tracer class files, to a folder that is accessible by your Datadog user.

   When setting up your [containers](#containers); Implement and [Auto instrument][1] the Java tracer by setting the environment variable to instrument your Java cloud function with the Datadog Java tracer.

| Name      | Value |
|-----------| ----- |
| `JAVA_TOOL_OPTIONS` | `-javaagent:/path/to/dd-java-agent.jar` |

   Cloud Run function code runs with a classpath that includes the function code and its dependencies.
   If you are [invoking the Functions Framework directly](https://github.com/GoogleCloudPlatform/functions-framework-java?tab=readme-ov-file#function-classpath) with the Datadog Agent, update the `--classpath` and `--target` options, along with the Java agent flag to the path of your jar files:

   To run your app from an IDE, Maven, or Gradle application script, or `java -javaagent` command, add the `-javaagent` JVM argument and the following configuration options, as applicable:
   ```shell
    java -javaagent:dd-java-agent.jar -jar java-function-invoker \
    --classpath 'FUNCTION_JAR' \
    --target 'FUNCTION_TARGET'
   ```
   - Replace `FUNCTION_JAR`  with the target JAR generated from the Maven build, including all dependencies.
   - Replace `FUNCTION_TARGET`  with the function's entry point (for example, `gcfv2.HelloworldApplication`).
   - **NOTE:** You will also need to download the `java-function-invoker.jar` from the [Maven repository](https://search.maven.org/artifact/com.google.cloud.functions.invoker/java-function-invoker) to run your Java function locally in your terminal.

   To deploy the Java function in your terminal, run the following [gcloud command](https://cloud.google.com/run/docs/deploy-functions#deploy-functions) from the top-level source directory:
   ```shell
     gcloud run deploy FUNCTION_NAME \
     --source . \
     --function FUNCTION_TARGET \
     --base-image BASE_IMAGE \
     --region REGION
   ```
   - Replace `REGION` with the region where you want to deploy the function.
   - Replace `FUNCTION_TARGET` with your function entry point. For example, `gcfv2.HelloworldApplication`.
   - Replace `FUNCTION_NAME` with the name of your Cloud Run function.
   - Replace `BASE_IMAGE` with the base image for the function. For example, `java21`.

   <div class="alert alert-info">
   As an alternative to setting the environment variable <code>JAVA_TOOL_OPTIONS</code> in the console, you can use Artifact Registry to store the images built from your function source code utilizing the example Dockerfile. You can use <a href="https://cloud.google.com/docs/buildpacks/build-function#java_4">Google Cloud Build</a> or <a href="https://cloud.google.com/docs/buildpacks/build-function">Buildpacks</a> to build and deploy your image.<br/>
   For example: <code>gcloud builds submit --pack image=LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME</code>
   </div>

#### Profiling
The profiler is shipped within the `dd-java-agent` library. If you are already using APM to collect traces for your application, you can skip installing the library and proceed to enabling the profiler. See [Enabling the Java Profiler][6].

#### Metrics
To collect custom metrics, [install the Java DogStatsD client][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container.

To set up logging in your application, see [Java Log Collection][3]. To set up trace log correlation, see [Correlating Java Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /developers/dogstatsd/?tab=hostagent&code-lang=java#install-the-dogstatsd-client
[3]: /logs/log_collection/java/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/java
[5]: https://cloud.google.com/sdk/gcloud/reference/beta/run/deploy#--clear-base-image
[6]: https://docs.datadoghq.com/profiler/enabling/java?tab=datadogprofiler

{{% /tab %}}
{{% tab "Go" %}}
#### Tracing

In your main application, add the `dd-trace-go` library. See [Tracing Go Applications][1] for instructions.

#### Profiling
The profiler is shipped within the `dd-trace-go` library. If you are already using APM to collect traces for your application, you can skip installing the library and proceed to enabling the profiler. See [Enabling the Go Profiler][5].

#### Metrics
The `dd-trace-go` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container.

To set up logging in your application, see [Go Log Collection][3]. To set up trace log correlation, see [Correlating Go Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/go
[4]: /tracing/other_telemetry/connect_logs_and_traces/go
[5]: https://docs.datadoghq.com/profiler/enabling/go

{{% /tab %}}
{{% tab ".NET" %}}
#### Tracing

In your main application, add the `dd-trace-dotnet` library. See [Tracing .NET Applications][1] for instructions.

#### Profiling
The profiler is shipped within the `dd-trace-dotnet` library. If you are already using APM to collect traces for your application, you can skip installing the library and proceed to enabling the profiler. See [Enabling the .NET Profiler][5].

#### Metrics
The `dd-trace-dotnet` library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. During the [container step](#containers), add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared volume mount to both the main and sidecar container.
To set up logging in your application, see [C# Log Collection][3]. To set up trace log correlation, see [Correlating .NET Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux#enable-the-tracer-for-your-service
[2]: https://www.datadoghq.com/blog/statsd-for-net-dogstatsd/
[3]: /log_collection/csharp/?tab=serilog
[4]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/?tab=serilog
[5]: https://docs.datadoghq.com/profiler/enabling/dotnet?tab=nuget

{{% /tab %}}
{{< /tabs >}}

### Containers

If you are deploying a new Cloud Run function for the first time through the console, wait for Cloud Run to create the service and update the placeholder revision image. Then, follow the steps below to add the sidecar container, shared volume mount, startup check, and environment variables.

#### Sidecar container

1. In Cloud Run, select **Edit & Deploy New Revision**.
1. At the bottom of the page, select **Add Container**.
1. For **Container image URL**, select `gcr.io/datadoghq/serverless-init:latest`.
1. Go to **Volume Mounts** and set up a volume mount for logs. Ensure that the mount path matches your application's write location. For example:
   {{< img src="serverless/gcr/volume_mount.png" width="80%" alt="Volume Mounts tab. Under Mounted volumes, Volume Mount 1. For Name 1, 'shared-logs (In-Memory)' is selected. For Mount path 1, '/shared-volume' is selected.">}}
1. Go to **Settings** and add a startup check.
   - **Select health check type**: Startup check
   - **Select probe type**: TCP
   - **Port**: Enter a port number. Make note of this, as it is used in the next step.
1. Go to **Variables & Secrets** and add the following Required environment variables as name-value pairs:
   - `DD_SERVICE`: A name for your service. For example, `gcr-sidecar-test`.
   - `DD_ENV`: A name for your environment. For example, `dev`.
   - `DD_SERVERLESS_LOG_PATH`: Your log path. For example, `/shared-volume/logs/*.log`.
   - `DD_API_KEY`: Your [Datadog API key][4].
   - `DD_HEALTH_PORT`: The port you selected for the startup check in the previous step.
   - `FUNCTION_TARGET`: The entry point of your function. For example, `gcfv2.HelloworldApplication`.
   - `JAVA_TOOL_OPTIONS`: `-javaagent:/path/to/dd-java-agent.jar` (_Java only_).

   For a list of all environment variables, including additional tags, see [Environment variables](#environment-variables).

#### Main container

1. Go to **Volume Mounts** and add the same shared volume as you did for the sidecar container.
   **Note**: Save your changes by selecting **Done**. Do not deploy changes until the final step.
1. Go to **Variables & Secrets** and add the same `DD_SERVICE` environment variable that you set for the sidecar container.
1. Go to **Settings**. In the **Container start up order** drop-down menu, select your sidecar.
1. Deploy your main application.

#### Add a service label in Google Cloud

In your Cloud Run service's info panel, add a label with the following key and value:

| Key      | Value                                                       |
|-----------|-------------------------------------------------------------|
| `service` | The name of your service. Matches the value provided as the `DD_SERVICE` environment variable. |

See [Configure labels for services][15] in the Cloud Run documentation for instructions.

## Environment variables

| Variable         | Description                                                                                                                                                                 |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_API_KEY`     | [Datadog API key][4] - **Required**                                                                                                                                         |
| `DD_SITE`        | [Datadog site][5] - **Required**                                                                                                                                            |
| `FUNCTION_TARGET`   | The entry point of your function - **Required**                                                                                                                             |
| `DD_SERVICE`     | See [Unified Service Tagging][13] - **Required**                                                                                                                            |
| `DD_LOGS_INJECTION` | Enrich all logs with trace data for supported loggers in [Java][6], [Node][7], [.NET][8], and [PHP][9]. See additional docs for [Python][10], [Go][11], and [Ruby][12]. |
| `DD_VERSION`     | See [Unified Service Tagging][13].                                                                                                                                          |
| `DD_ENV`         | See [Unified Service Tagging][13].                                                                                                                                          |
| `DD_SOURCE`      | See [Unified Service Tagging][13].                                                                                                                                          |
| `DD_TAGS`        | See [Unified Service Tagging][13].                                                                                                                                          |

Do not use the `DD_LOGS_ENABLED` environment variable. This variable is only used for [in-container container instrumentation][14].

You can also find `FUNCTION_TARGET` on the source tab inside Google console: `Function entry point`.

## Example application

The following examples contain a single app with tracing, metrics, and logs set up.

{{< tabs >}}
{{% tab "Node.js" %}}

```js
// This line must come before importing the logger.
const tracer = require('dd-trace').init({
  logInjection: true
});

const functions = require('@google-cloud/functions-framework');
const { createLogger, format, transports } = require('winston');
const fs = require('fs');

// Create a directory
const directoryPath = '/shared-volume/logs';
fs.mkdir(directoryPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Directory created successfully!');
});

// Create a file inside the directory
const filePath = directoryPath + '/index.log';
console.log('Directory created successfully!' + filePath);

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.File({ filename: filePath }),
  ],
});


function handler(req, res) {
  logger.log('info', 'Hello simple log!');
  tracer.dogstatsd.increment('ninja.run.func.sent', 1, { environment: 'test', runtime: 'nodejs' });
  return res.send('Welcome to Datadog 💜!');
}

const handlerWithTrace = tracer.wrap('example-span', handler)
functions.http('httpexample',  handlerWithTrace)

module.exports = handlerWithTrace
module.exports = logger;
```
#### package.json
```json
{
  "name": "updater",
  "version": "1.0.0",
  "description": "test nodejs run function",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.4.2",
    "dd-trace": "^5.19.0",
    "winston": "^3.13.1",
    "express": "^4.17.1"
  }
}
```
{{% /tab %}}
{{% tab "Python" %}}
```python
import functions_framework
import ddtrace
import logging
from datadog import initialize, statsd
import os

ddtrace.patch(logging=True)
file_path = "/shared-volume/logs/app.log" # This is the path to the shared volume
os.makedirs(os.path.dirname(file_path), exist_ok=True)
FORMAT = ('%(asctime)s %(levelname)s [%(name)s] [%(filename)s:%(lineno)d] '
          '[dd.service=%(dd.service)s dd.env=%(dd.env)s dd.version=%(dd.version)s dd.trace_id=%(dd.trace_id)s dd.span_id=%(dd.span_id)s] '
          '- %(message)s')

logging.basicConfig(level=logging.DEBUG, filename=file_path, format=FORMAT, force=True)
ddlogs = []
initialize(**{'statsd_port': 8125})

@ddtrace.tracer.wrap()
@functions_framework.http
def hello_http(request):
  log = request.args.get("log")
  statsd.increment("ninja.run.func.sent", tags=["runtime:python"])
  if log != None:
    with ddtrace.tracer.trace('sending-test-logs') as span:
      span.set_tag('logs', 'TEST')
      logging.debug(log)
      ddlogs.append(log)
  return "Welcome to Datadog!💜"
```
#### requirements.txt
```txt
Flask
functions-framework
ddtrace
datadog
```
{{% /tab %}}
{{% tab "Java" %}}
#### HelloworldApplication.java
```java
package gcfv2;

import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;

import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class HelloworldApplication implements HttpFunction {
  private static final StatsDClient Statsd = new NonBlockingStatsDClientBuilder().hostname("localhost").build();
  protected static final Logger logger4 = LogManager.getLogger();

  public static void createLogFile() {
    File directory = new File("shared-volume/logs");
    if (!directory.exists()) {
      directory.mkdirs(); // Create directory if it doesn't exist
    }
    else {
      try {
        File logFile = new File("shared-volume/logs/app.log");
        if (!logFile.exists()){
          logFile.createNewFile();
        }
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  public void service(final HttpRequest request, final HttpResponse response) throws Exception {
    createLogFile();
    Statsd.incrementCounter("ninja.run.func.sent");
    final BufferedWriter writer = response.getWriter();
    logger4.info("Hello GCP!");
    writer.write("Hello Datadog!!");
  }
}
```

#### Pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>functions</groupId>
  <artifactId>functions-hello-world</artifactId>
  <version>1.0.0-SNAPSHOT</version>

  <dependencyManagement>
    <dependencies>
      <dependency>
        <artifactId>libraries-bom</artifactId>
        <groupId>com.google.cloud</groupId>
        <scope>import</scope>
        <type>pom</type>
        <version>26.32.0</version>
      </dependency>
    </dependencies>
  </dependencyManagement>

  <properties>
    <maven.compiler.target>17</maven.compiler.target>
    <maven.compiler.source>17</maven.compiler.source>
  </properties>

  <dependencies>
    <!-- Required for Function primitives -->
    <dependency>
      <groupId>com.google.cloud.functions</groupId>
      <artifactId>functions-framework-api</artifactId>
      <version>1.1.4</version>
    </dependency>
    <dependency>
      <groupId>com.google.cloud.functions.invoker</groupId>
      <artifactId>java-function-invoker</artifactId>
      <version>1.4.0</version>
    </dependency>
    <dependency>
      <groupId>com.datadoghq</groupId>
      <artifactId>java-dogstatsd-client</artifactId>
      <version>4.4.3</version>
    </dependency>
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-api</artifactId>
      <version>2.19.0</version>
    </dependency>
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-core</artifactId>
      <version>2.19.0</version>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <!--
          Google Cloud Functions Framework Maven plugin

          This plugin allows you to run Cloud Functions Java code
          locally. Use the following terminal command to run a
          given function locally:

          mvn function:run -Drun.functionTarget=your.package.yourFunction
        -->
        <groupId>com.google.cloud.functions</groupId>
        <artifactId>function-maven-plugin</artifactId>
        <version>0.11.0</version>
        <configuration>
          <functionTarget>functions.HelloWorld</functionTarget>
        </configuration>
      </plugin>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-shade-plugin</artifactId>
        <version>3.2.4</version>
        <executions>
          <execution>
            <phase>package</phase>
            <goals>
              <goal>shade</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
````

#### Dockerfile

```dockerfile
# Download Datadog Java Agent
FROM maven:3.8.3-openjdk-17 AS build

# Set working directory
WORKDIR /

# Download the required Maven dependency
RUN mvn dependency:get -Dartifact=com.google.cloud.functions.invoker:java-function-invoker:1.4.0 \
    && mvn dependency:copy -Dartifact=com.google.cloud.functions.invoker:java-function-invoker:1.4.0 -DoutputDirectory=/

FROM openjdk:17-jdk

# Set the working directory in the container
WORKDIR /
ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar
COPY --from=build java-function-invoker-1.4.0.jar java-function-invoker.jar

# Copy the JAR file into the container
COPY target/functions-hello-world-1.0.0-SNAPSHOT.jar helloworld.jar
ENV JAVA_OPTS=-javaagent:dd-java-agent.jar

# Expose the port (Cloud Run automatically assigns the actual port via $PORT)
ENV PORT=8080
EXPOSE 8080 8125/udp

ENTRYPOINT ["java","-javaagent:/dd-java-agent.jar", "-jar", "/java-function-invoker.jar","--classpath", "/helloworld.jar","--target", "functions.HelloWorld"]

```
{{% /tab %}}

{{% tab "Go" %}}
```go
package helloworld

import (
  "fmt"
  "github.com/sirupsen/logrus"
  dd_logrus "github.com/DataDog/dd-trace-go/contrib/sirupsen/logrus/v2"
  "html/template"
  "net/http"
  "os"
  "path/filepath"

  "github.com/DataDog/datadog-go/v5/statsd"
  "github.com/GoogleCloudPlatform/functions-framework-go/functions"
  "github.com/DataDog/dd-trace-go/v2/ddtrace"
  "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

const logDir = "/shared-volume/logs"
var ddlogs []string
var logFile *os.File
var logCounter int

var dogstatsdClient *statsd.Client
const homeTemplate = `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Datadog Test</title>
</head>
<body>
    <h1>Welcome to Datadog!💜</h1>
    <form action="" method="get">
        <input type="text" name="log" placeholder="Enter Log">
        <button>Add Log</button>
    </form>
    <h3>Logs Sent to Datadog:</h3>
    <ul>
    {{range .}}
        <li>{{.}}</li>
    {{end}}
    </ul>
</body>
`

func init() {
  logrus.SetFormatter(&logrus.JSONFormatter{})
  logrus.AddHook(&dd_logrus.DDContextLogHook{})
  err := os.MkdirAll(logDir, 0755)
  if err != nil {
    panic(err)
  }
  logFilePath := filepath.Join(logDir, "maincontainer.log")
  logrus.Println("Saving logs in ", logFilePath)
  logFileLocal, err := os.OpenFile(logFilePath, os.O_WRONLY|os.O_APPEND|os.O_CREATE, 0644)
  if err != nil {
    panic(err)
  }

  logrus.SetOutput(logFileLocal)
  logFile = logFileLocal

  logrus.Print("Main container started...")
  dogstatsdClient, err = statsd.New("127.0.0.1:8125")
  if err != nil {
    panic(err)
  }

  tracer.Start()
  functions.HTTP("HelloHTTP", helloHTTP)
}

// helloHTTP is an HTTP Cloud Function with a request parameter.
func helloHTTP(w http.ResponseWriter, r *http.Request) {
  span := tracer.StartSpan("maincontainer", tracer.ResourceName("/helloHTTP"))
  logrus.Printf("Yay!! Main container works %v", span)
  err := dogstatsdClient.Incr("ninja.run.func.sent", []string{"runtime:go"}, 1)
  if err != nil {
    logrus.Error("Error incrementing counter:", err)
  }
  defer span.Finish()
  sent_log := r.URL.Query().Get("log")
  if sent_log != "" {
    logCounter++
    writeLogsToFile(fmt.Sprintf("received request %d", logCounter), span.Context())
    writeLogsToFile(sent_log, span.Context())
    ddlogs = append(ddlogs, sent_log)
  }

  tmpl, err := template.New("home").Parse(homeTemplate)
  if err != nil {
    logrus.Error("Error parsing template:", err)
  }
  tmpl.Execute(w, ddlogs)
}

func writeLogsToFile(log_msg string, context ddtrace.SpanContext) {
  span := tracer.StartSpan(
    "writeLogToFile",
    tracer.ResourceName("/writeLogsToFile"),
    tracer.ChildOf(context))
  defer span.Finish()
  _, err := logFile.WriteString(log_msg + "\n")
  if err != nil {
    logrus.Println("Error writing to log file:", err)
  }
}
```
#### go.mod
```go
module example.com/gcf

require (
	github.com/DataDog/datadog-go/v5 v5.5.0
	github.com/GoogleCloudPlatform/functions-framework-go v1.9.0
	github.com/sirupsen/logrus v1.9.3
	github.com/DataDog/dd-trace-go/v2 v2.0.0
)
```
{{% /tab %}}

{{% tab ".NET" %}}
```csharp
using Google.Cloud.Functions.Framework;
using StatsdClient;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Datadog.Trace;
using Serilog;
using Serilog.Formatting.Compact;
using Serilog.Sinks.File;

namespace HelloHttp;

public class Function : IHttpFunction
{
   public DogStatsdService _dsd;

   public Function() {
        var dogstatsdConfig = new StatsdConfig
       {
           StatsdServerName = "127.0.0.1",
           StatsdPort = 8125,
       };

       _dsd = new DogStatsdService();
       _dsd.Configure(dogstatsdConfig);

        string directoryPath = "/shared-volume/logs";
        string filePath = Path.Combine(directoryPath, "app.log");
               // Create the directory if it doesn't exist
        if (!Directory.Exists(directoryPath))
        {
            Directory.CreateDirectory(directoryPath);
        }

        // Create a file if it doesn't exist
        if (!File.Exists(filePath))
        {
            File.WriteAllText(filePath, "Hello, this is the content of the file.");
        }
       Log.Logger = new LoggerConfiguration()
           .WriteTo.File(new RenderedCompactJsonFormatter(), "/shared-volume/logs/app.log")
           .CreateLogger();
   }

   public async Task HandleAsync(HttpContext context)
   {
       using (var scope = Tracer.Instance.StartActive("test-function-dotnet"))
       {
           _dsd.Increment("ninja.run.func.sent", tags: new[] {"runtime:dotnet"});
           Log.Information("Hello Datadog Cloud Run Functions! 💜");
           await context.Response.WriteAsync("Hello Datadog Cloud Run Functions! 💜");
       }
   }
}

```
#### HelloHttp.csproj
```csproj
<Project Sdk="Microsoft.NET.Sdk">
 <PropertyGroup>
   <OutputType>Exe</OutputType>
   <TargetFramework>net8.0</TargetFramework>
 </PropertyGroup>

 <ItemGroup>
   <PackageReference Include="Google.Cloud.Functions.Hosting" Version="2.0.0" />
   <PackageReference Include="Datadog.Trace.Bundle" Version="2.56.0" />
   <PackageReference Include="StatsdClient" Version="2.0.68" />
   <PackageReference Include="DogStatsD-CSharp-Client" Version="8.0.0" />
    <PackageReference Include="Serilog" Version="4.1.0" />
    <PackageReference Include="Serilog.Formatting.Compact" Version="3.0.0" />
    <PackageReference Include="Serilog.Sinks.File" Version="6.0.0" />
 </ItemGroup>
</Project>
```
{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /integrations/google_cloud_platform/#log-collection
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://hub.docker.com/r/datadog/serverless-init
[4]: /account_management/api-app-keys/#api-keys
[5]: /getting_started/site/
[6]: /tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2
[7]: /tracing/other_telemetry/connect_logs_and_traces/nodejs
[8]: /tracing/other_telemetry/connect_logs_and_traces/dotnet?tab=serilog
[9]: /tracing/other_telemetry/connect_logs_and_traces/php
[10]: /tracing/other_telemetry/connect_logs_and_traces/python
[11]: /tracing/other_telemetry/connect_logs_and_traces/go
[12]: /tracing/other_telemetry/connect_logs_and_traces/ruby
[13]: /getting_started/tagging/unified_service_tagging/
[14]: /serverless/google_cloud_run/containers/in_container/
[15]: https://cloud.google.com/run/docs/configuring/services/labels
[16]: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions
