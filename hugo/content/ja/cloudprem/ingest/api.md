---
aliases:
- /ja/cloudprem/ingest_logs/rest_api/
description: REST API を直接呼び出して CloudPrem とインテグレーションする方法を説明します。
further_reading:
- link: /cloudprem/ingest_logs/datadog_agent/
  tag: ドキュメント
  text: Datadog Agent インテグレーション
- link: /cloudprem/ingest_logs/observability_pipelines/
  tag: ドキュメント
  text: Observability Pipelines インテグレーション
title: REST API でログを CloudPrem に送信する
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem は Preview 版です" >}}
  CloudPrem Preview に参加すると、新しいセルフ ホスト型のログ管理機能を利用できます。
{{< /callout >}}

## 概要

REST API を直接使って CloudPrem にログを送信できます。この方法は、Datadog Agent や Observability Pipelines を使えないカスタム インテグレーションやスクリプトに向いています。

## Datadog Logs API

**エンドポイント**: `POST /api/v2/logs`<br>
**Content-Type**: `application/json`<br>
**認証**: Datadog API キー

```shell
curl -X POST "http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280/api/v2/logs" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: your-datadog-api-key" \
  -d '[
    {
      "message": "User login successful",
      "level": "info",
      "timestamp": "2024-01-15T10:30:00Z",
      "service": "auth-service",
      "host": "web-01",
      "tags": ["authentication", "success"]
    }
  ]'
```

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}