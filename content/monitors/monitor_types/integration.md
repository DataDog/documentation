---
title: Integration monitor
kind: documentation
autotocdepth: 3
customnav: monitortypenav
description: "Monitor metric values or health status from a specific integration"
further_reading:
- link: "/monitors/notifications"
  tag: "Monitors"
  text: Configure your monitor notifications
- link: "/monitors/manage_monitor"
  tag: "Monitors"
  text: Manage your monitors
- link: "/monitors/downtimes"
  tag: "Monitors"
  text: Schedule a dowtime to mute a monitor
- link: "/monitors/faq"
  tag: "Monitors"
  text: Consult our FAQ
---

{{< img src="monitors/monitor_types/integration/es_status.png" alt="es status" responsive="true" popup="true">}}

## Overview

On the integration tab you will see a list of your installed integrations. Upon
selection, you can choose to monitor either a "Status" or a "Metric".

- Choosing **Integration Status** will present you with one or more service
  checks for each integration. Please refer to the
  [custom monitors](/monitors/monitor_types/custom_check) section for details on the
  available options.

- Choosing **Integration Metric** will provide a familiar interface used for a
  interface used for a Metric Monitor. You will be able to choose from any of
  the metrics provided by this integration. Please refer to the
  [alert conditions](/monitors/monitor_types/#define-the-conditions) section for details on the available options.

## what's next? 

{{< partial name="whats-next/whats-next.html" >}}