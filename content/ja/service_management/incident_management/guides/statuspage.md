---
title: Integrate Statuspage with Datadog Incident Management
kind: Guide
disable_toc: false
further_reading:
- link: integrations/statuspage/
  tag: Documentation
  text: Install the Statuspage Integration
- link: "https://app.datadoghq.com/integrations/statuspage"
  tag: App
  text: In-app Statuspage integration tile
- link: monitors/guide/integrate-monitors-with-statuspage/
  tag: Guide
  text: Integrating Monitors With Statuspage
- link: "synthetics/guide/synthetic-test-monitors/#integrate-your-synthetic-test-monitor-with-statuspage"
  tag: Guide
  text: Integrate your Synthetic test monitor with Statuspage
---

## Overview

Atlassian's Statuspage conveys real-time status of an organization's services on a webpage. Enable the integration to automatically link and update your Statuspage incident within Datadog's Incident Management platform. As an Incident Commander or Responder, you can:
- Send customer facing messages with accurate and up to date information
- Update Statuspage while investigating an incident without leaving the Datadog platform
- Resolve both Datadog incidents and the linked Statuspage incident at the same time

## Prerequisites

Install the integration through the [Statuspage Integration tile][1]. For more information, see the [Statuspage integration][2] documentation.

## セットアップ

1. In the [Integration Settings page][3], find the Statuspage integration. 
1. Toggle **Enable Statuspage incident creation**.

## Add a Statuspage incident

1. In the [Incidents page][4], open an existing incident.
1. At the top of the incident page, click **Add a Statuspage incident**.
1. Enter all the required fields, which include Select a Statuspage, Incident name, and Incident status. You can also specify which Statuspage components are affected. 

{{< img src="service_management/incidents/guide/statuspage/add_update_statuspage_form.png" alt="Form to add or update a Statuspage incident, including required fields for Select a Statuspage, Incident name, and Incident status" style="width:70%;" >}}

## Update status

After a Statuspage is added to an incident, you can continue updating the Statuspage until the incident is resolved.

{{< img src="service_management/incidents/guide/statuspage/update_status_modal.png" alt="Example incident highlighting the linked statuspage incident and the option to Update Statuspage incident" style="width:80%;" >}}

1. In the [Incidents page][4], open the incident you want to update.
1. Find the Statuspage you added and click the button to open an integration modal. You can unlink the Statuspage integration, change the impact, or update the Statuspage.
1. Click **Update Statuspage** to open the linked Statuspage details and make your modifications.
1. Click **Update** to update the Statuspage incident.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/statuspage
[2]: /integrations/statuspage/
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: https://app.datadoghq.com/incidents
