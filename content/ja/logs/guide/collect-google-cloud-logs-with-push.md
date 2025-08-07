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
- link: /logs/guide/reduce_data_transfer_fees
  tag: ガイド
  text: データ転送料金を削減しながら Datadog にログを送信する方法
title: Pub/Sub Push サブスクリプションによる Google Cloud ログの収集
---

<div class="alert alert-danger">

このページでは、レガシーな Pub/Sub Push サブスクリプションに関するトラブルシューティングや設定変更に役立つ、廃止予定の機能および関連する構成情報について説明しています。Pub/Sub Push サブスクリプションは以下の理由で廃止されます。
- Google Cloud VPC では、新規の Push サブスクリプションに外部エンドポイントを設定できない (詳細は Google Cloud の[サポート対象製品と制限事項][12]を参照)
- Push サブスクリプションではイベントの圧縮やバッチ送信を行えない

<strong>Push</strong> サブスクリプションに関するドキュメントは、レガシー環境のトラブルシューティングや変更用にのみ維持されています。 

代わりに Datadog Dataflow テンプレートを使用した <strong>Pull</strong> サブスクリプションで Google Cloud のログを Datadog に転送してください。手順については、Google Cloud インテグレーションページの<a href="https://docs.datadoghq.com/integrations/google_cloud_platform/#log-collection" target="_blank">ログ収集</a>を参照してください。
</div>

## 概要

このガイドでは、[Google Cloud Pub/Sub][1] の **Push** サブスクリプション経由で Google Cloud のログを Datadog に転送する方法を説明します。

GCE や GKE 上で稼働するアプリケーションからログを収集する場合は、[Datadog Agent][2] を使用することも可能です。

**注**: ご利用の Google Cloud 環境に [Google Cloud VPC][3] が含まれている場合、**Push** サブスクリプションでは VPC 外部のエンドポイントにアクセスできません。

## セットアップ

### 前提条件

[Google Cloud Platform インテグレーション][4]が正常にインストールされていることを確認してください。

### Cloud Pub/Sub トピックの作成

1. [Cloud Pub/Sub コンソール][5]へ移動し、新しいトピックを作成します。

    {{< img src="integrations/google_cloud_platform/create_topic_no_default_sub.png" alt="デフォルトのサブスクリプションなしでトピックを作成" style="width:80%;">}}

2. トピックに `export-logs-to-datadog` のような明示的な名前を付け、**Create** をクリックします。

**警告**: Pub/Sub には [Google Cloud のクオータおよび制限][6]が適用されます。ログの量が制限を超える場合は、複数のトピックに分割することを Datadog では推奨しています。制限に近づいた際の通知設定については、[「Monitor the Log Forwarding」セクション](#monitor-the-log-forwarding)を参照してください。

### Cloud Pub/Sub サブスクリプションを使用して Datadog にログを転送

1. [Cloud Pub/Sub コンソール][5]で、左側のナビゲーションから **Subscriptions** を選択し、**Create Subscription** をクリックします。
2. サブスクリプション ID を作成し、先に作成したトピックを選択します。
3. `Push` を選択し、有効な [Datadog API キー][7]を `<DATADOG_API_KEY>` に置き換えて以下のコマンドを入力します。
```
https://gcp-intake.logs.{{< region-param key="dd_site" code="true" >}}/api/v2/logs?dd-api-key=<DATADOG_API_KEY>&dd-protocol=gcp
```
**注**: 上記のコマンドをコピーする前に、右側の `Datadog site` セレクターがご利用の [Datadog サイト][8]に合わせて設定されていることを確認してください。

4. **サブスクリプションの有効期限**、**承認期限**、**メッセージの保存期間**、**デッドレター** など、他のオプションを構成します。
5. **Retry policy** では **Exponential backoff による再試行**を選択します。
6. 下部にある **Create** をクリックします。

Pub/Sub が Google Cloud Logging からログを受け取り、Datadog へ転送する準備ができました。

### Google Cloud からログをエクスポート

1. [Google Cloud Logs Explorer ページ][9]に移動し、エクスポートするログをフィルタリングします。
2. **Log Router** タブより、**Create Sink** を選択します。
3. シンクに名前を設定します。
4. 転送先として **Cloud Pub/Sub** を選択し、先ほど作成した pub/sub を指定します。
   **注**: pub/sub は別のプロジェクトに存在していても構いません。

    {{< img src="integrations/google_cloud_pubsub/creating_sink2.png" alt="Google Cloud Pub/Sub ログを Pub Sub へエクスポート" >}}

5. **Create Sink** をクリックし、確認メッセージが表示されるまで待ちます。

**注**: 異なるシンクを使用して、Google Cloud Logging から同じ Pub/Sub への複数のエクスポートを作成することができます。

## ログの転送を監視する

Pub/Sub は [Google Cloud のクオータおよび制限][6]の対象です。ログの量が制限を超える場合、Datadog では複数のトピックを使用し、異なるフィルタを設定することを推奨します。

このクオータに達したときに自動的に通知を受け取るには、[Pub/Sub メトリクスインテグレーション][10]を有効にし、メトリクス `gcp.pubsub.subscription.num_outstanding_messages` に対するモニターを設定します。Datadog へのログ転送に使用しているサブスクリプションに絞り込み、下記の例のように 1000 を超えないように監視してください。

{{< img src="integrations/google_cloud_platform/log_pubsub_monitoring-v2.png" alt="Pub Sub 監視" style="width:80%;">}}

### ログのサンプリング

[sample 関数][11]を使ってクエリ時にログをサンプリングできます。たとえば、ログの 10% のみを含めたい場合には `sample(insertId, 0.1)` のように指定します。

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
[12]: https://cloud.google.com/vpc-service-controls/docs/supported-products#table_pubsub