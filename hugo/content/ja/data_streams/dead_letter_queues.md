---
further_reading:
- link: https://www.datadoghq.com/blog/data-pipeline-monitoring/
  tag: ブログ
  text: 'データパイプライン監視の基礎: データスタック全体の健全性とパフォーマンスの追跡'
title: デッドレターキュー
---
Data Streams Monitoring (DSM) は、空ではないデッドレターキュー (DLQ) を可視化して、メッセージ処理の失敗を監視し、調査できるようにします。DSM により、これらのメッセージ処理の失敗を Datadog 内で直接修復することも可能になります。

<div class="alert alert-info">デッドレターキューの監視は、Amazon SQS キューで利用可能です。</div>

## DLQ の監視 {#monitor-dlqs}

### セットアップ {#setup}
* メッセージングサービスで [Data Streams Monitoring][1] を有効にします。
* [Datadog-AWS インテグレーション][2] をインストールします。このインテグレーションを使用して権限を管理します。
* Datadog 内でメッセージ処理の失敗を修復するには、追加のセットアップが必要です。[DLQ 問題の修復](#remediate-dlq-issues)セクションを参照してください。

### 使用方法 {#usage}

#### デッドレターキューのモニターを作成する {#create-a-monitor-for-a-dead-letter-queue}

キューがメッセージを DLQ に再ルーティングしているかどうかを追跡するには、[`data_streams.sqs.dead_letter_queue.messages`][8] メトリクスに基づいてアラートを起動する [メトリクスモニター][8] を作成できます。

キューの DLQ 対応モニターを作成するには:

1. Datadog で [Data Streams Monitoring][4] に移動します。
2. {{< ui >}}Explore{{< /ui >}} タブ (デフォルト) を選択します。
3. サポートされているキューをクリックして、そのサイドパネルを開きます。
4. {{< ui >}}Dead Letter Queue{{< /ui >}} タブを選択します。
5. {{< ui >}}Create Monitor{{< /ui >}} をクリックして、モニターセットアップページを開きます。DLQ が空でない場合にアラートを起動するモニターを作成するにはデフォルトの入力で十分ですが、必要に応じてこのページで追加の設定を行うこともできます。
6. ページ下部にある {{< ui >}}Create{{< /ui >}} をクリックします。

#### メッセージ処理の問題を検出する {#detect-message-processing-issues}

Data Streams Monitoring を利用することで、メッセージを処理できなかった場所と、影響を受ける可能性のあるダウンストリームのサービスを検出できます。

* DSM [{{< ui >}}Service Map{{< /ui >}}][6] は、DLQ にメッセージが入れられたキューを強調表示し、障害が発生している場所を視覚的に特定できるようにします。

* DSM [{{< ui >}}Issues{{< /ui >}}][7] ページには、メッセージ処理の問題が発生しているすべてのキューが一覧表示されます。

## DLQ 問題の修復{#remediate-dlq-issues}
空ではない DLQ を Datadog で直接調査して解決するには、[Datadog Actions][5] を使用できます。

### セットアップ {#setup-1}
Datadog で [コネクション][9] を作成します。アクションを実行するには IAM エンティティが必要です。この IAM エンティティは、IAM ユーザー (シークレットアクセスキーを使用) または IAM ロール (`sts:AssumeRole` を使用することにより前提される) のいずれかにすることができ、次の権限が付与されます。
  * `sqs:ReceiveMessage` (_peek_ 対応)
  * `sqs:StartMessageMoveTask` (_redrive_ 対応)
  * `sqs:PurgeQueue` (_purge_ 対応)

これらの権限は、すべての SQS キューにグローバルに適用することも、特定のキューに制限することもできます。

### 使用方法 {#usage-1}

コネクションをセットアップした後、サポートされているキューのいずれかをクリックしてそのサイドパネルを開き、次の操作を実行することができます。

* {{< ui >}}Peek{{< /ui >}}: 失敗したメッセージの内容を調査し、根本原因を特定するための操作
* {{< ui >}}Redrive{{< /ui >}}: 別の処理を試みる目的でメッセージを再びキューに入れるための操作
* {{< ui >}}Purge{{< /ui >}}: 処理が不要になったメッセージを削除するための操作

## トラブルシューティング {#troubleshooting}
デッドレターキューの情報が表示されない場合:
* [Datadog-AWS インテグレーション][2] がインストールされていることを確認
* AWS ロールで AWS 管理の `AmazonSQSReadOnlyAccess` ポリシーが使用されていることを確認
* ロールに `sqs:ListQueues` および `sqs:GetQueueAttributes` の権限が付与されていることを確認

[1]: /ja/data_streams/setup
[2]: /ja/integrations/amazon-web-services/
[3]: /ja/data_streams/metrics_and_tags/#data_streamssqsdead_letter_queuemessages
[4]: https://app.datadoghq.com/data-streams/
[5]: https://app.datadoghq.com/actions
[6]: https://app.datadoghq.com/data-streams/map
[7]: https://app.datadoghq.com/data-streams/issues
[8]: /ja/monitors/types/metric/
[9]: https://app.datadoghq.com/actions/connections

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}