---
title: Bits AI in RUM
description: "Use Bits Investigation and Bits Chat from RUM to optimize your application's performance, find the root cause of regressions, and ask questions about your frontend."
aliases:
  - /real_user_monitoring/ai_investigations/
further_reading:
  - link: "/bits_ai/bits_investigation/"
    tag: "Documentation"
    text: "Bits Investigation"
  - link: "/bits_ai/bits_chat/"
    tag: "Documentation"
    text: "Bits Chat"
  - link: "/real_user_monitoring/operations_monitoring/"
    tag: "Documentation"
    text: "Operations Monitoring"
---

## Overview

Real User Monitoring (RUM) is integrated with [Bits AI][1]. You can start [Bits Investigations][2] from RUM, and use [Bits Chat][3] on any RUM page. RUM provides Bits with frontend-specific context, such as Core Web Vitals, view load timelines, operation health, and session-level signals. Bits correlates that context with the rest of your telemetry, including APM traces, logs, profiles, and source code, to identify root causes.

Because RUM uses Bits Investigation, every investigation you start from RUM is saved in the [Bits Investigations list][4], can be shared with your team, takes your past feedback into account, and can be sent to [Bits Code][5] to generate a fix.

You can use Bits AI in RUM in three ways:

| Use case | Entry points | Bits capability |
|---|---|---|
| [Optimize performance][6] | Recommendation cards on the {{< ui >}}Optimization{{< /ui >}} page and in [Operations Monitoring][7] | Bits Investigation |
| [Investigate regressions and alerts][8] | {{< ui >}}Anomaly · Investigate{{< /ui >}} on vital charts, and automatic investigations on RUM monitors | Bits Investigation |
| [Ask questions and get tasks done][9] | {{< ui >}}Ask Bits{{< /ui >}} on a view, {{< ui >}}Analyze with Bits AI{{< /ui >}} on charts, and Bits Chat on any RUM page | Bits Chat |

## Prerequisites

- Bits AI must be enabled for your organization.
- To start a Bits Investigation, you need the {{< ui >}}Bits Investigations Write{{< /ui >}} permission. For more information, see [Configure Bits Investigation][10].
- To get code-level findings, set up the [Source Code Integration][11] with GitHub.
- To let Bits attribute frontend issues to backend services, [correlate RUM with APM traces][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/
[2]: /bits_ai/bits_investigation/
[3]: /bits_ai/bits_chat/
[4]: https://app.datadoghq.com/bits-ai/investigations
[5]: /bits_ai/bits_code/
[6]: /real_user_monitoring/bits_ai/optimize_performance/
[7]: /real_user_monitoring/operations_monitoring/
[8]: /real_user_monitoring/bits_ai/investigate_regressions/
[9]: /real_user_monitoring/bits_ai/bits_chat/
[10]: /bits_ai/bits_investigation/configure/
[11]: /source_code/
[12]: /real_user_monitoring/correlate_with_other_telemetry/apm/
