---
aliases:
- /ja/getting_started/application/monitors
description: しきい値アラートとカスタム通知を備えたメトリクスモニターを作成し、システムの状態やパフォーマンスの問題をプロアクティブに追跡します。
further_reading:
- link: /monitors/types/metric/
  tag: ドキュメント
  text: メトリクスモニター
- link: /monitors/notify/
  tag: ドキュメント
  text: モニター通知
- link: https://learn.datadoghq.com/courses/introduction-to-observability
  tag: ラーニングセンター
  text: 監視可能性の紹介
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: 効果的なモニターの作成に関するインタラクティブなセッションに参加する
- link: https://www.datadoghq.com/blog/how-to-audit-and-clean-up-monitors/
  tag: ブログ
  text: モニターを効果的に監査およびクリーンアップする方法
- link: https://www.datadoghq.com/blog/monitoring-101-alerting/
  tag: ブログ
  text: 'モニター入門: 重要事項をアラート'
title: モニターの概要
---
## 概要 {#overview}

Datadog のアラート機能では、メトリクス、インテグレーションの可用性、ネットワークエンドポイントなどをアクティブにチェックするモニターを作成できます。モニターを使用して、監視、検査、介入が必要なシステムに注意を向けさせます。

このページでは、モニターの紹介と、メトリクスモニターの設定方法の概要を説明します。[メトリクスモニター][1] は、特定のメトリクスが特定のしきい値を上回ったり下回ったりした場合にアラートと通知を提供します。たとえば、ディスク容量が少なくなるとメトリクスモニターがアラートを出すということが可能です。

このガイドでは、以下の内容を説明しています。
- モニターの作成と構成
- モニターアラートの設定
- 通知メッセージのカスタマイズ
- モニター権限

## 前提条件 {#prerequisites}

開始する前に、Datadog Agent がインストールされたホストにリンクされた Datadog アカウントが必要です。Agent の詳細については、[Agent の概要ガイド][2] を参照するか、[{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Agent{{< /ui >}}][3] に移動してインストール手順を確認してください。

Datadog Agent が実行していることを検証するには、Datadog の [インフラストラクチャーリスト][4] が表示されていることを確認します。

## 新しい組織のインスタントモニタリング {#instant-monitoring-for-new-organizations}

<div class="alert alert-info">自動モニターは<strong>新しい</strong>組織で利用可能であり、Datadog Agent のインストール後に有効になります。</div>

Datadog Agent をインストールすると、Datadog はスタックを自動的に検出し、調整された**ベースラインモニター**のセットを作成します。これにより、セットアップなしで即座にカバレッジが得られます。

自動モニターには以下が含まれます。
- ホストレベルのモニター (CPU およびメモリ使用率)
- Kubernetes モニター (Pod の再起動、ノードの状態)
- APM モニター (サービスごとのエラー率またはレイテンシー)

これらのモニターは、Datadog の [{{< ui >}}Monitors{{< /ui >}}][17] ページですぐに表示できます。
そこから、他のモニターと同様に編集、複製、または無効化できます。

## モニターを作成する {#create-a-monitor}

モニターを作成するには、[{{< ui >}}Monitors{{< /ui >}} > {{< ui >}}New Monitor{{< /ui >}}][5] に移動して {{< ui >}}Metric{{< /ui >}} を選択します。

## 構成 {#configure}

モニター構成の主なコンポーネントは以下のとおりです。

- **検出方法を選択する**: アラートの条件として何を測定していますか。メトリクス値がしきい値を超えること、値の変化がしきい値を超えること、異常な値、それとも別の何かに関心がありますか。
- **メトリクスを定義する**: アラートのためにどの値を監視していますか。システムのディスク容量ですか。ログイン時のエラー数ですか。
- **アラート条件を設定する**: エンジニアが緊急で起こされる必要があるのは、どのような状況ですか。
- **通知と自動化を構成する**: アラートにはどのような情報が含まれるべきですか。
- **権限と監査通知を定義する**: 誰がこれらのアラートにアクセスでき、アラートが変更された場合には誰に通知すべきですか。

### 検出方法を選択する {#choose-the-detection-method}

メトリクスモニターを作成すると、検出方法として {{< ui >}}Threshold Alert{{< /ui >}} が自動的に選択されます。しきい値アラートは、メトリクス値をユーザー定義のしきい値と比較します。このモニターの目的は静的なしきい値に基づいてアラートを生成することなので、変更は必要ありません。

### メトリクスを定義する {#define-the-metric}

ディスク容量不足のアラートを取得するには、[Disk インテグレーション][6] から `system.disk.in_use` メトリクスを使用して、`host` と `device` のメトリクスの平均を計算します。

{{< img src="getting_started/monitors/monitor_query.png" alt="ホストとデバイスごとに system.disk.in_use のメトリクスを定義する" style="width:100%" >}}

### アラート条件を設定する {#set-alert-conditions}

[Disk インテグレーションのドキュメント][6] によると、`system.disk.in_use` は *使用中のディスク容量が全体に占める割合*を示します。つまり、このメトリクスが報告している値が `0.7` ならば、デバイスは 70% 使用されています。

ディスク容量不足のアラートを発生させるには、メトリクスがしきい値を `above` ときにモニターをトリガーする必要があります。しきい値はオプションで設定します。このメトリクスの場合、適切な値の範囲は `0` から `1` です。

以下のしきい値を設定します。

```
Alert threshold: > 0.9
Warning threshold: > 0.8
```

この例では、このセクションの他の設定はデフォルトのままにします。詳細については、[メトリクスモニター][7] のドキュメントを参照してください。

{{< img src="getting_started/monitors/monitor_alerting_conditions.png" alt="アラートをトリガーするモニターのアラートと警告のしきい値を設定する" style="width:80%" >}}

### 通知と自動化 {#notifications-and-automations}

このモニターがアラートをトリガーすると、通知が送信されます。この通知には、条件付きの値、解決のための手順、またはアラートの要約を含めることができます。通知には最低限、タイトルとメッセージが必要です。

#### 通知タイトル {#notification-title}

タイトルは、モニターごとに一意でなければなりません。これはマルチアラートモニターであるため、メッセージテンプレート変数を使用してグループ要素 (`host` および `device`) ごとに名前を付けることができます。

```text
Disk space is low on {{device.name}} / {{host.name}}
```

#### 通知メッセージ {#notification-message}

次の例のように、メッセージを使用して問題の解決方法をチームに伝達します。

```text
Steps to free up disk space:
1. Remove unused packages
2. Clear APT cache
3. Uninstall unnecessary applications
4. Remove duplicate files
```

アラートと警告のしきい値に基づいて条件付きメッセージを追加するには、メッセージに含めることができる利用可能な [通知変数][8] を参照してください。

#### サービスとチームメンバーへの通知 {#notify-your-services-and-your-team-members}

メール、Slack、PagerDuty などでチームに通知を送ります。ドロップダウンボックスでチームメンバーや接続アカウントを検索できます。

{{< img src="getting_started/monitors/monitor_notification.png" alt="アラート通知にモニターメッセージと自動化を追加する" style="width:100%;" >}}

[Workflow Automation][14] のワークフローまたは [Work Management][15] の作業項目をアラート通知に追加するには、{{< ui >}}Add Workflow{{< /ui >}} または {{< ui >}}Add Work Item{{< /ui >}} をクリックします。また、`@team` ハンドルを使用して [Datadog Team][16] メンバーをタグ付けすることもできます。

他のセクションはそのままにしておきます。各構成オプションの詳細については、[モニター構成][9] のドキュメントを参照してください。

### 権限 {#permissions}

モニターの編集権限を、作成者、チーム、ユーザー、グループ、または組織内の特定のロールに制限するには、{{< ui >}}Edit Access{{< /ui >}} をクリックします。オプションで、{{< ui >}}Notify{{< /ui >}} を選択すると、モニターが変更されたときにアラートを受け取ることができます。

{{< img src="getting_started/monitors/monitor_permissions.png" alt="モニターのアクセス権限と監査通知のオプションを設定する" style="width:80%;" >}}

詳しくは、[きめ細かなアクセス制御][10] をご覧ください。

## モバイルでモニターとトリアージアラートを表示する {#view-monitors-and-triage-alerts-on-mobile}

[Apple App Store][12] および [Google Play Store][13] で入手できる [Datadog モバイルアプリ][11] をダウンロードすると、モバイルのホーム画面からモニター保存表示を表示したり、モニターの表示やミュートを行ったりすることができます。これは、ラップトップやデスクトップから離れているときのトリアージに役立ちます。

{{< img src="monitors/monitors_mobile.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="モバイルアプリでのインシデント">}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/monitors/types/metric/
[2]: /ja/getting_started/agent/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://app.datadoghq.com/infrastructure
[5]: https://app.datadoghq.com/monitors/create/metric
[6]: /ja/integrations/disk/
[7]: /ja/monitors/types/metric/?tab=threshold#set-alert-conditions
[8]: /ja/monitors/notify/variables/
[9]: /ja/monitors/configuration/?tab=thresholdalert#alert-grouping
[10]: /ja/account_management/rbac/granular_access/
[11]: /ja/mobile/
[12]: https://apps.apple.com/app/datadog/id1391380318
[13]: https://play.google.com/store/apps/details?id=com.datadog.app
[14]: /ja/actions/workflows/
[15]: /ja/incident_response/work_management/
[16]: /ja/account_management/teams/
[17]: https://app.datadoghq.com/monitors/manage