---
title: Span Auto-Linking
---

{{< img src="serverless/lambda/tracing/autolink.png" alt="In Datadog, a DynamoDB trace. At the top, a message reads 'This trace is linked to other traces'. The Span Links tab is open and displays a clickable link to another DynamoDB trace." style="width:100%;" >}}

Datadog automatically detects linked spans when segments of your asynchronous requests cannot propagate trace context. For example, this may occur when a request triggers an [S3 Change Events][1], or [DynamoDB Streams][2]. You can see Auto-linked spans appear in the [Span Links tab][3]. These appear as **Backward** or **Forward**.

_Backward_: The linked span was caused by the trace you are viewing.

_Forward_: The linked span caused the trace you are viewing.


<div class="alert alert-info">Sampling and <a href="/tracing/trace_pipeline/trace_retention/">trace retention filters</a> can interfere with Auto-linking. To improve your chances of seeing Auto-linked spans, increase your sample rate or adjust your retention filters.</div>

### Supported technologies

Span Auto-linking is available for:
- Python AWS Lambda functions instrumented with [`datadog-lambda-python`][4] layer v101+
- Python applications instrumented with [`dd-trace-py`][5] v2.16+
- Node.js AWS Lambda functions instrumented with [`datadog-lambda-js`][6] layer 118+
- Node.js applications instrumented with [`dd-trace-js`][7] v4.53.0+ or v5.29.0+

### DynamoDB Change Stream Auto-linking

For [DynamoDB Change Streams][2], Span Auto-linking supports the following operations:

- `PutItem`
- `UpdateItem`
- `DeleteItem`
- `BatchWriteItem`
- `TransactWriteItems`

<div class="alert alert-info">The <code>PutItem</code> operation requires additional configuration. For more information, see <a href="/serverless/aws_lambda/installation/python/#span-auto-linking">Instrumenting Python Serverless Applications</a> or <a href="/serverless/aws_lambda/installation/nodejs/#span-auto-linking">Instrumenting Node.js Serverless Applications</a>.</div>

### S3 Change Notification Auto-linking

For [S3 Change Notifications][1], Span Auto-linking supports the following operations:

- `PutObject`
- `CompleteMultipartUpload`
- `CopyObject`

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html
[2]: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html
[3]: https://docs.datadoghq.com/tracing/trace_explorer/trace_view/?tab=spanlinksbeta
[4]: https://github.com/DataDog/datadog-lambda-python
[5]: https://github.com/DataDog/dd-trace-py/
[6]: https://github.com/DataDog/datadog-lambda-js
[7]: https://github.com/DataDog/dd-trace-js/

