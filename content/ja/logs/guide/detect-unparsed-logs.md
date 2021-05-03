---
title: パースされていないログの監視とクエリ
kind: ガイド
further_reading:
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: /logs/faq/log-parsing-best-practice
    tag: Documentation
    text: ログのパース - ベストプラクティス
beta: true
---
<div class="alert alert-warning">
パースされていないログのフラグ機能は、現在プライベートベータ版です。詳細は、<a href="https://docs.datadoghq.com/help/">Datadog のサポートチーム</a>までお問い合わせください。
</div>

## 概要
パースされたログは、クエリ、監視、集計、機密データスキャナーなど自動エンリッチメントなど、Datadog ログ管理を最大限に活用するのに必要なものです。
ログの量をスケーリングする際、パイプラインでパースされないログのパターンを特定して修正するのが難しい場合があります。

組織内のパースされていないログの量を特定して制御する方法

1. [パースされていないログの検出](#detect-unparsed-logs)
2. [パースされていないログのクエリ](#query-for-unparsed-logs)
3. [パースされていないログを追跡するメトリクスを作成します](#create-a-metric-to-track-for-unparsed-logs)
4. [パースされていないログの量を監視します](#monitor-the-volume-of-unparsed-logs)


## パースされていないログの検出
特定のログがパイプラインでパースされたかを判断するには、ログを開き [イベントの属性] パネルを確認します。ログがパースされていない場合、パネルにはログから抽出された属性ではなく、属性が抽出されなかった旨のメッセージが表示されます。

{{< img src="logs/guide/unparsed-logs/unparsed-log.jpg" alt="パースされていないログの詳細"  style="width:90%;">}}


パースされていないログをパースするには、[カスタムパイプライン][1]を作成するか[ログインテグレーション][2]をログのソースとして使いパイプラインの自動設定を利用します。

## パースされていないログのクエリ
ログの数が多く、1 つずつチェックができない場合は、[ログエクスプローラー][3]で  `datadog.pipelines:false` フィルターを使い、パースされていないログをクエリできます。

{{< img src="logs/guide/unparsed-logs/datadog-pipeline-false-log-explorer.jpg" alt="パースされていないログをクエリする"  style="width:90%;">}}

このフィルターは、パイプライン処理の後、カスタム属性を持たないすべてのインデックス化されたログを返します。
[パターン集約][4]は、パースされていないログに共通するパターンを集約したビューを表示するため、カスタムパイプラインの作成を促進します。

## パースされていないログを追跡するメトリクスを作成します
パースされていないログをクエリすると、パースされていない _インデックス化された_ ログを選択できます。また、[アーカイブ][6]の内容が構造化されるように、インデックス化しないログでもパースすることをお勧めします。

パースされていないログのメトリクスを作成するには、`datadog.pipelines:false` クエリを使用して[カスタムメトリクス][5]を作成します。

{{< img src="logs/guide/unparsed-logs/logs-unparsed-metric.jpg" alt="logs.unparsed メトリクスを生成"  style="width:90%;">}}

他のログベースのメトリクスは、`group by` フィールドでディメンションを追加できます。上の例では、`service` および `team` でグループ化しています。ログの所有権を定義するために使用するディメンションでグループ化する必要があります。
## パースされていないログの量を監視します
組織内のログのパースを確実に制御するには、パースされていないログの量に割り当てを設定します。このアプローチは、インデックスの [1 日の割り当て][7]で提案されているものに似ています。

パースされていないログの量を監視する
1. [メトリクスの監視][8]を作成します。
2. 事前に作成した `logs.unparsed` メトリクスを使用します。
3. `team` ごとの割り当てを設定します。
4. [アラートの条件][9]がアラートを受け取りたい時に一致することを確認します。

{{< img src="logs/guide/unparsed-logs/monitor-unparsed-logs-team.jpg" alt="パースされていないログをクエリする"  style="width:90%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}


[1]: /ja/logs/processing/
[2]: /ja/integrations/#cat-log-collection
[3]: /ja/logs/explorer/
[4]: /ja/logs/explorer/#patterns
[5]: /ja/logs/logs_to_metrics/
[6]: /ja/logs/archives/?tab=awss3
[7]: /ja/logs/indexes#set-daily-quota
[8]: /ja/monitors/monitor_types/metric/?tab=threshold#overview
[9]: /ja/monitors/monitor_types/metric/?tab=threshold#set-alert-conditions