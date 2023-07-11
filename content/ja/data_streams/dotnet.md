---
kind: documentation
title: Data Streams Monitoring for .NET のセットアップ
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring は、AP1 リージョンではサポートされていません。</a></div>
{{< /site-region >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と .NET ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* .NET Tracer v2.28.0 以降 ([.NET Core][2]、[.NET Framework][3])

### インストール

.NET は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka または RabbitMQ にメッセージを送信する (またはメッセージを消費する) サービス上で `DD_DATA_STREAMS_ENABLED` 環境変数を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/dotnet-core
[3]: /ja/tracing/trace_collection/dd_libraries/dotnet-framework