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

## パイプラインの目的

**処理パイプラインは、受信ログの一部を絞り込んで取得し、それらに一連のプロセッサーを順次適用します。**

Datadog は、JSON 形式のログを自動的にパースします。ログが JSON 形式でない場合は、Datadog を使用すると、生ログを処理パイプラインを経由して送信することで、ログの価値を高めることができます。

パイプラインを使用すると、いくつかの[プロセッサー][1]を通して順次ログをつなぐことにより、ログをパースして補完することができます。これを使用して、半構造化されたテキストから意味のある情報や属性を抽出し、[ファセット][2]として再利用することができます。

パイプラインを経由するログは、すべてのパイプラインフィルターに対してテストされます。いずれか 1 つにマッチしたログは、すべての[プロセッサー][1]が順次適用されてから、次のパイプラインに移動します。

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

フィルターの構文は[検索バー][2]と同じです。

**パイプラインフィルターはパイプラインのプロセッサーの前に適用されることに注意してください。パイプライン自体で抽出される属性で絞り込みを行うことはできません**

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

Datadog には、`timestamp`、`status`、`host`、`service`、`message` などの[予約済み属性のリスト][3]があります。これらの属性には、Datadog 内で特定の動作があります。JSON ログに異なる属性名がある場合は、*JSON ログの前処理*を使用して、ログ属性名を予約済み属性リストの属性名にマップします。

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

*JSON ログの前処理*を開き、デフォルトのマッピングを次のように変更します。

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="予約済み属性リマッパー"  style="width:70%;">}}

これにより、次のログが生成されます。

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="ログの事後再マッピング"  style="width:70%;">}}

カスタムパイプラインの予約済み属性の 1 つに属性をマップするには、[ログステータスリマッパー][4]、[ログ日付リマッパー][5]、または[ログメッセージリマッパー][6]を使用します。

**注:** *JSON ログの前処理*は、ログ属性の 1 つをログの `host` として定義する唯一の方法です。

### インテグレーションパイプライン

ログを収集するようにセットアップされているいくつかのソースには、Datadog のインテグレーション処理パイプラインを使用できます。これらのパイプラインは**読み取り専用**であり、各ソースに適した方法でログをパースします。インテグレーションパイプラインを編集するには、それを複製した上で編集します。

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="パイプラインの複製"  style="width:80%;">}}

### インテグレーションパイプラインライブラリ

Datadog で利用可能なインテグレーションパイプラインの一覧については、[インテグレーションパイプラインライブラリ][7]をご覧ください。
パイプラインライブラリにて、Datadog がデフォルトで各ログフォーマットを処理する方法をご確認いただけます。

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="インテグレーションパイプラインライブラリ"  style="width:80%;">}}

インテグレーションパイプラインをひとつ使用する場合、Datadog は対応するログの `source` を構成し、インテグレーションをインストールすることを推奨しています。Datadog がこのソースから初回のログを受信すると、インストールが自動でトリガーされ、インテグレーションパイプラインが処理対象のパイプラインリストに追加されます。ログソースの構成については、対応する[インテグレーションのドキュメント][8]を参照してください。

コピーボタンをクリックしてインテグレーションパイプラインをコピーすることもできます。

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="ライブラリからパイプラインを複製"  style="width:80%;">}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/processors/
[2]: /ja/logs/explorer/search/
[3]: /ja/logs/processing/#reserved-attributes
[4]: /ja/logs/processing/processors/#log-status-remapper
[5]: /ja/logs/processing/processors/#log-date-remapper
[6]: /ja/logs/processing/processors/#log-message-remapper
[7]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[8]: /ja/integrations/#cat-log-collection