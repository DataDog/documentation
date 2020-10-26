---
title: 処理
kind: documentation
description: ログエクスプローラーで、ログをパースおよび加工して、有益なファセットとメトリクスを作成します。
aliases:
  - /ja/logs/faq/integration-pipeline-reference
further_reading:
  - link: /logs/processing/pipelines/
    tag: Documentation
    text: Datadog のパイプライン
  - link: /logs/processing/processors/
    tag: Documentation
    text: 使用可能なプロセッサーのリスト
  - link: /logs/processing/attributes_naming_convention/
    tag: Documentation
    text: Datadog ログ属性命名規則
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
---
{{< img src="logs/processing/processing.png" alt="処理" >}}

## 概要

構成パネルにアクセスするには、左側の `Logs` メニューから構成サブメニューを使用します。

ログ構成ページでは、Datadog の[パイプライン][1]と[プロセッサー][2]でログを処理する方法を制御できます。

* [パイプライン][1]は、受信ログの一部を絞り込んで取得し、一連のプロセッサーを順次適用します。
* [プロセッサー][2]は、[パイプライン][1]の内部で実行し、ログに対してデータ構造化アクション ([属性の再マップ][3]、[Grok パース][4]など) を完了します。

[パイプライン][1]と[プロセッサー][2]は、以下の種類のログに適用できます。

* [インテグレーションログ](#integration-logs)
* [カスタム JSON/Syslog/フルテキストログ](#custom-logs)

したがって、ログの記録方法を変更したり、サーバー側の処理ルールに変更をデプロイする必要もありません。すべての処理を [Datadog の処理ページ][5]内で構成して実行できます。

ログの処理方法を実装するメリットとして、オーガニゼーションに[属性命名規則][6]を適用できることもあげられます。

## ログの処理

### インテグレーションログ

インテグレーションログに対しては、[インテグレーションパイプライン][7]が自動的にインストールされます。ログをパースし、対応するファセットをログエクスプローラーに追加します。以下の ELB ログの例を参照してください。

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB ログの後処理"  style="width:70%;">}}

<div class="alert alert-info">
現在サポートされているインテグレーションのリストは、<a href="/integrations/#cat-log-collection">こちら</a>から確認できます。
</div>

### カスタムログ

ログの形式は自由にカスタマイズでき、したがってカスタム処理ルールも定義できます。任意のログ構文を使用してすべての属性を抽出し、必要に応じて、それらをよりグローバルな属性や標準的な属性に再マップできます。

例として、以下のようなログにカスタム処理ルールを使用します。

{{< img src="logs/processing/log_pre_processing.png" alt="ログの前処理"  style="width:50%;">}}

以下のように変換できます。

{{< img src="logs/processing/log_post_processing.png" alt="ログの後処理"  style="width:50%;">}}

[パイプラインフィルター][8]を使用して、ログの一部にのみアクションを実行する方法については、[パイプラインに関するドキュメント][1]を参照してください。

使用可能なプロセッサーのリストについては、[プロセッサーに関するドキュメント][2]を参照してください。

Datadog アプリケーションのパース機能自体の詳細については、[パーストレーニングガイド][9]を参照してください。[パースのベストプラクティス][10]や[パースのトラブルシューティング][11]に関するガイドもあります。

ログ管理ソリューションを最適にご利用いただくため、Datadog では Grok プロセッサ内でパイプラインごとに最大 20 件のプロセッサーおよび 10 個のパース規則を使用することをおすすめします。Datadog はサービスのパフォーマンスに悪影響を与える可能性のあるパース規則、プロセッサー、パイプラインを無効化する権利を有しています。


## JSON ログの前処理

JSON ログの前処理は、実際の[ログパイプライン][1]プロセスに入る前にすべてのログに適用されます。前処理は、予約済みの属性に基づき一連のオペレーションを実行します。

* 受信ログの**ソース**に基づき、新しい[ログインテグレーション][12]をトリガーします。
* 受信ログにすべての [**host** タグ][13]を付加します。
* 予約済みの属性リマッパープロセッサー ([**date** リマッパー][14]、[**status** リマッパー][15]、[**service** リマッパー][16]、[**message** リマッパー][17]、[**trace ID** リマッパー][18]) を、すべての JSON 受信ログの関連する JSON 属性に適用します。

JSON ログ前処理は、デフォルトで標準ログフォワーダーに機能するよう構成されています。このコンフィギュレーションは、カスタムまたは特定のログ転送方法に合わせていつでも編集することが可能です。デフォルト値を変更するには、[コンフィギュレーションページ][5]で `Pre processing for JSON logs` を編集します。

{{< img src="logs/processing/json_logs_preprocessing.gif" alt="JSON ログ前処理タイル"  style="width:80%;">}}


### source 属性

JSON 形式のログファイルに `ddsource` 属性が含まれる場合、Datadog はその値をログのソースと解釈します。Datadog が使用しているソース名を使用する場合は、[インテグレーションパイプラインライブラリ][12]を参照してください。

**注**: コンテナ化環境から取得したログの場合、[環境変数][19]を使用してデフォルトのソース値とサービス値をオーバーライドする必要があります。


### host 属性

Datadog Agent または RFC5424 形式を使用すると、自動的にログにホスト値が設定されます。ただし、JSON 形式のログファイルに以下の属性が含まれる場合、Datadog はその値をログのホストと解釈します。

* `host`
* `hostname`
* `syslog.hostname`


### date 属性

デフォルトでは、Datadog は、ログを受信したときにタイムスタンプを生成し、それを date 属性に付加します。ただし、JSON 形式のログファイルに以下の属性のいずれかが含まれる場合、その値をログの正式な日付と解釈します。

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

[ログ日付リマッパープロセッサー][14]を設定することで、別の属性を指定してログの日付のソースとして使用することもできます。

**注**: ログエントリの正式な日付が 18 時間以上前だった場合、Datadog はそのエントリを拒否します。

<div class="alert alert-warning">
認識される日付の形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>、<a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (ミリ秒エポック形式)</a>、および <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a> です。
</div>

### message 属性

デフォルトでは、メッセージの値はログエントリの本文として収集されます。[ログストリーム][20]では、この値がハイライトされ、[全文検索][21]用にインデックス化されます。

### status 属性

各ログエントリにはステータスレベルを指定でき、Datadog 内のファセット検索で使用できます。ただし、JSON 形式のログファイルに以下の属性のいずれかが含まれる場合、Datadog はその値をログの正式なステータスと解釈します。

* `status`
* `severity`
* `level`
* `syslog.severity`

`status` 属性の既存のステータスを再マップする場合は、[ログステータスリマッパー][15]を使用します。

### service 属性

Datadog Agent または RFC5424 形式を使用すると、自動的にログにサービス値が設定されます。ただし、JSON 形式のログファイルに以下の属性が含まれる場合、Datadog はその値をログのサービスと解釈します。

* `service`
* `syslog.appname`

### trace_id 属性

デフォルトでは、[Datadog トレーサーは、自動的にトレースとスパンの ID をログに挿入します][22]。ただし、JSON 形式のログに以下の属性が含まれる場合、Datadog はその値をログの `trace_id` と解釈します。

* `dd.trace_id`
* `contextMap.dd.trace_id`


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/pipelines/
[2]: /ja/logs/processing/processors/
[3]: /ja/logs/processing/processors/#attribute-remapper
[4]: /ja/logs/processing/processors/#grok-parser
[5]: https://app.datadoghq.com/logs/pipelines
[6]: /ja/logs/processing/attributes_naming_convention/
[7]: /ja/logs/processing/pipelines/#integration-pipelines
[8]: /ja/logs/processing/pipelines/#pipeline-filters
[9]: /ja/logs/processing/parsing/
[10]: /ja/logs/faq/log-parsing-best-practice/
[11]: /ja/logs/faq/how-to-investigate-a-log-parsing-issue/
[12]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[13]: /ja/getting_started/tagging/#introduction
[14]: /ja/logs/processing/processors/#log-date-remapper
[15]: /ja/logs/processing/processors/#log-status-remapper
[16]: /ja/logs/processing/processors/?tab=ui#service-remapper
[17]: /ja/logs/processing/processors/?tab=ui#log-message-remapper
[18]: /ja/logs/processing/processors/?tab=ui#trace-remapper
[19]: /ja/agent/docker/log/#examples
[20]: /ja/logs/explorer/?tab=logstream#visualization
[21]: /ja/logs/explorer/search/
[22]: /ja/tracing/connect_logs_and_traces/