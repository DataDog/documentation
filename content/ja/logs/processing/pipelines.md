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

### 予約済み属性パイプライン

Datadog には、`timestamp`、`status`、`host`、`service`、さらにはログ `message` などの[予約済み属性][3]が用意されています。これらの属性は Datadog 内で固有の挙動を示します。
使用する JSON ログでこれらの属性に別の属性名が付いている場合は、予約済み属性パイプラインを使用して、それらのログ属性を予約済み属性リストのいずれかに再マップしてください。

たとえば、次のログを生成するサービスがあるとします。

```json
{
  "myhost": "host123",
  "myapp": "test-web-2",
  "logger_severity": "Error",
  "log": "cannot establish connection with /api/v1/test",
  "status_code": 500
}
```

予約済み属性パイプラインに移動し、デフォルトのマッピングを次のように変更します。

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="予約済み属性リマッパー"  style="width:70%;">}}

これで、次のログが生成されます。

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="ログの事後再マッピング"  style="width:70%;">}}

カスタムパイプラインで属性を予約済み属性の 1 つに再マップする場合は、[ログステータスリマッパー][4]または[ログ日付リマッパー][5]を使用します。

### インテグレーションパイプライン

ログを収集するようにセットアップされているいくつかのソースには、Datadog のインテグレーション処理パイプラインを使用できます。これらのパイプラインは**読み取り専用**であり、各ソースに適した方法でログをパースします。インテグレーションパイプラインを編集するには、それを複製した上で編集します。

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="パイプラインの複製"  style="width:80%;">}}

### インテグレーションパイプラインライブラリ

Datadog で利用可能なインテグレーションパイプラインの一覧については、[インテグレーションパイプラインライブラリ][6]をご覧ください。
パイプラインライブラリにて、Datadog がデフォルトで各ログフォーマットを処理する方法をご確認いただけます。

{{< img src="logs/processing/pipelines/integration-pipeline-library.gif" alt="インテグレーションパイプラインライブラリ"  style="width:80%;">}}

インテグレーションパイプラインをひとつ使用する場合、Datadog は対応するログの `source` を構成し、インテグレーションをインストールすることを推奨しています。Datadog がこのソースから初回のログを受信すると、インストールが自動でトリガーされ、インテグレーションパイプラインが処理対象のパイプラインリストに追加されます。ログソースの構成については、対応する[インテグレーションのドキュメント][7]を参照してください。

コピーボタンをクリックしてインテグレーションパイプラインをコピーすることもできます。

{{< img src="logs/processing/pipelines/clone-pipeline-from-library.gif" alt="ライブラリからパイプラインを複製"  style="width:80%;">}}


## パイプラインの制限

ログ管理ソリューションを最適に機能させるために、ログイベントと一部の製品機能に対して次のような技術的制限と規則が設定されています。これらの制限は到達できないように設計されています。

### 収集されたログイベントに適用される制限

* プラットフォームを最適な形で利用するために、ログイベントのサイズは 250KB 以内に収めることをお勧めします。Datadog Agent を使用する場合、ログイベントは 256KB を超え、いくつかのエントリに分割されます。Datadog TCP または HTTP API を直接使用する場合、API が許容可能なログイベントは最大 1MB までとなります。
* ログイベントは過去 18 時間、未来の 2 時間まで送信が可能です。
* 一度 JSON 形式に変換されたログイベントが保持できる属性は 256 未満です。これらの各属性のキーは 50 文字未満、連続するネストのレベルは 10 未満、 それぞれの値は (ファセットに昇格した場合) 1024 文字未満となります。
* 1 つのログイベントが持つことができるタグは 100 個以下です。1 日あたり最大 1,000 万個の一意のタグに対して、各タグは 256 文字を超えてはなりません。

上の制限に準拠しないログイベントは、システムによって変換されるか、切り詰められます。または、所定のタイムレンジ外の場合は単にインデックス化されません。ただし、Datadog は、提供されるユーザーデータを可能な限り維持するために常に最善を尽くします。

### 提供される機能に適用される制限

* ファセットの最大数は 1000 です。
* パイプライン毎の推奨プロセッサー数は最大 20 です。
* Grok プロセッサー毎のパース規則の推奨数は最大 10 です。Datadog はサービスのパフォーマンスに悪影響を与える可能性のあるパース規則、プロセッサー、パイプラインを無効化する権利を有しています。

これらの制限のいずれかに達し、上限の引き上げを希望される場合は[サポートにお問い合わせください][8]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/processing/processors/
[2]: /ja/logs/explorer/search/
[3]: /ja/logs/processing/#reserved-attributes
[4]: /ja/logs/processing/processors/#log-status-remapper
[5]: /ja/logs/processing/processors/#log-date-remapper

[6]: https://app.datadoghq.com/logs/pipelines/pipeline/library
[7]: /ja/integrations/#cat-log-collection
[8]: /ja/help/