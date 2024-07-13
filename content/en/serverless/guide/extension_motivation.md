---
title: Deciding to migrate to the Datadog Lambda extension

further_reading:
  - link: '/serverless/configuration/#migrate-to-the-datadog-lambda-extension'
    tag: 'Documentation'
    text: 'Migrating to the Datadog Lambda Extension'
---

## Should I migrate to the Datadog Lambda extension?

AWS Lambda extensions run within the Lambda execution environment, alongside your Lambda function code. Datadog partnered with AWS to create the [Datadog Lambda extension][1], a lightweight version of the Datadog Agent that submits custom metrics, enhanced metrics, traces, and logs.

If you configured [Datadog Serverless][2] before the introduction of the Datadog Lambda extension, you are likely using the [Datadog Forwarder][3] to submit custom metrics, enhanced metrics, traces, and logs.

There are some key differences between the Lambda extension and the Forwarder. This page describes the various reasons you may or may not choose to migrate from the Forwarder to the Lambda extension. 

### Differences in functionality

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="Instrument AWS Serverless Applications" style="width:100%;">}}

Although the Lambda Extension replaces the Forwarder as the recommended way to collect telemetry from Lambda functions, the Forwarder is required to collect and add metadata to other AWS service logs — including those from API Gateway, AppSync, and Lambda@Edge.

### Advantages

The Datadog Lambda Extension offers the following advantages over the Datadog Forwarder:

- **Skip CloudWatch Logs**: The Forwarder extracts telemetry from logs, which are then sent to Datadog. The Datadog Lambda Extension sends telemetry directly to Datadog, enabling you to reduce the cost associated with CloudWatch Logs and the Forwarder Lambda function itself.
- **Simple to set up**: The Datadog Lambda extension can be added as a Lambda layer and sends telemetry directly to Datadog, so you do not need to set up a subscription filter for every new Lambda function's CloudWatch log group.

### Trade-offs

The extension [adds additional overhead to your Lambda functions][4] due to loading the extension on cold starts and flushing telemetry to Datadog. The majority of the added duration **does not** affect your function's performance. Based on Datadog's latest benchmarking results, the cost overhead is always lower when using the Lambda extension versus the Forwarder.

### Conclusion

If you only want to collect logs, especially from many Lambda functions, it makes sense to continue using the Datadog Forwarder. If you are also collecting metrics and traces from your Lambda functions, we recommend migrating to the Datadog Lambda Extension.

## Migrate to the Datadog Lambda Extension

To migrate from the Datadog Forwarder to the Datadog Lambda Extension, see the [Serverless configuration documentation][5].

## Reduce cold start duration with the new optimized version of the Datadog Extension (Beta)

Version X of the Datadog Extension optionally uses an optimized version of the Datadog Extension which can significantly reduce the cold start duration in your instrumented Lambda functions.

Today, the following features are supported in version X. Note that some addiitonal features of the Datadog Agent or Tracing libraries may not be supported. To ask a question, report an bug or feature request, please [create an issue] [] in the Datadog Lambda Extension Repository with the label `'version/next'`.

<table>
    <caption>Supported Features in Optimized Extension</caption>
    <thead>
        <tr>
            <th>Runtime</th>
            <th>Enhanced Metrics</th>
            <th>Logs</th>
            <th>Traces</th>
            <th>Application Security</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Node</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>⚒️</td>
        </tr>
        <tr>
            <td>Python</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
            <td>⚒️</td>
        </tr>
        <tr>
            <td>Java</td>
            <td>✅</td>
            <td>✅</td>
            <td>⚒️</td>
            <td>⚒️</td>
        </tr>
        <tr>
            <td>.NET</td>
            <td>✅</td>
            <td>✅</td>
            <td>⚒️</td>
            <td>⚒️</td>
        </tr>
        <tr>
            <td>Ruby</td>
            <td>✅</td>
            <td>✅</td>
            <td>⚒️</td>
            <td>⚒️</td>
        </tr>
        <tr>
            <td>Go</td>
            <td>✅</td>
            <td>✅</td>
            <td>⚒️</td>
            <td>⚒️</td>
        </tr>
    </tbody>
</table>



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/libraries_integrations/extension/
[2]: /serverless
[3]: /logs/guide/forwarder/
[4]: /serverless/libraries_integrations/extension/#overhead
[5]: /serverless/configuration/#migrate-to-the-datadog-lambda-extension
[6]: https://github.com/DataDog/datadog-lambda-extension/issues
