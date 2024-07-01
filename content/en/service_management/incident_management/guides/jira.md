---
title: Integrate Jira with Datadog Incident Management
kind: Guide
disable_toc: false
further_reading:
- link: "integrations/jira/"
  tag: "Documentation"
  text: "Install the Jira Integration"
- link: "https://app.datadoghq.com/integrations/jira"
  tag: "App"
  text: "In-app Jira integration tile"

---

## Overview

Jira is an issue and project tracking system for software teams. The Datadog Jira integration allows you to create issues incidents in Datadog and view issues created in Jira as Datadog events. 

The Jira integration with Datadog Incident Management provides you with the following benefits:
- **Improved Visibility**: Ensure that all stakeholders are immediately informed about incidents, facilitating a quicker response.
- **Supporting Existing Workflows**: Seamlessly integrate with your current processes, making it easier to plan work and manage priorities with Jira.
- **Customization at Your Fingertips**: With dynamic templates, you can map Datadog severities to Jira priorities, add custom labels, define dynamic assignees, and more.

## Prerequisites

To use automatic ticket creation, install the integration through the [Jira Integration tile][1]. For more information, see the [Jira integration][2] documentation.

## Setup

1. On the [Integration Settings page][3], find the Jira integration. 
1. Click the toggle for **Automatically create a Jira Issue**.
3. Define a template with dynamic variables to drive the content of the Jira ticket. The template maps severities to Jira priorities, adds labels, defines a dynamic assignee, and more.

{{< img src="service_management/incidents/guide/jira/incident_jira_template.png" alt="Example template for Jira tickets that are automatically created from Datadog incidents" style="width:80%;" >}}

As incidents are created, an issue is also created in the corresponding Jira instance. This Jira issue links to the incident in Datadog for reference. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/jira
[2]: /integrations/jira/
[3]: https://app.datadoghq.com/incidents/settings#Integrations
[4]: https://app.datadoghq.com/incidents
