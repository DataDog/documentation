---
title: Instrumenting 1st Gen Cloud Run Functions
---

## Overview

This page explains how to collect traces, trace metrics, runtime metrics, and custom metrics from your Cloud Run functions (1st gen), previously known as Cloud Functions.

<div class="alert alert-danger">
<strong>Migrating to 2nd gen Cloud Run functions</strong> 
<br/>
Datadog recommends using 2nd gen <a href="/serverless/google_cloud_run/functions">Cloud Run functions</a>, which offer improved performance, better scaling, and better monitoring with Datadog.
<br/><br/>
Google has integrated Cloud Run functions into the Cloud Run UI. Starting August 2025, creating 1st gen functions will only be possible using the Google Cloud CLI, API, or Terraform. Datadog recommends upgrading your Cloud Run function for more features and Datadog support.
</div>

<div class="alert alert-info">
<strong>Have you set up your <a href="/integrations/google-cloud-platform/">Google Cloud integration</a>?</strong> Datadog recommends setting up the integration, which collects metrics and logs from Google Cloud services, before proceeding on to instrumentation. Remember to add the <code>cloud asset viewer</code> role to your service account and enable the Cloud Asset Inventory API in Google Cloud.
</div>


## Setup

{{< programming-lang-wrapper langs="nodejs,python,java,go" >}}
{{< programming-lang lang="nodejs" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog recommends pinning the package versions and regularly upgrading to the latest versions of both `@datadog/serverless-compat` and `dd-trace` to ensure you have access to enhancements and bug fixes.

   For more information, see [Tracing Node.js Applications][1].


2. **Start the Datadog serverless compatibility layer and initialize the Node.js tracer**. Add the following lines to your main application entry point file (for example, `app.js`):

   ```js
   require('@datadog/serverless-compat').start();

   // This line must come before importing any instrumented module.
   const tracer = require('dd-trace').init()
   ```

3. (Optional) **Enable runtime metrics**. See [Node.js Runtime Metrics][2].

4. (Optional) **Enable custom metrics**. See [Metric Submission: DogStatsD][3].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs
[2]: /tracing/metrics/runtime_metrics/?tab=nodejs
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog recommends using the latest versions of both `datadog-serverless-compat` and `ddtrace` to ensure you have access to enhancements and bug fixes.

   For more information, see [Tracing Python Applications][1].


2. **Initialize the Datadog Python tracer and serverless compatibility layer**. Add the following lines to your main application entry point file:

   ```python
   from datadog_serverless_compat import start
   from ddtrace import tracer, patch_all

   start()
   patch_all()
   ```

3. (Optional) **Enable runtime metrics**. See [Python Runtime Metrics][2].

4. (Optional) **Enable custom metrics**. See [Metric Submission: DogStatsD][3].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/python
[2]: /tracing/metrics/runtime_metrics/?tab=python
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **Install dependencies**. Download the Datadog Java tracer and serverless compatibility layer:


   Download `dd-java-agent.jar` and `dd-serverless-compat-java-agent.jar` that contains the latest tracer class files, to a folder that is accessible by your Datadog user:
   ```shell
   wget -O /path/to/dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O /path/to/dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   For alternative ways to download the agent, see the [Datadog Java Agent documentation][4].

   Datadog recommends using the latest versions of both `datadog-serverless-compat` and `dd-java-agent` to ensure you have access to enhancements and bug fixes.


2. **Initialize the Datadog Java tracer and serverless compatibility layer**. Add `JAVA_TOOL_OPTIONS` to your runtime environment variable:

   Implement and [Auto instrument][1] the Java tracer by setting the Runtime environment variable to instrument your Java cloud function with the Datadog Java tracer and the serverless compatibility layer.

   | Name      | Value |
   |-----------| ----- |
   | `JAVA_TOOL_OPTIONS` | `-javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar ` |

3. (Optional) **Enable runtime metrics**. See [Java Runtime Metrics][2].

4. (Optional) **Enable custom metrics**. See [Metric Submission: DogStatsD][3].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=wget
[2]: /tracing/metrics/runtime_metrics/?tab=java
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=java
[4]: https://docs.datadoghq.com/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/?tab=springboot

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
1. **Install dependencies**. Run the following commands:
   ```shell
   go get github.com/DataDog/datadog-serverless-compat-go/datadogserverlesscompat
   go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
   ```

   Datadog recommends pinning the package versions and regularly upgrading to the latest versions of both `datadog-serverless-compat-go/datadogserverlesscompat` and `dd-trace-go.v1/ddtrace/trace` to ensure you have access to enhancements and bug fixes.

   For more information, see [Tracing Go Applications][1] and [Datadog Serverless Compatibility Layer for Go](https://pkg.go.dev/github.com/DataDog/datadog-serverless-compat-go/datadogserverlesscompat).


2. **Start the Datadog serverless compatibility layer and initialize the Go tracer**. Add the following lines to your main application entry point file (for example, `main.go`):

   ```go
      import (
          "github.com/DataDog/datadog-go/statsd"
          "github.com/DataDog/datadog-serverless-compat-go/datadogserverlesscompat"
          "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
      )

      func init() {
         datadogserverlesscompat.Start()
         tracer.Start(tracer.WithAgentAddr("127.0.0.1:8126"))
         dogstatsdClient, _ = statsd.New("127.0.0.1:8125")
         functions.HTTP("helloHTTP", helloHTTP)
      }

   ```

3. (Optional) **Enable runtime metrics**. See [Go Runtime Metrics][2].

4. (Optional) **Enable custom metrics**. See [Metric Submission: DogStatsD][3].

[1]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/go
[2]: /tracing/metrics/runtime_metrics/?tab=go
[3]: /metrics/custom_metrics/dogstatsd_metrics_submission/?code-lang=go
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Deploy your function**. Use `gcloud` or Google Console to deploy your 1st Gen Cloud Run Function:

   Follow Google Cloud's [Deploy a Cloud Run function (1st gen)][10] instructions to utilize `gcloud function deploy <FUNCTION_NAME> --no-gen2` to deploy a 1st Gen Cloud Run Function.

   Use the `--source` flag to point to the directory of your function code with `dd-java-agent.jar` and `dd-serverless-compat-java-agent.jar` at the top level.

   For more information, see Google Cloud's [gcloud functions deploy][11] documentation for more flags for the gcloud command.

6. **Configure Datadog intake**. Add the following environment variables to your function's application settings:

   | Name | Value |
   | ---- | ----- |
   | `DD_API_KEY` | Your [Datadog API key][1]. |
   | `DD_SITE` | Your [Datadog site][2]. For example, {{< region-param key=dd_site code="true" >}}. |

7. **Configure Unified Service Tagging**. You can collect metrics from your Cloud Run Function by installing the [Google Cloud integration][6]. To correlate these metrics with your traces, first set the `env`, `service`, and `version` tags on your resource in Google Cloud. Then, configure the following environment variables. You can add custom tags as `DD_TAGS`.

   | Name         | Value                                                                                                |
   |--------------|------------------------------------------------------------------------------------------------------|
   | `DD_ENV`     | How you want to tag your env for [Unified Service Tagging][9]. For example, `prod`.                  |
   | `DD_SERVICE` | How you want to tag your service for [Unified Service Tagging][9].                                   |
   | `DD_VERSION` | How you want to tag your version for [Unified Service Tagging][9].                                   |
   | `DD_TAGS`    | Your comma-separated custom tags. For example, `key1:value1,key2:value2`.                            |
   | `DD_SITE`    | [Datadog site][13] - Set this tag if you are in a different site. **Default** is US1 `datadoghq.com` |

8. **Add Service Label in the info panel**. Tag your GCP entity with the `service` label to correlate your traces with your service:

   Add the same value from `DD_SERVICE` to a `service` label on your cloud function, inside the info panel of your function.
   | Name      | Value                                                       |
   |-----------|-------------------------------------------------------------|
   | `service` | The name of your service matching the `DD_SERVICE` env var. |

   For more information on how to add labels, see Google Cloud's [Configure labels for services][12] documentation.

## Example functions
The following examples contain a sample function with tracing and metrics set up.

{{< programming-lang-wrapper langs="nodejs,python,java,go" >}}
{{< programming-lang lang="nodejs" >}}
```js
// Example of a simple Cloud Run Function with traces and custom metrics
// dd-trace must come before any other import.
const tracer = require('dd-trace').init()

require('@datadog/serverless-compat').start();

const functions = require('@google-cloud/functions-framework');

function handler(req, res) {
   tracer.dogstatsd.increment('dd.function.sent', 1, {'runtime':'nodejs'});
   return res.send('Welcome to Datadog💜!');
}
const handlerWithTrace = tracer.wrap('example-span', handler)

functions.http('httpexample',  handlerWithTrace)

module.exports = handlerWithTrace
```
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
```python
# Example of a simple Cloud Run Function with traces and custom metrics
import functions_framework
import ddtrace
from datadog import initialize, statsd

ddtrace.patch(logging=True)
initialize(**{'statsd_port': 8125})

@ddtrace.tracer.wrap()
@functions_framework.http
def dd_log_forwader(request):
   with ddtrace.tracer.trace('sending_trace') as span:
      span.set_tag('test', 'ninja')
      statsd.increment('dd.function.sent', tags=["runtime:python"])
   return "Welcome To Datadog! 💜"
```
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
```java
// Example of a simple Cloud Run Function with traces and custom metrics
package com.example;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import java.io.BufferedWriter;
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class Example implements HttpFunction {
  @Override
  public void service(HttpRequest request, HttpResponse response) throws Exception {
    StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .hostname("localhost")
            .port(8125)
            .build();
    BufferedWriter writer = response.getWriter();
    Statsd.incrementCounter("dd.function.sent", new String[]{"runtime:java"});
    writer.write("Welcome to Datadog!");
  }
}
```

You can also install the tracer using the following Maven dependency:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>cloudfunctions</groupId>
    <artifactId>http-function</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.release>17</maven.compiler.release>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.google.cloud.functions</groupId>
            <artifactId>functions-framework-api</artifactId>
            <version>1.0.1</version>
        </dependency>
        <dependency>
            <groupId>com.datadoghq</groupId>
            <artifactId>java-dogstatsd-client</artifactId>
            <version>4.4.3</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <excludes>
                        <exclude>.google/</exclude>
                    </excludes>
                </configuration>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-antrun-plugin</artifactId>
                <version>1.8</version>
                <executions>
                    <execution>
                        <phase>initialize</phase>
                        <configuration>
                            <tasks>
                                <get src="https://dtdg.co/latest-serverless-compat-java-agent" dest="dd-serverless-compat-java-agent.jar" />
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
```
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}
```go
# Example of a simple Cloud Run Function with traces and custom metrics
package cloud_function

import (
	"fmt"
	"log"
	"net/http"

	"github.com/DataDog/datadog-go/statsd"
	"github.com/DataDog/datadog-serverless-compat-go/datadogserverlesscompat"
	_ "github.com/GoogleCloudPlatform/functions-framework-go/funcframework"
	"github.com/GoogleCloudPlatform/functions-framework-go/functions"
	"gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

var dogstatsdClient *statsd.Client

func init() {
	err := datadogserverlesscompat.Start()
	log.Println("Starting datadog serverless compat: ", err)
	tracer.Start(tracer.WithAgentAddr("127.0.0.1:8126"))
	dogstatsdClient, _ = statsd.New("127.0.0.1:8125")
	functions.HTTP("helloHTTP", helloHTTP)
}

// helloHTTP is an HTTP Cloud Function with a request parameter.
func helloHTTP(w http.ResponseWriter, r *http.Request) {
	span := tracer.StartSpan("TEST-SPAN")
	defer span.Finish()

	err := dogstatsdClient.Incr("nina.test.counter", []string{"runtime:go"}, 1)
	if err != nil {
		log.Println("Error incrementing dogstatsd counter: ", err)
	}
	fmt.Fprint(w, "Hello Datadog!")
}
```
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## What's next?

- You can view your Cloud Run Functions traces in [Trace Explorer][4]. Search for the service name you set in the `DD_SERVICE` environment variable to see your traces.
- You can use the [Serverless > Cloud Run Functions][5] page to see your traces enriched with telemetry collected by the [Google Cloud integration][6].

## Troubleshooting

### Enable debug logs

You can collect [debug logs][7] for troubleshooting. To configure debug logs, use the following environment variables:

`DD_TRACE_DEBUG`
: Enables (`true`) or disables (`false`) debug logging for the Datadog Tracing Library. Defaults to `false`.

  **Values**: `true`, `false`

`DD_LOG_LEVEL`
: Sets logging level for the Datadog Serverless Compatibility Layer. Defaults to `info`.

  **Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`


[1]: /account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /getting_started/site
[3]: /tracing/metrics/metrics_namespace/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://app.datadoghq.com/functions?cloud=gcp&entity_view=cloud_functions
[6]: /integrations/google_cloud_platform/
[7]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[8]: /serverless/google_cloud/google_cloud_run_functions
[9]: /getting_started/tagging/unified_service_tagging/
[10]: https://cloud.google.com/functions/1stgendocs/deploy
[11]: https://cloud.google.com/sdk/gcloud/reference/functions/deploy
[12]: https://cloud.google.com/run/docs/configuring/services/labels
[13]: https://docs.datadoghq.com/getting_started/site/#access-the-datadog-site
