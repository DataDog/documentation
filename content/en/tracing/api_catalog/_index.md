---
title: Datadog API Catalog
kind: documentation
is_beta: true
further_reading:
- link: "/tracing/service_catalog/"
  tag: "Documentation"
  text: "Datadog Service Catalog"
---

{{< beta-callout url="https://datadoghq.com" d-toggle="modal" d_target="#signupModal" custom_class="sign-up-trigger">}}
  Datadog API Catalog is in beta! Use this form request access. 
{{< /beta-callout >}} 

## Overview

The API Catalog provides a single view and entry point into exploring the performance, reliability, and ownership of all your API Endpoints in one place. Sort the list of endpoints by error rate, latency, or any other grouping that is meaningful to you, to gain insights into which endpoints most need your attention.

Protect your mission-critical API-driven business features from failing by continuously discovering and monitoring the APIs that you expose to your customers, and the ones your services rely on to function.

API Catalog brings together data from across Datadog to surface API-related metadata and to provide opinionated workflows so you can discover, monitor, and govern your APIs from different sources in one unified view. API Catalog provides:

- **Automated discoverability** - One inventory for all public, private, and partner APIs, where _endpoints_ are the organizing principle.
- **Correlation of all API metadata** from different Datadog sources.
- **Monitoring and governance workflows** for SREs, Ops, and security.

## Exploring the list of endpoints

The [API Catalog][1] view shows all endpoints in all environments in your Datadog organization. The performance data shown for each endpoint is scoped to the environments and time frame you select. 

In the list table, **sort** by any of the columns by clicking a header. For example, click **P99** to see endpoints with the highest 99th percentile for latency.

The table also shows **team ownership** for the API. This information is inherited from the associated service's definition in the [Service Catalog][2]. A service owner owns all of the endpoints that are connected to the service.

To **filter the list** of endpoints or to search for a particular endpoint of interest:

- Enter a query in the **Search** field.
- Select specific environment or other primary tags in the **Scope Metrics** drop-downs. 
- Select a combination of facets on the left.

You can [define tags](#adding-bulk-tags) to use as facets so you can easily find groups of endpoints you're most interested in.

**Note**: The `API Type` facet is based on auto-generated tags and has values of `public` and `unknown` (which usually indicates a private endpoint).

Use the **Group by** selector to group endpoints together by opinionated tags, so you can better navigate a large collection of endpoints in the list. The list group shows aggregated performance data for the endpoints in the group.

## Investigating endpoint details

Click an endpoint in the list to open a details page that shows performance, governance, and metadata information for the endpoint, collected from various areas of Datadog into one place. Here you can edit the short name and description, and add custom tags. You can also launch deeper investigations of the various types of telemetry using links into other areas of Datadog. 

<!-- For example, click on the monitors section to open a detailed card with more information and a link to monitors for the endpoint. -->

The performance graphs on the page are initially scoped to the same settings as on the API Catalog page, and you can change those settings in the details page to suit your investigation by using the time frame selector and other scope drop-downs. 

## Adding bulk tags

In addition to tagging an endpoint in its details page, you can **add tags to multiple endpoints** at once in the API Catalog. Select multiple endpoint check boxes, and click **Edit tags** to provide ownership, importance, or other useful grouping information labels to the selected endpoints. This can help you quickly access groups of endpoints defined by your own criteria, and create assets such as monitors and dashboards from endpoints with specific tags.

For example, if you want to create latency alerts for endpoints that are particularly sensitive to performance problems, tag those endpoints with a tag like `Latency sensitive`. Or tag endpoints that handle sensitive data with a tag like `PII` and alert when endpoints with that tag have a `401 Unauthorized` response. Other examples of useful tags:

- Criticality level
- `experimental`
- `contains password`
- `contains PII`
- Business logic (for example, `payments` )
- Specific customer group (`subscribers`)

When you add a tag, it appears in the list of facets on the left of the catalog. Click a facet to filter the list and add the tag to the Search query field.

## Exploring endpoints during incidents

When you investigate an incident, getting a higher resolution view through the API endpoints can lead to faster understanding of the root cause. Resolve incidents faster with **API ownership information** -- team, code repository, on-call details -- directly associated with each endpoint, to know who to reach when something goes wrong. 

The ownership information displayed on API Catalog pages is derived from the underlying Service definition supplied to the Service Catalog.

<!-- 
## Creating monitors

I want to get alerted each time an endpoint (or a group of endpoints) with high throughput gets a high error rate, so that I will not get false positive alerts on high error rate with low throughput.
As a team leader, I want to monitor all the endpoints my team owns in a specific way that fits my team.
As an SRE, I would like to list the defined Monitors of endpoints I care about, to make sure they are less of a risk in case of an incident.
As an SRE, I would like to view all endpoints with defined Monitors (alerted), so I can address their endpoint owner so they can fix the alert.


choose the type of metric in advance from the catalog (since there would be a lot of not-API-related queries inside the monitors page) and it would be exported together with the defined queries
-->
## Setting up

To set up your API Catalog list:
- [Instrument the services with APM][3]. Only APM instrumented services and supported libraries are discoverable.
- [Define service ownership information][2] using Service Catalog.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/apis/catalog
[2]: /tracing/service_catalog/
[3]: /tracing/trace_collection/
