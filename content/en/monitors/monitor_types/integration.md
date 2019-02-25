---
title: Integration monitor
kind: documentation
description: "Monitor metric values or health status from a specific integration"
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

{{< img src="monitors/monitor_types/integration/es_status.png" alt="es status" responsive="true" >}}

## Overview

On the integration tab you see a list of your installed integrations. Upon selection, you can choose to monitor either a "Status" or a "Metric".

- Choosing **Integration Status** presents you with one or more service checks for each integration. Refer to the [custom monitors][1] section for details on the available options.

- Choosing **Integration Metric** provides a familiar interface used for a Metric Monitor. You are able to choose from any of the metrics provided by this integration. Refer to the [alert conditions][2] section for details on the available options.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/monitor_types/custom_check
[2]: /monitors/monitor_types/#define-the-conditions
