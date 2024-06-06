---
title: Troubleshooting Serverless Monitoring for AWS Step Functions
kind: documentation
---

## I cannot see any traces

### Verify that your Step Function is configured to send all logs

- Ensure that the `DD_TRACE_ENABLED` environment variable is set to `true` on the Lambda function in your AWS console.
- In your AWS console, open your Step Function's logging tab. Ensure that _Log level_ is set to `ALL`, and that _Include execution data_ is selected.
- Ensure that the CloudWatch log group (also found on the logging tab) has a subscription filter to the Datadog Lambda Forwarder in the same region.

### Verify that logs are forwarded successfully to Datadog
- Check the Datadog Lambda Forwarder for error messages. Ensure that you have correctly set your API key and Datadog site.
- Enable `DEBUG` logs on the Datadog Lambda Forwarder by setting the environment variable `DD_LOG_LEVEL` to `debug`.

### Verify that logs are searchable on Live Search and have DD_TRACE_ENABLED tag
In Datadog, go to [**Logs > Log Stream**][2]. Search for `source:stepfunction`. You may need to trigger the state machine a few times. If you need to upgrade Datadog Lambda Forwarder from an older version, check that after the upgrade, the Forwarder has the `DD_FETCH_STEP_FUNCTIONS_TAGS` tag set to `true`. If the upgraded Forwarder does not have the `DD_FETCH_STEP_FUNCTIONS_TAGS` tag, your Forwarder may not be upgraded correctly. 

If the Forwarder and state machine tags are set up correctly with the previous steps, the logs are tagged with `DD_TRACE_ENABLED:true`.

#### Search historic logs
To enable searching historic logs, add a temporary index to the forwarded logs. In Datadog, open the Logs [**Indexes**][4] tab. Click the **New Index** button in the upper right.

Choose a name, set the index filter to `Source:stepfunction`, leave everything else with default values, and save.

{{< img src="serverless/step_functions/log_index.png" alt="New Log index" style="width:80%;" >}}

If your organization has an existing all-encompassing index with a low limit, place your new index at the top.

**Note**: Indexing logs is not a requirement for getting traces and may incur additional cost. If you are troubleshooting a specific issue, you may wish to temporarily send logs to an index, debug, and delete the index afterwards. See [Indexes][6] for more information.

## Lambda traces are not merging with Step Function traces
- Verify that you can see both Lambda traces and Step Function traces in Datadog.
- Verify that you are using Python layer v95+ or Node.js layer v112+.
- In your AWS console, open your Step Function and ensure that your state machine has `"Payload.$": "States.JsonMerge($$, $, false)"` on the Lambda steps.
- Execute your Step Function once and verify that the `TaskScheduled` event log of the Lambda step has the payload containing data from the [Step Function context object][3].

## I can see the `aws.stepfunctions` root span but I cannot see any step spans
Please enable the `Include execution data` option on the state machine's logging. After enabling this option, log execution input, data passed between states, and execution output is logged. The Datadog backend uses the logs to construct these step spans for you.

## Some step spans are missing in the traces
- For actions, we support basic actions of Lambda and DynamoDB. For example, Lambda Invoke, DynamoDB GetItem, DynamoDB PutItem, DynamoDB UpdateItem and more.
- `Wait`, `Choice`, `Success`, `Fail`, and `Pass` are supported, while `Map` and `Parallel` are not. You are able to see parallel executing spans stacked on top of each other, but no `Parallel` spans show on the flame graph.

## Customized way to deploy Datadog Lambda Forwarder
If you are using your customized way to deploy Datadog Lambda Forwarder, here are some tips that can help you debug enabling Step Functions tracing:
- On the forwarder, set the environment variable `DD_FETCH_STEP_FUNCTIONS_TAGS` to `true`. 
- To enable Step Functions trace generation on the Datadog backend, the Datadog-Forwarder layer version must be greater than 31. This version is able to fetch state machine tags, including the required `DD_TRACE_ENABLED` tag.
- The IAM role for the forwarder should have `tags:getResources` permission.
- Set up a subscription filter on your state machine CloudWatch log group to the Datadog forwarder.
- To verify if logs are reaching the Datadog backend, open the Log Explorer page and search `source:stepfunction` with the `Live` search timeframe (which shows all logs going into Datadog's logs intake). If you cannot see any logs, check if there are any error logs on the Datadog Forwarder such as wrong/invalid API key. Adding the environment variable `DD_LOG_LEVEL` of `DEBUG` helps you debug the Forwarder issue. If you see Step Functions logs, verify that the logs have the `dd_trace_enable:true` tag (all tags are normalized) and you should see Step Function traces associated with the log in a few minutes.


#### Notes
Lambda steps that use the legacy Lambda API cannot be merged. If your Lambda step's definition is `"Resource": "<Lambda function ARN>"` instead of `"Resource": "arn:aws:states:::lambda:invoke"`, then your step is using the legacy Lambda API.

If your Lambda has the `DD_TRACE_EXTRACTOR` environment variable set, its traces cannot be merged.

[1]: https://app.datadoghq.com/logs
[2]: https://app.datadoghq.com/logs/livetail
[3]: https://docs.aws.amazon.com/step-functions/latest/dg/input-output-contextobject.html
[4]: https://app.datadoghq.com/logs/pipelines/indexes
[6]: /logs/log_configuration/indexes/
