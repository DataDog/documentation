---
title: Monitor based SLO
kind: documentation
description: "Use Monitors to define the Service Level Objective"
further_reading:
- link: "monitors"
  tag: "Documentation"
  text: "More information about Monitors"
---

## Overview

Monitor based SLOs are useful for a time-based stream of data where you are differentiating time of good behavior vs bad behavior. 
Using the sum of the good time divided by the sum of total time provides a Service Level Indicator (or SLI).

## Service Level Objective creation

To create a [monitor SLO][1] in Datadog, use the main navigation: *Monitors --> New Service Level Objective --> Monitor Based*.

### Define the source (SLI)

{{< tabs >}}
{{% tab "Monitor Based" %}}

Use the input area to search for monitors that should apply using the same search syntax as in the Manage Monitors page.

You can select up to 20 monitors to include in the SLO.

Example: You might be tracking the uptime of a physical device. You have already configured a metric monitor on `host:foo` using
a custom metric. This monitor might also ping your on-call team if it's no longer reachable. To avoid burnout you want to
track how often this host is down. 

Search for this monitor by name and click on it to add it to the source list.

{{% /tab %}}
{{% tab "Set your targets" %}}

Setting your targets for your SLI's is an important step, this is the value that you are aiming for or better.

First select your target value, example: `95% of the time I expect the host to be up over the last 30 days`.

You can optionally include a warning value that is greater than the target value to indicate when you are approaching
an SLO breach.


{{% /tab %}}
{{% tab "Identify this indicator" %}}

Here we add contextual information about the purpose of the SLO, including any related information
in the description and tags you would like to associate with the SLO.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/slo/new/monitor
