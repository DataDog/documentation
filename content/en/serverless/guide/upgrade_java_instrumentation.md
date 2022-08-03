---
title: Upgrade Instrumentation for Java Lambda Functions
kind: documentation
---

Instructions to instrument Java Lambda functions were greatly simplified with the releases of Datadog Lambda layers `dd-trace-java:5` and `Datadog-Extension:25`, specifically:

1. the [datadog-lambda-java][1] library is deprecated and no longer required
2. no code changes (such as the `DDLambda` wrapper) are required, except for custom instrumentation
3. you can now set up Datadog using the [Datadog CI][2] and the [Datadog Serverless Plugin][3]

Follow the instructions below to upgrade your instrumentation if you are currently using older versions of the previously mentioned Datadog Lambda layers. If you are setting up Datadog for Java Lambda functions that were not instrumented previously, follow the [latest installation instructions][7] instead.

1. Remove `datadog-lambda-java` from `build.gradle` or `pom.xml`, as it is no longer required
2. Remove `DDLambda` and the import statement from your function code
3. Set environment variable `AWS_LAMBDA_EXEC_WRAPPER` to `/opt/datadog_wrapper`
4. Bump the `dd-trace-java` version to `{{< latest-lambda-layer-version layer="dd-trace-java" >}}` and `Datadog-Extension` to `{{< latest-lambda-layer-version layer="extension" >}}`
5. If you are submitting custom metric using the `DDLambda.metric()` helper function, now you must use the standard [DogStatsD clent for Java][4] and follow the [sample code][5] to submit the metric as distribution. Note, you can [only use distribution in Lambda][6] and previously `DDLambda.metric()` submit metrics as distribution as well.
    
[1]: https://github.com/DataDog/datadog-lambda-java
[2]: /serverless/installation/java/?tab=datadogcli
[3]: /serverless/installation/java/?tab=serverlessframework
[4]: /developers/dogstatsd/?tab=hostagent&code-lang=java
[5]: /serverless/custom_metrics/?code-lang=java#with-the-datadog-lambda-extension
[6]: /serverless/custom_metrics#understanding-distribution-metrics
[7]: /serverless/installation/java/
