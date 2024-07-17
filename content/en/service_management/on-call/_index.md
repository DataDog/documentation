---
title: On-Call
further_reading:
- link: 'https://www.datadoghq.com/blog/datadog-on-call/'
  tag: 'Blog'
  text: 'Enrich your on-call experience by using Datadog On-Call'
cascade:
    algolia:
        rank: 70
---

{{< callout url="https://www.datadoghq.com/private-beta/on-call/" >}}
  Datadog On-Call is in private beta. Complete the form to request access.
{{< /callout >}} 

Datadog On-Call integrates monitoring, paging, and incident response into one platform.

## Concepts

- **Pages**:
- **Teams**:
- **Processing rules**:
- **Escalation policies**:
- **Schedules**:

## How it works

**Teams** are the central organizational unit of Datadog On-Call. When a notification is triggered in Datadog, a **Page** is sent to the designated On-Call Team.

{{< img src="service_management/oncall/notification_page.png" alt="Notification that mentions an On-Call Team." style="width:80%;" >}}

Each team has **processing rules** that route a Page to an appropriate **Escalation Policy**.