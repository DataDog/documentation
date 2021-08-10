---
title: パイプライン
kind: documentation
description: Grok プロセッサーを使用してログをパースする
aliases:
  - /ja/logs/processing/pipelines/
further_reading:
  - link: /logs/log_configuration/processors
    tag: ドキュメント
    text: 使用可能なプロセッサーのリスト
  - link: /logs/logging_without_limits/
    tag: ドキュメント
    text: Logging without Limits*
  - link: /logs/explorer/
    tag: ドキュメント
    text: ログの調査方法
  - link: 'https://learn.datadoghq.com/course/view.php?id=10'
    tag: ラーニングセンター
    text: ログを極める パース
---
## 概要

Datadog は自動的に JSON 形式のログを[パースします][1]。ログが JSON 形式でない場合、生のログを処理パイプラインに送信して値を追加することができます。パイプラインは、ログを広範囲の形式から取得し Datadog で一般的に使用される形式に変換します。ログパイプラインの実装と処理戦略は、組織に[属性の命名習慣][2]を導入するため、有意義です。

パイプラインを使用すると、いくつかの[プロセッサー][3]を通して順次ログをつなぐことにより、ログがパースされ補完されます。これにより、半構造化されたテキストから意味のある情報や属性を抽出し、[ファセット][4]として再利用することができます。パイプラインを経由するログは、すべてのパイプラインフィルターに対してテストされます。いずれかのフィルターに一致したログは、すべてのプロセッサーが順次適用されてから、次のパイプラインに移動します。

パイプラインおよびプロセッサーは、あらゆるタイプのログに適用できます。ロギングコンフィギュレーションを変更したり、サーバー側の処理ルールに変更をデプロイする必要もありません。すべての処理は、[パイプラインコンフィギュレーションページ][5]で構成できます。

**注**: ログ管理ソリューションを最適にご利用いただくため、Datadog では Grok プロセッサ内でパイプラインごとに最大 20 件のプロセッサーおよび 10 個のパース規則を使用することをおすすめします。Datadog はサービスのパフォーマンスに悪影響を与える可能性のあるパース規則、プロセッサー、パイプラインを無効化する権利を有しています。

## 前処理

JSON ログの前処理は、ログがパイプライン処理に入る前に発生します。前処理では、予約済み属性に基づく一連の操作（`timestamp`、`status`、`host`、`service`、`message` など）を実行します。JSON ログに異なる属性名がある場合は、前処理を使用してログ属性名を予約済み属性リストの属性名にマップします。

JSON ログ前処理は、デフォルトで標準ログフォワーダーに機能するよう構成されています。このコンフィギュレーションは、カスタムまたは特定のログ転送方法に合わせて編集することが可能です。

1. Datadog アプリで [Pipelines][6] に移動し、[Preprocessing for JSON logs][7] を選択します。

    **注:** JSON ログの前処理は、ログ属性の 1 つをログの `host` として定義する唯一の方法です。

2. 予約済み属性に基づき、デフォルトのマッピングを変更します。

{{< tabs >}}
{{% tab "Source" %}}

#### ソース属性

JSON 形式のログファイルに `ddsource` 属性が含まれる場合、Datadog はその値をログのソースと解釈します。Datadog が使用しているソース名を使用する場合は、[インテグレーションパイプラインライブラリ][1]を参照してください。

**注**: コンテナ化環境から取得したログの場合、[環境変数][2]を使用してデフォルトのソース値とサービス値をオーバーライドする必要があります。


[1]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[2]: /ja/agent/docker/log/?tab=containerinstallation#examples
{{% /tab %}}
{{% tab "Host" %}}

#### ホスト属性

Datadog Agent または RFC5424 形式を使用すると、自動的にログにホスト値が設定されます。ただし、JSON 形式のログファイルに以下の属性が含まれる場合、Datadog はその値をログのホストと解釈します。

* `host`
* `hostname`
* `syslog.hostname`

{{% /tab %}}
{{% tab "Date" %}}

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

[ログ日付リマッパープロセッサー][1]を設定し、別の属性を指定してログの日付のソースとして使用します。

**注**: ログエントリの正式な日付が 18 時間以上前だった場合、Datadog はそのエントリを拒否します。

<div class="alert alert-warning">
認識される日付の形式は、<a href="https://www.iso.org/iso-8601-date-and-time-format.html">ISO8601</a>、<a href="https://en.wikipedia.org/wiki/Unix_time">UNIX (ミリ秒エポック形式)</a>、および <a href="https://www.ietf.org/rfc/rfc3164.txt">RFC3164</a> です。
</div>


[1]: /ja/logs/log_configuration/processors/#log-date-remapper
{{% /tab %}}
{{% tab "Message" %}}

#### メッセージ属性

デフォルトで、Datadog ではメッセージの値をログエントリの本文として収集します。この値がハイライトされて [Log Explore][1] に表示され、[全文検索][2]用にインデックス化されます。

[ログメッセージリマッパープロセッサー][3]を設定し、別の属性を指定してログのメッセージのソースとして使用します。


[1]: /ja/logs/explorer/
[2]: /ja/logs/explorer/#filters-logs
[3]: /ja/logs/log_configuration/processors/#log-message-remapper
{{% /tab %}}
{{% tab "Status" %}}

#### ステータス属性

各ログエントリにはステータスレベルを指定でき、Datadog 内のファセット検索で使用できます。ただし、JSON 形式のログファイルに以下の属性のいずれかが含まれる場合、Datadog はその値をログの正式なステータスと解釈します。

* `status`
* `severity`
* `level`
* `syslog.severity`

`status` 属性の既存のステータスを再マップするには、[ログステータスリマッパー][1]を使用します。

[1]: /ja/logs/log_configuration/processors/#log-status-remapper
{{% /tab %}}
{{% tab "Service" %}}

#### サービス属性

Datadog Agent または RFC5424 形式を使用すると、自動的にログにサービス値が設定されます。ただし、JSON 形式のログファイルに以下の属性が含まれる場合、Datadog はその値をログのサービスと解釈します。

* `service`
* `syslog.appname`

[ログサービスリマッパープロセッサー][1]を設定し、別の属性を指定してログのサービスのソースとして使用します。


[1]: /ja/logs/log_configuration/processors/#service-remapper
{{% /tab %}}
{{% tab "Trace ID" %}}

#### トレース ID 属性

デフォルトで、[Datadog トレーサーは、自動的にログにトレースとスパンの ID を挿入します][1]。ただし、JSON 形式のログに以下の属性が含まれる場合、Datadog はその値をログの `trace_id` と解釈します。

* `dd.trace_id`
* `contextMap.dd.trace_id`

[トレース ID リマッパープロセッサー][2]を設定し、別の属性を指定してログのトレース ID のソースとして使用します。


[1]: /ja/tracing/connect_logs_and_traces/
[2]: /ja/logs/log_configuration/#trace-remapper
{{% /tab %}}
{{< /tabs >}}

## パイプラインを作成する

1. Datadog アプリで [Pipelines][6] に移動します。
2. **New Pipeline** を選択します。
3. Live tail プレビューからフィルターを適用するログを選択、または独自のフィルターを適用します。ドロップダウンメニューから選択、または **</>** アイコンを選択して独自のフィルタークエリを作成します。フィルターを使用すると、パイプラインを適用するログの種類を制限できます。

    **注**: パイプラインフィルターはパイプラインのプロセッサーの前に適用されます。このため、パイプライン自体で抽出される属性で絞り込みを行うことはできません。

4. パイプラインに名前を付け、**Save** を押します。

パイプラインにより返還されたログの例:

{{< img src="logs/processing/pipelines/log_post_processing.png" alt="パイプラインにより返還されたログの例" style="width:50%;">}}

### インテグレーションパイプライン

<div class="alert alert-info">
サポートされているインテグレーションのリストは、<a href="/integrations/#cat-log-collection">こちら</a>でご確認ください。
</div>

ログを収集するようセットアップされている一部のソースには、インテグレーション処理パイプラインを使用できます。これらのパイプラインは**読み取り専用**であり、各ソースに適した方法でログをパースします。インテグレーションログにインテグレーションパイプラインが自動的にインストールされ、ログをパースして対応するファセットをログエクスプローラーに追加します。

インテグレーションパイプラインを表示するには、[パイプライン][5]ページに移動します。インテグレーションパイプラインを編集するには、それを複製した上で編集します。

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="パイプラインの複製"  style="width:80%;">}}

以下の ELB ログの例を参照してください。

{{< img src="logs/processing/elb_log_post_processing.png" alt="ELB ログの後処理"  style="width:70%;">}}

### インテグレーションパイプラインライブラリ

Datadog で利用可能なインテグレーションパイプラインの一覧については、[インテグレーションパイプラインライブラリ][6]をご覧ください。パイプラインライブラリにて、Datadog がデフォルトで各ログフォーマットを処理する方法をご確認いただけます。

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="インテグレーションパイプラインライブラリ" style="width:80%;">}}

インテグレーションパイプラインを使用する場合、Datadog は対応するログの `source` を構成し、インテグレーションをインストールすることを推奨しています。Datadog がこのソースから初回のログを受信すると、インストールが自動でトリガーされ、インテグレーションパイプラインが処理対象のパイプラインリストに追加されます。ログソースの構成については、対応する[インテグレーションのドキュメント][8]を参照してください。

Clone ボタンをクリックしてインテグレーションパイプラインをコピーすることもできます。

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="ライブラリからパイプラインを複製" style="width:80%;">}}

## プロセッサーまたはネストされたパイプラインを追加

1. Datadog アプリで [Pipelines][6] に移動します。
2. パイプラインにカーソルを合わせ、表示される矢印をクリックしてプロセッサーおよびネストされたパイプラインを展開します。
3. **Add Processor** または **Add Nested Pipeline** を選択します。

### プロセッサー

プロセッサーは、パイプラインの内部で実行し、データ構造化アクションを完了します。アプリ内または API を使用して、プロセッサー別にプロセッサーを追加し構成する方法については、[プロセッサーに関するドキュメント][3]を参照してください。

### ネストされたパイプライン

ネストされたパイプラインとは、パイプラインの内部のパイプラインのことです。ネストされたパイプラインを使用すると、処理を 2 段階に分けることができます。たとえば、チームなどの高レベルのフィルターを使用してから、インテグレーション、サービス、タグ、属性などに基づく第 2 レベルのフィルタリングを使用します。

パイプラインは、ネストされたパイプラインとプロセッサーを持つことができます。一方、ネストされたパイプラインは、プロセッサーしか持つことができません。

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="ネストされたパイプライン" style="width:80%;">}}

あるパイプラインを別のパイプラインにドラッグアンドドロップして、ネストされたパイプラインに変換することができます。

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="ネストされたパイプラインをドラッグアンドドロップ" video="true"  width="80%" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits は Datadog, Inc. の商標です。

[1]: /ja/logs/log_configuration/parsing/
[2]: /ja/logs/log_collection/?tab=host#attributes-and-tags
[3]: /ja/logs/log_configuration/processors/
[4]: /ja/logs/explorer/facets/
[5]: https://app.datadoghq.com/logs/pipelines
[6]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[7]: https://app.datadoghq.com/logs/pipelines/remapping
[8]: /ja/integrations/#cat-log-collection