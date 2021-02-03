---
title: Serverless Insights
kind: documentation
further_reading:
- link: "https://www.datadoghq.com/blog/serverless-insights/"
  tag: "Blog"
  text: "Read more about serverless insights"
---

{{< img src="serverless/serverless_actionable_insights_detail.png" alt="Auto-generated insights for your serverless applications" >}}

Datadog automatically generates suggestions to resolve errors and performance problems and optimizes cost for your serverless applications.

## Setup

Datadog uses AWS CloudWatch metrics, Datadog enhanced AWS Lambda metrics, and [Lambda `REPORT` log lines][1] to suggest insights to you. To set these up,

 1. Set up the [Amazon Web Services][2] integration.
 2. Set up the [Datadog Forwarder][3] and ensure your Lambda `REPORT` logs are indexed in Datadog.
 3. Enable [Enhanced Lambda Metrics][4] for your functions.

**Note**: Datadog generates [High Errors](#high-errors), [High Duration](#high-duration), [Throttled](#throttles), and [High Iterator Age](#high-iterator-age) insights out of the box after setting up the [AWS integration][2]. All other insights, including those generated on individual invocations, require the [Datadog Forwarder][3] and [Enhanced Lambda Metrics][4].

## Generated Insights

### Errors

More than 1% of the function's invocations were errors in the selected time range.

**Resolution:** Examine the function's logs, check for recent code or configuration changes with [Deployment Tracking][5], or look for failures across microservices with [distributed tracing][6].

### High Errors

More than 10% of the function's invocations were errors in the selected time range.

**Resolution:** Examine the function's logs, check for recent code or configuration changes with [Deployment Tracking][5], or look for failures across microservices with [distributed tracing][6].

### High Memory Usage

At least one invocation in the selected time range used over 95% of the allocated memory.

[Distributed tracing][6] can help you pinpoint Lambda functions with low memory limits and parts of your application using excessive amounts of memory.

**Resolution:** Lambda functions using close to their maximum configured memory are at risk of being killed by the Lambda runtime, resulting in user-facing errors. Consider increasing the amount of configured memory on your function. Note that this could affect your AWS bill.

### High Duration

At least one invocation in the selected time range exceeded 95% of the configured timeout.

[Distributed tracing][6] can help you pinpoint slow API calls in your application.

**Resolution:** Lambda functions running for close to their configured timeout are at risk of being killed by the Lambda runtime. This could lead to slow or failed responses to incoming requests. Consider increasing the configured timeout if you expect your function to need more execution time. Note that this could affect your AWS bill.

### Cold Starts

More than 1% of the function's invocations were cold starts in the selected time range.

Datadog's [enhanced metrics][4] and [distributed tracing][6] can help you understand the impact of cold starts on your applications today.

**Resolution:** Cold starts occur when your serverless applications receive sudden increases in traffic, and can occur when the function was previously inactive or when it was receiving a relatively constant number of requests. Users may perceive cold starts as slow response times or lag. To get ahead of cold starts, consider enabling [provisioned concurrency][7] on your impacted Lambda functions. Note that this could affect your AWS bill.

### Out of Memory

At least one invocation in the selected time range ran out of memory.

**Resolution:** Lambda functions that use more than their allotted amount of memory can be killed by the Lambda runtime. To users, this may look like failed requests to your application. [Distributed tracing][6] can help you pinpoint parts of your application using excessive amounts of memory. Consider increasing the amount of memory your Lambda function is allowed to use.

### Timeouts

At least one invocation in the selected time range timed out. This occurs when your function runs for longer than the configured timeout or the global Lambda timeout.

**Resolution:** [Distributed tracing][6] can help you pinpoint slow requests to APIs and other microservices. You can also consider increasing the timeout of your function. Note that this could affect your AWS bill.

### Throttles

More than 10% of invocations in the selected time range were throttled. Throttling occurs when your serverless Lambda applications receive high levels of traffic without adequate [concurrency][8].

**Resolution:** Check your [Lambda concurrency metrics][9] and confirm if `aws.lambda.concurrent_executions.maximum` is approaching your AWS account concurrency level. If so, consider configuring reserved concurrency, or request a service quota increase from AWS. Note that this may affect your AWS bill.

### High Iterator Age

The function's iterator was older than two hours. Iterator age measures the age of the last record for each batch of records processed from a stream. When this value increases, it means your function cannot process data fast enough.

**Resolution:** Enable [distributed tracing][6] to isolate why your function has so much data being streamed to it. You can also consider increasing the shard count and batch size of the stream your function reads from.

### Over Provisioned

No invocation in the selected time range used more than 10% of the allocated memory. This means your function has more billable resources allocated to it than it may need.

**Resolution:** Consider decreasing the amount of allocated memory on your Lambda function. Note that this may affect your AWS bill.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/lambda/latest/dg/python-logging.html
[2]: /integrations/amazon_web_services/#setup
[3]: /serverless/forwarder
[4]: /serverless/enhanced_lambda_metrics
[5]: /serverless/deployment_tracking
[6]: /serverless/distributed_tracing
[7]: https://www.datadoghq.com/blog/monitor-aws-lambda-provisioned-concurrency/
[8]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html
[9]: /integrations/amazon_lambda/#metrics
