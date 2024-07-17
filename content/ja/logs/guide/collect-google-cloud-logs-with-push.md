---
further_reading:
- link: /logs/explorer/
  tag: ドキュメント
  text: ログの調査方法
- link: /logs/explorer/#visualize
  tag: ドキュメント
  text: ログ分析の実行
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
kind: ドキュメント
title: Pub/Sub Push サブスクリプションによる Google Cloud ログの収集
---

<div class="alert alert-danger">
このページでは、レガシーな Pub/Sub Push サブスクリプションに関連する構成情報を含む非推奨機能について説明します。これは、トラブルシューティングやレガシーセットアップの変更に便利です。代わりに Google Cloud のログを Datadog に転送するには、Datadog Dataflow テンプレートで <strong>Pull</strong> サブスクリプションを使用します。手順については、Google Cloud インテグレーションページの<a href="https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection" target="_blank">ログ収集</a>を参照してください。
</div>

## 概要

このガイドでは、[Google Cloud Pub/Sub][1] トピックの **Push** サブスクリプションを通じて、Google Cloud サービスからのログを Datadog に転送する方法について説明します。

GCE または GKE で実行されているアプリケーションからログを収集するには、[Datadog Agent][2] を使用することもできます。

**注**: Google Cloud 環境に [Google Cloud VPC][3] がある場合、**Push** サブスクリプションは VPC 外のエンドポイントにはアクセスできません。

## Setup

### 前提条件

[Google Cloud Platform インテグレーション][4]が正常にインストールされている。

### Cloud Pub/Sub トピックを作成する

1. [Cloud Pub/Sub コンソール][5]に移動し、新しいトピックを作成します。

    {{< img src="integrations/google_cloud_platform/create_topic_no_default_sub.png" alt="デフォルトのサブスクリプションなしでトピックを作成" style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、**Create** をクリックします。

**警告**: Pub/Sub は、[Google Cloud の割り当てと制限][6]の対象となります。Datadog では、ログ数がこの制限を上回る場合は、ログを複数のトピックに分割することをお勧めしています。この制限に近づいた場合のモニター通知のセットアップについては、[ログの転送を監視する](#monitor-the-log-forwarding)セクションを参照してください。

### Cloud Pub/Sub サブスクリプションでログを Datadog に転送する

1. [Cloud Pub/Sub コンソール][5]で、左側のナビゲーションから **Subscriptions** を選択します。**CreateSubscription** をクリックします。
2. サブスクリプション ID を作成し、先に作成したトピックを選択します。
3. `Push` メソッドを選択し、`<DATADOG_API_KEY>` を有効な [Datadog API キー][7]の値に置き換えて以下のコマンドを入力します。
```
https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp
```
**注**: 上記のコマンドをコピーする前に、ページの右側にある `Datadog site` セレクタがあなたの [Datadog サイト][8]に設定されていることを確認してください。

4. **サブスクリプションの有効期限**、**承認期限**、**メッセージの保存期間**、**デッドレター** など、他のオプションを構成します。
5. **Retry policy** で、**Retry after exponential backoff delay** を選択します。
6. 下部にある **Create** をクリックします。

Pub/Sub が Google Cloud Logging からログを受け取り、Datadog へ転送する準備ができました。

### Google Cloud からログをエクスポート

1. [Google Cloud ログエクスプローラーページ][9]に移動し、エクスポートするログを絞り込みます。
2. **Log Router** タブより、**Create Sink** を選択します。
3. シンクに名前を設定します。
4. 宛先として **Cloud Pub/Sub** を選択し、その目的のために作成された Pub/Sub を選択します。
   **注**: Pub/Sub は別のプロジェクトに配置することができます。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

5. **Create Sink**をクリックし、確認メッセージが表示されるまで待ちます。

**注**: 異なるシンクを使用して、Google Cloud Logging から同じ Pub/Sub への複数のエクスポートを作成することができます。

## ログの転送を監視する

Pub/Sub は、[Google Cloud の割り当てと制限][6]の対象となります。Datadog では、ログ数がこの制限を上回る場合は、異なるフィルターを使用してログを複数のトピックに分割することをお勧めしています。

この割り当てに達したときに自動的に通知されるようにするには、[Pub/Sub メトリクスインテグレーション][10]を有効にし、メトリクス `gcp.pubsub.subscription.num_outstanding_messages` でモニターをセットアップします。Datadog へログをエクスポートするサブスクリプションでこのモニター絞り込み、このメトリクスが 1000 を超えないようにします。以下に例を示します。

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Pub Sub 監視" style="width:80%;">}}

### ログのサンプリング

オプションとして、[sample 関数][11]を使用することで、クエリ中にログをサンプリングすることができます。例えば、ログの 10% だけを取り込むには、`sample(insertId, 0.1)` を使用します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/pubsub/docs/overview
[2]: /ja/agent/
[3]: https://cloud.google.com/vpc
[4]: /ja/integrations/google_cloud_platform/#installation
[5]: https://console.cloud.google.com/cloudpubsub/topicList
[6]: https://cloud.google.com/pubsub/quotas#quotas
[7]: https://docs.datadoghq.com/ja/account_management/api-app-keys/
[8]: /ja/getting_started/site/
[9]: https://console.cloud.google.com/logs/viewer
[10]: https://docs.datadoghq.com/ja/integrations/google_cloud_pubsub/
[11]: https://cloud.google.com/logging/docs/view/logging-query-language#sample