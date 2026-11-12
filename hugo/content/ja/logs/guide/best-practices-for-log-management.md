---
algolia:
  tags:
  - log usage
  - grok
  - grok parser
  - logs parsing
  - Extracting Attributes
  - Remapping attributes
  - parsing
aliases:
- /ja/logs/guide/logs-monitors-on-volumes/
description: Datadog でログを効率的に管理および監視するためのベストプラクティス。
further_reading:
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Datadog を使用した Log Management インデックス戦略ガイド
- link: /logs/log_configuration/processors
  tag: ドキュメント
  text: ログの処理方法
- link: /logs/log_configuration/parsing
  tag: ドキュメント
  text: パースの詳細
- link: https://www.datadoghq.com/blog/log-management-policies/
  tag: ブログ
  text: ログ管理ポリシーの実装に備える
- link: https://www.datadoghq.com/blog/volkswagen-organizations/
  tag: ブログ
  text: 大規模環境での Datadog 組織管理のベストプラクティス
- link: https://www.youtube.com/watch?v=2OEzAE7c2c0&list=PLdh-RwQzDsaM9Sq_fi-yXuzhmE7nOlqLE&index=1&pp=iAQB
  tag: ビデオ
  text: 'Datadog のヒントとコツ: Datadog ログ除外フィルターでログの利用率を向上'
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: ラーニングセンター
  text: ログパイプラインのデバッグ
title: ログ管理のベストプラクティス
---
## 概要{#overview}

Datadog Log Management は、ログを収集、処理、アーカイブ、探索、監視します。これにより、システムの問題を可視化できます。ただしログから適切なレベルの可視性を得ることは難しく、ログのスループットは大きく変動するため、予期しないリソース使用量が発生する可能性があります。

そのためこのガイドでは、ガバナンス、使用属性、予算管理において柔軟性を提供する、さまざまな Log Management のベストプラクティスとアカウント構成について説明します。具体的には以下の方法について説明します。

- [ログのセグメント化のために複数のインデックスを設定する](#set-up-multiple-indexes-for-log-segmentation)
- [長期保存のための複数のアーカイブを設定する](#set-up-multiple-archives-for-long-term-storage)
- [カスタムロールの RBAC を設定する](#set-up-rbac-for-custom-roles)

また、このガイドでは、ログの使用量を監視する方法について、以下のように説明します。

- [予期せぬログトラフィックの急増に関するアラートの送信](#alert-on-unexpected-log-traffic-spikes)
- [量が指定されたしきい値を超えた場合のインデックス化されたログに関するアラートの送信](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)
- [アクティブにクエリされているインデックスの監視](#monitor-which-indexes-are-queried-actively)
- [大容量ログでの除外フィルターの設定](#set-up-exclusion-filters-on-high-volume-logs)

ログを環境から送信する前にログを変換したり、ログ内の機密データを編集したりする場合は、[Observability Pipelines を使用したログデータの集約、処理、変換][29]を参照してください。

## ログアカウント構成 {#log-account-configuration}

### ログセグメンテーションのための複数のインデックスを設定する{#set-up-multiple-indexes-for-log-segmentation}

異なる保持期間や 1 日の割り当て、使用量の監視、請求のためにログをセグメント化したい場合は、複数のインデックスを設定します。

たとえば、7 日間だけ保持する必要があるログと、30 日間保持する必要があるログがある場合、複数のインデックスを使用して、2 つの保持期間ごとにログを分離することができます。

複数のインデックスを設定するには

1. [ログインデックス][1]に移動します。
2. [{{< ui >}}New Index{{< /ui >}}] (新規インデックス) または [{{< ui >}}Add a new index{{< /ui >}}] (新規インデックスを追加) をクリックします。
3. インデックスの名前を入力します。
4. このインデックスに入れたいログにフィルターをかけるための検索クエリを入力します。
5. 1 日にインデックス内に保存されるログの数を制限するために、1 日の割り当てを設定します。
6. これらのログを保持する期間を設定します。
7. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

インデックスに日別の割り当てを設定すると、新しいログソースが追加された場合や、開発者が意図せずロギングレベルをデバッグモードに変更した場合の超過を防止するのに役立ちます。過去 24 時間以内に 1 日の割り当ての特定のパーセンテージに達したときにアラートを送信するようにモニターを設定する方法については、[インデックスが 1 日の割り当てに達した場合のアラート](#alert-on-indexes-reaching-their-daily-quota)を参照してください。

### 長期保持のためのストレージを設定する {#set-up-storage-for-long-term-retention}

Standard Indexing と同等のクエリ速度を維持し、かつログを長期間保持したい場合は、[Flex Logs][30] を構成してください。このティアは、より長い保持期間を必要とし、時折緊急のクエリを実行する必要が生じるログに最適です。Flex Logs によりストレージとコンピューティングのコストが分離されるため、可視性を損なうことなく、より多くのログをより長期間にわたって費用対効果の高い方法で維持できます。頻繁にクエリする必要があるログは Standard Index に保存する必要があります。

### 長期保存のための複数のアーカイブを設定する{#set-up-multiple-archives-for-long-term-storage}

ログをさらに長期期間保存するには、Amazon S3、Azure Storage、または Google Cloud Storage などのストレージ最適化システムにログを送信するように [Log Archives][2] を設定します。[Archive Search][32] を使用して、ストレージから直接リアルタイムでこれらのログをクエリします。プラットフォームへのフルアクセスや長期保存が必要な場合は、Archive Search の**検索およびリハイドレート**モードを使用してください。複数のアーカイブを使用すると、コンプライアンス上の理由からログをセグメント化し、コストを抑えることができます。

#### コストを管理するために最大スキャンサイズを設定する {#set-up-max-scan-size-to-manage-costs}

一度にスキャンできるログの量の制限を設定します。アーカイブを設定するときに、Archive Search クエリまたはリハイドレーションごとにスキャンできるログデータの最大量を定義できます。詳細については、[最大スキャンサイズの定義][4]を参照してください。

### カスタムロールの RBAC を設定する {#set-up-rbac-for-custom-roles}

[デフォルトの Datadog ロール][5]には、Admin、Standard、Read-only の 3 つがあります。独自の権限セットを持つカスタムロールを作成することもできます。たとえば、意図しないコストの急増を防ぐために、ユーザーによるインデックス保持ポリシーの変更を制限するロールを作成できます。同様に、適切に定義されたログ構造や形式への不要な変更を防ぐために、ログパース構成を変更できるユーザーを制限することもできます。

権限を持つカスタムロールを設定するには:

1. [Datadog][6] に Admin としてログインします。
2. [[Organization Settings] (組織設定) > [Roles] (ロール)][7] に移動します。
3. カスタムロールを有効にするには、左上の歯車をクリックし、[{{< ui >}}Enable{{< /ui >}}] (有効化) をクリックします。
4. 有効にしたら、[{{< ui >}}New Role{{< /ui >}}] (新規ロール) をクリックします。
5. 新しいロールの名前を入力します。
6. ロールの権限を選択します。これにより、特定の操作 (ログのリハイドレーションやログベースのメトリクスの作成など) へのアクセスを制限できます。詳細については、[Log Management の権限][8] を参照してください。
7. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

ユースケース例で特定の権限を持つロールを設定および割り当てる方法については、[ログ用に RBAC を設定する方法][9]の手順ガイドを参照してください。

## ログの使用量を監視する{#monitor-log-usage}

以下を設定することで、ログの使用量を監視することができます。

- [予期せぬログトラフィックの急増に対するアラート](#alert-on-unexpected-log-traffic-spikes)
- [インデックス化されたログの量が指定されたしきい値を超えた場合のアラート](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)

### 予期せぬログトラフィックの急増に対するアラート{#alert-on-unexpected-log-traffic-spikes}

#### ログ使用量メトリクス {#log-usage-metrics}

デフォルトでは、[ログ使用量メトリクス][10]は取り込まれたログの数、取り込まれたバイト数、インデックス化されたログの数の追跡に利用できます。これらのメトリクスは無料で利用でき、15 か月間保存されます。

- `datadog.estimated_usage.logs.ingested_bytes`
- `datadog.estimated_usage.logs.ingested_events`

使用量メトリクスを使った異常検出モニターの作成手順については、[異常検出モニター][11]を参照してください。

**注**: Datadog では、[メトリクスサマリーページ][12]で `datadog.estimated_usage.logs.ingested_bytes` の単位を `byte` に設定することを推奨しています。

{{< img src="logs/guide/logs_estimated_bytes_unit.png" alt="datadog.estimated_usage.logs.ingested_bytes のサイドパネルで単位がバイトに設定されているメトリクスサマリページ" style="width:70%;">}}

#### 異常検出モニター{#anomaly-detection-monitors}

異常検出モニターを作成し、予期せぬログのインデックス化の急増にアラートを出します。

1. [[Monitors] (モニター) > [New Monitor] (新規モニター)][13] の順に移動し、[{{< ui >}}Anomaly{{< /ui >}}] (異常) を選択します。
2. [**Define the metric**] (メトリクスの定義) セクションで `datadog.estimated_usage.logs.ingested_events` メトリクスを選択します。
3. 取り込まれたログではなくインデックス化されたログを監視するため、[**from**] フィールドに `datadog_is_excluded:false` タグを追加します。
4. [**sum by**] フィールドに `service` タグと `datadog_index` タグを追加し、特定のサービスが急増したり、いずれかのインデックスでログの送信を停止した場合に通知されるようにします。
5. ユースケースに合わせてアラート条件を設定します。たとえば、評価された値が期待される範囲から外れた場合にアラートを送信するようにモニターを設定します。
6. 通知のタイトルと、実行可能な指示を記述したメッセージを追加します。たとえば、以下はコンテキストリンクを含む通知です。
    ```text
    An unexpected amount of logs has been indexed in the index: {{datadog_index.name}}

    1. [Check Log patterns for this service](https://app.datadoghq.com/logs/patterns?from_ts=1582549794112&live=true&to_ts=1582550694112&query=service%3A{{service.name}})
    2. [Add an exclusion filter on the noisy pattern](https://app.datadoghq.com/logs/pipelines/indexes)
    ```
7. [{{< ui >}}Create{{< /ui >}}] (作成) をクリックします。

### インデックス化されたログの量が指定されたしきい値を超えた場合のアラート{#alert-when-an-indexed-log-volume-passes-a-specified-threshold}

インフラストラクチャー (`service`、`availability-zone` など) の任意のスコープでインデックス化されたログの量が予期せず増加した場合にアラートを送信するようにモニターを設定します。

1. [ログエクスプローラー][14]に移動します。
2. 監視するログ量をキャプチャするため、インデックス名 (例: `index:main`) を含む[検索クエリ][15]を入力します。
3. [{{< ui >}}More...{{< /ui >}}] (詳細…) をクリックし、[{{< ui >}}Create monitor{{< /ui >}}] (モニターを作成) を選択します。
4. {{< ui >}}group by{{< /ui >}} フィールドにタグ (例: `host, `、services など) を追加します。
5. ユースケースに合わせて [{{< ui >}}Alert threshold{{< /ui >}}] (アラートしきい値) に値を入力します。オプションで、[{{< ui >}}Warning threshold{{< /ui >}}] (警告しきい値) に値を入力します。
6. 通知のタイトルを追加します。例:
    ```
    Unexpected spike on indexed logs for service {{service.name}}
    ```
6. Add a message, for example:
    ```
    The volume on this service exceeded the threshold.Define an additional exclusion filter or increase the sampling rate to reduce the volume.
    ```
7. [{{< ui >}}Create{{< /ui >}}] (作成) をクリックします。

#### 月初からのインデックス化されたログの量に関するアラート {#alert-on-indexed-logs-volume-since-the-beginning-of-the-month}

`datadog.estimated_usage.logs.ingested_events` でフィルタリングされた `datadog_is_excluded:false` メトリクスを活用してインデックス化ログのみをカウントし、[メトリクスモニター累積ウィンドウ][28]を使用して月初からのカウントを監視します。

{{< img src="logs/guide/monthly_usage_monitor.png" alt="月初からのインデックス化ログのカウントについてアラートを送信するモニターを設定します。" style="width:70%;">}}

#### インデックスが 1 日の割り当てに達した場合のアラート {#alert-on-indexes-reaching-their-daily-quota}

指定された 1 日あたりのログの数を超えてログをインデックス化しないようにするため、インデックスに [1 日の割り当てを設定][16]します。インデックスに 1 日の割り当てが設定されている場合、Datadog では、過去 24 時間以内にこの割り当ての 80% に達したときにアラートを送信するよう、[そのインデックスの量を通知するモニター](#alert-when-an-indexed-log-volume-passes-a-specified-threshold)を設定することを推奨しています。

1 日の割り当てに達したらイベントが生成されます。これらのイベントには、インデックス名を含む `datadog_index` タグが付いています。そのため、このイベントが生成されたら、`datadog_index` タグに [ファセットを作成][17]できます。これにより、マルチアラートモニターを設定するために `group by` ステップで `datadog_index` を使用できるようになります。

インデックスの 1 日の割り当てに達したときにアラートを送信するモニターを設定するには:

1. [[Monitors] (モニター) > [New Monitor] (新規モニター)][13] の順に移動し、[{{< ui >}}Event{{< /ui >}}] (イベント) をクリックします。
2. [**Define the search query**] (検索クエリ) セクションに `source:datadog datadog_index:* "daily quota reached"` と入力します。インデックス関連のイベントのみが選択されるように `datadog_index:*` を含めます。
3. インデックスでグループ化するため、[**Count of**] (カウント対象) フィールドに `datadog_index` を追加します。これにより、クエリが `Show Count of * by datadog_index (datadog_index)` に更新されます。
4. [**Evaluate the query over**] (次の範囲のクエリを評価する) で [**current day**] (本日) を選択します。[**Starting at**] (開始時刻) で、インデックスがリセットされる時刻を選択します。これにより、割り当てがリセットされるまでモニターはアラートステータスのままになります。以下に、Datadog で定義された検索クエリの例を示します。
   {{< img src="logs/guide/daily_quota_notification_search_query.png" alt="検索クエリのインデックス割り当て到達 Datadog アラートの構成" style="width:100%;">}}
5. [**Set alert conditions**] (アラート条件の設定) セクションで `above or equal to` を選択し、[**Alert threshold**] (アラートしきい値) に `1` を入力します。
6. [{{< ui >}}Configure notifications and automations{{< /ui >}}] (通知と自動化の構成) セクションに通知タイトルとメッセージを追加します。モニターは `datadog_index(datadog_index)` でグループ化されているため、[{{< ui >}}Multi Alert{{< /ui >}}] (複数アラート) ボタンが自動的に選択されます。
7. [{{< ui >}}Save{{< /ui >}}] (保存) をクリックします。

**注**: `datadog_index(datadog_index)` タグは、イベントがすでに生成されている場合にのみ使用できます。

これは、Slack での通知の例です。

{{< img src="logs/guide/daily_quota_notification.png" alt="datadog_index:retention-7 で 1 日の割り当てに達した際の Slack 通知" style="width:70%;">}}

### 推定使用量ダッシュボードを確認する {#review-the-estimated-usage-dashboard}

ログの取り込みを開始すると、ログ使用量メトリクスをまとめたすぐに使える[ダッシュボード][18]が自動的にアカウントにインストールされます。

{{< img src="logs/guide/logslight.png" alt="インデックス化され多ログと取り込まれたログの内訳を異なるウィジェットに表示するログ推定使用量ダッシュボード" style="width:70%;">}}

**注**: このダッシュボードで使用されるメトリクスは推定であるため、正式な請求対象の数値とは異なる場合があります。

このダッシュボードを見つけるには、[{{< ui >}}Dashboards{{< /ui >}}] (ダッシュボード) > [{{< ui >}}Dashboards List{{< /ui >}}] (ダッシュボードリスト) に移動し、[Log Management - Estimated Usage][19] を検索します。

### アクティブにクエリされているインデックスの監視{#monitor-which-indexes-are-queried-actively}

クエリのアクティビティを監視することで、インデックス化されたデータの価値を評価し、コストを最適化できます。たとえば、クエリされる頻度が低いインデックスを特定して、保持期間を短縮したり、データを Flex Logs やアーカイブに移動したりできます。

どのインデックスがアクティブにクエリされているかを分析するには:

1. [Audit Trail][31] に移動します。このリンクにより、必要なクエリとグループ化が事前に入力されます。
2. クエリが `@evt.name:"Log Management" @action:queried` に設定されていることを確認します。
3. 可視化方法として [{{< ui >}}Table{{< /ui >}}] を選択して、選択した期間において最も使用されているインデックスと最も使用されていないインデックスのリストを表示します。
4. [{{< ui >}}By{{< /ui >}}] (グループ化基準) セクションで、ログを `@asset.new_value.query.indexes` でグループ化します。

### 大量ログの除外フィルターを設定する{#set-up-exclusion-filters-on-high-volume-logs}

使用量モニターからアラートが送信されたら、除外フィルターを設定し、サンプリングレートを上げて使用量を減らすことができます。設定方法については、[除外フィルター][20]を参照してください。[Log Patterns][21] を使用して、大量のログをグループ化および特定することもできます。次に、ログパターンのサイドパネルで [{{< ui >}}Add Exclusion Filter{{< /ui >}}] (除外フィルターを追加) をクリックしてフィルターを追加し、それらのログのインデックス化を停止します。

{{< img src="logs/guide/patterns_exclusion.png" alt="ログエクスプローラーページのサイドパネルにパターンの詳細が表示され、上部に除外フィルターの追加ボタンがあります" style="width:80%;">}}

除外フィルターを使用している場合でも、ログベースのメトリクスを使用して、すべてのログデータにわたる傾向や異常を視覚化できます。詳細については、[取り込んだログからメトリクスを生成する][22]を参照してください。

### 個人識別情報 (PII) 検出のために Sensitive Data Scanner を有効にする{#enable-sensitive-data-scanner-for-personally-identifiable-information-pii-detection}

データ漏洩を防止し、コンプライアンス違反のリスクを制限するには、Sensitive Data Scanner を使用して、機密データを特定し、タグ付けし、必要に応じて編集またはハッシュ化します。たとえば、ログ、APM スパン、および RUM イベント内のクレジットカード番号、銀行のルーティング番号、API キーをスキャンできます。スキャンする対象を決定するスキャンルールの設定方法については、[Sensitive Data Scanner][23]を参照してください。

**注**: [Sensitive Data Scanner][24]は別途課金対象製品です。

### ユーザーのアクティビティを確認するために Audit Trail を有効にする{#enable-audit-trail-to-see-user-activities}

インデックスの保持期間を変更したユーザーや除外フィルターを変更したユーザーなど、ユーザーのアクティビティを確認したい場合には、Audit Trail を有効にしてこれらのイベントを確認します。利用可能なプラットフォームおよび製品固有のイベントのリストについては、[Audit Trail イベント][25] を参照してください。Audit Trail を有効にして構成するには、[Audit Trail のドキュメント][26]に記載されている手順に従ってください。

**注**: [Audit Trail][27]は別途課金対象製品です。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/logs/pipelines/indexes
[2]: /ja/logs/log_configuration/archives/
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
[17]: /ja/events/explorer/facets
[18]: https://app.datadoghq.com/dash/integration/logs_estimated_usage
[19]: https://app.datadoghq.com/dashboard/lists?q=Log+Management+-+Estimated+Usage
[20]: /ja/logs/log_configuration/indexes/#exclusion-filters
[21]: /ja/logs/explorer/analytics/patterns
[22]: /ja/logs/log_configuration/logs_to_metrics/
[23]: /ja/security/sensitive_data_scanner/
[24]: https://www.datadoghq.com/pricing/?product=sensitive-data-scanner#sensitive-data-scanner
[25]: /ja/account_management/audit_trail/events/
[26]: /ja/account_management/audit_trail/
[27]: https://www.datadoghq.com/pricing/?product=audit-trail#audit-trail
[28]: /ja/monitors/configuration/?tab=thresholdalert#evaluation-window
[29]: /ja/observability_pipelines/
[30]: /ja/logs/log_configuration/flex_logs/
[31]: https://app.datadoghq.com/audit-trail?query=%40evt.name%3A%22Log%20Management%22%20%40action%3Aqueried&agg_m=count&agg_m_source=base&agg_q=%40asset.new_value.query.indexes&agg_q_source=base&agg_t=count&audit__diff=unified&cols=log_usr.id%2Clog_action%2Clog_evt.name&fromUser=true&messageDisplay=expanded-md&refresh_mode=sliding&stream_sort=desc&top_n=10&top_o=top&viz=query_table&x_missing=true&live=true
[32]: /ja/logs/explorer/archive_search/