---
title: Version Tracking
kind: documentation
description: 'Use Datadog to track version during and after deployments'
further_reading:
    - link: 'getting_started/tagging/unified_service_tagging/'
      text: 'Learn about Unified Service Tagging and reserved tags'
    - link: 'app_analytics'
      text: 'Use version as a dimension in your App Analytics queries'
---
## The Version Tag

`version` is a [reserved tag][1] within Datadog, and because of Unified Service Tagging, the `version` tag is applied across infrastructure, traces, trace metrics, profiles, and logs.

This page describes specific ways you can use the `version` tag to better monitor deployments and service behavior. See the [Unified Service Tagging][1] docs for instructions for setting up the tags.

## Version Deployment Strategies

Datadog's version tracking gives you visibility into the performance of deployed code when you are using the following deployment strategies (or others) to detect bad code deployments, contain the impact of changes, and respond faster to incidents.

### Rolling deploys

Rolling deploys provide zero-downtime by directing traffic to other instances while deploying a new version to hosts or containers one-by-one.

Using Datadog, you can monitor your rolling deploys and detect any resulting error increases.

{{< img src="tracing/version_tracking/rolling.png" alt="Versions on the Service Page"  style="width:100%;">}}

### Blue/green deploys

Blue/green (or other color combination) deployments reduce downtime by running two clusters of services that are both accepting traffic, or by keeping one on standby, ready to be activated if there are problems with the other.

Setting and viewing the `version` tags for these services lets you compare requests and errors to detect if one of the clusters has an error rate higher than the other cluster, if a cluster is not meeting SLOs, or if a cluster that is not supposed to be receiving traffic is.

### Canary deploys

With canary deploys, a service is deployed on a limited number of hosts or for a fraction of customers, to test a new deployment with limited impact.

Using `version` tags within Datadog allows you to compare error rates, traces, and service behavior for the canary deployment.

For example, you can see in the following image that a canary version was deployed, had a few errors, and was removed, with traces corresponding to that version available for investigation without any further impact.

{{< img src="tracing/version_tracking/Canary.png" alt="Versions on the Service Page"  style="width:100%;">}}

### Shadow deploys

In a shadow deployment, a release candidate version is deployed alongside the production version, and incoming traffic is sent to both services, with users seeing the results only from production, but letting you collect data from both.

Shadow deploys allow you to test a potential release against real production traffic. Tagging shadows with a `version` tag lets you compare error rates, traces, and service behavior between the two versions to determine if the shadow version should be released.

## Using Version Tags within Datadog

The `version` tag can be used anywhere within Datadog, whether to filter a search view to a specific version, or to compare metrics from different versions.

### Service page

{{< img src="tracing/version_tracking/ServicePage.png" alt="Versions on the Service Page"  style="width:100%;">}}

On the Service page, if the `version` tag is available, the requests widget can be scoped to either of:

- Total Requests by Version
- Requests per second by Version

The errors widget can be scoped to one of three options that involve the `version` tag:

- Total Errors by Version
- Errors per second by Version
- % Error rate by Version

All of these can be exported to dashboards and monitors.

### Resource page

{{< img src="tracing/version_tracking/ResourcePage.png" alt="Versions on the Resource Page"  style="width:100%;">}}

On the Resource page, if the version tag is available, the requests widget can be scoped to either of:

- Total Requests by Version
- Requests per second by Version

The errors widget can be scoped to one of three options that involve the `version` tag:

- Total Errors by Version
- Errors per second by Version
- % Error rate by Version

All of these can be exported to dashboards and monitors.

### Trace Search and Analytics

{{< img src="tracing/version_tracking/AnalyticsErrorsByVersion.gif" alt="Versions on the Resource Page"  style="width:100%;">}}

When available, `version` can be used as a tag for both Trace Search and Analytics, either to filter the live search mode and indexed traces, or to filter or group analytics queries.

Analytics, including filtering on the `version` tag, can be exported to dashboards and monitors.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /getting_started/tagging/unified_service_tagging/
