---
title: Instrumenting Java Serverless Applications Using the Datadog Forwarder
kind: guide
---
## Overview

<div class="alert alert-warning">
If you are a new user of Datadog Serverless, follow the <a href="/serverless/installation/java">instructions to instrument your Lambda functions using the Datadog Lambda Extension</a> instead. If you have setup Datadog Serverless with the Datadog Forwarder before Lambda offered out-of-the-box functionality, use this guide to maintain your instance.
</div>

<div class="alert alert-danger">
Some older versions of <code>datadog-lambda-java</code> import <code>log4j <=2.14.0</code> as a transitive dependency. <a href="#upgrading">Upgrade instructions</a> are below.
</div>

## Prerequisites

The [Datadog Forwarder Lambda function][2] is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs.

To fully instrument your serverless application with distributed tracing, your Java Lambda functions must be using the Java 8 Corretto (`java8.al2`), Java 11 (`java11`) or Java 17 (`java17`) runtime.

## Configuration

### Install

Install the Datadog Lambda Library locally by adding one of the following code blocks into `pom.xml` (Maven) or `build.gradle` (Gradle). Replace `VERSION` below with the latest release (omitting the preceding `v`): ![Maven Cental][4]
{{< tabs >}}
{{% tab "Maven" %}}

Include the following dependency in your `pom.xml`:

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

Include the following in your `build.gradle`:

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```
{{% /tab %}}
{{< /tabs >}}

### Instrument


1. Install the Datadog Lambda Layer on your function. The latest `VERSION` is `{{< latest-lambda-layer-version layer="dd-trace-java" >}}`.

    ```yaml
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
    ```

2. Configure the following environment variables on your function:

    ```yaml
    JAVA_TOOL_OPTIONS: -javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1
    DD_LOGS_INJECTION: true
    DD_JMXFETCH_ENABLED: false
    DD_TRACE_ENABLED: true
    ```

3. Wrap your Lambda handler function using the wrapper provided by the Datadog Lambda Library:

    ```java
    public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
        public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
            DDLambda ddl = new DDLambda(request, context); //Required to initialize the trace

            do_some_stuff();
            make_some_http_requests();

            ddl.finish(); //Required to finish the active span.
            return new ApiGatewayResponse();
        }
    }
    ```

### Subscribe

Subscribe the Datadog Forwarder Lambda function to each of your function's log groups. This enables you to send metrics, traces, and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Subscribe the Datadog Forwarder to your function's log groups][5].

### Monitor Java Lambda function cold starts

Cold starts occur when your serverless applications receive sudden increases in traffic, including when the function was previously inactive or when it was receiving a relatively constant number of requests. Users may perceive cold starts as slow response times or lag. Datadog recommends you configure a monitor on Java Lambda function cold starts, and use Datadog Serverless Insights to [keep cold starts to a minimum][6].

{{< img src="serverless/java-monitor-cold-starts.png" alt="Monitor Java Lambda Function Cold Starts" style="width:100%;">}}

To create a Datadog monitor on Java Lambda function cold starts, follow the [monitor creation steps][7] with the following criteria:
- Metric Name: `aws.lambda.enhanced.invocations`
- From: `runtime:java*` and `cold_start:true`
- Alert Grouping: Multi Alert, trigger a separate alert for each `function_arn`

### Tag

Although it is optional, Datadog recommends tagging your serverless applications with the reserved tags `env`, `service`, and `version`. For more information about reserved tags, see the [Unified Service Tagging documentation][8].

## Explore

After configuring your function following the steps above, view your metrics, logs, and traces on the [Serverless homepage][9].

### Monitor custom business logic

To submit a custom metric, see the sample code below:

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context);

        Map<String,Object> myTags = new HashMap<String, Object>();
            myTags.put("product", "latte");
            myTags.put("order","online");

        // Submit a custom metric
        ddl.metric(
            "coffee_house.order_value", // Metric name
            12.45,                      // Metric value
            myTags);                    // Associated tags

        URL url = new URL("https://example.com");
        HttpURLConnection hc = (HttpURLConnection)url.openConnection();
        hc.connect();

        ddl.finish();
    }
}
```

See the [custom metrics documentation][10] for more information on custom metric submission.

### Connect logs and traces

To automatically connect Java Lambda function logs and traces, see [Connecting Java Logs and Traces][11] for instructions.

<div class="alert alert-info"> Failing to use the correct Java runtime can result in errors, for example: <code>Error opening zip file or JAR manifest missing : /opt/java/lib/dd-java-agent.jar</code>. Make sure to use <code>java8.al2</code> or <code>java11</code> as your runtime, as described above. </div>

## Upgrading

The Apache Foundation has announced that log4j, a popular Java logging library, is [vulnerable to remote code execution][12].
Some versions of `datadog-lambda-java` include a transitive dependency on log4j that may be vulnerable. The vulnerable versions are:

-  `<=0.3.3`
-  `1.4.0`

The latest version of `datadog-lambda-java` is ![Maven Cental][4]. Use this version (omitting the preceeding `v`) when following the upgrading instructions below.

If you do not wish to upgrade to `1.4.x`, `0.3.x` is updated with the latest log4j security patches as well.
You may find the latest version of `0.3.x` in the [`datadog-lambda-java` repository][13].

The version of the `datadog-lambda-java` dependency in your Lambda function is set in `pom.xml` (Maven) or `build.gradle` (Gradle).

{{< tabs >}}
{{% tab "Maven" %}}

Your `pom.xml` file contains a section similar to the following:

```xml
<dependency>
  <groupId>com.datadoghq</groupId>
  <artifactId>datadog-lambda-java</artifactId>
  <version>VERSION</version>
</dependency>
```

Replace `VERSION` with the latest version of `datadog-lambda-java` (available above).
Then redeploy your Lambda function.

{{% /tab %}}

{{% tab "Gradle" %}}

Your `build.gradle` file contains a section similar to the following:

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```

Replace `VERSION` with the latest version of `datadog-lambda-java` (available above).
Then redeploy your Lambda function.

{{% /tab %}}
{{< /tabs>}}

If you are upgrading from 0.3.x to 1.4.x and you wish to use the `dd-trace-java` tracer, find the reference to the `dd-trace-java` Lambda layer and change it to:

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:4
```


[2]: /serverless/forwarder/
[3]: /serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /serverless/insights#cold-starts
[7]: /monitors/types/metric/?tab=threshold#overview
[8]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[9]: https://app.datadoghq.com/functions
[10]: /serverless/custom_metrics?tab=java
[11]: /tracing/other_telemetry/connect_logs_and_traces/java/
[12]: https://www.datadoghq.com/log4j-vulnerability/
[13]: https://github.com/DataDog/datadog-lambda-java/releases
