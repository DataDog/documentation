---
title: Serverless Warnings

further_reading:
- link: "https://www.datadoghq.com/blog/serverless-insights/"
  tag: "Blog"
  text: "Read more about serverless insights"
aliases:
    - /serverless/troubleshooting/insights/
    - /serverless/insights/
    - /serverless/guide/insights
---

Datadog automatically generates suggestions to resolve errors and performance problems and optimizes cost for your serverless applications.

In addition to the insights provided by [Watchdog for Serverless][1], Datadog Serverless Monitoring detects a number of issues regarding your functions and creates **warnings**.


## Setup

Datadog uses AWS CloudWatch metrics, Datadog enhanced AWS Lambda metrics, and [Lambda `REPORT` log lines][2] to suggest warnings to you. To set these up,

 1. Set up the [Amazon Web Services][3] integration.
 2. Set up the [Datadog Forwarder][4] and ensure your Lambda `REPORT` logs are indexed in Datadog.
 3. Enable [Enhanced Lambda Metrics][5] for your functions.

**Note**: Datadog generates [High Errors](#high-errors), [High Duration](#high-duration), [Throttled](#throttles), and [High Iterator Age](#high-iterator-age) warnings out of the box after setting up the [AWS integration][3]. All other warnings, including those generated on individual invocations, require the [Datadog Forwarder][4] and [Enhanced Lambda Metrics][5].

## Generated warnings

### Errors

More than 1% of the function's invocations were errors in the selected time range.

**Resolution:** Examine the function's logs, check for recent code or configuration changes with [Deployment Tracking][6], or look for failures across microservices with [distributed tracing][7].

### High errors

More than 10% of the function's invocations were errors in the selected time range.

**Resolution:** Examine the function's logs, check for recent code or configuration changes with [Deployment Tracking][6], or look for failures across microservices with [distributed tracing][7].

### High memory usage

At least one invocation in the selected time range used over 95% of the allocated memory.

[Distributed tracing][7] can help you pinpoint Lambda functions with low memory limits and parts of your application using excessive amounts of memory.

**Resolution:** Lambda functions using close to their maximum configured memory are at risk of being killed by the Lambda runtime, resulting in user-facing errors. Consider increasing the amount of configured memory on your function. Note that this could affect your AWS bill.

### High duration

At least one invocation in the selected time range exceeded 95% of the configured timeout.

[Distributed tracing][7] can help you pinpoint slow API calls in your application.

**Resolution:** Lambda functions running for close to their configured timeout are at risk of being killed by the Lambda runtime. This could lead to slow or failed responses to incoming requests. Consider increasing the configured timeout if you expect your function to need more execution time. Note that this could affect your AWS bill.

### Cold starts

More than 1% of the function's invocations were cold starts in the selected time range.

Datadog's [enhanced metrics][5] and [distributed tracing][7] can help you understand the impact of cold starts on your applications today.

**Resolution:** Cold starts occur when your serverless applications receive sudden increases in traffic, and can occur when the function was previously inactive or when it was receiving a relatively constant number of requests. Users may perceive cold starts as slow response times or lag. To get ahead of cold starts, consider enabling [provisioned concurrency][8] on your impacted Lambda functions. Note that this could affect your AWS bill.

### Out of memory

At least one invocation in the selected time range ran out of memory.

**Resolution:** Lambda functions that use more than their allotted amount of memory can be killed by the Lambda runtime. To users, this may look like failed requests to your application. [Distributed tracing][7] can help you pinpoint parts of your application using excessive amounts of memory. Consider increasing the amount of memory your Lambda function is allowed to use.

### Timeouts

At least one invocation in the selected time range timed out. This occurs when your function runs for longer than the configured timeout or the global Lambda timeout.

**Resolution:** [Distributed tracing][7] can help you pinpoint slow requests to APIs and other microservices. You can also consider increasing the timeout of your function. Note that this could affect your AWS bill.

### Throttles

More than 10% of invocations in the selected time range were throttled. Throttling occurs when your serverless Lambda applications receive high levels of traffic without adequate [concurrency][9].

**Resolution:** Check your [Lambda concurrency metrics][10] and confirm if `aws.lambda.concurrent_executions.maximum` is approaching your AWS account concurrency level. If so, consider configuring reserved concurrency, or request a service quota increase from AWS. Note that this may affect your AWS bill.

### High iterator age

The function's iterator was older than two hours. Iterator age measures the age of the last record for each batch of records processed from a stream. When this value increases, it means your function cannot process data fast enough.

**Resolution:** Enable [distributed tracing][7] to isolate why your function has so much data being streamed to it. You can also consider increasing the shard count and batch size of the stream your function reads from.

### Over provisioned

No invocation in the selected time range used more than 10% of the allocated memory. This means your function has more billable resources allocated to it than it may need.

**Resolution:** Consider decreasing the amount of allocated memory on your Lambda function. Note that this may affect your AWS bill.

### Threats detected

Attack attempts were detected targeting the serverless application. 

**Resolution:** Investigate the attack attempts in ASM by clicking the **Security Signals** button to determine how to respond. If immediate action is needed, you can block the attacking IP in your WAF through the [Workflows integration][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /watchdog/insights#serverless
[2]: https://docs.aws.amazon.com/lambda/latest/dg/python-logging.html
[3]: /integrations/amazon_web_services/#setup
[4]: /serverless/forwarder
[5]: /serverless/enhanced_lambda_metrics
[6]: /serverless/deployment_tracking
[7]: /serverless/distributed_tracing
[8]: https://www.datadoghq.com/blog/monitor-aws-lambda-provisioned-concurrency/
[9]: https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html
[10]: /integrations/amazon_lambda/#metrics
[11]: https://app.datadoghq.com/workflow/blueprints?selected_category=SECURITY
