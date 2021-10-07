---
title: モニターの概要
kind: documentation
aliases:
  - /ja/getting_started/application/monitors
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitoring-101-alerting/'
    tag: ブログ
    text: モニター入門 重要事項をアラート
  - link: /monitors/monitor_types/metric/
    tag: ドキュメント
    text: メトリクスモニター
  - link: /monitors/notifications/
    tag: ドキュメント
    text: モニター通知
---
## 概要

[メトリクスモニター][1]は、メトリクスがしきい値を超えた、あるいは下回ったときにアラートと通知を行います。このページでは、ディスク容量不足のアラートが発生するようにメトリクスモニターをセットアップする手順を説明します。

## 前提条件

作業を開始する前に、[Datadog Agent][3] がインストールされているホストに [Datadog アカウント][2]をリンクする必要があります。検証するには、Datadog の[インフラストラクチャーリスト][4]を確認してください。

## セットアップ

Datadog で[メトリクスモニター][5]を作成するには、メインナビゲーションを使用して次のように移動します: Monitors --> New Monitor --> Metric。

### 検出方法を選択します。

メトリクスモニターを作成すると、検出方法として **Threshold Alert (しきい値アラート)** が自動的に選択されます。しきい値アラートは、メトリクス値をユーザー定義のしきい値と比較します。このモニターの目的は静的なしきい値に基づいてアラートを生成することなので、変更は必要ありません。

### メトリクスを定義する

ディスク容量不足のアラートを取得するには、[Disk インテグレーション][6]から `system.disk.in_use` メトリクスを使用して、`host` と `device` のメトリクスの平均を計算します。

{{< img src="getting_started/application/metric_query.png" alt="アラートのセットアップ"  >}}

これを設定すると、メトリクスを報告している `host` と `device` ごとに個別のアラートをトリガーする `Multi Alert` がモニターによって自動的に更新されます。

### アラートの条件を設定する

[Disk インテグレーションのドキュメント][6]によると、`system.disk.in_use` は、使用中のディスク容量が全体に占める割合を示します。したがって、このメトリクスが報告している値が `0.7` ならば、デバイスは 70% 使用されています。

ディスク容量不足のアラートを発生させるには、メトリクスがしきい値を`超えた`ときにモニターをトリガーする必要があります。しきい値はオプションで設定します。このメトリクスの場合、適切な値の範囲は `0` から `1` です。

{{< img src="getting_started/application/alert_thresholds.png" alt="アラートのセットアップ"  >}}

この例では、このセクションの他の設定はデフォルトのままになっています。詳細については、[メトリクスモニター][7]のドキュメントを参照してください。

### Say what's happening

モニターを保存するには、タイトルとメッセージが必要です。

#### タイトル

タイトルはモニターごとに一意である必要があります。これはマルチアラートモニターなので、メッセージテンプレート変数を使用してグループ要素 (`host` と `device`) ごとに名前を付けることができます。
```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### メッセージ

次の例のように、メッセージを使用して問題の解決方法をチームに伝達します。
```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

アラートや警告しきい値に基づくさまざまなメッセージについては、[通知][8]に関するドキュメントを参照してください。

### チームへの通知

電子メール、Slack、PagerDuty などを使用してチームに通知を送信するには、このセクションを使用してください。ドロップダウンボックスから、チームメンバーおよび接続済みアカウントを検索できます。このボックスに `@notification` が追加されている場合、通知は自動的にメッセージボックスに追加されます。

{{< img src="getting_started/application/message_notify.png" alt="メッセージと通知"  style="width:70%;" >}}

片方のセクションから `@notification` を削除すると、両方のセクションから削除されます。

### アクセス制限

<div class="alert alert-warning">
RBAC のモニターへのアクセス制限は、現在ベータ版です。アクセスをリクエストするには、<a href="https://docs.datadoghq.com/help/">Datadog サポート</a>までお問い合わせください。</div>

このセクションを使用して、あなた、あなたのロールを持つ組織内の全員、または組織の特定のロールへのアクセスを制限します。ロールに関する詳細は、[RBAC][9] ドキュメントを参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/monitor_types/metric/
[2]: https://www.datadoghq.com
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /ja/integrations/disk/
[7]: /ja/monitors/monitor_types/metric/?tab=threshold#set-alert-conditions
[8]: /ja/monitors/notifications/#conditional-variables
[9]: /ja/account_management/rbac/