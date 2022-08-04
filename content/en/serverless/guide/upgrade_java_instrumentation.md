---
title: Upgrade Instrumentation for Java Lambda Functions
kind: documentation
---

This document contains instructions for upgrading your Datadog for Java Lambda instrumentation. If you are setting up instrumentation for the first time, follow the [Java Lambda installation instructions][7] instead.

Datadog Lambda layers `dd-trace-java:5` and `Datadog-Extension:25` introduce the following changes to the process of seetting up instrumentation on Java Lambda functions:

1. The [datadog-lambda-java][1] library is deprecated and not required.
2. No code changes (such as the `DDLambda` wrapper) are required, except for custom instrumentation.
3. You can set up Datadog using the [Datadog CI][2] and the [Datadog Serverless Plugin][3].

### Upgrade

1. Remove `datadog-lambda-java` from `build.gradle` or `pom.xml`, as it is no longer required.
2. Remove `DDLambda` and the import statement from your function code.
3. Set environment variable `AWS_LAMBDA_EXEC_WRAPPER` to `/opt/datadog_wrapper`.
4. Increment the `dd-trace-java` version to `{{< latest-lambda-layer-version layer="dd-trace-java" >}}` and `Datadog-Extension` to `{{< latest-lambda-layer-version layer="extension" >}}`.
5. If you are submitting custom metrics using the `DDLambda.metric()` helper function, use the standard [DogStatsD clent for Java][4] and follow the [sample code][5] to submit a metric as a distribution. Note, you can [only use distribution in Lambda][6] and previously `DDLambda.metric()` submit metrics as distribution as well.
    
[1]: https://github.com/DataDog/datadog-lambda-java
[2]: /serverless/installation/java/?tab=datadogcli
[3]: /serverless/installation/java/?tab=serverlessframework
[4]: /developers/dogstatsd/?tab=hostagent&code-lang=java
[5]: /serverless/custom_metrics/?code-lang=java#with-the-datadog-lambda-extension
[6]: /serverless/custom_metrics#understanding-distribution-metrics
[7]: /serverless/installation/java/
