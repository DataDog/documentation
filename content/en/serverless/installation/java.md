---
title: Installing Java Serverless Monitoring
kind: documentation
further_reading:
    - link: 'serverless/installation/node'
      tag: 'Documentation'
      text: 'Installing Node JS Serverless Monitoring'
    - link: 'serverless/installation/ruby'
      tag: 'Documentation'
      text: 'Installing Ruby Serverless Monitoring'
    - link: 'serverless/installation/python'
      tag: 'Documentation'
      text: 'Installing Python Serverless Monitoring'
    - link: 'serverless/installation/dotnet'
      tag: 'Documentation'
      text: 'Installing .NET Serverless Monitoring'
    - link: 'serverless/installation/go'
      tag: 'Documentation'
      text: 'Installing Go Serverless Monitoring'
---

After you have [installed the AWS integration][1], use Java to instrument your application to send metrics, logs, and traces to Datadog. 

## Configuration

Install the Datadog Lambda Library
You can install the [Datadog Lambda package][1] locally by running one of the following commands based on your project’s configuration:

{{< tabs >}}
{{% tab "Maven" %}}

Include the following dependency in your `pom.xml`:

```
  <repositories>
        <repository>
            <id>datadog-maven</id>
            <url>https://dl.bintray.com/datadog/datadog-maven</url>
        </repository>     
  </repositories>

<dependency>
	<groupId>com.datadoghq</groupId>
	<artifactId>datadog-lambda-java</artifactId>
	<version>0.0.5</version>
	<type>pom</type>
</dependency>
```

{{% /tab %}}
{{% tab "Gradle" %}}

Include the following in your `build.gradle`:

```
repositories {
    maven { url "https://dl.bintray.com/datadog/datadog-maven" }
}

dependencies {
     implementation 'com.datadoghq:datadog-lambda-java:0.0.5'
}
```
{{% /tab %}}
{{< /tabs >}}

Then, using the AWS Console or the AWS CLI, add a new `“DD_FLUSH_TO_LOG”` environment variable set to `“true”`. This step needs to be repeated for every function you wish to trace.

### Instrument your Code

Instrument your application by creating a new DDLambda with your request and Lambda context, as outlined below:

```
public class Handler implements RequestHandler<APIGatewayV2ProxyRequestEvent, APIGatewayV2ProxyResponseEvent> {
    public Integer handleRequest(APIGatewayV2ProxyRequestEvent request, Context context){
        DDLambda dd = new DDLambda(request, lambda); //Records your lambda invocation, 
   
        int work = DoWork();
        dd.metric("work.done", work);
        
        return work;
    }
}
```

### Subscribe the Forwarder to Log Groups

You need the Datadog Forwarder to subscribe to each of your function’s log groups to send traces and enhanced metrics to Datadog.

You can quickly verify that you’ve installed the Datadog Forwarder by using the [AWS console][2]. If you have not yet installed the Forwarder, you can follow the installation instructions here. Make sure the Datadog Forwarder is in the same AWS region as the Lambda functions you are monitoring.

1. To start, navigate to your AWS Dashboard for the Datadog Forwarder. Then, manually add a function trigger.
2. Configure the trigger to be linked to your function’s CloudWatch Log Group, add a filter name (but feel free to leave the filter empty) and add the trigger.

The Datadog Forwarder now sends enhanced metrics and traces from your function to Datadog.

## Results

Now you can view your metrics, logs, and traces on the [serverless home page][3].

[1]: https://github.com/DataDog/datadog-lambda-java
[2]: https://console.aws.amazon.com/cloudformation/home#/stacks?filteringText=forwarder
[3]: https://app.datadoghq.com/functions
