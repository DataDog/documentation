---
title: Context Links
kind: guide
further_reading:
   - link: '/dashboards/widgets'
     tag: 'Documentation'
     text: 'List of Dashboard Widgets'

---

## Overview

Your dashboards are fundamental in troubleshooting the root cause of an issue or determining an assertion to a critical question. Dashboard widgets can appear in your [notebooks][1], attached to a [monitor notification][2], or serve as a [screenboard][3]. 

Use Datadog dashboards to perform an initial assessment of your context-relevant data sources. In third-party applications, you may also need to access external data or perform follow-up actions. Context links also allow you to access and trigger third-party applications through webhooks as well as override default links. 

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Context Link Demo" video="true" style="width:80%;">}}

Dashboard widgets contain default links to relevant Datadog pages with information about the scope including the timerange, underlying queries, and the series on a graph. [Generic widgets][4] contain customizable links, allowing you to point to third-party applications and override the default links to customize your landing page. 

This guide introduces context links and provides examples of how to create external links and override default links.

## Add a context link

By default, context links appear in the dropdown menu when you click on or in a widget in your dashboards and quick graphs. You can edit Out-of-the-box context links in the **Edit** tab under **Edit** > **Graph your data**. 

To create a context link, click **+ Add a Context Link**.

1. Add a description in the **Label** field. 
2. Enter the URL to your external application in the **URL** field.
3. Add key-value pairs by clicking **+ Add URL Parameter**.
4. Click **Save**.

You can hide context links by clicking the **Hide** button on the right corner. To show hidden context links, click the **Show** button on the right corner.

This example tracks the Metrics query for an AWS EC2 instance. 

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="AWS EC2 Query" style="width:80%;">}}

For an AWS EC2 instance summary link like `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`, format the link to `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}`.

### Link your dashboard to a third-party application

You can add a context link from your host dashboard to your AWS EC2 instance summary in the AWS Console.

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="AWS EC2 Query Interaction" style="width:100%;">}}

Use `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94` as the AWS EC2 instance summary link.

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="AWS EC2 Query Result" style="width:80%;">}}

### Trigger a webhook

To start a runbook, see the [Azure Automation documentation][5].

### Link to Customer Support

You can add a context link to your Customer Support Center user page in Zendesk. 

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Zendesk Query Result" style="width:80%;">}}

For a Customer Support Center link like `https://acme.zendesk.com/agent/search/1?type=user&q=shane%40doe.com`, format the link to `https://acme.zendesk.com/agent/search/1?type=user&q={{@usr.email.value}}`.

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Zendesk Query" style="width:80%;">}}

In this example, you can use `Zendesk User Page` as a label and `https://acme.zendesk.com/agent/search/1?type=user&q={{@usr.email.value}}` as a URL.

{{< img src="dashboards/guide/context_links/zendesk_link.png" alt="Zendesk Link" style="width:80%;">}}

When you click in your dashboard, the **Zendesk User page** link appears in the dropdown menu. 

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Zendesk User Page Context Link" style="width:80%;">}}

## Override a context link

In the Logs Explorer, you can override the default links with a saved view. 

In the RUM Explorer, you can reinterpret the value from another context by setting the `client.ip` of an HTTP call in RUM as the `source.ip` of a network flow.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /monitors/notify
[3]: /dashboards/dashboards/
[4]: /dashboards/widgets/
[5]: https://docs.microsoft.com/en-us/azure/automation/start-runbooks
