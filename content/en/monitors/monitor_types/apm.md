---
title: APM monitor
kind: documentation
description: "Compare an APM metric to a user defined threshold"
further_reading:
- link: "monitors/notifications"
  tag: "Documentation"
  text: "Configure your monitor notifications"
- link: "monitors/downtimes"
  tag: "Documentation"
  text: "Schedule a downtime to mute a monitor"
- link: "monitors/monitor_status"
  tag: "Documentation"
  text: "Consult your monitor status"
---

## Overview

These work just like regular [metric monitors][1] - but with controls tailored specifically to APM metrics. They allow you to alert at the service level on hits, errors, and a variety of latency measures.

## Setup

1. Select your monitor scope—[environment][2], [service][3], and [resource][4]:
    {{< img src="monitors/monitor_types/apm/apm_select_scope.png" alt="APM select Scope" responsive="true" style="width:75%;" >}}
2. Set your alert conditions:
    {{< img src="monitors/monitor_types/apm/apm_set_alert_conditions.png" alt="APM set alert conditions" responsive="true" style="width:75%;" >}}
3. Configure your **notification options**:
    Refer to the [Notifications][5] dedicated documentation page for detailed options.

**Note**: Find service level monitors on the [Services page][6] and on the [Service Map][7], and find resource level monitors on the individual Resource pages (you can get there by clicking on the specific Resource listed on the [Services page][6]).

## Further Reading
{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/metric
[2]: /tracing/advanced/setting_primary_tags_to_scope/#environment
[3]: /tracing/visualization/service
[4]: /tracing/visualization/resource
[5]: /monitors/notifications
[6]: https://app.datadoghq.com/apm/services
[7]: https://app.datadoghq.com/apm/map
