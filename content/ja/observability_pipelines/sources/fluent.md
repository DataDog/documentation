---
disable_toc: false
title: Fluentd と Fluent Bit のソース
---

Observability Pipelines の Fluentd または Fluent Bit ソースを使用して、Fluentd もしくは Fluent Bit エージェントからのログを受信します。[パイプラインのセットアップ][1]時に、このソースを選択して設定してください。

## 前提条件

{{% observability_pipelines/prerequisites/fluent %}}

## Set up the source in the pipeline UI

[パイプラインのセットアップ][1]の際に、このソースを選択して設定します。以下の情報は、パイプライン UI におけるソース設定に関するものです。

{{% observability_pipelines/source_settings/fluent %}}

## Fluent を介して Observability Pipelines Worker にログを送信します。

{{% observability_pipelines/log_source_configuration/fluent %}}

[1]: /ja/observability_pipelines/set_up_pipelines/