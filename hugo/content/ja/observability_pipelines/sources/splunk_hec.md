---
disable_toc: false
title: Splunk HTTP Event Collector (HEC) ソース
---

Observability Pipelines の Splunk HTTP Event Collector (HEC) ソースを使用して、Splunk HEC からログを受信します。[パイプラインを設定する][1] 際にこのソースを選択して設定してください。

## 前提条件

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Set up the source in the pipeline UI

Select and set up this source when you [set up a pipeline][1]. The information below is for the source settings in the pipeline UI.

{{% observability_pipelines/source_settings/splunk_hec %}}

{{% observability_pipelines/log_source_configuration/splunk_hec %}}

[1]: /ja/observability_pipelines/set_up_pipelines/