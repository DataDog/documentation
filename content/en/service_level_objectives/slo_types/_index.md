---
title: Service Level Objectives
kind: documentation
aliases:
    - /slos
---

## Setup

Use the SLO and uptime widget to track your SLOs (Service Level Objectives) and uptime on screenboards and timeboards. You can use SLO by adding a widget to a dashboard, or by going to Datadog’s [Service Level Objectives page][1] to create new SLOs and view all existing ones. Select an existing SLO from the dropdown and display it on any dashboard.

*Uptime* is defined as the amount of time a monitor was in an *up* state (OK) compared to *down* state (non-OK). The status is represented in bars as green (up) and red (down). Example: ’99 % of the time latency is less than 200ms.`

You can also track success rate and event-based SLIs (Service Level Indicators). Example: `99 % of requests are successful.`

{{< img src="monitors/slo/create-slo.png" alt="create a slo" responsive="true" >}}

{{< whatsnext desc="Select a SLO type:">}}
    {{< nextlink href="/service_level_objectives/slo_types/monitor" >}}Monitor{{< /nextlink >}}
    {{< nextlink href="/service_level_objectives/slo_types/metric" >}}Metric{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Additional Docs:">}}
    {{< nextlink href="/api/#service-level-objectives" >}}API Usage{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/slo/new
[2]: /api/#servicelevelobjectives
[3]: /developers/libraries/#managing-service-level-objectives
