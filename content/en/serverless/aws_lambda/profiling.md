---
title: Continuous Profiler for AWS Lambda
kind: documentation
further_reading:
    - link: '/profiler/'
      tag: 'Documentation'
      text: 'Continuous Profiler'
    - link: '/serverless/distributed_tracing'
      tag: 'Documentation'
      text: 'Distributed Tracing for AWS Lambda'
---

{{< img src="serverless/lambda/profiling_hero.png" alt="Continuous Profiling for AWS Lambda" style="width:100%;" >}}

Datadog's [Continuous Profiler][1] for AWS Lambda functions gives you visibility into the exact method name, class name, and line number in your Lambda code that is causing CPU or I/O bottlenecks.

<div class="alert alert-warning">
Continuous Profiler for AWS Lambda is in public beta. During the beta period, profiling for Node and Python is available at no additional cost.
</div>

## Usage

To enable profiling:

1. Ensure you have [installed the associated tracing library][2] in your Lambda function.
2. Set the `DD_PROFILING_ENABLED` environment variable to `true`.

Data is available after a minimum of 60 execution seconds of the Lambda function.

The profiler works by spawning a thread that periodically wakes up and takes a snapshot of the CPU and heap of running code. This includes the profiler itself. If you want the profiler to ignore itself, set `DD_PROFILING_IGNORE_PROFILER` to `true`.


### Support

Depending on your runtime, this feature requires the following tracer and layer versions:

| Runtime | Minimum tracer version | Minimum layer version |
| ------- | ---------------------- | --------------------- |
| Python | 1.4.0 | 62 |
| Node.js | 2.22.1, 3.9.0 | 87 |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/
[2]: /serverless/installation
