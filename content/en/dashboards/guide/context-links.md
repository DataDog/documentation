---
title: Context Links
kind: guide
further_reading:
   - link: '/dashboards/widgets'
     tag: 'Documentation'
     text: 'List of Dashboard Widgets'

---

## Overview

Your dashboards are fundamental in troubleshooting the root cause of an issue or determining an assertion to a critical question. Dashboards can appear in your [notebooks][1], attached to a [monitor notification][2], or serve as a [screenboard][3]. You can start an investigation with a screenboard, document your insights in a notebook, and stay alerted by linking a monitor notification to your dashboard. 

Use Datadog dashboards to perform an initial assessment of your context-relevant data sources and explore insights in Datadog or in a third-party application.  

You may need to access external data or perform follow-up actions in your third-party applications. Context links allow you to access and trigger third-party applications through webhooks. 

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Context Link Demo" video="true" style="width:80%;">}}

Dashboard widgets contain default links to relevant Datadog pages with information about the scope including the timerange, underlying queries, and the series on a graph. [Generic widgets][4] contain context links, allowing you to point to third-party applications and override the default links to customize your landing page. 

This guide introduces context links and provides examples of how to create external links and override default links.

## Context links

Context links appear in the dropdown menu when you click on or in a widget in your dashboards. 

Click the **Edit** button on the right corner of the widget to access the out-of-the-box context links under **Edit** > **Graph your data**. 

To create a context link, click **+ Add a Context Link**. Optionally, click the **Settings** button on the right corner of your dashboard widget and click **Create custom links**.

1. Add a description in the **Label** field. 
2. Enter the URL to your external application in the **URL** field.
3. Add key-value pairs by clicking **+ Add URL Parameter**.
4. Click **Save**.

### Template variables

Template variables that are available for context links include a widget filter, widget time range, dashboard template variables (if any), and the specific series of user actions (if any). 

Optionally, you can write the URL with the double brackets `{{ }}` syntax to avoid URL encoding. For example, both `https://www.google.com/?q="hello world"` and `https://www.google.com%2F%3Fq%3D%22hello+world%22` are acceptable.

## Customize a context link

When the expected URL output contains a complex pattern that involves a domain name and deep URL parameters, use template variables as values in your context link URL. 

1. Add a link description in the **Label** field such as `See Hello World`.
2. Enter a valid destination link with an arbitrary value in the **URL** field such as `www.google.com/?q="hello world"`.
3. Replace the arbitrary value with a relevant template variable such as `www.google.com/?q="{{source.value}}"`.
4. Click **Save**.

When you click in your dashboard widget, the **See Hello World** link appears as a data action in the dropdown menu.

Out-of-the-box context links contain URLs to your underlying data and products in Datadog such as Infrastructure, APM, and Logs. Edit the list of context links on your dashboards to improve the navigation of your dashboards and investigation workflows.  

If you have a generic widget with RUM data, the **View RUM events** link is present by default. In summary and decoration widgets, the **View RUM events** link is hidden from your dashboard. 

You can hide context links by selecting **Hide in context menu** before clicking **Save** or clicking the **Hide** button on the right corner. To see hidden context links on your dashboard, click the **Show** button on the right corner.

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
