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

`version` is a [reserved tag][1] within Datadog, and because of Unified Service Tagging, the `version` tag is applied across infrastructure, traces, trace metrics, profiles, and logs.

This page describes specific ways you can use the `version` tag to better monitor deployments and service behavior. See the [Unified Service Tagging][1] docs for instructions for setting up the tags.

## Using Version Tags on the Service Page

{{< img src="tracing/version_tracking/ServicePage.png" alt="Versions on the Service Page"  style="width:100%;">}}

On the Service page, if the `version` tag is available, the requests widget can be scoped to either of:

- Total Requests by Version
- Requests per second by Version

The errors widget can be scoped to one of three options that involve the `version` tag:

- Total Errors by Version
- Errors per second by Version
- % Error rate by Version

All of these can be exported to dashboards and monitors.

## Version Summary Table

Services configured with version tags will have a `Version` section on the Service page, immediately below the main service health graphs discussed above.  This table will show all versions of the service that were active during the selected time interval, with currently active services at the top.

By default you will see:
- The version name(s) deployed for this service over the timeframe.
- The times traces corresponding to this version was first and last seen.
- An indication of how many types of errors appear in each version that did not appear in the immediately previous version.  Note that this is a not a guarantee the version introduced these errors, but an indication that this error was not seen for the previous version.  Based on how you are performing deployments, it can be a great way to begin investigating errors.
- Requests per second.
- Error rate as a percentage of total requests.

Additionally, fields can be added or removed from this overview table and your selections will be saved.  The additional fields are:

- Endpoints that appear in a version that did not appear in the previous version.
- Time active, showing the length of time from the first trace to the last trace sent to Datadog for that version.
- Total number of Requests.
- Total number of Errors.
- Latency measured by p50, p75, p90, p95, p99, or the true max.

{{< img src="tracing/version_tracking/VersionComparison.png" alt="Versions on the Service Page"  style="width:100%;">}}

**Note:** The `version` section of of the service page will only appear if there is more than one version reporting in the selected time interval at the top of the page.

## Version Comparison

Clicking on any version row in the Version Summary table will open a detailed version comparison page, allowing you to compare two specific version of the same service.  By default, the comparison will compare the version clicked to the immediately previous version, but this can be changed to compare any two versions within the past 30 days.

There are three main components of the version

### Comparison Graphs

Similar graphs to the main service page will appear, however all other versions than the two being specifically compared will be combined and labelled as 'Other versions', allowing a quick overview of a deployment or difference in error rate to be quickly noticed.

{{< img src="tracing/version_tracking/ComparisonGraphs.png" alt="Version Comparison Graphs  style="width:100%;">}}

### Error Comparison

This section will list error types that appear in either or both versions of the service.  While not a guarantee that errors have been introduced or solved, due to potentially limited traffic or other conditions for the error to occur, you can pivot from this page immediately into live or historical traces corresponding to this error for further investigation.

{{< img src="tracing/version_tracking/ErrorComparison.gif" alt="Error Comparison"  style="width:100%;">}}

### Endpoint Comparison

This section shows all the endpoints for the service, along with a comparison between the performance of requests to these endpoints between the two versions.  The table can be sorted up or down according to latency, request volume or error rate to surface the most meaning potential performance improvement or degredation, and also filtered to show common or new endpoints.

{{< img src="tracing/version_tracking/ErrorComparison.png" alt="Endpoint Comparison"  style="width:100%;">}}

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
