---
description: Parse JSON プロセッサを使用して、指定された JSON フィールドをオブジェクトに解析する方法を学びます。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/otel-ai-observability-pipelines-clickhouse/
  tag: ブログ
  text: Observability Pipelines を使用して、AI アプリから ClickHouse および Datadog へ OTel データをルーティングする
- link: https://www.datadoghq.com/blog/observability-pipelines-mssp
  tag: ブログ
  text: Datadog Observability Pipelines を使用して、MSSP 向けのログ収集と集約を簡素化する
products:
- icon: logs
  name: ログ
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: Parse JSON プロセッサ
---
{{< product-availability >}}

## 概要 {#overview}

このプロセッサは、指定された JSON フィールドをオブジェクトに解析します。たとえば、文字列化された JSON を含む `message` フィールドがある場合、

```json
{
    "foo": "bar",
    "team": "my-team",
    "message": "{\"level\":\"info\",\"timestamp\":\"2024-01-15T10:30:00Z\",\"service\":\"user-service\",\"user_id\":\"12345\",\"action\":\"login\",\"success\":true,\"ip_address\":\"192.168.1.100\"}"
    "app_id":"streaming-services",
    "ddtags": [
    "kube_service:my-service",
    "k8_deployment :your-host"
    ]
}
```

Parse JSON プロセッサを使用して `message` フィールドを解析し、`message` フィールドにネストされたオブジェクト内のすべての属性が含まれるようにします。

{{< img src="observability_pipelines/processors/parse-json-example.png" alt="message を解析対象フィールドとする Parse JSON プロセッサ" style="width:60%;" >}}

この出力には、解析された JSON を含む `message` フィールドが含まれます。

```json
{
    "foo": "bar",
    "team": "my-team",
    "message": {
        "action": "login",
        "ip_address": "192.168.1.100",
        "level": "info",
        "service": "user-service",
        "success": true,
        "timestamp": "2024-01-15T10:30:00Z",
        "user_id": "12345"
    }
    "app_id":"streaming-services",
    "ddtags": [
    "kube_service:my-service",
    "k8_deployment :your-host"
    ]
}
```

## セットアップ {#setup}

このプロセッサを設定するには、
1. {{< ui >}}filter query{{< /ui >}} を定義します。指定されたフィルタークエリに一致するログのみが処理されます。フィルタークエリに一致するかどうかにかかわらず、すべてのログがパイプラインの次のステップに送信されます。詳細については、[検索構文][1]を参照してください。
2. JSON の解析対象とするフィールド名を入力します。<br>**注**: 解析された JSON は、そのフィールドに元々含まれていた内容を上書きします。

## Health メトリクス {#health-metrics}

すべてのプロセッサから出力される[コンポーネントメトリクス][2]および[プロセッサバッファメトリクス][3]については、[Pipelines 使用量メトリクス][4]のドキュメントを参照してください。Parse プロセッサのメトリクスでフィルタリングまたはグループ化するには、タグ `component_type:parse` を使用します。

[1]: /ja/observability_pipelines/search_syntax/logs/
[2]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#component-metrics
[3]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/#processor-buffer-metrics
[4]: /ja/observability_pipelines/monitoring_and_troubleshooting/pipeline_usage_metrics/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}