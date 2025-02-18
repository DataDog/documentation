---
title: Google Cloud Run Functions
further_reading:

  - link: 'https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions'
    tag: 'Blog'
    text: 'Cloud Functions is now Cloud Run functions — event-driven programming in one unified serverless platform'

---

## Overview

Google Cloud Run is a fully managed serverless platform for deploying and scaling container-based applications. Datadog provides monitoring and log collection for Cloud Run functions ([formerly Cloud Functions][1]) through the [Google Cloud integration][1].

<div class="alert alert-info">Datadog Serverless Monitoring is supported for Cloud Run functions (2nd gen). If you want to monitor 1st gen functions, contact your technical account manager.</div>

[1]: https://cloud.google.com/blog/products/serverless/google-cloud-functions-is-now-cloud-run-functions

## Setup

### Application

{{< tabs >}}
{{% tab "Node.js" %}}
#### Tracing

In your main application, add the `dd-trace-js` library. See [Tracing Node.js applications][1] for instructions.

Set `ENV NODE_OPTIONS="--require dd-trace/init"`. This specifies that the `dd-trace/init` module is required when the Node.js process starts.

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. You must follow the setup in the GCP UI to add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared Volume Mount to both the main and sidecar container.

To set up logging in your application, see [Node.js Log Collection][3]. To set up trace log correlation, see [Correlating Node.js Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#getting-started
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/nodejs/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/nodejs

{{% /tab %}}
{{% tab "Python" %}}
#### Tracing

In your main application, add the `dd-trace-py` library. See [Tracing Python Applications][1] for instructions. You can also use [Tutorial - Enabling Tracing for a Python Application and Datadog Agent in Containers][5].

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. You must follow the setup in the GCP UI to add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared Volume Mount to both the main and sidecar container.

To set up logging in your application, see [Python Log Collection][3]. [Python Logging Best Practices][6] can also be helpful. To set up trace log correlation, see [Correlating Python Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/python
[4]: /tracing/other_telemetry/connect_logs_and_traces/python
[5]: /tracing/guide/tutorial-enable-python-containers/
[6]: https://www.datadoghq.com/blog/python-logging-best-practices/

{{% /tab %}}
{{% tab "Java" %}}
#### Tracing
If you are deploying a Java Cloud Run Function through the console wait for Cloud Run to create the service using a placeholder revision to add the sidecar container, and the follow the steps below including the shared volume mount:

In your main application, add the `dd-trace-java` library. Follow the instructions in [Tracing Java Applications][1] or use the following example Dockerfile to add and start the tracing library with automatic instrumentation:

{{< code-block lang="dockerfile" filename="Dockerfile"  collapsible="true" >}}
FROM openjdk:17-jdk

# Set the working directory in the container
WORKDIR /
ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar

# Copy the JAR file into the container
COPY target/helloworld-0.0.1-SNAPSHOT.jar helloworld.jar
ENV JAVA_OPTS=-javaagent:dd-java-agent.jar

CMD ["java", "-javaagent:dd-java-agent.jar", "-jar", "helloworld.jar"]
{{< /code-block >}}

#### Metrics
To collect custom metrics, [install the Java DogStatsD client][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. You must follow the setup in the GCP UI to add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared Volume Mount to both the main and sidecar container.

To set up logging in your application, see [Java Log Collection][3]. To set up trace log correlation, see [Correlating Java Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#getting-started
[2]: /developers/dogstatsd/?tab=hostagent&code-lang=java#install-the-dogstatsd-client
[3]: /logs/log_collection/java/?tab=winston30
[4]: /tracing/other_telemetry/connect_logs_and_traces/java

{{% /tab %}}
{{% tab "Go" %}}
#### Tracing

In your main application, add the `dd-trace-go` library. See [Tracing Go Applications][1] for instructions.

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. You must follow the setup in the GCP UI to add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared Volume Mount to both the main and sidecar container.

To set up logging in your application, see [Go Log Collection][3]. To set up trace log correlation, see [Correlating Go Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go/
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/#code-examples
[3]: /logs/log_collection/go
[4]: /tracing/other_telemetry/connect_logs_and_traces/go
{{% /tab %}}
{{% tab ".NET" %}}
#### Tracing

In your main application, add the .NET tracing library. See [Tracing .NET Applications][1] for instructions.

#### Metrics
The tracing library also collects custom metrics. See the [code examples][2].

#### Logs
The Datadog sidecar collects logs through a shared volume. To forward logs from your main container to the sidecar, configure your application to write all logs to a location such as `shared-volume/logs/*.log` using the steps below. You must follow the setup in the GCP UI to add the environment variable `DD_SERVERLESS_LOG_PATH` and a shared Volume Mount to both the main and sidecar container.
To set up logging in your application, see [C# Log Collection][3]. To set up trace log correlation, see [Correlating .NET Logs and Traces][4].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core/?tab=linux#enable-the-tracer-for-your-service
[2]: https://www.datadoghq.com/blog/statsd-for-net-dogstatsd/
[3]: /log_collection/csharp/?tab=serilog
[4]: /tracing/other_telemetry/connect_logs_and_traces/dotnet/?tab=serilog
{{% /tab %}}
{{< /tabs >}}

### Containers
{{< tabs >}}
{{% tab "GCR UI - Node.js, Python, Go, .NET" %}}

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
   - `DD_API_KEY`: Your [Datadog API key][1].
   - `DD_HEALTH_PORT`: The port you selected for the startup check in the previous step.

   For a list of all environment variables, including additional tags, see [Environment variables](#environment-variables).

#### Main container

1. Go to **Volume Mounts** and add the same shared volume as you did for the sidecar container.
   **Note**: Save your changes by selecting **Done**. Do not deploy changes until the final step.
1. Go to **Variables & Secrets** and add the same `DD_SERVICE` environment variable that you set for the sidecar container.
1. Go to **Settings**. In the **Container start up order** drop-down menu, select your sidecar.
1. Deploy your main application.

[1]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Java" %}}

If you are using Java, you must use the [gcloud CLI][1] to deploy your function. If you are deploying a Java Cloud Run Function
through the console wait for Cloud Run to create the service using a placeholder revision to add the sidecar container, and the steps above including the shared volume mount:

#### Locally inside Source Code Directory
1. Add the `dd-java-agent` jar and other dependencies like `java-dogstatsd-client` to your pom.xml.
   - Use the example Dockerfile and Pom.xml to add and start the tracing library with automatic instrumentation.
2. Run `mvn clean package` to update the `target` directory with the new jar utilized inside the dockerfile
   - Cloud Run functions uses Artifact Registry to store the images built from your function source code if you do not want to utliized the provided Dockerfile:
     - You can build a container image and deploy it to Cloud Run using the [Google Cloud Build][3]
     - Alternatively you can build the container image and deploy it to Cloud Run using the [Google Cloud Buildpacks][4]
       ```shell
       gcloud builds submit --pack image=LOCATION-docker.pkg.dev/PROJECT_ID/REPO_NAME/IMAGE_NAME
       ```
3. Deploy the Java function by running the following command in the top level directory that contains the Java pom.xml and dockerfile:
    ```shell
      gcloud beta run deploy FUNCTION_NAME \
      --source . \
      --function FUNCTION_TARGET \
      --clear-base-image \
      --region REGION
    ```
   ***Note***: Replace `REGION`, `FUNCTION_TARGET`, and `FUNCTION_NAME` with the region where you want to deploy the function.
You need to set the [--clear-base-image][5] to deploy your cloud function with the dockerfile
4. Follow the steps below to **finish the setup inside the console** make sure your container image is the same as what you just deployed.
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
  - `DD_SERVICE`: A name for your service. For example, `gcrfx-sidecar-test`.
  - `DD_ENV`: A name for your environment. For example, `dev`.
  - `DD_SERVERLESS_LOG_PATH`: Your log path. For example, `/shared-volume/logs/*.log`.
  - `DD_API_KEY`: Your [Datadog API key][1].
  - `DD_HEALTH_PORT`: The port you selected for the startup check in the previous step. For example, `12345`.

   For a list of all environment variables, including additional tags, see [Environment variables](#environment-variables).

#### Main container

1. Go to **Volume Mounts** and add the same shared volume as you did for the sidecar container.
   **Note**: Save your changes by selecting **Done**. Do not deploy changes until the final step.
1. Go to **Variables & Secrets** and add the same `DD_SERVICE` environment variable that you set for the sidecar container.
1. Go to **Settings**. In the **Container start up order** drop-down menu, select your sidecar.
1. Deploy your main application.

[1]: https://cloud.google.com/sdk/gcloud/reference/beta/functions/deploy
[2]:https://cloud.google.com/run/docs/quickstarts/functions/deploy-functions-gcloud#java
[3]:https://cloud.google.com/functions/docs/building
[4]:https://cloud.google.com/docs/buildpacks/build-function#java_4
[5]:https://cloud.google.com/sdk/gcloud/reference/beta/run/deploy#--clear-base-image

{{% /tab %}}
{{< /tabs >}}

## Environment variables

| Variable | Description                                                                                                                                                                        |
| -------- |------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`DD_API_KEY`| [Datadog API key][4] - **Required**                                                                                                                                                |
| `DD_SITE` | [Datadog site][5] - **Required**                                                                                                                                                   |
| `DD_LOGS_INJECTION`| When true, enrich all logs with trace data for supported loggers in [Java][6], [Node][7], [.NET][8], and [PHP][9]. See additional docs for [Python][10], [Go][11], and [Ruby][12]. |
| `DD_SERVICE`      | See [Unified Service Tagging][13] - **Required**                                                                                                                                               |
| `DD_VERSION`      | See [Unified Service Tagging][13].                                                                                                                                                 |
| `DD_ENV`          | See [Unified Service Tagging][13].                                                                                                                                                 |
| `DD_SOURCE`       | See [Unified Service Tagging][13].                                                                                                                                                 |
| `DD_TAGS`         | See [Unified Service Tagging][13].                                                                                                                                                 |

Do not use the `DD_LOGS_ENABLED` environment variable. This variable is only used for the [serverless-init][14] install method.

## Example application

The following example contains a single app with tracing, metrics, and logs set up.

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
  tracer.dogstatsd.increment('test.run.func.sent', 1, { environment: 'test', runtime: 'nodejs' });
  return res.send('Welcome to Datadog 💜!');
}

const handlerWithTrace = tracer.wrap('example-span', handler)
functions.http('httpexample',  handlerWithTrace)

module.exports = handlerWithTrace
module.exports = logger;
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
  statsd.increment("test.run.func.sent", tags=["runtime:python"])
  if log != None:
    with ddtrace.tracer.trace('sending-test-logs') as span:
      span.set_tag('logs', 'TEST')
      logging.debug(log)
      ddlogs.append(log)
  return "Welcome to Datadog!💜"
```
{{% /tab %}}
{{% tab "Java" %}}
### HelloworldApplication.java
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
      System.out.println("Working Directory =: " + directory.getAbsolutePath() +"\n"+ directory.list());
    }
    else {
      try {
        File logFile = new File("shared-volume/logs/app.log");
        if (!logFile.exists()){
          logFile.createNewFile();
          System.out.println("File didn't exists: " + System.getProperty("user.dir"));
        }
      } catch (IOException e) {
        System.out.println("Failed to write to file: " + System.getProperty("user.dir"));
        e.printStackTrace();
      }
    }
  }

  public void service(final HttpRequest request, final HttpResponse response) throws Exception {
    createLogFile();
    Statsd.incrementCounter("test.run.func.v2");
    System.out.println("Current Directory: " + System.getProperty("user.dir"));
    final BufferedWriter writer = response.getWriter();
    logger4.info("Hello GCP!");
    logging.info("HeLLLLPPPPPPP");
    writer.write("Hello Datadog!!");
  }
}
```
### Pom.xml
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>

  <groupId>com.example.functions</groupId>
  <artifactId>functions-hello-world</artifactId>
  <version>1.0.0-SNAPSHOT</version>
  <properties>
    <maven.compiler.target>11</maven.compiler.target>
    <maven.compiler.source>11</maven.compiler.source>
  </properties>

  <dependencies>
    <!-- Required for Function primitives -->
    <dependency>
      <groupId>com.google.cloud.functions</groupId>
      <artifactId>functions-framework-api</artifactId>
      <version>1.1.0</version>
      <scope>provided</scope>
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
        <artifactId>maven-antrun-plugin</artifactId>
        <version>1.8</version>
        <executions>
          <execution>
            <phase>package</phase>
            <configuration>
              <tasks>
                <get src="https://dtdg.co/latest-java-tracer" dest="dd-java-agent.jar" />
              </tasks>
            </configuration>
            <goals>
              <goal>run</goal>
            </goals>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
</project>
````
### Dockerfile
```dockerfile
FROM openjdk:17-jdk

# Set the working directory in the container
WORKDIR /
ADD 'https://dtdg.co/latest-java-tracer' dd-java-agent.jar

# Copy the JAR file into the container
COPY target/helloworld-0.0.1-SNAPSHOT.jar helloworld.jar
ENV JAVA_OPTS=-javaagent:dd-java-agent.jar

CMD ["java", "-javaagent:dd-java-agent.jar", "-jar", "helloworld.jar"]
```
{{% /tab %}}

{{% tab "Go" %}}
```go
package helloworld

import (
  "fmt"
  "github.com/sirupsen/logrus"
  dd_logrus "gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus"
  "html/template"
  "net/http"
  "os"
  "path/filepath"

  "github.com/DataDog/datadog-go/v5/statsd"
  "github.com/GoogleCloudPlatform/functions-framework-go/functions"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
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
  err := dogstatsdClient.Incr("test.run.func.sent", []string{"runtime:go"}, 1)
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
           _dsd.Increment("test.run.func.sent", tags: new[] {"runtime:dotnet"});
           Log.Information("Hello Datadog Cloud Run Functions! 💜");
           await context.Response.WriteAsync("Hello Datadog Cloud Run Functions! 💜");
       }
   }
}

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
[14]: /serverless/guide/gcr_serverless_init
