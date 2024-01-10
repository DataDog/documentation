---
algolia:
  tags:
  - ログの使用
aliases:
- /ja/logs/guide/logs-monitors-on-volumes/
further_reading:
- link: /logs/log_configuration/processors
  tag: Documentation
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: Documentation
  text: パースの詳細
- link: https://www.datadoghq.com/blog/log-management-policies/
  tag: ブログ
  text: ログ管理ポリシーの実装に備える
kind: ガイド
title: ログ管理のベストプラクティス
---

## 概要

Datadog ログ管理は、ログの収集、処理、アーカイブ、探索、監視を行うため、システムの問題を可視化することができます。しかし、ログから適切なレベルの可視性を得ることは難しく、また、ログのスループットが大きく変動し、予期せぬリソースの使用を引き起こす可能性があります。

したがって、このガイドでは、ガバナンス、使用量属性、および予算管理の柔軟性を提供する、さまざまなログ管理のベストプラクティスおよびアカウント構成を説明します。具体的には、以下の方法を説明します。

- [複数のインデックスを設定し、ログをセグメント化する](#set-up-multiple-indexes-for-log-segmentation)
- [長期保存のための複数のアーカイブを設定する](#set-up-multiple-archives-for-long-term-storage)
- [カスタムロールの RBAC を設定する](#set-up-rbac-for-custom-roles)

また、このガイドでは、ログの使用量を監視する方法について、以下のように説明します。

- [予期せぬログトラフィックの急増にアラートを出す](#alert-on-unexpected-log-traffic-spikes)
- [インデックス化されたログに対して、ボリュームがしきい値を超えた場合にアラートを出す](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)
- [大容量ログの除外フィルターを設定する](#set-up-exclusion-filters-on-high-volume-logs)

## ログアカウント構成

### ログセグメンテーションのための複数のインデックスを設定する

異なる保持期間や 1 日の割り当て、使用量の監視、請求のためにログをセグメント化したい場合は、複数のインデックスを設定します。

例えば、7 日間だけ保持する必要があるログと、30 日間保持する必要があるログがある場合、複数のインデックスを使用して、2 つの保持期間ごとにログを分離することができます。

複数のインデックスを設定するには

1. [ログインデックス][1]に移動します。
2. **New Index** または **Add a new index** をクリックします。
3. インデックスの名前を入力します。
4. このインデックスに入れたいログにフィルターをかけるための検索クエリを入力します。
5. 1 日にインデックス内に保存されるログの数を制限するために、1 日の割り当てを設定します。
6. これらのログを保持する期間を設定します。
7. **Save** をクリックします。

インデックスに 1 日の割り当てを設定すると、新しいログソースが追加されたとき、または開発者が意図せずにログレベルをデバッグモードに変更したときに、請求の超過を防止するのに役立ちます。過去 24 時間以内に 1 日の割り当てのパーセンテージに達したときにアラートを発するようにモニターを設定する方法については、[インデックスが 1 日の割り当てに達した場合のアラート(#alert-on-indexes-reaching-their-daily-quota)を参照してください。

### 長期保存のための複数のアーカイブを設定する

ログを長期間保存したい場合は、[ログアーカイブ][2]を設定して、Amazon S3、Azure Storage、Google Cloud Storage などのストレージに最適化されたシステムにログを送信してください。Datadog を使用してこれらのログを分析する場合は、[Log Rehydration][3]™ を使用して Datadog にこれらのログをキャプチャして戻します。複数のアーカイブを使用することで、コンプライアンス上の理由からログをセグメント化し、リハイドレートのコストを抑制することができます。

#### 高価なリハイドレートを管理するために最大スキャンサイズを設定する

一度にリハイドレートできるログの容量の上限を設定します。アーカイブの設定時に、リハイドレートのためにスキャンできるログデータの最大容量を定義することができます。詳しくは、[最大スキャンサイズを定義する][4]を参照してください。

### カスタムロールの RBAC を設定する

[Datadog のデフォルトロール][5]は 3 つあります。Admin、Standard、および Read-only です。また、独自の権限セットを持つカスタムロールを作成することも可能です。例えば、意図しないコスト上昇を避けるために、インデックス保持ポリシーの変更をユーザーに制限するロールを作成することができます。同様に、ログのパース構成を変更できるユーザーを制限して、明確に定義されたログの構造や形式が不要に変更されるのを避けることができます。

権限を持つカスタムロールを設定するには

1. [Datadog][6] に Admin としてログインします。
2. [Organization Settings > Roles][7] に移動します。
3. カスタムロールを有効にするには、左上の歯車をクリックし、**Enable** をクリックします。
4. 有効にしたら、**New Role** をクリックします。
5. 新しいロールの名前を入力します。
6. ロールの権限を選択します。これにより、ログのリハイドレートやログベースのメトリクス作成など、特定のアクションへのアクセスを制限することができます。詳細については、[ログ管理の権限][8]を参照してください。
7. **Save** をクリックします。

ユースケースの例として、特定の権限を持つロールを設定し、割り当てる方法については、[ログのための RBAC のセットアップ方法][9]を参照してください。

## ログの使用量を監視する

以下を設定することで、ログの使用量を監視することができます。

- [予期せぬログトラフィックの急増に対するアラート](#alert-on-unexpected-log-traffic-spikes)
- [インデックス化されたログボリュームが指定されたしきい値を超えた場合のアラート](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)

### 予期せぬログトラフィックの急増に対するアラート

#### ログ使用量メトリクス

デフォルトで、[ログ使用量メトリクス][10]は取り込まれたログ、取り込まれたバイト数、インデックス化されたログの追跡に利用できます。このメトリクスは無料で利用でき、15 か月間保存できます。

- `datadog.estimated_usage.logs.ingested_bytes`
- `datadog.estimated_usage.logs.ingested_events`

使用量メトリクスを使った異常検出モニターの作成手順については、[異常検出モニター][11]を参照してください。

**注**: Datadog では、[メトリクスサマリーページ][12]の `datadog.estimated_usage.logs.ingested_bytes` の単位を `byte` とすることを推奨しています。

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="datadog.estimated_usage.logs.ingested_bytes のサイドパネルで単位がバイトに設定されているメトリクスサマリページ" style="width:70%;">}}

#### 異常検出モニター

異常検出モニターを作成し、予期せぬログのインデックス化の急増にアラートを出します。

1. [Monitors > New Monitor][13] の順に移動し、**Anomaly** を選択します。
2. **Define the metric** セクションで、`datadog.estimated_usage.logs.ingested_events` メトリクスを選択します。
3. **from** フィールドに、`datadog_is_excluded:false` タグを追加し、インデックス化されたログのみを監視し、取り込まれたログは監視しないようにします。
4. **sum by** フィールドに、`service` と `datadog_index` タグを追加し、特定のサービスが急増したり、いずれかのインデックスでログの送信を停止した場合に通知されるようにします。
5. アラート条件は、ユースケースに合わせて設定してください。例えば、評価された値が予想される範囲外である場合にアラートを出すようにモニターを設定します。
6. 通知のタイトルと、アクションを指示するメッセージを追加します。例えば、これはコンテクストリンク付きの通知です。
    ```text
    An unexpected amount of logs has been indexed in the index: {{datadog_index.name}}

    1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
    2. [Add an exclusion filter on the noisy pattern](https://app.datadoghq.com/logs/pipelines/indexes)
    ``` 
7. **Create** をクリックします。

### インデックス化されたログボリュームが指定されたしきい値を超えた場合のアラート

インフラストラクチャー (例えば、`service`、`availability-zone` など) の任意のスコープでインデックス化されたログボリュームが予期せず増加した場合にアラートを出すようにモニターをセットアップします。

1. [ログエクスプローラー][14]に移動します。
2. 監視したいログボリュームをキャプチャするインデックス名 (例: `index:main`) を含む[検索クエリ][15]を入力します。
3. **Download as CSV** の横の下矢印をクリックし、**Create monitor** を選択します。
4. **group by** フィールドにタグ (例：`host`、`services` など) を追加します。
5. ユースケースに応じた **Alert threshold** を入力します。オプションで、**Warning threshold** を入力します。
6. 通知のタイトルを追加します。例:
    ```
    Unexpected spike on indexed logs for service {{service.name}}
    ```
6. メッセージを追加します。例:
    ```
    The volume on this service exceeded the threshold. Define an additional exclusion filter or increase the sampling rate to reduce the volume.
    ```
7. **Create** をクリックします。

#### 月初からのインデックス化ログ量に関するアラート

`datadog_is_excluded:false` でフィルターした `datadog.estimated_usage.logs.ingested_events` メトリクスを活用してインデックス化ログのみをカウントし、[メトリクスモニター累積ウィンドウ][28]で月初からのカウントをモニターします。

{{< img src="logs/guide/monthly_usage_monitor.png" alt="月初以降のインデックス化ログ数をアラートするモニターの設定" style="width:70%;">}}

#### インデックスが 1 日の割り当てに達した際のアラート

インデックスに [1 日の割り当てを設定する][16]ことで、1 日に与えられたログ数以上のインデックス化を防ぐことができます。インデックスに 1 日の割り当てがある場合、Datadog は過去 24 時間以内にこの割り当ての 80% に達したときにアラートを出すように[そのインデックスのボリュームについて通知するモニター](#alert-when-an-indexed-log-volume-passes a-specified-threshold)を設定することをお勧めします。

1 日の割り当てに達すると、イベントが生成されます。デフォルトでは、これらのイベントはインデックス名を持つ `datadog_index` タグを持っています。したがって、このイベントが生成されたら、`datadog_index` タグに [ファセットを作成][17]して、`datadog_index` を `group by` ステップで使用して、複数アラートモニターをセットアップできるようにします。

インデックスの 1 日の割り当てに達した際にアラートを出すモニターを設定するには

1. [Monitors > New Monitor][13] の順に移動し、**Event** をクリックします。
2. **Define the search query** セクションに `source:datadog "daily quota reached"` と入力します。
3. **group by** フィールドに `datadog_index(datadog_index)` を追加します。`datadog_index(datadog_index)` タグは、すでにイベントが生成されている場合のみ利用可能です。
4. **Set alert conditions** セクションで、`above or equal to` を選択し、**Alert threshold** に `1` を入力します。
5. **Notify your team** セクションに通知のタイトルとメッセージを追加します。モニターが `datadog_index(datadog_index)` によってグループ化されているため、**Multi Alert** ボタンが自動的に選択されます。
6. **Save** をクリックします。

これは、Slack での通知の例です。

{{< img src="logs/guide/daily_quota_notification.png" alt="datadog_index:retention-7 で 1 日の割り当てに達したことの slack 通知" style="width:70%;">}}

### 推定使用量ダッシュボードを確認する

ログの取り込みを開始すると、ログ使用量メトリクスをまとめたすぐに使える[ダッシュボード][5]が自動的にアカウントにインストールされます。

{{< img src="logs/guide/logslight.png" alt="インデックス化され、取り込まれた内訳をウィジェット別に表示するログ推定使用量ダッシュボード" style="width:70%;">}}

**注**: このダッシュボードで使用されるメトリクスは推定であるため、正式な請求対象の数値とは異なる場合があります。

このダッシュボードを見つけるには、**Dashboards > Dashboards List** に移動し、[Log Management - Estimated Usage][19] を検索します。

### 大量ログの除外フィルターを設定する

使用量モニターがアラートを出す場合、除外フィルターを設定したり、サンプリングレートを上げてボリュームを減らしたりすることができます。設定方法については、[除外フィルター][20]を参照してください。また、[ログパターン][21]を使用して、大量のログをグループ化して識別することができます。次に、ログパターンのサイドパネルで、**Add Exclusion Filter** をクリックして、これらのログのインデックス化を停止するフィルターを追加します。

{{< img src="logs/guide/patterns_exclusion.png" alt="ログエクスプローラーページのサイドパネルにパターンの詳細が表示され、上部に除外フィルターの追加ボタンがあります" style="width:80%;">}}

除外フィルターを使用している場合でも、ログベースのメトリクスを使用して、すべてのログデータの傾向や異常を視覚化することができます。詳しくは、[取り込んだログからメトリクスを生成する][22]を参照してください。

### 個人識別情報 (PII) 検出のための機密データスキャナーを有効にする

データ漏洩を防ぎ、コンプライアンス違反のリスクを抑えるには、機密データスキャナーを使用して、機密データを特定し、タグ付けし、オプションで削除またはハッシュ化することができます。例えば、ログ、APM スパン、RUM イベントに含まれるクレジットカード番号、銀行支店番号、API キーをスキャンできます。スキャンするデータを決定するスキャンルールを設定する方法については、[機密データスキャナー][23]を参照してください。

**注**: [機密データスキャナー][24]は、別途課金対象製品です。

### ユーザーのアクティビティを確認するための監査証跡を有効にする

インデックスの保持を変更したのは誰か、除外フィルターを修正したのは誰かなど、ユーザーのアクティビティを確認したい場合は、監査証跡を有効にしてこれらのイベントを確認します。利用可能なプラットフォームおよび製品固有のイベントのリストについては、[監査証跡のイベント][25]を参照してください。監査証跡を有効にして構成するには、[監査証跡のドキュメント][26]の手順に従います。

**注**: [監査証跡][27]は、別途請求される製品です。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /ja/logs/log_configuration/archives/
[3]: /ja/logs/log_configuration/rehydrating/
[4]: /ja/logs/log_configuration/archives/?tab=awss3#define-maximum-scan-size
[5]: /ja/account_management/rbac/?tab=datadogapplication#datadog-default-roles
[6]: https://app.datadoghq.com/
[7]: https://app.datadoghq.com/organization-settings/roles
[8]: /ja/account_management/rbac/permissions/?tab=ui#log-management
[9]: /ja/logs/guide/logs-rbac/
[10]: /ja/logs/logs_to_metrics/#logs-usage-metrics
[11]: /ja/monitors/types/anomaly/
[12]: https://app.datadoghq.com/metric/summary?filter=datadog.estimated_usage.logs.ingested_bytes&metric=datadog.estimated_usage.logs.ingested_bytes
[13]: https://app.datadoghq.com/monitors/create
[14]: https://app.datadoghq.com/logs
[15]: /ja/logs/explorer/search/
[16]: /ja/logs/indexes/#set-daily-quota
[17]: /ja/service_management/events/explorer/#facets
[18]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[19]: https://app.datadoghq.com/dashboard/lists?q=Log+Management+-+Estimated+Usage
[20]: /ja/logs/log_configuration/indexes/#exclusion-filters
[21]: /ja/logs/explorer/analytics/patterns
[22]: /ja/logs/log_configuration/logs_to_metrics/
[23]: /ja/sensitive_data_scanner/
[24]: https://www.datadoghq.com/pricing/?product=sensitive-data-scanner#sensitive-data-scanner
[25]: /ja/account_management/audit_trail/events/
[26]: /ja/account_management/audit_trail/
[27]: https://www.datadoghq.com/pricing/?product=audit-trail#audit-trail
[28]: /ja/monitors/configuration/?tab=thresholdalert#evaluation-window