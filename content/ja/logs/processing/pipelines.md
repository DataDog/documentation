---
title: パイプライン
kind: documentation
description: Grok プロセッサーを使用してログをパースする
further_reading:
  - link: /logs/processing/processors/
    tag: Documentation
    text: 使用可能なプロセッサーのリスト
  - link: /logs/logging_without_limits/
    tag: Documentation
    text: 無制限のログ
  - link: /logs/explorer/
    tag: Documentation
    text: ログの調査方法
  - link: 'https://learn.datadoghq.com/course/view.php?id=10'
    tag: ラーニングセンター
    text: ログを極める パース
---
{{< img src="logs/processing/pipelines/pipelines_overview.png" alt="元のログ" >}}

## 概要

Datadog は、JSON 形式のログを自動的にパースします。ログが JSON 形式でない場合は、生ログを処理パイプラインを経由して送信することで、ログの価値を高めることができます。

パイプラインを使用すると、いくつかの[プロセッサー][1]を通して順次ログをつなぐことにより、ログがパースされ補完されます。これにより、半構造化されたテキストから意味のある情報や属性を抽出し、[ファセット][2]として再利用することができます。

パイプラインを経由するログは、すべてのパイプラインフィルターに対してテストされます。いずれか 1 つにマッチしたログは、すべてのプロセッサーが順次適用されてから、次のパイプラインに移動します。

ある処理パイプラインの以下のようなログを例にします。

{{< img src="logs/processing/pipelines/log_pre_processing.png" alt="元のログ"  style="width:50%;">}}

これは、次のログに変換できます。

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="ログ事後重大度"  style="width:50%;">}}

このパイプラインの例

{{< img src="logs/processing/pipelines/pipeline_example.png" alt="パイプラインの例"  style="width:75%;">}}

パイプラインはさまざまな形式のログを受け取り、それらを Datadog の共通形式に翻訳します。

たとえば、最初にアプリケーションログプレフィックスを抽出するパイプラインを定義したら、チームごとにログメッセージの他の部分を処理する独自のパイプラインを自由に定義できます。

## パイプラインフィルター

フィルターを使用すると、パイプラインを適用するログの種類を制限できます。

フィルターの構文は[検索バー][3]と同じです。

**注**: パイプラインフィルターはパイプラインのプロセッサーの前に適用されます。パイプライン自体で抽出される属性で絞り込みを行うことはできません。

次のログストリームは、どのログにパイプラインが適用されるかを示します。

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="パイプラインフィルター"  style="width:80%;">}}

## ネストされたパイプライン

ネストされたパイプラインとは、パイプラインの内部のパイプラインのことです。ネストされたパイプラインを使用すると、処理を 2 段階に分けることができます。たとえば、チームなどの高レベルのフィルタリングを使用してから、インテグレーション、サービス、タグ、属性などに基づく第 2 レベルのフィルタリングを使用します。

パイプラインは、ネストされたパイプラインとプロセッサーを持つことができます。一方、ネストされたパイプラインは、プロセッサーしか持つことができません。

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="ネストされたパイプライン"  style="width:80%;">}}

あるパイプラインを別のパイプラインにドラッグアンドドロップして、ネストされたパイプラインに変換することができます。

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="ネストされたパイプラインをドラッグアンドドロップ" video="true"  width="80%" >}}

## 特殊なパイプライン

### JSON ログの前処理

JSON ログの前処理は、ログがパイプライン処理に入る前に発生します。前処理では、[予約済み属性][4]に基づく一連の操作（`timestamp`、`status`、`host`、`service`、`message` など）を実行します。JSON ログに異なる属性名がある場合は、前処理を使用してログ属性名を予約済み属性リストの属性名にマップします。

前処理を実行する場合:

* 受信ログの[ソース](#source-attribute)に基づき、新しい[ログインテグレーション](#integration-pipelines)をトリガーします。
* 受信ログにすべての[ホスト](#host-attribute)タグを付加します。
* 予約済みの属性リマッパープロセッサー ([日付リマッパー](#date-attribute)、[ステータスリマッパー](#status-attribute)、[サービスリマッパー](#service-attribute)、[メッセージリマッパー](#message-attribute)、[トレース ID リマッパー](#trace-id-attribute)) を、すべての JSON 受信ログの関連する JSON 属性に適用します。

たとえば、次のログを生成するサービスについて考えてみます。

```json
{
  "myhost": "host123",
  "myapp": "test-web-2",
  "logger_severity": "Error",
  "log": "cannot establish connection with /api/v1/test",
  "status_code": 500
}
```

JSON ログ前処理は、デフォルトで標準ログフォワーダーに機能するよう構成されています。このコンフィギュレーションは、カスタムまたは特定のログ転送方法に合わせて編集することが可能です。

**JSON ログの前処理**を開き、デフォルトのマッピングを変更します。

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="予約済み属性リマッパー"  style="width:70%;">}}

これにより、次のログが生成されます。

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="ログの事後再マッピング"  style="width:70%;">}}

**注:** JSON ログの前処理は、ログ属性の 1 つをログの `host` として定義する唯一の方法です。

#### ソース属性

JSON 形式のログファイルに `ddsource` 属性が含まれる場合、Datadog はその値をログのソースと解釈します。Datadog が使用しているソース名を使用する場合は、[インテグレーションパイプラインライブラリ][5]を参照してください。

**注**: コンテナ化環境から取得したログの場合、[環境変数][6]を使用してデフォルトのソース値とサービス値をオーバーライドする必要があります。

#### ホスト属性

Datadog Agent または RFC5424 形式を使用すると、自動的にログにホスト値が設定されます。ただし、JSON 形式のログファイルに以下の属性が含まれる場合、Datadog はその値をログのホストと解釈します。

* `host`
* `hostname`
* `syslog.hostname`

#### 日付属性

デフォルトでは、Datadog は、ログを受信したときにタイムスタンプを生成し、それを date 属性に付加します。ただし、JSON 形式のログファイルに以下の属性のいずれかが含まれる場合、その値をログの正式な日付と解釈します。

* `@timestamp`
* `timestamp`
* `_timestamp`
* `Timestamp`
* `eventTime`
* `date`
* `published_date`
* `syslog.timestamp`

[ログ日付リマッパープロセッサー][7]を設定し、別の属性を指定してログの日付のソースとして使用します。

**注**: ログエントリの正式な日付が 18 時間以上前だった場合、Datadog はそのエントリを拒否します。

<div class="alert alert-warning">
認識される日付の形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>、<a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (ミリ秒エポック形式)</a>、および <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a> です。
</div>

#### メッセージ属性

デフォルトで、Datadog ではメッセージの値をログエントリの本文として収集します。この値がハイライトされて[ログストリーム][8]に表示され、[全文検索][9]用にインデックス化されます。

[ログメッセージリマッパープロセッサー][10]を設定し、別の属性を指定してログのメッセージのソースとして使用します。

#### ステータス属性

各ログエントリにはステータスレベルを指定でき、Datadog 内のファセット検索で使用できます。ただし、JSON 形式のログファイルに以下の属性のいずれかが含まれる場合、Datadog はその値をログの正式なステータスと解釈します。

* `status`
* `severity`
* `level`
* `syslog.severity`

`status` 属性の既存のステータスを再マップするには、[ログステータスリマッパー][11]を使用します。

#### サービス属性

Datadog Agent または RFC5424 形式を使用すると、自動的にログにサービス値が設定されます。ただし、JSON 形式のログファイルに以下の属性が含まれる場合、Datadog はその値をログのサービスと解釈します。

* `service`
* `syslog.appname`

[ログサービスリマッパープロセッサー][12]を設定し、別の属性を指定してログのサービスのソースとして使用します。

#### トレース ID 属性

デフォルトで、[Datadog トレーサーは、自動的にログにトレースとスパンの ID を挿入します][13]。ただし、JSON 形式のログに以下の属性が含まれる場合、Datadog はその値をログの `trace_id` と解釈します。

* `dd.trace_id`
* `contextMap.dd.trace_id`

[トレース ID リマッパープロセッサー][14]を設定し、別の属性を指定してログのトレース ID のソースとして使用します。

### インテグレーションパイプライン

<div class="alert alert-info">
サポートされているインテグレーションのリストは、<a href="/integrations/#cat-log-collection">こちら</a>でご確認ください。
</div>

ログを収集するようセットアップされている一部のソースには、インテグレーション処理パイプラインを使用できます。インテグレーションログにインテグレーションパイプラインが自動的にインストールされ、ログをパースして対応するファセットをログエクスプローラーに追加します。

これらのパイプラインは**読み取り専用**であり、各ソースに適した方法でログをパースします。インテグレーションパイプラインを編集するには、それを複製した上で編集します。

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="パイプラインの複製"  style="width:80%;">}}

以下の ELB ログの例を参照してください。

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB ログの後処理"  style="width:70%;">}}

### インテグレーションパイプラインライブラリ

Datadog で利用可能なインテグレーションパイプラインの一覧については、[インテグレーションパイプラインライブラリ][5]をご覧ください。パイプラインライブラリにて、Datadog がデフォルトで各ログフォーマットを処理する方法をご確認いただけます。

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="インテグレーションパイプラインライブラリ" style="width:80%;">}}

インテグレーションパイプラインを使用する場合、Datadog は対応するログの `source` を構成し、インテグレーションをインストールすることを推奨しています。Datadog がこのソースから初回のログを受信すると、インストールが自動でトリガーされ、インテグレーションパイプラインが処理対象のパイプラインリストに追加されます。ログソースの構成については、対応する[インテグレーションのドキュメント][15]を参照してください。

コピーボタンをクリックしてインテグレーションパイプラインをコピーすることもできます。

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="ライブラリからパイプラインを複製" style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/processors/
[2]: /ja/logs/explorer/facets/
[3]: /ja/logs/explorer/search/
[4]: /ja/logs/processing/pipelines/#source-attribute
[5]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[6]: /ja/agent/docker/log/?tab=containerinstallation#examples
[7]: /ja/logs/processing/processors/#log-date-remapper
[8]: /ja/logs/explorer/
[9]: /ja/logs/explorer/#filters-logs
[10]: /ja/logs/processing/processors/?tab=ui#log-message-remapper
[11]: /ja/logs/processing/processors/#log-status-remapper
[12]: /ja/logs/processing/processors/?tab=ui#service-remapper
[13]: /ja/tracing/connect_logs_and_traces/
[14]: /ja/logs/processing/processors/?tab=ui#trace-remapper
[15]: /ja/integrations/#cat-log-collection