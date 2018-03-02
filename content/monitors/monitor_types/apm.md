---
title: APM monitor
kind: documentation
description: "Compare an APM metric to a user defined threshold"
further_reading:
- link: "/monitors/notifications"
  tag: "Documentation"
  text: Configure your monitor notifications
- link: "/monitors/downtimes"
  tag: "Documentation"
  text: Schedule a dowtime to mute a monitor
- link: "/monitors/faq"
  tag: "FAQ"
  text: Monitors FAQ
---

## Overview

These work just like regular [metric monitors](/monitors/monitor_types/metric) — but with controls tailored specifically to APM metrics. They allow you to alert at the service level on hits, errors, and a variety of latency measures.

## Setup

1. Select your [environment](/tracing/setup/environment): 
    {{< img src="monitors/monitor_types/apm/apm_select_env.png" alt="APM select Environment" responsive="true" popup="true" style="width:75%;" >}}

2. Select your [service](/tracing/services/service):
    {{< img src="monitors/monitor_types/apm/apm_select_service.png" alt="APM select Service" responsive="true" popup="true" style="width:75%;" >}}
3. Set your alert conditions:
    {{< img src="monitors/monitor_types/apm/apm_set_alert_conditions.png" alt="APM set alert conditions" responsive="true" popup="true" style="width:75%;" >}}
4. Configure your **notification options**:  
    Refer to the [Notifications](/monitors/notifications) dedicated documentation page for a detailed options.

## Further Reading 
{{< partial name="whats-next/whats-next.html" >}}