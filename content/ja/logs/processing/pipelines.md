---
title: パイプライン
kind: documentation
description: Grok プロセッサーを使用してログをパースする
further_reading:
  - link: logs/processing/processors
    tag: Documentation
    text: 使用可能なプロセッサーのリスト
  - link: logs/logging_without_limits
    tag: Documentation
    text: 無制限のログ
  - link: logs/explorer
    tag: Documentation
    text: ログの調査方法
  - link: 'https://learn.datadoghq.com/course/view.php?id=10'
    tag: ラーニングセンター
    text: ログを極める パース
---
{{< img src="logs/processing/pipelines/pipelines_overview.png" alt="original log" >}}

## パイプラインの目的

**処理パイプラインは、受信ログの一部を絞り込んで取得し、それらに一連のプロセッサーを順次適用します。**

Datadog は、JSON 形式のログを自動的にパースします。ログが JSON 形式でない場合は、Datadog を使用すると、生ログを処理パイプラインを経由して送信することで、ログの価値を高めることができます。

パイプラインを使用すると、いくつかの[プロセッサー](#processors)を通して順次ログをつなぐことにより、ログをパースして補完することができます。これを使用して、半構造化されたテキストから意味のある情報や属性を抽出し、[ファセット][1]として再利用することができます。

パイプラインを経由するログは、すべてのパイプラインフィルターに対してテストされます。いずれか 1 つにマッチしたログは、すべての[プロセッサー](#processors)が順次適用されてから、次のパイプラインに移動します。

ある処理パイプラインの以下のようなログを例にします。

{{< img src="logs/processing/pipelines/log_pre_processing.png" alt="original log"  style="width:50%;">}}

これは、次のログに変換できます。

{{< img src="logs/processing/pipelines/log_post_processing.png" alt=" Log post severity "  style="width:50%;">}}

このパイプラインの例

{{< img src="logs/processing/pipelines/pipeline_example.png" alt="Pipelines example"  style="width:75%;">}}

パイプラインはさまざまな形式のログを受け取り、それらを Datadog の共通形式に翻訳します。

たとえば、最初にアプリケーションログプレフィックスを抽出するパイプラインを定義したら、チームごとにログメッセージの他の部分を処理する独自のパイプラインを自由に定義できます。

## パイプラインフィルター

フィルターを使用すると、パイプラインを適用するログの種類を制限できます。

フィルターの構文は[検索バー][1]と同じです。

**パイプラインフィルターはパイプラインのプロセッサーの前に適用されることに注意してください。パイプライン自体で抽出される属性で絞り込みを行うことはできません**

次のログストリームは、どのログにパイプラインが適用されるかを示します。

{{< img src="logs/processing/pipelines/pipeline_filters.png" alt="Pipelines filters"  style="width:80%;">}}

## ネストされたパイプライン

ネストされたパイプラインとは、パイプラインの内部のパイプラインのことです。ネストされたパイプラインを使用すると、処理を 2 段階に分けることができます。たとえば、チームなどの高レベルのフィルタリングを使用してから、インテグレーション、サービス、タグ、属性などに基づく第 2 レベルのフィルタリングを使用します。

パイプラインは、ネストされたパイプラインとプロセッサーを持つことができます。一方、ネストされたパイプラインは、プロセッサーしか持つことができません。

{{< img src="logs/processing/pipelines/nested_pipeline.png" alt="Nested Pipelines"  style="width:80%;">}}

あるパイプラインを別のパイプラインにドラッグアンドドロップして、ネストされたパイプラインに変換することができます。

{{< img src="logs/processing/pipelines/nested_pipeline_drag_drop.mp4" alt="Drag and Drop Nested Pipelines" video="true"  width="80%" >}}

## 特殊なパイプライン

### 予約済み属性パイプライン

Datadog には、`timestamp`、`status`、`host`、`service`、さらにはログ `message` などの[予約済み属性][2]があります。これらの属性は Datadog 内で固有の挙動を示します。
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

{{< img src="logs/processing/pipelines/reserved_attribute_remapper.png" alt="Reserved attribute remapper"  style="width:70%;">}}

これで、次のログが生成されます。

{{< img src="logs/processing/pipelines/log_post_remapping.png" alt="Log post remapping"  style="width:70%;">}}

カスタムパイプラインで属性を予約済み属性の 1 つに再マップする場合は、[ログステータスリマッパー][3]または[ログ日付リマッパー][4]を使用します。

### インテグレーションパイプライン

ログを収集するようにセットアップされているいくつかのソースには、Datadog のインテグレーション処理パイプラインを使用できます。これらのパイプラインは**読み取り専用**であり、各ソースに適した方法でログをパースします。インテグレーションパイプラインを編集するには、それを複製した上で編集します。

{{< img src="logs/processing/pipelines/cloning_pipeline.png" alt="Cloning pipeline"  style="width:80%;">}}

すべてのインテグレーションパイプラインについては、[インテグレーションパイプラインリファレンス][5]のページを参照してください。

## パイプラインの制限

ログ管理ソリューションを最適に機能させるために、ログイベントと一部の製品機能に対して次のような技術的制限と規則が設定されています。これらの制限は到達できないように設計されています。

### 収集されたログイベントに適用される制限

* ログイベントのサイズは 25K バイトを超えてはなりません。
* 過去 6 時間および未来 2 時間までのログイベントを送信できます。
* JSON 形式に変換された後の 1 つのログイベントが保持できる属性数は 256 未満です。各属性のキーは 50 文字未満、ネストのレベルは連続 10 未満、それぞれの値はファセットに昇格された場合に 1024 文字未満です。
* 1 つのログイベントが持つことができるタグは 100 個以下です。1 日あたり最大 1,000 万個の一意のタグに対して、各タグは 256 文字を超えてはなりません。

上の制限に準拠しないログイベントは、システムによって変換されるか、切り詰められます。または、所定のタイムレンジ外の場合は単にインデックス化されません。ただし、Datadog は、提供されるユーザーデータを可能な限り維持するために常に最善を尽くします。

### 提供される機能に適用される制限

* ファセットの最大数は 100 です。
* プラットフォーム上の処理パイプラインの最大数は 100 です。
* パイプラインあたりのプロセッサーの最大数は 20 です。
* Grok プロセッサーあたりのパース規則の最大数は 10 です。Datadog は、Datadog のサービスパフォーマンスに悪影響を与える可能性があるパース規則を無効化する権利を留保します。

これらの制限のいずれかに達した場合、上限を上げることができるかどうかについては、[サポートにお問い合わせください][6]。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/explorer/search
[2]: /ja/logs/processing/#reserved-attributes
[3]: /ja/logs/processing/processors/#log-status-remapper
[4]: /ja/logs/processing/processors/#log-date-remapper
[5]: /ja/logs/faq/integration-pipeline-reference
[6]: /ja/help