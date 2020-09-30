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

After you have installed the [AWS integration][1] and the [Datadog Forwarder][2], follow the steps below to instrument your application to send metrics, logs, and traces to Datadog.

## Configuration

### Install the Datadog Lambda Library

You can install the Datadog Lambda Library locally by adding one of the following blocks into your `pom.xml` or `build.gradle` as appropriate based on your project’s configuration. Replace `n.n.n` below with the latest release (omitting the preceeding `v`): ![Bintray](https://img.shields.io/bintray/v/datadog/datadog-maven/datadog-lambda-java)

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
  <version>n.n.n</version>
  <type>pom</type>
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
  implementation 'com.datadoghq:datadog-lambda-java:n.n.n'
}
```
{{% /tab %}}
{{< /tabs >}}

### Configure the Function

1. Enable [AWS X-Ray active tracing][4] for your Lambda function.

### Subscribe the Datadog Forwarder to the Log Groups

You need to subscribe the Datadog Forwarder Lambda function to each of your function’s log groups, in order to send metrics, traces and logs to Datadog.

1. [Install the Datadog Forwarder if you haven't][2].
2. [Ensure the option DdFetchLambdaTags is enabled][5].
3. [Subscribe the Datadog Forwarder to your function's log groups][6].

## Explore Datadog Serverless Monitoring

After you have configured your function following the steps above, you should be able to view metrics, logs and traces on the [Serverless Homepage][7].

If you would like to submit a custom metric, see the sample code below:


```java
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda);

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

        // Add the datadog distributed tracing headers
        hc = (HttpURLConnection) dd.addTraceHeaders(hc);

        hc.connect();
    }
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/#1-install-the-cloud-integration
[2]: https://docs.datadoghq.com/serverless/forwarder/
[3]: https://github.com/DataDog/datadog-lambda-java/releases
[4]: https://docs.aws.amazon.com/xray/latest/devguide/xray-services-lambda.html
[5]: https://docs.datadoghq.com/serverless/forwarder/#experimental-optional
[6]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#collecting-logs-from-cloudwatch-log-group
[7]: https://app.datadoghq.com/functions
