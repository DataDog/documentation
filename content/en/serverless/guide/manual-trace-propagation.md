---
title: Manual Trace Propagation
aliases:
  - /serverless/distributed_tracing/serverless_trace_propagation
---

After you have set up [Distributed Tracing for your AWS Lambda functions][1], additional instrumentation is sometimes required to see a single, connected trace serverless applications with asynchronously triggering Lambda functions.

TK

## Setup 

1. **Pass trace context**: Include Datadog trace context in outgoing events. The outgoing event can originate from a host or an AWS Lambda function that is instrumented with [Distributed Tracing][1].

   #### From a Lambda function

   {{< tabs >}}
   {{% tab "Python" %}}

   Use the `get_dd_trace_context` helper function to pass trace context to outgoing events:

   ```py
   import json
   import boto3
   import os

   from datadog_lambda.tracing import get_dd_trace_context  # Datadog tracing helper function

   def handler(event, context):
       my_custom_client.sendRequest(
           {
             'myCustom': 'data',
             '_datadog': {
                 'DataType': 'String',
                 'StringValue': json.dumps(get_dd_trace_context()) # Includes trace context in outgoing payload.
             },
           },
       )
   ```

   {{% /tab %}}
   {{% tab "Node.js" %}}

   Use the `getTraceHeaders` helper function to pass trace context to outgoing events:

   ```js
   const { getTraceHeaders } = require("datadog-lambda-js"); // Datadog tracing helper function

   module.exports.handler = async event => {
     const _datadog = getTraceHeaders(); // Captures current Datadog trace context.

     var payload = JSON.stringify({ data: 'sns', _datadog });
     await myCustomClient.sendRequest(payload)
   ```

   {{% /tab %}}
   {{< /tabs >}}

   #### From a host
   To pass trace context from a host, see [Trace Context Propagation][2].

2. **Extract trace context** in the consumer Lambda function.

   Define an extractor function that captures trace context before the execution of your Lambda function handler. 

   **Examples**

   {{< tabs >}}
   {{% tab "Python" %}}
   ```py
   def extractor(payload):
       trace_headers = json.loads(payload["_datadog"]);
       trace_id = trace_headers["x-datadog-trace-id"];
       parent_id = trace_headers["x-datadog-parent-id"];
       sampling_priority = trace_headers["x-datadog-sampling-priority"];
       return trace_id, parent_id, sampling_priority
   ```
   {{% /tab %}}
   {{% tab "Node.js" %}}

   ```js
   exports.json = (payload) => {
       const traceData = payload._datadog
       const traceID = traceData["x-datadog-trace-id"];
       const parentID = traceData["x-datadog-parent-id"];
       const sampledHeader = traceData["x-datadog-sampling-priority"];
       const sampleMode = parseInt(sampledHeader, 10);

       return {
         parentID,
         sampleMode,
         source: 'event',
         traceID,
       };
   };
   ```
   {{% /tab %}}
   {{% tab "Go" %}}
   ```go
   var exampleSQSExtractor = func(ctx context.Context, ev json.RawMessage) map[string]string {
    eh := events.SQSEvent{}

    headers := map[string]string{}

    if err := json.Unmarshal(ev, &eh); err != nil {
     return headers
    }

    // Using SQS as a trigger with a batchSize=1 so it's important we check
     // for this as a single SQS message will drive the execution of the handler.
    if len(eh.Records) != 1 {
     return headers
    }

    record := eh.Records[0]

    lowercaseHeaders := map[string]string{}
    for k, v := range record.MessageAttributes {
     if v.StringValue != nil {
      lowercaseHeaders[strings.ToLower(k)] = *v.StringValue
     }
    }

    return lowercaseHeaders
   }

   cfg := &ddlambda.Config{
       TraceContextExtractor: exampleSQSExtractor,
   }
   ddlambda.WrapFunction(handler, cfg)
   ```
   {{% /tab %}}
   {{< /tabs >}}

   Datadog recommends you place your extractor methods all in one file, as extractors can be re-used across multiple Lambda functions.

   Configure the `DD_TRACE_EXTRACTOR` environment variable to point to the location of your extractor function. The format for this is `<FILE NAME>.<FUNCTION NAME>`. For example, `extractors.json` if the `json` extractor is in the `extractors.js` file. 

**Notes**:
- If you are using TypeScript or a bundler like webpack, you must `import` or `require` your Node.js module where the extractors are defined. This ensures the module gets compiled and bundled into your Lambda deployment package.
- If your Node.js Lambda function runs on `arm64`, you must [define the extractor in your function code][3] instead of using the `DD_TRACE_EXTRACTOR` environment variable.



[1]: /serverless/aws_lambda/distributed_tracing
[2]: /tracing/trace_collection/custom_instrumentation/?tab=datadogapi
[3]: /serverless/guide/handler_wrapper/