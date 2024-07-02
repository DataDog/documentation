---
title: DORA Metrics Data Collected
kind: ドキュメント
further_reading:
- link: /dora_metrics/
  tag: ドキュメント
  text: Learn about DORA Metrics
- link: /dora_metrics/setup/
  tag: ドキュメント
  text: Set up data sources for DORA Metrics
- link: /metrics/
  tag: ドキュメント
  text: Learn about metrics
- link: /getting_started/tagging/
  tag: ドキュメント
  text: Getting started with Tags
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">DORA Metrics is not available in the selected site ({{< region-param key="dd_site_name" >}}) at this time.</div>
{{< /site-region >}}

<div class="alert alert-warning">DORA Metrics is in public beta.</div>

## 概要

DORA Metrics generates [metrics][9] for each one of the four core DORA Metrics, as well as events with associated tags and attributes that are available in the [Events Explorer][1].

## Default metrics

DORA Metrics provides the following default metrics:

| メトリクス | タイプ | 説明 |
| :--- | :--- | :--- |
| `dora.deployments.count` | count | The number of deployments detected by Datadog based on your selected [deployment data source][10].
| `dora.change_lead_time` | ディストリビューション | The age in `seconds` of associated Git commits at the time of deployment.
| `dora.incidents_impact` | count | Tracks the services or teams impacted by incidents. Used for change failure rate with the formula `dora.incidents_impact / dora.deployments.count`. A big time rollup of at least 1 week is recommended to account for the time difference between deployments and when the impact starts.
| `dora.time_to_restore` | ディストリビューション | The time in `seconds` between an incident's `started_at` and `finished_at` timestamps.

### デフォルトのタグ

All default metrics contain the following tags if any are available:

- `service`
- `team`
- `env`
- `repository_id`

**Note**: The `severity` tag is available for `dora.incidents_impact` and `dora.time_to_restore` metrics when it is provided by the failure's data source.

For more information about using `env`, `service`, and `version` tags, see [Getting Started with Tags][6].

## Change lead time metrics

Datadog breaks down change lead time into the following metrics, which represent the different stages from commit creation to deployment.

| メトリクス | タイプ | 説明 |
|---|---|---|
| `dora.time_to_pr_ready` | duration | Time from when the commit is created until the PR is ready for review. This metric is only available for commits that were made before the PR was marked as ready for review. |
| `dora.review_time` | duration | Time from when the PR is marked ready for review until it receives the last approval. This metric is only available for commits that were made before the PR is approved. |
| `dora.merge_time` | duration | Time from the last approval until the PR is merged. |
| `dora.time_to_deploy` | duration | Time from PR merge to start of deployment. If a commit does not have an associated PR, this metric is calculated as the time from commit creation to start of deployment. |
| `dora.deploy_time` | duration | Time from start of deployment to end of deployment. This metric is not available if there is no deployment duration information. |

These metrics are only computed when the source of the repository metadata is GitHub, and there must be a pull request (PR) associated with a commit, if any. A commit is associated with a PR if the commit is first introduced to the target branch when merging that PR. If a commit does not have an associated PR, only `dora.time_to_deploy` and `dora.deploy_time` metrics are available.

**Note:** These metrics are emitted for every commit and not per deployment.

## Examine metrics in Event Management

Default DORA Metrics are available in the [Events Explorer][1]. To search and filter on your DORA Metrics events, navigate to [**Service Management** > **Event Management** > **Explorer**][11] and enter `source:software_delivery_insights` in the search query.

{{< img src="dora_metrics/events.png" alt="Events collected from DORA Metrics in the Events Explorer" style="width:100%;" >}}

These metrics can be queried programmatically by using the [Query timeseries points][5] and [Query timeseries data across multiple products][6] API endpoints with the source `software_delivery_insights`.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/events/explorer/
[2]: /api/latest/metrics/#query-timeseries-points
[3]: /api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /getting_started/tagging/
[7]: /api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/metrics/
[10]: /dora_metrics/deployments/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true