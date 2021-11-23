---
title: Make dashboards widgets an entry point of your workflows with related links
kind: guide
aliases:
  - /logs/guide/custom-links
  - /logs/guide/custom_links
further_reading:
  - link: /dashboards/widgets/
    tag: Documentation
    text: "List of Dashboard Widgets"

---

## Overview

Dashboards are a **homebase for troubleshooting**. Whether they are part of your [runbooks][1], attached to a [monitor notification][2] or simply a [screenboard][3] you always keep an eye on, dashboards are designed to perform first assessment across multiple datasources that your consider relevant for a specific context.

However some investigations require a **deeper dive into specialised pages**: 
* in the Datadog application, where built-in features would make a difference to spot the root cause of a problem or the core answer to a specific question,
* in a third-party application, to access external data or perform specific follow-up actions.

{{< img src="dashboards/guide/related_links/overview.mp4" alt="Dashboards Assessment" style="width:80%;" >}}

Dashboards widgets come with **default links** to other relevant datadog pages, contextualised with the current scope (timerange, underlying queries and when applicable series identified on a graph). For [generic widgets][4], those links are **customisable** for you to point towards external applications, or override default behaviour to fine-tune the context of the landing page.

In this guide, you'll learn:
* The basics of the feature: how to configure which links appear, create new links and override existing ones
* Examples for creating external links
* Examples for overriding datadog links


## Basics of the Feature

## Creating links to third-part applications

### Linking your host Dashboard to your EC2 instance summary in AWS Console

Dashboards give

EC2 instance summaries links follow that pattern
`https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`


`https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}`

{{< img src="dashboards/guide/related_links/ec2_query.png" alt="EC2 Query" style="width:80%;" >}}

{{< img src="dashboards/guide/related_links/ec2-interaction.png" alt="Link Interaction" style="width:80%;" >}}


### Triggering a webhook to a Azure Automation Runbook

https://docs.microsoft.com/en-us/azure/automation/start-runbooks


### Linking to your Customer Support Center


`https://acme.zendesk.com/agent/search/1?type=user&q=shane%40doe.com`

https://acme.zendesk.com/agent/search/1?type=user&q={{@usr.email.value}}




## Overriding native links

### Jump to the log explorer in the context of a specific saved view

https://app.datadoghq.com/logs?saved_view=305130&query=@usr.name:Bruce.Brown


### Reinterprete a value from another context 

(reinterpret the client.ip of a http call - in RUM - as the source.ip of a network flow)


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /monitors/notify/
[3]: /dashboards/dashboards/
[4]: /dashboards/widgets/

