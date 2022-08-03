---
title: Upgrade Instrumentation for Java Lambda Functions
kind: documentation
---

Instructions to instrument Java Lambda functions were greatly simplified with the releases of Datadog Lambda layers `dd-trace-java:5` and `Datadog-Extension:25`, specifically:

1. the [datadog-lambda-java][1] library is deprecated and no longer required
2. no code changes (such as the `DDLambda` wrapper) are required, except for custom instrumentation
3. you can now set up Datadog using the [Datadog CI][2] and the [Datadog Serverless Plugin][3]

Follow the instructions below to upgrade your instrumentation if you are currently using older versions of the previously mentioned Datadog Lambda layers.

1. Remove `datadog-lambda-java` from `build.gradle` or `pom.xml`, as it is no longer required
2. Remove `DDLambda` and the import statement for `datadog-lambda-java` from your function code
3. Set environment variable `AWS_LAMBDA_EXEC_WRAPPER` to `/opt/datadog_wrapper`
4. Bump the `dd-trace-java` version to `{{< latest-lambda-layer-version layer="dd-trace-java" >}}` and `Datadog-Extension` to `{{< latest-lambda-layer-version layer="extension" >}}`
5. Instead of using the `DDLambda.metric()` helper function, you need to submit custom metric using the Datadog standard [DogStatsD clent for Java][4] and the `distribution()` function. Note, you can [only use distribution in Lambda][5].
    
[1]: https://github.com/DataDog/datadog-lambda-java
[2]: /serverless/installation/java/?tab=datadogcli
[3]: /serverless/installation/java/?tab=serverlessframework
[4]: /developers/dogstatsd/?tab=hostagent&code-lang=java
[5]: /serverless/custom_metrics#understanding-distribution-metrics
