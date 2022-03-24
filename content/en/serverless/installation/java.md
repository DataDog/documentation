---
title: Instrumenting Java Serverless Applications
kind: documentation
further_reading:
- link: 'serverless/datadog_lambda_library/java'
  tag: 'Documentation'
  text: 'Datadog Lambda Library for Java'
- link: 'serverless/distributed_tracing/'
  tag: 'Documentation'
  text: 'Tracing Serverless Applications'
- link: 'serverless/custom_metrics/'
  tag: 'Documentation'
  text: 'Submitting Custom Metrics from Serverless Applications'
- link: '/serverless/guide/troubleshoot_serverless_monitoring'
  tag: 'Documentation'
  text: 'Troubleshoot Serverless Monitoring'
aliases:
    - /serverless/datadog_lambda_library/java/
---

{{< img src="serverless/java-lambda-tracing.png" alt="Monitor Java Lambda Functions with Datadog" style="width:100%;">}}

<div class="alert alert-danger">
There are versions of datadog-lambda-java that import log4j <=2.14.0 as a transitive dependency. <a href="#upgrading">Upgrade instructions</a> are below.
</div>

## Prerequisites

To fully instrument your serverless application with distributed tracing, your Java Lambda functions must be using the Java 8 Corretto (`java8.al2`) or Java 11 (`java11`) runtimes.

If your Java Lambda functions were previously set up using the Datadog Forwarder, see the [installation instructions][1].

## Configuration

{{< tabs >}}
{{% tab "Datadog CLI" %}}
The Datadog CLI modifies existing Lambda functions' configurations to enable instrumentation without requiring a new deployment. It is the quickest way to get started with Datadog's serverless monitoring.

You can also add the [instrumentation command](#instrument) to your CI/CD pipelines to enable instrumentation for all your serverless applications. Run the command _after_ your normal serverless application deployment, so that changes made by the Datadog CLI command are not overridden.

### Install

Install the Datadog CLI with NPM or Yarn:

```sh
# NPM
npm install -g @datadog/datadog-ci

# Yarn
yarn global add @datadog/datadog-ci
```

### Configure credentials

For a quick start, configure Datadog and [AWS credentials][1] using the following command. For production applications, consider supplying the environment variables or credentials in a more secure manner.

```bash
export DATADOG_API_KEY="<DD_API_KEY>"
export DATADOG_SITE="<DD_SITE>" # such as datadoghq.com, datadoghq.eu, us3.datadoghq.com or ddog-gov.com
export AWS_ACCESS_KEY_ID="<ACCESS KEY ID>"
export AWS_SECRET_ACCESS_KEY="<ACCESS KEY>"
```

### Instrument

**Note**: Instrument your Lambda functions in a dev or staging environment first. If the instrumentation needs to be reverted, run `uninstrument` with the same arguments that was used for instrumentation.

To instrument your Lambda functions, run the following command:

```sh
datadog-ci lambda instrument -f <functionname> -f <another_functionname> -r <aws_region> -e <extension_version>
```

To fill in the placeholders:

-   Replace `<functionname>` and `<another_functionname>` with your Lambda function names.
-   Replace `<aws_region>` with the AWS region name.
-   Replace `<extension_version>` with the desired version of the Datadog Lambda Extension. The latest version is `{{< latest-lambda-layer-version layer="extension" >}}`.

For example:

```sh
datadog-ci lambda instrument -f my-function -f another-function -r us-east-1 -e {{< latest-lambda-layer-version layer="extension" >}}
```

More information and additional parameters can be found in the [Datadog Serverless CLI][2].

[1]: https://docs.aws.amazon.com/sdk-for-java/latest/developer-guide/get-started.html
[2]: https://docs.datadoghq.com/serverless/serverless_integrations/cli

{{% /tab %}}
{{% tab "Custom" %}}
### Install the Datadog Lambda Extension

[Configure the layers][1] for your Lambda function using the ARN in the following format:

```
// For x86 architecture
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension:<EXTENSION_VERSION>
// For arm64 architecture
arn:aws:lambda:<AWS_REGION>:464622532012:layer:Datadog-Extension-ARM:<EXTENSION_VERSION>
```

The latest `EXTENSION_VERSION` is {{< latest-lambda-layer-version layer="extension" >}}.

[1]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html

{{% /tab %}}
{{< /tabs >}}
### Install the Datadog tracing client

[Configure the layers][14] for your Lambda function using the ARN in the following format:

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:<VERSION>
```

The latest `VERSION` is {{< latest-lambda-layer-version layer="dd-trace-java" >}}.

### Install the Datadog Lambda library

Install the Datadog Lambda Library locally by adding one of the following code blocks into your `pom.xml` or `build.gradle` as appropriate based on your project’s configuration. Replace `VERSION` below with the latest release (omitting the preceeding `v`): ![Maven Cental][4]
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

### Configure environment variables

Configure the following environment variables on your function:

```yaml
DD_API_KEY: <DATADOG_API_KEY> # Replace <DATADOG_API_KEY> with your Datadog API key
JAVA_TOOL_OPTIONS: -javaagent:"/opt/java/lib/dd-java-agent.jar" -XX:+TieredCompilation -XX:TieredStopAtLevel=1
DD_LOGS_INJECTION: true
DD_JMXFETCH_ENABLED: false
DD_TRACE_ENABLED: true
```

### Wrap your Lambda handler

Wrap your Lambda handler function using the wrapper provided by the Datadog Lambda Library:

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

### Unified service tagging

Datadog recommends tagging your serverless applications with `DD_ENV`, `DD_SERVICE`, `DD_VERSION`, and `DD_TAGS`. See the [Lambda extension documentation][2] for more details.

## Explore

After configuring your function following the steps above, view your metrics, logs, and traces on the [Serverless homepage][9].

### Monitor custom business logic

If you would like to submit a custom metric, see the sample code below:

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

<div class="alert alert-info"> Failing to use the correct Java runtime can result in errors like, "Error opening zip file or JAR manifest missing : /opt/java/lib/dd-java-agent.jar" Make sure to use java8.al2 or java11 as runtime as described above. </div>

## Upgrading

Apache Foundation has announced that log4j, a popular Java logging library, is [vulnerable to remote code execution][12].
Some versions of `datadog-lambda-java` include a transitive dependency on log4j that may be vulnerable. The vulnerable versions are:

-  `<=0.3.3`
-  `1.4.0`

The latest version of datadog-lambda java is ![Maven Cental][4]. Use this version (omitting the preceeding `v`) when following the upgrading instructions below.

If you do not wish to upgrade to `1.4.x`, `0.3.x` is updated with the latest log4j security patches as well.
You may find the latest version of `0.3.x` in the [datadog-lambda-java repository][13].

The version of the `datadog-lambda-java` dependency in your Lambda function is set in `pom.xml` or `build.gradle` depending on whether you are using Maven or Gradle, respectively.

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
Then redeploy your lambda function.

{{% /tab %}}

{{% tab "Gradle" %}}

Your `build.gradle` file contains a section similar to the following:

```groovy
dependencies {
  implementation 'com.datadoghq:datadog-lambda-java:VERSION'
}
```

Replace `VERSION` with the latest version of `datadog-lambda-java` (available above).
Then redeploy your lambda function.

{{% /tab %}}
{{< /tabs>}}

If you are upgrading from 0.3.x to 1.4.x and you wish to use the `dd-trace-java` tracer, find the reference to the `dd-trace-java` lambda layer and change it to:

```
arn:aws:lambda:<AWS_REGION>:464622532012:layer:dd-trace-java:4
````

## Troubleshooting

If you have trouble collecting monitoring data after following the instructions above, see the [serverless monitoring troubleshooting guide][15].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/guide/datadog_forwarder_java
[2]: /serverless/libraries_integrations/extension/
[3]: /serverless/enhanced_lambda_metrics
[4]: https://img.shields.io/maven-central/v/com.datadoghq/datadog-lambda-java
[5]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[6]: /serverless/insights#cold-starts
[7]: /monitors/create/types/metric/?tab=threshold#overview
[8]: /getting_started/tagging/unified_service_tagging/#aws-lambda-functions
[9]: https://app.datadoghq.com/functions
[10]: /serverless/custom_metrics?tab=java
[11]: /tracing/connect_logs_and_traces/java/
[12]: https://www.datadoghq.com/log4j-vulnerability/
[13]: https://github.com/DataDog/datadog-lambda-java/releases
[14]: https://docs.aws.amazon.com/lambda/latest/dg/invocation-layers.html
[15]: /serverless/guide/troubleshoot_serverless_monitoring/
