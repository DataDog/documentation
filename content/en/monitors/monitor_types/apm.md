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

1. Select your [environment][2]: 
    {{< img src="monitors/monitor_types/apm/apm_select_env.png" alt="APM select Environment" responsive="true" style="width:75%;" >}}

2. Select your [service][3]:
    {{< img src="monitors/monitor_types/apm/apm_select_service.png" alt="APM select Service" responsive="true" style="width:75%;" >}}
3. Set your alert conditions:
    {{< img src="monitors/monitor_types/apm/apm_set_alert_conditions.png" alt="APM set alert conditions" responsive="true" style="width:75%;" >}}
4. Configure your **notification options**:  
    Refer to the [Notifications][4] dedicated documentation page for a detailed options.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/metric
[2]: /tracing/setup/first_class_dimensions#environment
[3]: /tracing/visualization/service
[4]: /monitors/notifications
