---
title: APM (Tracing)
kind: Documentation
description: Instrument your code to improve performance
---

## Overview

Datadog's integrated APM tool eliminates the traditional separation between infrastructure and application performance monitoring. This not only provides greater visibility, but also allows you to see the relationship between application code and the underlying infrastructure.

Datadog APM is offered as an upgrade to our Pro and Enterprise plans. A free 14-day trial is available.  
Registered users can visit the [APM page of the Datadog application](https://app.datadoghq.com/apm/home).

## Instrument your application

With our infrastructure monitoring, metrics are sent to the Datadog Agent, which then forwards them to Datadog. Similarly, tracing metrics are also sent to the Datadog agent. To start tracing your application:

1. Install and configure the latest [Datadog Agent](https://app.datadoghq.com/account/settings#agent) (version 5.11.0 or above is required). For additional information, reference the [getting started guide](/tracing/getting_started)

2. Instrument your application, select one of the following supported languages:

- [Go](/tracing/languages/go)
- [Java](/tracing/languages/java)
- [Python](/tracing/languages/python)
- [Ruby](/tracing/languages/ruby)

To instrument an application written in a language that does not yet have official library support, reference the [Tracing API](/api/?lang=console#traces).

### Running the agent in Docker

To trace applications in Docker containers, you can use the [docker-dd-agent](https://hub.docker.com/r/datadog/docker-dd-agent/) image (tagged version 11.0.5110 or higher) and enable tracing by passing `DD_APM_ENABLED=true` as an environment variable.

For additional information, reference [the Docker page](/tracing/docker)


## How long is tracing data stored?

Individual traces are stored for up to 6 months but to determine how long a particular trace will be stored, the Agent makes a sampling decision early in the trace's lifetime. In Datadog backend, sampled traces are retained according to time buckets:


|Retention bucket|% of stream kept|
|:-----|:--------|
|6 hours|100%|
|Current day (UTC time)|25%|
|6 days|10%|
|6 months|1%|


That is to say, on a given day you would see in the UI:

* **100%** of sampled traces from the last 6 hours
* **25%** of those from the previous hours of the current calendar day (starting at 00:00 UTC)
* **10%** from the previous six calendar days
* **1%** of those from the previous six months (starting from the first day of the month six months ago)
* **0%** of traces older than 6 months


For example, at `9:00am UTC Wed, 12/20` you would see:

* **100%** of traces sampled on `Wed 12/20 03:00 - 09:00`
* **25%** of traces sampled on `Wed 12/20 00:00` - `Wed 12/20 02:59`
* **10%** of traces sampled on `Thurs 12/14 00:00` - `Tue 12/19 23:59`
* **1%** of traces sampled on `7/1 00:00` - `12/13 23:59`
* **0%** of traces before `7/1 00:00`


Once a trace has been viewed, it continues to be available by using its trace ID in the URL: `https://app.datadoghq.com/apm/trace/<trace_id>` This is true even if it “expires” from the UI. This behavior is independent of the UI retention time buckets.

{{< img src="tracing/trace_id.png" alt="Trace ID" responsive="true" popup="true">}}

## Additional resources

For additional help from Datadog staff and other Datadog community members, join the [*apm* channel](https://datadoghq.slack.com/messages/apm) in our Datadog Slack. Visit [http://chat.datadoghq.com](http://chat.datadoghq.com) to join the Slack. We maintain a list of [community tracing libraries](/developers/libraries/#community-tracing-apm-libraries).

You can also reach our APM team via email at [tracehelp@datadoghq.com](mailto:tracehelp@datadoghq.com).
