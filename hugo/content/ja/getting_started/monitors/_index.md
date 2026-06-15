---
aliases:
- /ja/getting_started/application/monitors
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: ブログ
  text: モニター入門 重要事項をアラート
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: ラーニングセンター
  text: 観測可能性の紹介
- link: /monitors/types/metric/
  tag: ドキュメント
  text: メトリクスモニター
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 効果的なモニターの作成に関するインタラクティブなセッションに参加できます
title: モニターの概要
---

## 概要

Datadog のアラート機能では、メトリクス、インテグレーションの可用性、ネットワークエンドポイントなどをアクティブにチェックするモニターを作成することができます。モニターを使用して、観測、検査、介入が必要なシステムに注意を向けさせます。

このページでは、モニターの紹介と、メトリクスモニターの設定方法の概要を説明します。[メトリクスモニター][1]は、特定のメトリクスがあるしきい値を上回ったり下回ったりした場合にアラートと通知を提供します。例えば、ディスク容量が少なくなると、メトリクスモニターがアラートを出す、ということが可能です。

このガイドでは、以下の内容を説明しています。
- モニターの作成と構成
- モニターアラートの設定
- 通知メッセージのカスタマイズ
- モニター権限

## 前提条件

始める前に、Datadog Agent がインストールされたホストにリンクされた Datadog アカウントが必要です。Agent の詳細については、[Agent の概要][2]を参照するか、 **[Integration > Agent][3]** に移動してインストール手順を確認してください。

Datadog Agent が実行していることを検証するには、Datadog の[インフラストラクチャーリスト][4]が表示されているかを確認します。

## モニターを作成

モニターを作成するには、**[Monitors > New Monitor][5]** に移動し、**Metric** を選択します。

## 構成

モニター構成の主なコンポーネントは以下の通りです。

- **検出方法を選択する**: アラートの条件として何を測定していますか？メトリクスの値がしきい値を超えること、値の変化がしきい値を超えること、異常値、それとも別の何かに関心がありますか？
- **メトリクスの定義**: アラートのためにどの値を監視していますか？システムのディスクスペースですか？ログイン時のエラー数ですか？
- **アラート条件を設定する**: エンジニアが緊急で起こされる必要があるのは、どのような状況ですか？
- **通知と自動化を構成する**: アラートにはどのような情報が含まれるべきですか？
- **権限と監査通知を定義する**: 誰がこれらのアラートにアクセスでき、アラートが変更された場合には誰に通知すべきですか？

### 検出方法を選択します。

メトリクスモニターを作成すると、検出方法として **Threshold Alert (しきい値アラート)** が自動的に選択されます。しきい値アラートは、メトリクス値をユーザー定義のしきい値と比較します。このモニターの目的は静的なしきい値に基づいてアラートを生成することなので、変更は必要ありません。

### メトリクスを定義する

ディスク容量不足のアラートを取得するには、[Disk インテグレーション][6]から `system.disk.in_use` メトリクスを使用して、`host` と `device` のメトリクスの平均を計算します。

{{< img src="getting_started/monitors/monitor_query.png" alt="ホストとデバイスごとに system.disk.in_use avg のメトリクスを定義します" style="width:100%" >}}

### アラートの条件を設定する

[Disk インテグレーションのドキュメント][6]によると、`system.disk.in_use` は、使用中のディスク容量が全体に占める割合を示します。したがって、このメトリクスが報告している値が `0.7` ならば、デバイスは 70% 使用されています。

ディスク容量不足のアラートを発生させるには、メトリクスがしきい値を`超えた`ときにモニターをトリガーする必要があります。しきい値はオプションで設定します。このメトリクスの場合、適切な値の範囲は `0` から `1` です。

以下のしきい値を設定します。
```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

この例では、このセクションの他の設定はデフォルトのままにします。詳細については、[メトリクスモニター][7]のドキュメントを参照してください。

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="アラートをトリガーするモニターのアラートと警告のしきい値を設定します" style="width:80%" >}}

### 通知と自動化

このモニターがアラートをトリガーすると、通知メッセージが送信されます。このメッセージには、条件付きの値、解決のための指示、またはアラートの要約を含めることができます。最低限、通知にはタイトルとメッセージが必要です。

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

アラートと警告のしきい値に基づいて条件付きメッセージを追加するには、メッセージに含めることができる利用可能な[通知変数][8]を参照してください。

#### サービスとチームメンバーへの通知

メール、Slack、PagerDuty などを通じてチームに通知を送信します。ドロップダウンボックスでチームメンバーや接続アカウントを検索できます。

{{< img src="getting_started/monitors/monitor_notification.png" alt="アラート通知にモニターメッセージと自動化を追加します" style="width:100%;" >}}

[Workflow Automation][14] のワークフローまたは [Case Management][15] のケースをアラート通知に追加するには、 **Add Workflow** または **Add Case** をクリックします。また、`@team` ハンドルを使用して [Datadog チーム][16]のメンバーをタグ付けすることもできます。 

他のセクションはそのままにしておきます。各構成オプションの詳細については、[モニター構成][9]のドキュメントを参照してください。

### 権限

モニターの編集権限を作成者、チーム、ユーザー、グループ、または組織内の特定のロールに制限するには、**Edit Access** をクリックします。オプションで、`Notify` を選択すると、モニターが変更されたときにアラートを受け取ります。

{{< img src="getting_started/monitors/monitor_permissions.png" alt="モニターのアクセス権限と監査通知のオプションを設定します" style="width:80%;" >}}

詳しくは、[きめ細かなアクセス制御][10]をご覧ください。

## モバイルでモニターとトリアージアラートを見る

[Apple App Store][12] および [Google Play ストア][13]で入手できる [Datadog モバイルアプリ][11]をダウンロードすれば、モバイルのホーム画面からモニター保存ビューを閲覧したり、モニターの表示やミュートを行うことができます。これは、ラップトップやデスクトップから離れているときのトリアージに役立ちます。

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モバイルアプリでのインシデント">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/metric/
[2]: /ja/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors#create/metric
[6]: /ja/integrations/disk/
[7]: /ja/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /ja/monitors/notify/variables/
[9]: /ja/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /ja/account_management/rbac/granular_access/
[11]: /ja/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app
[14]: /ja/service_management/workflows/
[15]: /ja/service_management/case_management/
[16]: /ja/account_management/teams/