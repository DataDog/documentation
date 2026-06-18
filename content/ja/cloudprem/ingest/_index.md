---
description: ログ ソースを設定し、CloudPrem デプロイメントにデータを送信します。
title: ログ取り込みを設定する
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

CloudPrem をインストールして設定したら、次はアプリケーションやインフラストラクチャーからログ データを送るために、ログ取り込みを構成する必要があります。CloudPrem は、異なるアーキテクチャや要件に対応できるよう、複数の取り込み方法を用意しています。

## ログ取り込みの方法

{{< whatsnext desc="Choose the appropriate ingestion method based on your infrastructure and requirements:">}}
   {{< nextlink href="/cloudprem/ingest/agent/" >}}Datadog Agent{{< /nextlink >}}
   {{< nextlink href="/cloudprem/ingest/observability_pipelines/" >}}Observability Pipelines{{< /nextlink >}}
   {{< nextlink href="/cloudprem/ingest/api/" >}}REST API Integration{{< /nextlink >}}
{{< /whatsnext >}}