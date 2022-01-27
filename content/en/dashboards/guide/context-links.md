---
title: Context Links
kind: guide
further_reading:
- link: '/dashboards/widgets'
  tag: 'Documentation'
  text: 'Dashboard widget list'
---

## Overview

Dashboards serve as pivot points in your troubleshooting sessions by collecting data from multiple sources and displaying visualizations for you and people across teams. You can find them attached to a [monitor notification][1] as the preferred entry point, used as [screenboards][2] to observe key technical or business indicators, or referenced in [runbooks][3] to provide additional context.

Dashboards presents insightful information as **snapshots** on the current state of your platform and **interactions** so you can pre-emptively see what's going off track. Click on a visualization to explore the default links and dive deeper into specialized product pages.

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Context Link Demo" video="true" style="width:80%;" >}}

This guide introduces **contextual links** (also known as context links) in your dashboards, explains how out-of-the-box links work, and provides use cases for configuring contextual links.   

## Contextual links

Contextual links bridge dashboard widgets with other pages in Datadog and third-party applications you need to integrate into your workflows.

Users with edit permissions to dashboards can configure which links are accessible in the link list.

### Default context links
 
 {{< img src="dashboards/guide/context_links/default-links.png" alt="Default links" style="width:90%;" >}}

By default, the widget menu recommends links to your host, [traces][4], and [logs][5], along with links that correspond to the widget's data sources. For example, a link to the [**RUM Explorer**][6] if your widget uses [RUM data][7]. Click  **More Related Data Actions** to see additional links in the dropdown menu. 

The widget contains links to the following pages:  

| Link           | Description                                                                          |
|----------------|--------------------------------------------------------------------------------------|
| Hosts          | Links to the [Host Map][8] if series consists of 1+ host. 
| Containers     | Links to the [Live Container][9] page.                                         |
| Processeses    | Links to the [Live Process][10] page.                                           |
| APM Traces     | Opens a side panel displaying underlying traces that link to the [Trace Explorer][11].                                                                                                 |
| RUM Events   | Links to the [RUM Explorer][12].                                                  |
| Profiles       | Links to the APM [Profile Explorer][13].                                        |
| Logs           | Opens a side panel displaying underlying logs that link to the [Log Explorer][14].                                                                                                 |

When applicable, contextual links embed:

* A **filter** that combines the widget filters with template variables (if any). For grouped-by queries, the filter is the series that you clicked on. 
* A **time range**. For timeseries and heatmap widgets, the time range corresponds to the time bucket for the data point. For other widgets, the time range is the current time range of the dashboard.

### Customize context links

Create your own contextual links or override the default links through the **Edit context link** side panel. This feature is available for [generic widgets][15].

To add a context link to the link menu, click **Add a Context Link** in the **Context Links** section of your dashboard widget's configuration. You can hide and delete context links in the link menu.

{{< img src="dashboards/guide/context_links/edit-links.png" alt="Edit links" style="width:80%;" >}}

To define custom links or override the default links, specify the link name in the **Label** field that appears in the context menu and the link path in the **URL** field for a custom link. You can use the URL parameter key-value helper.

{{< img src="dashboards/guide/context_links/custom-link.png" alt="Customize link" style="width:80%;" >}}

Available variable types for contextual links include:

* `{{timestamp_start}}` and `{{timestamp_end}}` which correspond to the widget's time range or the selected time bucket's time range on [timeseries][16] and heatmaps.
* `{{@MerchantTier}}` and `{{@MerchantTier.value}}` query variables. Use these variables in widgets with grouped queries to identify the specific group a user clicks on.
* `{{$env}}` and `{{$env.value}}` dashboard template variables. Use these variables to identify the current value used for the template variable when a user clicks.
* `{{tags}}` which is the default combination of all variables above.

When you have to choose between `{{something}}` and `{{something.value}}`:

* `{{something}}` returns the value prefixed by its key. For example, `env:prod`.
* `{{something.value}}` returns the raw value. For example, `prod`.

Once you have added variables to your context link, click **Save**. Then, save your widget configuration.

In this example, when you click **View in Acme**, the link directs you to `https://prod.acme.io/search?what=basic&when=1643021787564`.

{{< img src="dashboards/guide/context_links/view-in-acme.png" alt="Customize link" style="width:90%;" >}}

The context link:

* Replaces `{{env.value}}` with `prod`
* Replaces `{{@MerchantTier.value}}` with `basic`
* And replaces `{{timestamp_end}}` with `1643021787564`.

### Auto-generate URL parameters

For a context link to encode a wide variety of parameters, copy and paste the entire URL in the **URL** field to bootstrap the configuration. You do not need to worry about URL encoding. 

{{< img src="dashboards/guide/context_links/override-link.mp4" alt="Copy-paste links to bootstrap configuration" video="true" style="width:80%;" >}}

In the example below, the `status:error source:nginx {{@shopist.webstore.merchant.tier}}` query parameter with `{{@shopist.webstore.merchant.tier}}` interpreted as `@shopist.webstore.merchant.tier:basic` is translated into `&query=status%3Aerror%20source%3Anginx%20%40shopist.webstore.merchant.tier%3Abasic`.

{{< img src="dashboards/guide/context_links/url-encoding.png" alt="Customize link" style="width:80%;" >}}

## Example use cases

This section describes examples where you can use contextual links to fine-tune the way your dashboards integrate in your workflows.

### Dashboards links to a Customer Support solution 

#### Context

You use Datadog to monitor your merchant website. Your Customer Support team uses a dashboard that your [RUM][17] and [Security][18] teams set up to proactively identify your most engaged customers or customers with a troublesome experience, and potentially reach out to them.

To accelerate this troubleshooting workflow, the Customer Support team would like a direct connection between dashboards and a support solution, for example: Zendesk.

#### Approach

The primary ID that tracks logged users across your platform in Datadog is the user email, which is a facet that appears in some dashboard widgets.

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Zendesk Query" style="width:90%;">}}

A typical Zendesk link to search for users is `https://acme.zendesk.com/agent/search/1?type=user&q=email%3Ashane%40doe.com`, where the user's email is a search parameter.

Add a variable in the URL and the templated link becomes `https://acme.zendesk.com/agent/search/1?type=user&q=email:{{@usr.email.value}}`.

{{< img src="dashboards/guide/context_links/zendesk_link.png" alt="Zendesk User Page Context Link" style="width:80%;">}}

#### Result

Your Customer Support team's dashboard widget contains a contextual link that takes you into the Customer Support platform with the appropriate context.

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Zendesk User Page Context Link" style="width:80%;">}}

Clicking the **Zendesk User Page** link directs you to this user's page in Zendesk.

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Zendesk Result" style="width:80%;">}}

### Dashboard links to the AWS Console

#### Context

Your startup is in its early days. Your platform is hosted on [AWS EC2][19] instances and the procedures to upscale and downscale your platform are mostly manual.

You have a dashboard where you've consolidated key health metrics for your infrastructure in Datadog. 

To accelerate this operations workflow, you would like a direct connection between this dashboard and your [AWS Console][20]. For example, to upgrade from `t2.micro` to `t2.large`.

#### Approach

A typical AWS EC2 instance summary link is `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`, where you can read:

* `eu-west-3`: The data center region displayed as a subdomain and a URL parameter.
* `i-04b737b9f8bf94a94`: The host ID displayed as a hash parameter.

If your platform only runs on one region, inject the host ID into the context link template so that `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId={{host.value}}`.

If your platforms runs on multiple regions, your widget configuration depends on the following:

* If the region is part of the query aggregation (for example, in the screenshot below), the templated link is `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}`, where `{{region.value}}` is a **query** variable.

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="AWS EC2 Query" style="width:90%;" >}}

* If the region is part of the query aggregation (for example, in the screenshot below), the templated link is `https://{{$region.value}}.console.aws.amazon.com/ec2/v2/home?region={{$region.value}}#InstanceDetails:instanceId={{host.value}}`, where `{{region.value}}` is a **template** variable. 

{{< img src="dashboards/guide/context_links/ec2_query2.png" alt="AWS EC2 Query" style="width:90%;" >}}

#### Result

Your dashboard widget contains a link that takes you to the appropriate host in the AWS Console.

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="AWS EC2 Query Interaction" style="width:90%;" >}}

Clicking the **AWS EC2 Instance Summary** link directs you to the AWS EC2 instance page in the AWS Console.

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="AWS EC2 Query Result" style="width:70%;" >}}

### Dashboard links to saved views and remapped attributes in Datadog

#### Context

You monitor your corporate website with Datadog. You may use [RUM][17] to understand your users and [Logs][21] to [overwatch your API Gateways][22] with a more technical perspective.

Your front-end engineers typically use dashboards with high-level RUM insights. The API Gateways team maintains a [Saved View][23] in the Log Explorer, which is a fine-tuned perspective that the front-end monitoring team relies on to monitor information that is relevant to them. 

{{< img src="dashboards/guide/context_links/logs-saved-view_result.jpg" alt="Logs Saved View result" style="width:90%;" >}}

To accelerate this troubleshooting workflow, the front-end monitoring teams would like to access the saved view with the current context of the dashboard.

#### Approach to Saved Views

[Saved Views][23] define the default query, visualization, and configuration options in the Log and [RUM Explorers][12]. A typical saved view link is `https://app.datadoghq.com/logs?saved_view=305130`, which encodes the Log Explorer URL under-the-hood. 

You can override any parameter in the resulting Log Explorer URL to append the saved view's short link. 

For example, `https://app.datadoghq.com/logs?saved_view=305130&query=@source:nginx @network.client.ip:123.123.12.1` takes you to the [Log Explorer][14] as if you opened the saved view first, but the default query filter is replaced with `@source:nginx @network.client.ip:123.123.12.1`.

#### Approach to remapping attributes

If navigation on your website is anonymous, you may use an IP address as a proxy to identify your users.

You would like to identify the `@session.ip` attribute from your RUM events with the `@network.client.ip` attribute from your logs. The two attributes have different names because they generally have different meanings, but in this context of authentication logs, you can use one or the other.

Inject the `@session.ip` in a filter based on `@network.client.ip` so that the `@network.client.ip:{{@session.ip.value}}`.

{{< img src="dashboards/guide/context_links/logs-saved-view_query.png" alt="Logs Saved View result" style="width:70%;">}}

For a RUM dashboard widget displaying insights per session IP and for specific countries, follow this link configuration.

{{< img src="dashboards/guide/context_links/logs-saved-view_link.png" alt="Logs Saved View result" style="width:70%;">}}

#### Result

As the API Gateways team updates the saved view to account for the latest updates on incoming logs, the contextual link remains up-to-date. Remapping the IP address creates a context link that connects your RUM events with corresponding logs.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/notify/
[2]: /dashboards/screenboards/
[3]: /notebooks/
[4]: https://app.datadoghq.com/apm/traces/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/rum/explorer/
[7]: /real_user_monitoring/data_collected/
[8]: /infrastructure/hostmap/#overview
[9]: /infrastructure/livecontainers/
[10]: /infrastructure/process/?tab=linuxwindows
[11]: /tracing/trace_explorer/?tab=listview
[12]: /real_user_monitoring/explorer/
[13]: /tracing/profiler/search_profiles/
[14]: /logs/explorer/
[15]: /dashboards/widgets/
[16]: /dashboards/widgets/timeseries/
[17]: /real_user_monitoring/
[18]: /security_platform/cloud_siem/
[19]: /integrations/amazon_ec2/
[20]: https://aws.amazon.com/console/
[21]: /logs/
[22]: /integrations/#cat-log-collection
[23]: /logs/explorer/saved_views/
