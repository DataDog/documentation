---
title: Context Links
kind: guide
further_reading:
- link: '/dashboards/widgets'
  tag: 'Documentation'
  text: 'List of Dashboard Widgets'

---

## Overview

Your dashboards are fundamental in troubleshooting the root cause of an issue or determining an assertion to a critical question. 

Dashboards can appear in your [notebooks][1], attached to a [monitor notification][2], or serve as a [screenboard][3]. You can start an investigation with a screenboard, document your insights in a notebook, and stay alerted by linking a monitor notification to your dashboard. 

Use Datadog dashboards to perform an initial assessment of your context-relevant data sources and explore insights in Datadog or in a third-party application.  

## Dashboard widgets

Dashboard widgets contain default links to relevant Datadog pages with information about the scope including the timerange, underlying queries, and the series on a graph. [Generic widgets][4] contain context links, allowing you to point to third-party applications and override the default links to customize your landing page. 

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Context Link Demo" video="true" style="width:80%;">}}

This guide introduces context links and provides examples of how to create external links and override default links.

## Context links

When investigating an issue, you may need to access external data or perform follow-up actions in a third-party application. Context links allow you to access and trigger third-party applications through webhooks in your dashboard widgets. 

Out-of-the-box context links contain URLs to your underlying data and products in Datadog such as [Infrastructure][5], [APM][6], and [Logs][7]. Context links appear in the dropdown menu when you click on or in a widget in your dashboards. 

If you have a generic widget with RUM data, the **View RUM events** link is present by default. The **View RUM events** link is hidden from your dashboard in summary and decoration widgets. 

### Edit a context link

Edit the list of context links on your dashboards to improve the navigation of your dashboards and investigation workflows. Click the **Edit** button on the right corner of the widget to access the list of context links under **Edit** > **Graph your data**.

You can hide context links by selecting **Hide in context menu** before clicking **Save** or clicking the **Hide** button on the right corner. To see hidden context links on your dashboard, click the **Show** button on the right corner.

## Create a context link

To create a context link, click **+ Add a Context Link**. Optionally, click the **Settings** button on the right corner of your dashboard widget and click **Create custom links**.

{{< img src="dashboards/guide/context_links/example-context-link.png" alt="Example context link" style="width:80%;" >}}

1. Add a description in the **Label** field such as `See Hello World`. 
2. Enter the URL to your external application in the **URL** field such as `www.google.com/?q="hello world"`.
3. Key-value pairs appear below as URL parameters. Click **+ Add URL Parameter** to add additional parameters.
4. Click **Save** and finish editing your dashboard widget configuration.

When you click on the dashboard widget, the **See Hello World** link is available in the dropdown menu.

## Customize a context link

### Use template variables

Available template variables for context links include the widget filter, widget time range, dashboard template variables (if any), and the specific series of user actions (if any). 

Optionally, you can write the URL with the double brackets `{{ }}` syntax to avoid URL encoding. For example, you can use either `https://www.google.com/?q="hello world"` or `https://www.google.com%2F%3Fq%3D%22hello+world%22`.

When the expected URL output contains a complex pattern involving a domain name and deep URL parameters, use template variables as the values in your context link URL parameters. 

1. Add a link description in the **Label** field such as `See Hello World`.
2. Enter a valid destination link with an arbitrary value in the **URL** field such as `www.google.com/?q="hello world"`.
3. Replace the arbitrary value with a relevant template variable such as `www.google.com/?q="{{source.value}}"`.
4. Click **Save** and finish editing your dashboard widget configuration.

When you click on the dashboard widget, the **See Hello World** link is available in the dropdown menu.

## Add a context link to a third-party application

You can add a context link from your host dashboard to pages in third-party applications such as your AWS EC2 instance summary or your Customer Support Center user profile in Zendesk.

### Link to the AWS Console

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="AWS EC2 Query Result" style="width:90%;">}}

For example, you can create context links in a dashboard widget with Metrics query data for an AWS EC2 instance. 

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="AWS EC2 Query" style="width:70%;">}}

For an AWS EC2 instance summary link such as `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`, you can use `AWS EC2 Instance Summary` as the label and [template variables](#template-variables) to set the URL parameters. The example URL is `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}`.

Click **Save** and finish editing your dashboard widget configuration.

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="AWS EC2 Query Interaction" style="width:90%;">}}

When you click on the dashboard widget, the **AWS EC2 Instance Summary** link sends you to `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`.

### Link to Zendesk

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Zendesk Query Result" style="width:90%;">}}

For example, you can add context links to your Customer Support Center's user page in a dashboard widget with RUM data. 

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Zendesk Query" style="width:80%;">}}

For a Zendesk link such as `https://acme.zendesk.com/agent/search/1?type=user&q=shane%40doe.com`, you can use `Zendesk User Page` as the label and [template variables](#template-variables) to set the URL parameters. The example URL is `https://acme.zendesk.com/agent/search/1?type=user&q={{@usr.email.value}}`.

Click **Save** and finish editing your dashboard widget configuration.

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Zendesk User Page Context Link" style="width:80%;">}}

When you click on your dashboard widget, the **Zendesk User page** link sends you to `https://acme.zendesk.com/agent/search/1?type=user&q=shane%40doe.com`. 

## Trigger a webhook

To start a runbook, see the [Azure Automation documentation][8].

## Override a context link

In the [Logs Explorer][9], you can override the default links with a saved view. 

You can also reinterpret the value from another context in the [RUM Explorer][10] by setting the `client.ip` of an HTTP call in RUM as the `source.ip` of a network flow. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /monitors/notify
[3]: /dashboards/dashboards/
[4]: /dashboards/widgets/
[5]: /infrastructure/
[6]: /tracing/
[7]: /logs/
[8]: https://docs.microsoft.com/en-us/azure/automation/automation-webhooks
[9]: https://app.datadoghq.com/logs
[10]: https://app.datadoghq.com/rum/explorer
