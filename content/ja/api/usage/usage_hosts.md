---
title: ホストとコンテナの 1 時間あたり使用量の取得
type: apicontent
order: 35.1
external_redirect: /api/#get-hourly-usage-for-hosts-and-containers
---

## ホストとコンテナの 1 時間あたり使用量の取得

ホストとコンテナの 1 時間あたり使用量を取得します。

**引数**:

* **`start_hr`** [必須]:
    ISO-8601 UTC 形式の時間精度 [YYYY-MM-DDThh] の日時値。この時間を始めとする使用量が取得されます。
* **`end_hr`** [オプション、デフォルト = **1d+start_hr**]:
    ISO-8601 UTC 形式の時間精度 [YYYY-MM-DDThh] の日時値。この時間以降の使用量が取得されます。この時間より前を終わりとする使用量が取得されます。

**応答**:

* **`container_count`**:
    この時間中に Docker インテグレーション経由で報告を行ったコンテナの総数を表示します。
* **`host_count`**:
    指定された時間中に報告を行った課金対象のインフラストラクチャーホストの総数が含まれます。
    これは、`agent_host_count`、`aws_host_count`、`gcp_host_count`、`alibaba_host_count`、`azure_host_count` の合計です。
* **`hour`**:
    使用量が取得された時間。
* **`apm_host_count`**:
    この時間中に APM を使用したホストの総数を表示します。これらのホストは課金対象としてカウントされます (トライアル期間を除く)。
* **`agent_host_count`**:
    Datadog Agent を実行しているインフラストラクチャーホストのうち、指定された時間中に報告を行ったホストの総数が含まれます。
* **`gcp_host_count`**:
    Datadog Agent を実行していないホストのうち、Google Cloud インテグレーション経由で報告を行ったホストの総数が含まれます。
* **`aws_host_count`**:
    Datadog Agent を実行していないホストのうち、AWS インテグレーション経由で報告を行ったホストの総数が含まれます。
* **`alibaba_host_count`**:
    Datadog Agent を実行していないホストのうち、Alibaba インテグレーション経由で報告を行ったホストの総数が含まれます。
* **`azure_host_count`**:
    Datadog Agent を実行していないホストのうち、Azure インテグレーション経由で報告を行ったホストの総数が含まれます。


