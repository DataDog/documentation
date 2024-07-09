---
aliases:
- /ja/getting_started/application/monitors
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: ブログ
  text: モニター入門 重要事項をアラート
- link: /monitors/types/metric/
  tag: ドキュメント
  text: メトリクスモニター
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
- link: https://www.datadoghq.com/blog/datadog-github-deployment-protection-rules/
  tag: ブログ
  text: GitHub Deployment Protection Rules と Datadog で品質チェックの失敗を検出する
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 効果的なモニターの作成に関するインタラクティブなセッションに参加できます
title: モニターの概要
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

{{< img src="getting_started/application/metric_query.png" alt="アラートのセットアップ" >}}

これを設定すると、メトリクスを報告している `host` と `device` ごとに個別のアラートをトリガーする `Multi Alert` がモニターによって自動的に更新されます。

### アラートの条件を設定する

[Disk インテグレーションのドキュメント][6]によると、`system.disk.in_use` は、使用中のディスク容量が全体に占める割合を示します。したがって、このメトリクスが報告している値が `0.7` ならば、デバイスは 70% 使用されています。

ディスク容量不足のアラートを発生させるには、メトリクスがしきい値を`超えた`ときにモニターをトリガーする必要があります。しきい値はオプションで設定します。このメトリクスの場合、適切な値の範囲は `0` から `1` です。

{{< img src="getting_started/application/monitor_configuration.png" alt="Create Monitor ページ内のメトリクスモニター構成設定、Multi Alert を選択し、メトリクスを報告している各ホストとデバイスの過去 5 分間のクエリの平均でアラートを出すように構成されています。Set alert conditions セクションは、評価された値が任意のホストまたはデバイスのしきい値を超えたときにトリガーするように構成されており、Alert しきい値は 0.9 に、Warning しきい値は 0.8 に設定され、データが不足している場合は通知しないようにモニターが構成されています" >}}

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

{{< img src="getting_started/application/message_notify.png" alt="メッセージと通知" style="width:70%;" >}}

片方のセクションから `@notification` を削除すると、両方のセクションから削除されます。

### アクセス許可

{{< img src="getting_started/monitors/monitor_rbac_restricted.jpg" alt="RBAC 制限付きモニター" style="width:90%;" >}}

このオプションを使用して、モニターの編集をその作成者と組織内の特定のロールに制限します。ロールの詳細については、[ロールベースアクセスコントロール][9]を参照してください。

## モバイルでモニターとトリアージアラートを見る

[Apple App Store][11] および [Google Play Store][12] で入手できる [Datadog モバイルアプリ][10]をダウンロードすれば、モバイルのホーム画面からモニター保存ビューを閲覧したり、モニターの表示やミュートを行うことができます。これは、ラップトップやデスクトップから離れているときのトリアージに役立ちます。

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モバイルアプリでのインシデント">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/metric/
[2]: https://www.datadoghq.com
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /ja/integrations/disk/
[7]: /ja/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /ja/monitors/notify/#conditional-variables
[9]: /ja/account_management/rbac/
[10]: /ja/service_management/mobile/
[11]: https://apps.apple.com/app/datadog/id1391380318
[12]: https://play.google.com/store/apps/details?id=com.datadog.app