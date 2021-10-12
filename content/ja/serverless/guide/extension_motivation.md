---
title: Datadog Lambda 拡張機能への移行を決定
kind: ガイド
---
## Datadog Lambda 拡張機能に移行する必要がありますか？

AWS Lambda 拡張機能は、Lambda 関数コードとともに Lambda 実行環境内で実行されます。Datadog は AWS と提携して、[Datadog Lambda 拡張機能][1]を作成しました。これは、カスタムメトリクス、拡張メトリクス、トレース、ログを送信する Datadog Agent の軽量バージョンです。

Datadog Lambda 拡張機能の導入前に [Datadog サーバーレス][2]を構成した場合は、[Datadog Forwarder][3] を使用して、カスタムメトリクス、拡張メトリクス、トレース、ログを送信する可能性があります。

Lambda 拡張機能と Forwarder の間にはいくつかの重要な違いがあり、一方を他方よりも使用することが有利であると思われる特定の状況もあります。このページでは、Forwarder から Lambda 拡張機能への移行を選択する場合と選択しない場合があるさまざまな理由について説明します。

### 機能の違い

{{< img src="serverless/serverless_monitoring_installation_instructions.png" alt="AWS サーバーレスアプリケーションをインスツルメントする"  style="width:100%;">}}

Lambda 拡張機能は、特定のランタイムの Lambda 関数テレメトリの送信のみをサポートします。Forwarder は、メタデータを収集して、API Gateway、AppSync、Lambda@Edge からのログを含む他の AWS サービスログに追加する必要があります。

| ランタイム | 拡張機能のサポート | Forwarder のサポート |
| ------- | ----------------- | ----------------- |
| Python  | {{< X >}}         | {{< X >}}         |
| Node.js | {{< X >}}         | {{< X >}}         |
| Go      | {{< X >}}         | {{< X >}}         |
| Java    |                   | {{< X >}}         |
| .NET    |                   |                   |
| Ruby    |                   |                   |
| PHP     |                   |                   |

Lambda 拡張機能は、Forwarder for Python、Node.js、Go ランタイムと同等の機能を備えています。Lambda 拡張機能は、Lambda ログ、`dd-trace` (X-Ray ではない) によって生成された Lambda トレース、リアルタイムの拡張 Lambda メトリクス、Lambda 関数によって生成されたカスタムメトリクスを送信できます。

### メリット

Datadog Lambda 拡張機能には、Datadog Forwarder に比べて次の利点があります。

- **設定が簡単**: Forwarder では、新しい Lambda 関数ごとにトリガーを設定する必要があります。Datadog Lambda 拡張機能は、Lambda レイヤーとして簡単に追加できます。Forwarder とは異なり、Lambda 拡張機能を設定するために、サードパーティの AWS CloudFormation スタックをインストールするためのアクセス許可は必要ありません。また、Lambda 拡張機能はテレメトリを Datadog に直接送信するため、Lambda 関数の CloudWatch Log グループサブスクリプションを管理する必要はありません。
- **管理するインフラストラクチャーが少ない**: Lambda 拡張機能のコンフィギュレーションが簡単なため、インフラストラクチャー管理の時間を節約できます。Lambda 以外の AWS インテグレーションの場合でも、Forwarder は必要です。
- **CloudWatch Log をスキップ**: Forwarder はログをメトリクスとトレースに変換し、Datadog に送信します。Datadog Lambda 拡張機能は、トレース、メトリクス、ログを Datadog に直接送信し、CloudWatch Log に関連するコストを削減できるようにします。

### トレードオフ

拡張機能は、インスツルメンテーションがゼロの関数と比較して、[Lambda 関数にオーバーヘッドを追加します][4]。追加されたオーバーヘッドは、AWS の請求と Lambda の同時実行性に影響を与え、コールドスタートを悪化させる可能性があります。追加された期間の大部分は、関数のパフォーマンスに**影響しません**。Datadog の最新のベンチマーク結果に基づくと、Lambda 拡張機能と Forwarder を使用した場合、コストのオーバーヘッドは常に低くなります (またはリモートリージョンからのデータをレポートする場合はほぼ同じになります)。


[1]: /ja/serverless/libraries_integrations/extension/
[2]: /ja/serverless
[3]: /ja/serverless/libraries_integrations/forwarder/
[4]: /ja/serverless/libraries_integrations/extension/#overhead