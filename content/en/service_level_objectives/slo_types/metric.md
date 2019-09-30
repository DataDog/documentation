---
title: Metric based SLO
kind: documentation
description: "Use Metrics to define the Service Level Objective"
further_reading:
- link: "metrics"
  tag: "Documentation"
  text: "More information about metrics"
---

## Overview

Metric based SLOs are useful for a count-based stream of data where you are differentiating good and/or bad events. 
Using the sum of the good events divided by the sum of total events over time provides a Service Level Indicator (or SLI).

## Service Level Objective creation

To create a [metric SLO][1] in Datadog, use the main navigation: *Monitors --> New Service Level Objective --> Event Based*.

### Define the source (SLI)

{{< tabs >}}
{{% tab "Event Based" %}}

There are 2 queries to define. The first query defines the sum of the good events, while the second query defines the sum of
the total events.

It is only recommended to use the `sum by` aggregator and to add all events.

Example: If tracking HTTP return codes, and your metric includes a tag like `code:2xx` || `code:3xx` || `code:4xx`.
The sum of good events would be `sum:httpservice.hits{code:2xx} + sum:httpservice.hits{code:4xx}`. And the `total` events
would be `sum:httpservice.hits{!code:3xx}`. 

Why did we exclude `HTTP 3xx`? - These are typically redirects and should not count for or against the SLI, but other non 3xx
based error codes should. In the `total` case we want all types minus `HTTP 3xx`, in the `numerator` we only want `OK` type
status codes.

{{% /tab %}}
{{% tab "Set your targets" %}}

Setting your targets for your SLI's is an important step, this is the value that you are aiming for or better.

First select your target value, example: `95% of all HTTP requests should be "good" over the last 7 days`.

You can optionally include a warning value that is greater than the target value to indicate when you are approaching
an SLO breach.


{{% /tab %}}
{{% tab "Identify this indicator" %}}

Here we add contextual information about the purpose of the SLO, including any related information
in the description and tags you would like to associate with the SLO.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/new/event
