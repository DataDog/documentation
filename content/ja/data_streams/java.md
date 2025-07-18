---
further_reading:
- link: /integrations/kafka/
  tag: ドキュメント
  text: Kafka インテグレーション
- link: /tracing/service_catalog/
  tag: ドキュメント
  text: サービスカタログ
kind: documentation
title: Data Streams Monitoring for Java のセットアップ
---

{{< site-region region="ap1" >}}
<div class="alert alert-info">Data Streams Monitoring は、AP1 リージョンではサポートされていません。</a></div>
{{< /site-region >}}

### 前提条件

Data Streams Monitoring を開始するには、Datadog Agent と Java ライブラリの最新バージョンが必要です。
* [Datadog Agent v7.34.0 以降][1]
* [Java Agent v1.9.0 以降で APM を有効にする][2]

### インストール

Java は自動インスツルメンテーションを使用して、Data Streams Monitoring がエンドツーエンドのレイテンシーやキューとサービス間の関係を測定するために必要な追加のメタデータを挿入し抽出します。Data Streams Monitoring を有効にするには、Kafka または RabbitMQ にメッセージを送信する (またはメッセージを消費する) サービス上で `DD_DATA_STREAMS_ENABLED` 環境変数を `true` に設定します。

例:
```yaml
environment:
  - DD_DATA_STREAMS_ENABLED: "true"
```

代わりに、Java アプリケーションの起動時に以下を実行して、`-Ddd.data.streams.enabled=true` システムプロパティを設定することも可能です。

```bash
java -javaagent:/path/to/dd-java-agent.jar -Ddd.data.streams.enabled=true -jar path/to/your/app.jar
```

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent
[2]: /ja/tracing/trace_collection/dd_libraries/java/