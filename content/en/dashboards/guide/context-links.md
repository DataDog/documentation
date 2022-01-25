---
title: Context Links
kind: guide
further_reading:
- link: '/dashboards/widgets'
  tag: 'Documentation'
  text: 'List of Dashboard Widgets'

---

## Overview

Dashboards are **pivots** in troubleshooting sessions, they gather data from multiple sources and have people across multiple teams to use it, an as such:

* they are typically attached to a [monitor notification][2] as a preferred entry point, used as [screenboard][3] to overwatch key technical or business indicators, or referenced in [runbooks][1] to provide extra context.

* they give insightful information as **snapshots** on the current state of your platform. But they also have **interactions** to get a first sense of what's going off-tracks, before enventually diving deeper with more specialised product pages.

{{< img src="dashboards/guide/context_links/overview.mp4" alt="Context Link Demo" video="true" style="width:80%;">}}

In this users guide, we focus on **contextual links in widget menus** (see video above). Contextual links are bridges between Dashboards widgets and other pages, whether in Datadog or in third-part applications you need to integrate in your workflows. 

You'll see:

1. How one-size-fit-alls default links work, and how to adapt them your exact needs (#context-links-how-to).
2. Example use-cases on how to take advantage of context links configuration (#example-use-cases).


## Contextual links how-to

### Default contextual links

By default, widget contextual menu consist of the following links: 

| Link           | Description                                                                          |
|----------------|--------------------------------------------------------------------------------------|
| Hosts          | Links to the [**Host Map**][101] if series consists of 1+ host. 
                        Links to the [**Host Dashboard**][102]if series consist of 1 host.              |
| Containers     | Links to the [**Live Container**][103] page.                                         |
| Processeses    | Links to the [**Live Process**][104] page.                                           |
| APM Traces     | Opens a side panel in dashboard showing underlying traces, 
                        which links to the APM [**Trace Explorer**][10].                                |
| RUM Sessions   | Links to the RUM [**Sessions Explorer**]106]                                         |
| Profiles       | Links to the APM [**Profile Explorer**]107]                                          |
| Logs           | Opens a side panel in dashboard showing underlying logs, 
                        which links to the [**Log Explorer**][108]                                      |


[101]: /infrastructure/hostmap/#overview
[102]: /getting_started/dashboards/#explore-out-of-the-box-dashboards
[103]: /infrastructure/livecontainers/
[104]: /infrastructure/process/?tab=linuxwindows
[105]: /tracing/trace_explorer/?tab=listview
[106]: /real_user_monitoring/explorer/?tab=facets
[107]: /tracing/profiler/search_profiles/
[108]: /logs/explorer/


By default the widget menu promotes only **Host**, **Traces** and **Logs** links, alongside links corresponding to the widget data source(s) (for instance **RUM Events** links if the widget uses RUM data). Others links appear under a secondary "More Actions" menu. Users with permissions to edit the Dashboards can configure which links are promoted.

{{< img src="dashboards/guide/context_links/default-links.png" alt="Default links" video="true" style="width:80%;">}}


By default and when applicable, contextual links embed:

* A **filter**, which combines the filter of the widget (including template variables, if any) and, for grouped-by queries, the series clicked-on.
* A **timerange**. For timeseries and heatmap widgets, the timerange corresponds to the time bucket for the data point. For other widgets, the timerange is the current timerange of the Dashbaord.


### Customize contextual links

{{< img src="dashboards/guide/context_links/edit-links.png" alt="Edit links" video="true" style="width:80%;">}}

Create your own contextual links or override the default links through the widget edit mode. *Note*: this feature is available for [Generic widgets][4].

{{< img src="dashboards/guide/context_links/custom-link.png" alt="Customize link" video="true" style="width:80%;">}}

To define customs or overriden links, specify:

* The **label** to appear in the context menu,
* The **URL** for the custom link. Note that you can use the URL params key-value helper for that purpose.

There are different types of variables you can use in for contextual links:
* `{{timestamp_start}}` and `{{timestamp_end}}`. They correspond to the timerange of the widget, or the timerange of the clicked time bucket for timeseries and heatmaps.
* Query variables, `{{@MerchantTier}}` and `{{@MerchantTier.value}}` in the example above. These variables are for widgets with grouped queries, and identify the specific group a user clicks on.
* Dashboard template variables, `{{$env}}` and `{{$env.value}}` in the example above. These variables identify the current value in use for the template variable  when user cliks.
* `{{tags}}`, which is the default combination of all the variables above.


When you have the choice between `{{something}}` and `{{something.value}}` :
* `{{something}}` returns the value prefixed by its key. For instance, `env:prod`.
* `{{something.value}}` returns the raw value. For instance, `prod`.

{{< img src="dashboards/guide/context_links/view-in-acme.png" alt="Customize link" video="true" style="width:80%;">}}

Following on that custom context link example, clicking on `View in Acme` would open the `https://prod.acme.io/search?what=basic&when=1643021787564`:
* {{env.value}} has been replaced by `prod`
* {{@MerchantTier.value}} has been replaced by `basic`
* {{timestamp_end}} has been replaced by `1643021787564`


{{< img src="dashboards/guide/context_links/override-link.mp4" alt="Copy-paste links to bootstrap configuration" video="true" style="width:80%;">}}

For links encoding a wide variety of parameters, consider copy-paste the whole URL to bootstrap the configuration. Note that you don't have to worry about URL encoding. In the example below, the query parameter `status:error source:nginx {{@shopist.webstore.merchant.tier}}` - with {{@shopist.webstore.merchant.tier}} to be interpreted as `@shopist.webstore.merchant.tier:basic` - is naturally translated into `&query=status%3Aerror%20source%3Anginx%20%40shopist.webstore.merchant.tier%3Abasic`

{{< img src="dashboards/guide/context_links/url-encoding.png" alt="Customize link" video="true" style="width:60%;">}}


## Example Use-Cases

This section covers a handful of inspirational examples where you can take advantage contextual links to fine-tune how your Dashboards integrate in your workflows:


### Link to the AWS Console

Link a widget showing CPU for your hosts, to the AWS console where you'll run basic maintenance operations. Say, to upgrade from `t2.micro` to `t2.large`.

{{< img src="dashboards/guide/context_links/ec2_result.png" alt="AWS EC2 Query Result" style="width:70%;">}}

A typical AWS EC2 instance summary link is `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId=i-04b737b9f8bf94a94` in which you read:
* `eu-west-3`as the datacenter region, once as a subdomain and once as a URL param
* `i-04b737b9f8bf94a94` the host ID, as a hash parameter

The query below would capture both datacenter and host region. 

{{< img src="dashboards/guide/context_links/ec2_query.png" alt="AWS EC2 Query" style="width:70%;">}}

The corresponding templated link would be `https://{{region.value}}.console.aws.amazon.com/ec2/v2/home?region={{region.value}}#InstanceDetails:instanceId={{host.value}}`.

If your platform runs only on one region, the query above would work. However, alternatively, don't use the "group by region" in your query and hardcode the region in the templated link  `https://eu-west-3.console.aws.amazon.com/ec2/v2/home?region=eu-west-3#InstanceDetails:instanceId={{host.value}}`.

{{< img src="dashboards/guide/context_links/ec2_interaction.png" alt="AWS EC2 Query Interaction" style="width:90%;">}}


### Link to Zendesk

Link a widget showing the customers most engaged on your platform, to Zendesk page platform. Say, to check what's the history of interactions for that customer.

{{< img src="dashboards/guide/context_links/zendesk_result.png" alt="Zendesk Query Result" style="width:70%;">}}


A typical Zendesk link to search for users is `https://acme.zendesk.com/agent/search/1?type=user&q=email%3Ashane%40doe.com`, where the user is a search parameter.

The query below would capture the user email. 

{{< img src="dashboards/guide/context_links/zendesk_query.png" alt="Zendesk Query" style="width:80%;">}}


And the corresponding templated link would be is `https://acme.zendesk.com/agent/search/1?type=user&q=email:{{@usr.email.value}}`.

{{< img src="dashboards/guide/context_links/zendesk_interaction.png" alt="Zendesk User Page Context Link" style="width:80%;">}}


### Trigger a webhook

TODO


### Fine tune the landing page of the Datadog Log Explorer

TODO


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



