---
title: Context Links
further_reading:
- link: '/dashboards/widgets'
  tag: 'Documentation'
  text: 'Dashboard widget list'
---

## Overview

Dashboards collect data from multiple sources and display this data as visualizations. 

You can attach dashboards to [monitor notifications][1], use them as screenboards to observe key technical or business indicators, or reference them in [runbooks][2] to provide additional context. With Dashboards, you can see snapshots of the current state of your platform as well as interactions, so you can preemptively see issues and analyze them more deeply in specialized pages.

The video below demonstrates a user looking at an overview dashboard for a web application. The user identifies a spike on a technical metric, zooms in for details, and accesses the underlying host dashboard to check for possible root causes.

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Troubleshooting workflow from a dashboard metric graph, using context links to find the root cause of issue" video="true" style="width:80%;" >}}

This guide introduces **context links** in your dashboards and covers the following:

1. [How context links work, and how to adapt them to your exact needs](#introduction-to-context-links).
2. [Example use cases of the context links configuration](#example-use-cases).

## Introduction to context links

Context links bridge dashboard widgets with other pages in Datadog, as well as the third-party applications you have integrated into your workflows.

Users with [edit permissions][3] to dashboards can configure which links are accessible in the link list.

### Default context links
 
 {{< img src="dashboards/guide/context_links/default-links.png" alt="Default links" style="width:75%;" >}}

By default, the widget menu displays links to your host, [traces][4], and [logs][5]—along with links that correspond to the widget's data sources. For example, the menu displays a link to the [**RUM Explorer**][6] if your widget uses [RUM data][7]. Click **More Related Data Actions** to see additional links in the dropdown menu. 

The widget contains links to the following pages:  

| Link           | Description                                                                           |
|----------------|---------------------------------------------------------------------------------------|
| Hosts          | Links to the [Host Map][8] if series consists of more than one host. Links to the [Host Dashboard][9] if series consists of one host.|
| Containers     | Links to the [Live Container][10] page.                                                |
| Processeses    | Links to the [Live Process][11] page.                                                 |
| APM Traces     | Opens a side panel displaying underlying traces that link to the [Trace Explorer][12].|
| RUM Events     | Links to the [RUM Explorer][13].                                                      |
| Profiles       | Links to the APM [Profile Explorer][14].                                              |
| Logs           | Opens a side panel displaying underlying logs that link to the [Log Explorer][15].    |

When applicable, context links embed:

* A **filter** that combines the widget filter(s) with template variables (if any) and, for grouped-by queries, the one series users click on. 
* A **time range**. For timeseries and heatmap widgets, the time range corresponds to the time bucket for the data point. For other widgets, the time range is the full widget time range.


### Customize context links

For any [generic widget][16], enter its edit mode to access its **Context Links** section. You can create your own context links, override default links, and promote or hide links.

{{< img src="dashboards/guide/context_links/edit-links.png" alt="Edit links" style="width:75%;" >}}

To define custom links or override the default links, specify the link name in the **Label** field and the link path in the **URL** field. Click **+ Add URL Parameter** to use the key-value helper.


#### Context Links variables

{{< img src="dashboards/guide/context_links/custom-link.png" alt="Set a key-value pair for a URL parameter in the URL" style="width:75%;" >}}

Available variable types for context links include:

* **Time range variables** `{{timestamp_start}}` and `{{timestamp_end}}`. These variables correspond to the time range of the widget. 
* **Query variables** (`{{@MerchantTier}}` and `{{@MerchantTier.value}}` in the example above). These variables are for widgets with grouped queries, and identify the specific group a user clicks on.
* **Dashboard template variables** (`{{$env}}` and `{{$env.value}}` in the example above). These variables identify the current value in use for the template variable when user clicks.
* **`{{tags}}`**, the default combination of all the variables above.

When you have to choose between `{{something}}` and `{{something.value}}`:

* `{{something}}` returns the value prefixed by its key. For example, `env:prod`.
* `{{something.value}}` returns the raw value. For example, `prod`.
* See the [example use case to configure multiple variables](#configure-multiple-variables).


In this example, when you click **View in Acme**, the link directs you to `https://prod.acme.io/search?what=basic&when=1643021787564`.

{{< img src="dashboards/guide/context_links/view-in-acme.png" alt="Example context link to Acme" style="width:60%;" >}}

The context link:

* Replaces `{{env.value}}` with `prod`
* Replaces `{{@MerchantTier.value}}` with `basic`
* And replaces `{{timestamp_end}}` with `1643021787564`.


#### Bootstrap context link with copy-paste

{{< img src="dashboards/guide/context_links/override-link.mp4" alt="Copy-paste links to bootstrap configuration" video="true" style="width:75%;" >}}

For a complex context link that encodes a wide variety of parameters, it can be more convenient to copy-and-paste the entire URL in the **URL** field to bootstrap the configuration and rework the variables from there.


#### URL encoding

{{< img src="dashboards/guide/context_links/url-encoding.png" alt="Screenshot of a URL and key-value parameters" style="width:75%;" >}}

Datadog handles URL encoding in context links.

The example above displays a link with a query parameter, `status:error source:nginx {{@shopist.webstore.merchant.tier}}`. Here, `{{@shopist.webstore.merchant.tier}}` is interpreted as `@shopist.webstore.merchant.tier:basic`. The full query parameter is then translated into `&query=status%3Aerror%20source%3Anginx%20%40shopist.webstore.merchant.tier%3Abasic`.


## Example use cases

This section contains examples that demonstrate how you can take advantage of context links to integrate your dashboards into your workflows.

### Dashboards links to a customer support solution 

The following example explains how to create a link from a user in a dashboard to their corresponding Zendesk user page.

#### Context

You use Datadog to monitor your merchant website. Your customer support team uses a dashboard that your [Frontend][17] and [Security][18] teams set up to proactively identify your most engaged customers—or customers with a troublesome experience, and potentially reach out to them.

To accelerate this troubleshooting workflow, the customer support team would like a direct connection between dashboards and a support solution, for example: Zendesk.

#### Approach

The primary ID that tracks logged users across your platform in Datadog is the user email, which is a facet that appears in some dashboard widgets.

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Zendesk Query" style="width:90%;">}}

A typical Zendesk link to search for users is `https://acme.zendesk.com/agent/search/1?type=user&q=email%3Ashane%40doe.com`, where the user's email is a search parameter.

Add a variable in the URL, and the templated link becomes `https://acme.zendesk.com/agent/search/1?type=user&q=email:{{@usr.email.value}}`.

{{< img src="dashboards/guide/context_links/zendesk_link.png" alt="Zendesk User Page Context Link" style="width:80%;">}}

#### Result

Your customer support team's dashboard widget contains a context link that takes you into the customer support platform with the appropriate context.

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Zendesk User Page Context Link" style="width:80%;">}}

Clicking the **Zendesk User Page** link directs you to this user's page in Zendesk.

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Zendesk Result" style="width:80%;">}}

### Dashboard links to the AWS Console

The following example explains how to create a link from a host in a dashboard widget to its corresponding Amazon EC2 instance page in the AWS Console.

#### Context

Your platform is hosted on [Amazon EC2][19] instances, and the procedures to upscale and downscale your platform are mostly manual.

You have a dashboard where you've consolidated key health metrics for your infrastructure in Datadog. 

To accelerate this operations workflow, you would like a direct connection between this dashboard and your [AWS Console][20]—for example, to upgrade from `t2.micro` to `t2.large`.

#### Approach

A typical Amazon EC2 instance summary link is `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94`, where you can read:

* `eu-west-3`: The data center region displayed as a subdomain and a URL parameter.
* `i-04b737b9f8bf94a94`: The host ID displayed as a hash parameter.

If your platform only runs on one region, inject the host ID into the context link template so that `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId={{host.value}}`.

If your platforms runs on multiple regions, your widget configuration depends on the following:

* If the region is part of the query aggregation (for example, in the screenshot below), the templated link is `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}`, where `{{region.value}}` is a **query** variable.

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="Amazon EC2 Query" style="width:90%;" >}}

* If the region is part of the query aggregation (for example, in the screenshot below), the templated link is `https://{{$region.value}}.console.aws.amazon.com/ec2/v2/home?region={{$region.value}}#InstanceDetails:instanceId={{host.value}}`, where `{{region.value}}` is a **template** variable. 

{{< img src="dashboards/guide/context_links/ec2_query2.png" alt="Amazon EC2 Query" style="width:90%;" >}}

#### Result

Your dashboard widget contains a link that takes you to the appropriate host in the AWS Console.

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="Amazon EC2 Query context link" style="width:90%;" >}}

Clicking the **Amazon EC2 Instance Summary** link directs you to the Amazon EC2 instance page in the AWS Console.

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="Amazon EC2 Query Result" style="width:70%;" >}}

### Dashboard links to saved views and remapped attributes in Datadog

The following example explains how to create a link from a RUM event in a dashboard widget to its corresponding logs.

#### Context

You monitor your corporate website with Datadog. You may use [RUM][17] to understand your users and [Logs][21] to [oversee your API Gateways][22] from a more technical perspective.

Your frontend engineers typically use dashboards with high-level RUM insights. You API Gateways team maintains a [Saved View][23] in the Log Explorer, which is a fine-tuned perspective that the frontend monitoring team relies on to monitor information that is relevant to them. 

{{< img src="dashboards/guide/context_links/logs-saved-view_result.jpg" alt="Logs Saved View result" style="width:90%;" >}}

To accelerate this troubleshooting workflow, the frontend monitoring teams would like to access the saved view with the current context of the dashboard.

#### Approach to Saved Views

[Saved Views][23] define the default query, visualization, and configuration options in the Log Explorer. A typical saved view link is `https://app.datadoghq.com/logs?saved_view=305130`, which encodes the Log Explorer URL under the hood. 

You can append the saved view's short link to override any parameter in the resulting Log Explorer URL.

For example, `https://app.datadoghq.com/logs?saved_view=305130&query=@source:nginx @network.client.ip:123.123.12.1` takes you to the [Log Explorer][15] as if you opened the saved view first, but the default query filter is replaced with `@source:nginx @network.client.ip:123.123.12.1`.

#### Approach to remapping attributes

If navigation on your website is anonymous, you may use an IP address as a proxy to identify your users.

You would like to identify the `@session.ip` attribute from your RUM events with the `@network.client.ip` attribute from your logs. The two attributes have different names because they generally have different meanings, but in this context of authentication logs, you can identify both.

To do so, inject the `@session.ip` in a filter based on `@network.client.ip`, and build the appropriate filter `@network.client.ip:{{@session.ip.value}}`.

{{< img src="dashboards/guide/context_links/logs-saved-view_query.png" alt="Example search query for saved views" style="width:70%;">}}

For a RUM dashboard widget displaying insights per session IP and for specific countries, follow this link configuration.

{{< img src="dashboards/guide/context_links/logs-saved-view_link.png" alt="Example URL configuration for saved views" style="width:70%;">}}

#### Result

As the API Gateways team updates the saved view to account for the latest updates on incoming logs, the context link remains up-to-date. 

Remapping the IP address creates a context link that connects your RUM events with corresponding logs.

### Configure multiple variables

The following example explains how to configure multiple variables and conditions in your context link query.

#### Context

Add context links to investigate specific logs or conditions. 
- You have multiple tag values with the same context (for example, `env:production OR env:prod`). 
- You want to filter down logs to multiple conditions (for example, `env:prod AND service:backend`)

#### Approach

After you select the template variables you want to troubleshoot, the context link configuration takes those template variables and inserts them into the query. **Note**: The syntax and the parenthesis enclosure impacts the query. 

For example, if you want to configure a context link with `service:backend` AND (`env:production` OR `env:prod`), use the following configuration:

```
service:backend (env:{{$env.value}})
```

#### Result

The parenthesis translates the `(env:{{$env.value}})` to `(env:*)` which allows you to enter multiple variables into your context links query.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /monitors/notify/
[2]: /notebooks/
[3]: /dashboards/configure/#permissions
[4]: https://app.datadoghq.com/apm/traces/
[5]: https://app.datadoghq.com/logs
[6]: https://app.datadoghq.com/rum/explorer/
[7]: /real_user_monitoring/data_collected/
[8]: /infrastructure/hostmap/#overview
[9]: /getting_started/dashboards/#explore-out-of-the-box-dashboards
[10]: /infrastructure/livecontainers/
[11]: /infrastructure/process/?tab=linuxwindows
[12]: /tracing/trace_explorer/?tab=listview
[13]: /real_user_monitoring/explorer/
[14]: /profiler/profile_visualizations/
[15]: /logs/explorer/
[16]: /dashboards/widgets/
[17]: /real_user_monitoring/
[18]: /security/cloud_siem/
[19]: /integrations/amazon_ec2/
[20]: https://aws.amazon.com/console/
[21]: /logs/
[22]: /integrations/#cat-log-collection
[23]: /logs/explorer/saved_views/