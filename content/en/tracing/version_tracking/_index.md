---
title: Version Tracking
kind: documentation
description: 'Use Datadog to track version during and after deployments'
further_reading:
    - link: 'getting_started/tagging/unified_service_tagging/'
      text: 'Learn about Unified Service Tagging and reserved tags'
    - link: 'tracing/app_analytics'
      text: 'Use version as a dimension in your App Analytics queries'
---
## The Version Tag

`version` is a [reserved tag][1] within Datadog. It is part of the Unified Service Tagging system and is applied to infrastructure metrics (host, container, process and NPM checks), trace metrics, traces, profiles and logs.

This page describes specific ways you can use the `version` tag to better monitor deployments and service behavior. See the [Unified Service Tagging][1] docs for instructions for setting up the tags.

## Using Version Tags on the Service Page

{{< img src="tracing/version_tracking/ServicePageRequestsErrorsByVersion.png" alt="Versions on the Service Page"  style="width:100%;">}}

On the Service page, if the `version` tag is available, the requests widget can be scoped to either of:

- Total Requests by Version
- Requests per second by Version

The errors widget can be scoped to one of three options that involve the `version` tag:

- Total Errors by Version
- Errors per second by Version
- % Error rate by Version

Both of these can be exported to dashboards and monitors.

## Version Summary Table

Services configured with `version` tags have a version section on the Service page, immediately below the main service health graphs. This section shows all versions of the service that were active during the selected time interval, with currently active services at the top.

By default you will see:

- The version name(s) deployed for this service over the timeframe.
- The times traces corresponding to this version were first and last seen.
- An indication of how many types of errors appear in each version that did not appear in the immediately previous version.
- Requests per second.
- Error rate as a percentage of total requests.

**Note:** The 'Error Types' column is not a guarantee the version introduced these errors, but rather an indication that this error was not seen in traces from the previous version.  Based on how you are performing deployments, it can be a great way to begin investigating errors.

Additionally, fields can be added or removed from this overview table and your selections will be saved.  The additional fields are:

- Endpoints that are active in a version that were not in the previous version.
- Time active, showing the length of time from the first trace to the last trace sent to Datadog for that version.
- Total number of Requests.
- Total number of Errors.
- Latency measured by p50, p75, p90, p95, p99, or max.

{{< img src="tracing/version_tracking/VersionComparison.png" alt="Versions on the Service Page"  style="width:100%;">}}

**Note:** The `version` section of of the service page will only appear if there is more than one version reporting in the selected time interval at the top of the page.

## Version Comparison

Clicking on any version row in the Version Summary table will open a detailed version comparison page, allowing you to compare two specific version of the same service.  By default, the selected version will be compared to the immediately previous version but this can be changed to compare any two versions within the past 30 days.

There are three main components of version comparison:

- [Comparison Graphs](#comparison-graphs) for a visualization of requests and errors to services, useful for watching various types of [deployments](#version-deployment-strategies).
- [Error Comparison](#error-comparison) to see errors that may have been introduced or solved by a deployment.
- [Endpoint Comparison](#endpoint-comparison) to see how endpoint latency and error rates are performing in different versions of the service.

### Comparison Graphs

Requests and Error graphs are available in this section, much like the graphs on the Service Page. These graphs highlight the selected versions for comparison but leave all other versions in gray for additional context. These allow for a quick overview of a deployment rollout or the identification of a spike in error rates.

{{< img src="tracing/version_tracking/ComparisonGraphs.png" alt="Version Comparison Graphs" style="width:100%;">}}

### Error Comparison

This section lists differences in error types detected for each version, highlighting error types appearing only in the source version for easy troubleshooting, error types no longer appearing there for easy validation of fixes and error types active in both.  From this table, you can pivot immediately into live or historical traces corresponding to the selected error for further investigation.

**Note:** This is based on observed error types and if one error type is rare it might be represented as no longer appearing just because it has not been seen yet.

{{< img src="tracing/version_tracking/ErrorComparison.gif" alt="Error Comparison"  style="width:100%;">}}

### Endpoint Comparison

This section lets you compare the performance (requests, latency and errors) of each endpoint in the service. The table can be sorted by absolute values or by the change between versions allowing to easily detect large swings in latency or error rates or to validate that the highest throughput endpoints are still healthy following a deploy.

{{< img src="tracing/version_tracking/EndpointComparison.png" alt="Endpoint Comparison"  style="width:100%;">}}

## Version Deployment Strategies

Datadog's version tracking gives you visibility into the performance of deployed code when you are using the following deployment strategies (or others) to detect bad code deployments, contain the impact of changes, and respond faster to incidents.

### Rolling deploys

Rolling deploys provide zero-downtime by directing traffic to other instances while deploying a new version to hosts or containers one-by-one.

Using Datadog, you can monitor your rolling deploys and detect any resulting error increases.

{{< img src="tracing/version_tracking/rolling.png" alt="Rolling Deployment"  style="width:100%;">}}

### Blue/green deploys

Blue/green (or other color combination) deployments reduce downtime by running two clusters of services that are both accepting traffic, or by keeping one on standby, ready to be activated if there are problems with the other.

Setting and viewing the `version` tags for these services lets you compare requests and errors to detect if one of the clusters has an error rate higher than the other cluster, if a cluster is not meeting SLOs, or if a cluster that is not supposed to be receiving traffic is.

{{< img src="tracing/version_tracking/BlueGreenDeploy.png" alt="Blue/Green Deployment"  style="width:100%;">}}

### Canary deploys

With canary deploys, a service is deployed on a limited number of hosts or for a fraction of customers, to test a new deployment with limited impact.

Using `version` tags within Datadog allows you to compare error rates, traces, and service behavior for the canary deployment.

For example, you can see in the following image that a canary version was deployed, had a few errors, and was removed, with traces corresponding to that version available for investigation without any further impact.

{{< img src="tracing/version_tracking/CanaryDeploy.png" alt="Canary Deployment"  style="width:100%;">}}

### Shadow deploys

In a shadow deployment, a release candidate version is deployed alongside the production version, and incoming traffic is sent to both services, with users seeing the results only from production, but letting you collect data from both.

Shadow deploys allow you to test a potential release against real production traffic. Tagging shadows with a `version` tag lets you compare error rates, traces, and service behavior between the two versions to determine if the shadow version should be released.

## Using Version Tags elsewhere within Datadog

The `version` tag can be used anywhere within Datadog, whether to filter a search view to a specific version, or to compare metrics from different versions.

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

{{< img src="tracing/version_tracking/AnalyticsErrorsByVersion.gif" alt="Version in App Analytics"  style="width:100%;">}}

When available, `version` can be used as a tag for both Trace Search and Analytics, either to filter the live search mode and indexed traces, or to filter or group analytics queries.

Analytics, including filtering on the `version` tag, can be exported to dashboards and monitors.

### Profiles by Version

In addition to being able to search for Profiles corresponding to a specific version, profiles corresponding to versions being compared can be loaded in a single click using the 'View Profiles' link on the top right of the [Version Comparison](#version-comparison) page.

{{< img src="tracing/version_tracking/VersionProfiler.png" alt="Filter Profiles by Version"  style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /getting_started/tagging/unified_service_tagging/
