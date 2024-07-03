---
aliases:
- /ja/tracing/version_tracking
- /ja/tracing/deployment_tracking/
description: Use Datadog to track your deployments through version tags
further_reading:
- link: getting_started/tagging/unified_service_tagging/
  tag: Documentation
  text: Learn about Unified Service Tagging and reserved tags
- link: tracing/app_analytics
  tag: Documentation
  text: Use version as a dimension in your App Analytics queries
kind: documentation
title: Deployment  Tracking
---
## The version tag

The `version` tag is reserved within Unified Service Tagging. It's applied to infrastructure metrics (host, container, process, and NPM checks), trace metrics, traces, profiles, and logs.

You can use the `version` tag to monitor deployments and service behavior in support of your software deployment strategy.

If you have not set up the `version` tag refer to the [Unified Service Tagging documentation][1] for setup information.

## Using version tags on the Service page

{{< img src="tracing/deployment_tracking/ServicePageRequestsErrorsByVersion.png" alt="Versions on the Service page" style="width:100%;">}}

On the Service page, if the `version` tag is available, you can scope the Requests widget to:

- Total Requests by Version, or
- Requests Per Second by Version

You can scope the errors widget to:

- Total Errors by Version
- Errors Per Second by Version, or
- % Error Rate by Version

Requests and Errors widgets can both be exported to dashboards and monitors.

## Using version tags for automatic faulty deployment detection

Configuring your services with the `version` tag enables [Automatic Faulty Deployment Detection][4]. 

You can set up a monitor to get automatically notified on all potentially faulty deployments. To do so, navigate to the New Monitors page and choose Events, and include `tags:deployment_analysis` in the search query defining the monitor.


## Versions deployed

A service configured with `version` tags has a version section on its Service page, below the main service health graphs. The version section shows all versions of the service that were active during the selected time interval, with active services at the top.

By default you will see:

- The version names deployed for this service over the timeframe.
- The times at which traces that correspond to this version were first and last seen.
- An Error Types indicator, which shows how many types of errors appear in each version that did not appear in the immediately previous version.

    > **Note:** This indicator shows errors that were not seen in traces from the previous version. It doesn't mean that this version necessarily introduced these errors. Looking into new error types can be a great way to begin investigating errors.

- Requests per second.
- Error rate as a percentage of total requests.


You can add columns to or remove columns from this overview table and your selections will be saved. The additional available columns are:

- Endpoints that are active in a version that were not in the previous version.
- Time active, showing the length of time from the first trace to the last trace sent to Datadog for that version.
- Total number of Requests.
- Total number of Errors.
- Latency measured by p50, p75, p90, p95, p99, or max.

{{< img src="tracing/deployment_tracking/VersionComparison.png" alt="Versions on the Service Page" style="width:100%;">}}

**Note:** The version section appears only if there is more than one version reporting during the time interval that is selected at the top of the page.

## Deployment comparison

Click on any version row in the version summary table to open a version comparison page, allowing you to compare two versions of the same service. By default, the selected version will be compared to the immediately previous version but you can change it to compare any two versions within the past 30 days.

You can find the following information on version comparison page:

- [Comparison Graphs](#comparison-graphs): A visualization of requests and errors to services, useful for watching various types of [deployments](#deployment-strategies).
- [Error Comparison](#error-comparison): Errors that may have been introduced or solved by a version.
- [Endpoint Comparison](#endpoint-comparison): How endpoint latency and error rates perform in each version.

### Comparison graphs

Similar to the graphs on the Service page, Requests and Errors graphs show an overview of a deployment rollout or spikes in error rates. On this page, the graphs highlight the selected versions for comparison and leave all other versions in gray for additional context.

{{< img src="tracing/deployment_tracking/ComparisonGraphs.png" alt="Deployment Comparison Graphs" style="width:100%;">}}

If [Continuous Profiler is enabled][5], you also see comparisons of key performance metrics, such as CPU Time or Allocated Memory, broken down per APM resource. From there, you can pivot to the [Profile Comparison Page][6]:

{{< img src="tracing/deployment_tracking/DeploymentTrackingProfileComparison.png" alt="Deployment Profiling Comparison Graphs" style="width:100%;">}}

### Error comparison

This section lists differences in error types detected for each the two versions, highlighting:

 - Error types appearing only in the source version, useful for troubleshooting it;
 - Error types no longer appearing in the source version, useful for validating fixes; and
 - Error types active in both.

From this table, you can pivot into live or historical traces corresponding to the selected error for further investigation.

**Note:** Error comparison is based on _observed_ error types. If an error type is rare, it might be listed as no longer appearing only because it has not been seen _yet_.

{{< img src="tracing/deployment_tracking/ErrorComparison.mp4" alt="Error Comparison" video=true style="width:100%;">}}

### Endpoint comparison

This section lets you compare the performance (requests, latency, and errors) of each endpoint in the service. Sort the table by Value to validate that the highest-throughput endpoints are still healthy following a deploy, or by % Change to spot large changes in latency or error rates.

{{< img src="tracing/deployment_tracking/EndpointComparison.png" alt="Endpoint Comparison" style="width:100%;">}}

## Deployment strategies

Datadog's deployment tracking gives you visibility into the performance of deployed code when you are using the following deployment strategies (or others) to detect bad code deployments, contain the impact of changes, and respond faster to incidents.

### Rolling deploys

Rolling deploys provide zero-downtime by directing traffic to other instances while deploying a new version to hosts or containers one-by-one.

Using Datadog, you can monitor your rolling deploys and detect any resulting error increases.

{{< img src="tracing/deployment_tracking/rolling.png" alt="Rolling Deployment" style="width:100%;">}}

### Blue and green deploys

Blue and green (or other color combination) deployments reduce downtime by running two clusters of services that are both accepting traffic, or by keeping one on standby, ready to be activated if there are problems with the other.

Setting and viewing the `version` tags for these services lets you compare requests and errors to detect if one of the clusters has an error rate higher than the other cluster, if a cluster is not meeting SLOs, or if a cluster that is not supposed to be receiving traffic is.

{{< img src="tracing/deployment_tracking/BlueGreenDeploy.png" alt="Blue/Green Deployment" style="width:100%;">}}

### Canary deploys

With canary deploys, a service is deployed on a limited number of hosts or for a fraction of customers, to test a new deployment with limited impact.

Using `version` tags within Datadog allows you to compare error rates, traces, and service behavior for the canary deployment.

For example, you can see in the following image that a canary version was deployed, had a few errors, and was removed, with traces corresponding to that version available for investigation without any further impact.

{{< img src="tracing/deployment_tracking/canarydeployment.png" alt="Canary Deployment" style="width:100%;">}}

### Shadow deploys

In a shadow deployment, a release candidate version is deployed alongside the production version, and incoming traffic is sent to both services, with users seeing the results only from production, but letting you collect data from both.

Shadow deploys allow you to test a potential release against real production traffic. Tagging shadows with a `version` tag lets you compare error rates, traces, and service behavior between the two versions to determine if the shadow version should be released.

## Using version tags elsewhere within Datadog

The `version` tag can be used anywhere within Datadog, whether to filter a search view to a specific version, or to compare metrics from different versions.

### Resource page

{{< img src="tracing/deployment_tracking/ResourcePage.png" alt="Versions on the Resource Page" style="width:100%;">}}

On the Resource page, if the version tag is available, the requests widget can be scoped to either of:

- Total Requests by Version
- Requests per second by Version

The errors widget can be scoped to one of three options that involve the `version` tag:

- Total Errors by Version
- Errors per second by Version
- % Error rate by Version

All of these can be exported to dashboards and monitors.

### Trace search and analytics

{{< img src="tracing/deployment_tracking/AnalyticsErrorsByVersion.mp4" alt="Version in App Analytics" video=true style="width:100%;">}}

When available, `version` can be used as a tag for both Trace Search and Analytics, either to filter the live search mode and indexed traces, or to filter or group analytics queries.

Analytics, including filtering on the `version` tag, can be exported to dashboards and monitors.

### Profiles by version

You can search for profiles that correspond to a particular version. You can also click **View Profiles** on the top right of the [Deployment Comparison](#deployment-comparison) page to open the Continuous Profiler scoped to either version being compared.

{{< img src="tracing/deployment_tracking/VersionProfiler.png" alt="Filter Profiles by Version" style="width:100%;">}}

<br>

## The time between deployments metric

Every time a new deployment of a service is detected, Deployment Tracking calculates a value for the `time_between_deployments` metric, calculated as the duration in seconds between the new deployment and the deployment of the most recent version prior to that. 

### Metric definition

`datadog.service.time_between_deployments{env, service, second_primary_tag}`
: **Prerequisite:** This metric exists for any APM service with version tagging enabled through [Unified Service Tagging][1].<br>
**Description:** The time in seconds elapsed between a deployment of a service and the deployment of the most recent version prior to that.<br>
**Metric type:** [Distribution][2]<br>
**Tags:** The metric is tagged with the service's `env`, `service`, and [second primary tag][3].

### Examples

If you have a service that deploys version A at time = 0 and version B at time = 10, then the value of the metric `datadog.service.time_between_deployments` is 10:

Time = 0
: `{service: foo, env: prod, cluster-name: dev-shopist, version: A}`

Time = 10
: `{service: foo, env: prod, cluster_name: dev-shopist, version: B}`

Time between deployments
: `datadog.service.time_between_deployments{env: prod, cluster_name: dev-shopist} = 10`


If you deploy version X at time = 20 on cluster `dev-shopist`, version Y at time = 30 on cluster `us-staging`, and version Y again at time = 45 on cluster `dev-shopist`, the `max` value of the metric `datadog.service.time_between_deployments` for any cluster is 25 (the time of the most recent Y minus the last X): 

Time = 20
: `{service: foo, env: staging, cluster-name: dev-shopist, version: X}`

Time = 30
: `{service: foo, env: staging, cluster-name: us-staging, version: Y}`

Time = 45
: `{service: foo, env: dev-shopist, cluster-name: us-staging, version: Y}`

Max time between deployments:
: `max:datadog.service.time_between_deployments{env: staging, cluster-name: *} = 25`


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/getting_started/tagging/unified_service_tagging/
[2]: /ja/metrics/types/?tab=distribution#metric-types
[3]: /ja/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[4]: /ja/watchdog/faulty_deployment_detection/
[5]: /ja/profiler/enabling/
[6]: /ja/profiler/compare_profiles