---
further_reading:
- link: /serverless/configuration/#migrate-to-the-datadog-lambda-extension
  tag: ドキュメント
  text: Datadog Lambda 拡張機能に移行する
title: Datadog Lambda 拡張機能への移行を決定
---

## Datadog Lambda 拡張機能に移行する必要がありますか？

AWS Lambda 拡張機能は、Lambda 関数コードとともに Lambda 実行環境内で実行されます。Datadog は AWS と提携して、[Datadog Lambda 拡張機能][1]を作成しました。これは、カスタムメトリクス、拡張メトリクス、トレース、ログを送信する Datadog Agent の軽量バージョンです。

Datadog Lambda 拡張機能の導入前に [Datadog サーバーレス][2]を構成した場合は、[Datadog Forwarder][3] を使用して、カスタムメトリクス、拡張メトリクス、トレース、ログを送信する可能性があります。

Lambda 拡張機能と Forwarder の間にはいくつかの重要な違いがあります。このページでは、Forwarder から Lambda 拡張機能への移行を選択する場合と選択しない場合があるさまざまな理由について説明します。

### 機能の違い

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="AWS サーバーレスアプリケーションをインスツルメントする" style="width:100%;">}}

Lambda 拡張機能は、Lambda 関数からテレメトリーを収集する推奨方法として Forwarder に取って代わるものですが、API Gateway、AppSync、Lambda@Edge からのものを含む他の AWS サービスのログを収集しメタデータを追加するには、Forwarder が必要です。

### メリット

Datadog Lambda 拡張機能には、Datadog Forwarder に比べて次の利点があります。

- **CloudWatch Log をスキップ**: Forwarder は、ログからテレメトリーを抽出し、Datadog に送信します。Datadog Lambda 拡張機能はテレメトリーを直接 Datadog に送信し、CloudWatch Log や Forwarder Lambda 関数自体に関わるコストを削減することが可能です。
- **セットアップが簡単**: Datadog Lambda 拡張機能は Lambda レイヤーとして追加でき、テレメトリーを直接 Datadog に送信するため、新しい Lambda 関数の CloudWatch ロググループごとにサブスクリプションフィルターを設定する必要がありません。

### トレードオフ

拡張機能は、コールドスタート時に拡張機能をロードし、テレメトリーを Datadog にフラッシュするため、[Lambda 関数に追加のオーバーヘッドをもたらします][4]。追加される期間の大部分は、関数のパフォーマンスに**影響を与えません**。Datadog の最新のベンチマーク結果によると、Lambda 拡張機能と Forwarder を使用した場合、コストオーバーヘッドは常に低くなっています。

### 結論

特に多くの Lambda 関数からログを収集したいだけであれば、Datadog Forwarder を使い続けることは理にかなっています。Lambda 関数からメトリクスやトレースも収集する場合は、Datadog Lambda 拡張機能に移行することをお勧めします。

## Datadog Lambda 拡張機能に移行する

Datadog Forwarder から Datadog Lambda 拡張機能への移行は、[サーバーレス構成ドキュメント][5]をご参照ください。
## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/serverless/libraries_integrations/extension/
[2]: /ja/serverless
[3]: /ja/logs/guide/forwarder/
[4]: /ja/serverless/libraries_integrations/extension/#overhead
[5]: /ja/serverless/configuration/#migrate-to-the-datadog-lambda-extension