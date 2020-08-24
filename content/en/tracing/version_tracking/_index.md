---
title: Version Tracking
kind: documentation
description: 'Send traces from your serverless functions to Datadog'
further_reading:
    - link: 'getting_started/tagging/unified_service_tagging/'
      text: 'Learn about Unified Service Tagging and reserved tags'
    - link: 'app_analytics'
      text: 'Use version as a dimension in your App Analytics queries'
---
## The Version Tag

`Version` is one of three [reserved tags][1] within Datadog, and through Unified Service Tagging, is applied across infrastructure, traces, trace metrics, profiles, and logs.

Instructions for how to set these tags can be found in the [Unified Service Tagging][1] section of the documentation, while this page details specific ways you can use the version tag within Datadog to better monitor deployments and service behavior.

## Version Deployment Strategies

A myriad of deployment tactics exist in the wild, many of them can be classified as implementations of consistent strategies. These strategies aim to contain the impact of a deployed service (maintaining a "blast radius") and allow for faster response to incidents. Implementing any of these modern strategies requires deep observability into the performance of the deployed code. Using Datadog's Version Tracking allows you to achieve just that.

### Rolling Deploys

Rolling deploys are a common way to do zero-downtime deployments.  The new version is replicated to all existing hosts or containers one-by-one, while traffic is directed to the other instances.

Using Datadog, you can monitor your rolling deployments of new versions and well as quickly detect any error increases.

{{< img src="tracing/version_tracking/rolling.png" alt="Versions on the Service Page"  style="width:100%;">}}

### Blue/Green Deploys

Blue/Green or other color combination deployments are a strategy to reduce downtime.  Depending on the particular configuration in your environments, this can either mean you are running two clusters of services that are both accepting traffic, or one is on standby, ready to be activated if there are problems with the other.

In either case, setting and viewing the version tags for these services in Datadog allows the comparison requests and errors to detect if one of your clusters is having problems, whether that be an error rate higher than the other or than you SLOs, or if a cluster that is not supposed to be receiving traffic is.

### Canary Deploys

Canary deploys allow for a service to be deployed on a limited number of hosts or for a fraction of customers to test a new deployment with limited impact.

Using Version tags within Datadog allows you to compare error rates, traces, and service behavior for the canary deployment.

For example, you can see in the below image that a canary version was deployed, had a few errors, and was removed afterwards, with traces corresponding to that version available for investigation without any further impact to webservice integrity.

{{< img src="tracing/version_tracking/Canary.png" alt="Versions on the Service Page"  style="width:100%;">}}

### Shadow Deploys

Using a Shadow Deployment strategy, a release candidate version is deployed to production to "shadow" the existing deployed service.   Incoming traffic is sent to both services, without impacting production users.

Doing this allows testing a potential version against real production traffic.  Tagging these shadow deployments with a version tag within Datadog allows you to compare error rates, traces, and service behavior between the two versions to determine if the shadow version should be released.

## Using Version Tags within Datadog

Version tags can be used anywhere within Datadog, whether to filter a search view to a specific version, or compare versions.

### The Service and Resource Page

When version tags are present, the Service and Resource pages have te

#### Service Page

{{< img src="tracing/version_tracking/ServicePage.png" alt="Versions on the Service Page"  style="width:100%;">}}

On the service page, if the version tag is available, the requests widget can be scoped to either of:
- Total Requests by Version
- Requests per second by Version

While the errors widget can be scoped to one of three options including version:

- Total Errors by Version
- Errors per second by Version
- % Error rate by Version

All of these can be exported to dashboards and monitors.

#### Resource Page

{{< img src="tracing/version_tracking/ResourcePage.png" alt="Versions on the Resource Page"  style="width:100%;">}}

On the resource page, if the version tag is available, the requests widget can be scoped to either of:
- Total Requests by Version
- Requests per second by Version

While the errors widget can be scoped to one of three options including version:

- Total Errors by Version
- Errors per second by Version
- % Error rate by Version

All of these can be exported to dashboards and monitors.

### Trace Search and Analytics

{{< img src="tracing/version_tracking/AnalyticsErrorsByVersion.gif" alt="Versions on the Resource Page"  style="width:100%;">}}

When available, Version can be used as a tag for both Trace Search and Analytics, either to filter the live search mode, or indexed traces, or to filter or group analytics queries.

Analytics including filtering on the version tag can also be exported to dashboards and monitors for alerting purposes.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /getting_started/tagging/unified_service_tagging/
