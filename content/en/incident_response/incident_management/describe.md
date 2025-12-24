---
title: Describe an Incident
aliases:
- /service_management/incident_management/describe/
further_reading:
- link: "/service_management/incident_management/incident_settings"
  tag: "Documentation"
  text: "Customize incidents in Incident Settings"
- link: "/service_management/incident_management/notification"
  tag: "Documentation"
  text: "Configure Incident Notifications"
---

## Overview

No matter where you [declare an incident][1], it’s important to describe it as thoroughly as possible to share the information with other people involved in your organization’s incident management process. The incident details should give information on:
- What happened
- Why it happened
- Attributes associated with the incident

## Incident details

An incident's status and details can be updated on the incident's Overview tab. Within an incident, fill out the Overview tab with relevant details—including incident summary, customer impact, affected services, incident responders, root cause, detection method, and severity—to give your teams all the information they need to investigate and resolve an incident. 

Update the impact section to record customer impacts, including their start and end times. These impacts influence incident analytics to help your organization analyze the impact of incidents on your business.

You can define your own custom incident fields on the [Incident Settings Property Fields][2] page.

### Status levels

The default statuses are **Active**, **Stable**, and **Resolved**. You can add the **Completed** status and customize the description of each status level in the Incident Settings page.

* Active: Incident affecting others.
* Stable: Incident no longer affecting others, but investigations incomplete.
* Resolved: Incident no longer affecting others and investigations complete.
* Completed: All remediation complete.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/incident_management/declare
[2]: https://app.datadoghq.com/incidents/settings#Property-Fields