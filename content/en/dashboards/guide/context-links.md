---
title: Context Links
kind: guide
further_reading:
- link: '/dashboards/widgets'
  tag: 'Documentation'
  text: 'List of Dashboard Widgets'

---

## Overview

Dashboards are fundamental in troubleshooting and can be referenced in runbooks (which you can then write as a [notebook][1]), attached to a [monitor notification][2], or serve as a [status board][3]. You can start an investigation with a screenboard, document your insights in a notebook, and stay alerted by linking a monitor notification to your dashboard. 

Use Datadog dashboards to perform an initial assessment of context-relevant data sources with products such as the Log Explorer. Dashboard widgets contain context links to relevant Datadog pages with information about the timerange, underlying queries, the series on a graph, and more. 

[Generic widgets][4] contain context links which allow you to integrate follow-up actions in third-party applications, override the default dashboard links, and add links to additional Datadog products. 

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Context Link Demo" video="true" style="width:80%;">}}

This guide introduces context links and provides examples of how to create external links and override default links.

## Context links

Out-of-the-box context links contain URLs to your [Infrastructure][5], [APM][6], [Logs][7], and underlying data sources such as your RUM events from a RUM query. Context links appear in the dropdown menu when you click on or in a dashboard widget. 

If you have a generic widget with RUM data, the **View RUM events** link is present by default. Context links are not customizable for summary and decoration widgets.

When investigating an issue, you may need to navigate between multiple dashboards, Datadog products, and third-party applications. Context links allow you to access, perform follow-up actions, and trigger third-party applications through webhooks. 

### Create a context link

To create a context link, click **+ Add a Context Link**. Optionally, click the **Settings** button on the right corner of your dashboard widget and click **Create custom links**.

{{< img src="dashboards/guide/context_links/example-context-link.png" alt="Example context link" style="width:80%;" >}}

1. Add a description in the **Label** field such as `See Hello World`. 
2. Enter the URL to your external application in the **URL** field such as `www.google.com/?q="hello world"`.
3. Key-value pairs appear below as URL parameters. Click **+ Add URL Parameter** to add additional parameters.
4. Click **Save** and finish editing your dashboard widget configuration.

When you click on the dashboard widget, the **See Hello World** link is available in the dropdown menu.

### Customize a context link

You can use template variables such as the widget filter, widget time range, dashboard template variables (if any), and the specific series of user actions (if any) in your URL.

To avoid URL encoding, write the URL with the double brackets `{{ }}` syntax. For example, `https://www.google.com/?q="hello world"` or `https://www.google.com%2F%3Fq%3D%22hello+world%22`.

When the expected URL output contains a complex pattern involving a domain name and deep URL parameters, use template variables as the values in your context link URL parameters. 

1. Add a link description in the **Label** field such as `See Hello World`.
2. Enter a valid destination link with an arbitrary value in the **URL** field such as `www.google.com/?q="hello world"`.
3. Replace the arbitrary value with a relevant template variable such as `www.google.com/?q="{{source.value}}"`.
4. Click **Save** and finish editing your dashboard widget configuration.

When you click on the dashboard widget, the **See Hello World** link is available in the dropdown menu.

### Override a context link

Edit your default context links to fine tune the navigation of your dashboards and investigation workflows. Click the **Edit** button on the right corner of the widget to access the list of context links under **Edit** > **Graph your data**.

To hide context links, check **Hide in context menu** before clicking **Save** or clicking the **Hide** button on the right corner. To see hidden context links on your dashboard, click the **Show** button on the right corner.

You can override the default context links in the [Logs Explorer][8] to navigate from your dashboard to a saved view. You can also reinterpret the value from another context in the [RUM Explorer][9] by setting the `client.ip` of an HTTP call in RUM as the `source.ip` of a network flow. 

## Link to a third-party application

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

To start a runbook, see the [Azure Automation documentation][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /notebooks/
[2]: /monitors/notify
[3]: /dashboards/screenboards/
[4]: /dashboards/widgets/
[5]: /infrastructure/
[6]: /tracing/
[7]: /logs/
[8]: https://app.datadoghq.com/logs
[9]: https://app.datadoghq.com/rum/explorer
[10]: https://docs.microsoft.com/en-us/azure/automation/automation-webhooks
