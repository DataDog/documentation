---
title: How to Set Up Incident Data for DORA Metrics
description: Learn how to send incident events for DORA Metrics.
aliases:
- /continuous_integration/dora_metrics/setup/incidents
- /dora_metrics/setup/incidents
is_beta: true
further_reading:
- link: /continuous_integration/dora_metrics/setup/deployments
  tag: ドキュメント
  text: Learn about setting up deployment data in DORA Metrics
- link: /tracing/service_catalog
  tag: ドキュメント
  text: サービスカタログについて
- link: "https://github.com/DataDog/datadog-ci"
  tag: ソースコード
  text: datadog-ci CLI ツールについて
- link: /continuous_delivery/deployments
  tag: ドキュメント
  text: Deployment Visibility について
- link: "https://app.datadoghq.com/release-notes?category=Software%20Delivery"
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## 概要

Failed deployments events, currently interpreted through incident events, are used to compute [change failure rate](#calculating-change-failure-rate) and [mean time to restore (MTTR)](#calculating-mean-time-to-restore). 

## Selecting an incident data source

{{< whatsnext desc="DORA Metrics supports the following data sources for deployment events. See the respective documentation to set up a data source for your deployment events:" >}}
  {{< nextlink href="/dora_metrics/failures/pagerduty" >}}PagerDuty{{< /nextlink >}}
  {{< nextlink href="/dora_metrics/failures/incident_api" >}}Incident Event API{{< /nextlink >}}
{{< /whatsnext >}}

## Calculating change failure rate 
Change failure rate requires both [deployment data][7] and [incident data](#configuring-failure-data-sources).

Change failure rate is calculated as the percentage of incident events out of the total number of deployments. Datadog divides `dora.incidents.count` over `dora.deployments.count` for the same services and/or teams associated to both an failure and a deployment event. 

## Calculating time to restore 
Time to restore is calculated as the duration distribution for *resolved incident* events.

DORA Metrics generates the `dora.time_to_restore` metric by recording the start and end times of each incident event. It calculates the mean time to restore (MTTR) as the average of these `dora.time_to_restore` data points over a selected time frame. 

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /api/latest/dora-metrics/#send-a-deployment-event-for-dora-metrics
[2]: https://www.npmjs.com/package/@datadog/datadog-ci
[3]: /tracing/service_catalog
[4]: /tracing/service_catalog/setup
[5]: /tracing/service_catalog/adding_metadata
[6]: https://git-scm.com/docs/git-log
[7]: /dora_metrics/deployments
