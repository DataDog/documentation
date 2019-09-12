---
title: Service Level Objectives
kind: documentation
description: "Track the status of your SLOs"
disable_toc: true
beta: true
further_reading:
- link: "https://www.datadoghq.com/blog/slo-monitoring-widget/"
  tag: "Blog"
  text: "Track the status of your SLOs with the new monitor uptime widget"
aliases:
    - /monitors/monitor_uptime_widget/
---

<div class="alert alert-info">
Service Level Objectives are now generally available.
</div>

## Configuring Service Level Objectives (SLOs) 

Select time or event based SLIs: 

### Time based SLIs use Datadog Monitors

Example: the latency of all user requests should be less than 250ms 99% of the time in any 30 day window.

a. Select a single monitor or, 
b. Select multiple monitors (up to 20) or, 
c. Select a single multi-alert monitor and select specific monitor groups (up to 20) to be
included in SLO calculation 

**Note**: We support up to 20 monitors. 

If you need to create a new Monitor in-app go to https://app.datadoghq.com/monitors#create/metric. Check out the docs here: https://docs.datadoghq.com/monitors/ 

**Note**: for 7 days, the widget is restricted to 2 decimal places of accuracy. For 30 days and up, it’s restricted to 2-3 decimal places of accuracy. Currently, this is not customizable. 

### Supported monitor types

Currently only metric monitor types and synthetics are generally available and supported in the widget. Only supported monitors will be available to select within the widget. Service checks are supported in beta. All other monitor types are not currently supported.

Supported metric monitor types include: metric, anomaly, APM, forecast, outlier, and integration metrics. For more info, see here for monitor types.

### Select your target and time window 

Select something like 99%, 99.5%, 99.9%, 99.95%, or whatever makes sense for your requirements over the last 7, last 30, or last 90 days. These are rolling windows. 

### Event based SLIs use metrics submitted directly to Datadog and do not require a Monitor

Example: 99% of requests should be less than 250ms over a 30 day window.

You are defining a success rate through numerator and denominator fields.

Select the metrics that represent your **successful events** in the numerator, and select the metrics that represent your **total events** in the denominator.

You can add up to as many metrics as you need for both fields and add a formula to calculate the total for each.

Distribution and percentile metrics are not currently supported. 

**Note**: Datadog displays up to 3 decimal places for all time windows. Currently, this is not customizable. 

### Select your target and time window 

Select something like 99%, 99.5%, 99.9%, 99.95%, or whatever makes sense for your requirements over the last 7, last 30, or last 90 days. These are rolling windows. 

## Implementing SLIs in Datadog 

SLIs can be implemented in a variety of ways. The below are currently supported: 
- Custom metrics (e.g. counters, gauge, rates, histograms) 
- Integration metrics (e.g. load balancer, http requests)
- Datadog APM (e.g. errors, latency on services and resources)
- Datadog Logs (e.g. metrics from logs for a count of particular occurence) 
- Synthetics (e.g. API endpoint or browser tests)

## Error budgets 

We’ll automatically calculate the error budget once a target and time window have been set. The error budget represents the amount of time you are allowed to be in the red until your defined SLO is breached. 

## Including descriptive information for your SLOs

1. Name your SLO. We recommend a brief but descriptive name. Monitor based SLOs will inherit the monitor title but you can edit the title if you’d like. 
2. Add a description. We recommend describing what the SLI is measuring and why it’s
important for your user’s experience. You can also add links to dashboards for reference.
3. Add tags. We recommend tagging by team and service. Monitor based SLOs will inherit monitor tags that can be used for searching and filtering in the SLO list view but you can add additional tags for these. 

## Viewing SLOs 

Once you finish creating or editing an SLO and click save, a detail panel will be displayed. The following visualization shows that an event based SLI detail panel will look like: 

ADD IMAGE

## SLO list view

The SLO list view provides a centralized location for your organization to access and manage all SLOs. 

### Searching and Filtering for SLOs

Using the tags you created, you can view your SLOs for high-level overviews directly from the SLO list view using the search bar or faceted search. 

## Terraform

Provides a Datadog service level objective resource. This can be used to create and manage Datadog service level objectives. https://www.terraform.io/docs/providers/datadog/r/service_level_objective.html

## SLO API 

LINK TO API DOCS 

## SLOs on dashboards 

You can add SLOs to dashboards. Learn more about this here: LINK TO NEW SLO WIDGET DOCS

## Feature requests
To submit feature requests, reach out to Datadog Support, and someone from the team will assist you.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

