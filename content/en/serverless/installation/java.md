---
title: Instrumenting Java Applications
kind: documentation
further_reading:
- link: 'serverless/serverless_tagging/'
  tag: "Documentation"
  text: 'Tagging Serverless Applications'
- link: 'serverless/distributed_tracing/'
  tag: "Documentation"
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: "Documentation"
  text: 'Submitting Custom Metrics from Serverless Applications'
---

{{< img src="serverless/java-lambda-tracing.png" alt="Monitor Java Lambda Functions with Datadog"  style="width:100%;">}}

## Required setup

If not already configured:

- Install the [AWS integration][1]. This allows Datadog to ingest Lambda metrics from AWS. 
- Install the [Datadog Forwarder Lambda function][2], which is required to ingest AWS Lambda traces, enhanced metrics, custom metrics, and logs. 

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow these steps to instrument your application to send [enhanced Lambda metrics][3], logs, and traces to Datadog. 
To fully instrument your serverless application with distributed tracing, your Java Lambda functions must be using the Java 8 Corretto (`java8.al2`) or Java 11 (`java11`) runtimes.

## Configuration

### Install the Datadog Lambda Library

You can install the Datadog Lambda Library locally by adding one of the following code blocks into your `pom.xml` or `build.gradle` as appropriate based on your project’s configuration. Replace `VERSION` below with the latest release (omitting the preceeding `v`): ![Bintray][4]
{{< tabs >}}
{{% tab "Maven" %}}

Include the following dependency in your `pom.xml`:

```xml
<repositories>
  <repository>
    <id>datadog-maven</id>
    <url>https://dl.bintray.com/datadog/datadog-maven</url>
  </repository>     
</repositories>
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
repositories {
  maven { url "https://dl.bintray.com/datadog/datadog-maven" }
}
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```
{{% /tab %}}
{{< /tabs >}}

### Instrument the function

1. Install the Datadog Lambda Layer on your function. For `VERSION`, see the latest [release][5]:

    ```yaml
    arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
    ```

2. Configure the following environment variables on your function:

    ```yaml
    JAVA_TOOL_OPTIONS: "-javaagent:\"/opt/java/lib/dd-java-agent.jar\""
    DD_LOGS_INJECTION: "true"
    DD_JMXFETCH_ENABLED: "false"
    DD_TRACE_ENABLED: "true"
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

### Subscribe the Datadog Forwarder to the log groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, in order to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Subscribe the Datadog Forwarder to your function's log groups][6].

### Monitor Java Lambda function cold starts

Cold starts occur when your serverless applications receive sudden increases in traffic, including when the function was previously inactive or when it was receiving a relatively constant number of requests. Users may perceive cold starts as slow response times or lag. Datadog highly recommends you configure a monitor on Java Lambda function cold starts, and use Datadog Serverless Insights to [keep cold starts to a minimum][7].

{{< img src="serverless/java-monitor-cold-starts.png" alt="Monitor Java Lambda Function Cold Starts"  style="width:100%;">}}

To create a Datadog monitor on Java Lambda function cold starts, follow the [monitor creation steps][8] with the following criteria:
- Metric Name: `aws.lambda.enhanced.invocations`
- From: `runtime:java*` and `cold_start:true`
- Alert Grouping: Multi Alert, trigger a separate alert for each `function_arn`

### Unified service tagging

Although it's optional, Datadog highly recommends tagging you serverless applications with the `env`, `service`, and `version` tags following the [unified service tagging documentation][9].

## Explore Datadog serverless monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless Homepage][10].

### Monitor custom business logic

If you would like to submit a custom metric, see the sample code below:

```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda ddl = new DDLambda(request, context);

        Map<String,String> myTags = new HashMap<String, String>();
            myTags.put("product", "latte");
            myTags.put("order","online");
        
        // Submit a custom metric
        dd.metric(
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

See the [custom metrics documentation][11] for more information on custom metric submission.

### Connect logs and traces

To automatically connect Java Lambda function logs and traces, see the [Connecting Java Logs and Traces][12] for instructions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon_web_services/
[2]: /serverless/forwarder/
[3]: /serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/bintray/v/datadog/datadog-maven/datadog-lambda-java
[5]: https://github.com/DataDog/datadog-lambda-java/releases/
[6]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: /serverless/insights#cold-starts
[8]: /monitors/monitor_types/metric/?tab=threshold#overview
[9]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[10]: https://app.datadoghq.com/functions
[11]: /serverless/custom_metrics?tab=java
[12]: /tracing/connect_logs_and_traces/java/
