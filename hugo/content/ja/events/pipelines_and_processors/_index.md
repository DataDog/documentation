---
aliases:
- /ja/service_management/events/pipelines_and_processors/
description: Event Management Pipelines を使用して、さまざまなソースからのイベントをプロセッサーで処理およびエンリッチする方法を学びます
further_reading:
- link: /events/
  tag: ドキュメント
  text: Event Management
- link: /events/correlation/
  tag: ドキュメント
  text: イベント相関
title: パイプラインとプロセッサー
---
## 概要{#overview}

Datadog Event Management Pipelines を使用すると、さまざまなソースからのイベントを効率的に処理および管理できます。パイプラインを使用すると、さまざまな処理ルールやフィルターを適用して、イベントの処理方法をカスタマイズできます。パイプラインを使用すると、大量の受信イベントを構造化して管理しやすくなります。

パイプラインを活用することで、以下のことが可能になります。
- **イベントのエンリッチ**: パイプラインでは、タグ付け、カスタム属性の追加、関連するメタデータとイベントとの相関付けなど、イベントに追加のコンテキストや情報を付与することで、より有益かつ行動しやすいものにできます。
- **イベントタグの正規化**: ルールを設定してタグを再マッピングすることで、すべてのイベントが標準化されたタグを持つようにします。
- **メッセージと属性をタグとしてパース**: メッセージ全体や未加工のイベントの特定の属性をパースするためのカスタム grok ルールを作成します。コンテキストを、調査中に参照できる追跡可能なタグや属性に変換します。

Datadog Event Management Pipelines を活用すれば、組織はモニタリングプロセスを簡素化し、オペレーショナルなインサイトをより明確にし、最終的にはインシデントやアラートへの対応をより効果的に行えるようになります。

## 仕組み {#how-it-works}

パイプラインでは、イベントはプロセッサーを順番にチェーンしてパースされ、エンリッチされます。これにより、半構造化テキストから意味のある情報や属性が抽出されます。パイプラインを通過する各イベントは、すべてのパイプラインフィルターに対して評価されます。フィルターに一致する場合、次のパイプラインに移動する前に、すべてのプロセッサーが順次適用されます。

パイプラインとプロセッサーは、すべてのイベントに適用でき、[Event Management Pipelines][1] で構成が可能です。

## パイプラインを作成する {#create-a-pipeline}

特定のソースやタグなど、関心のあるイベントを抽出するパイプラインを作成します。

1. Datadog の [Event Management Pipelines][1] に移動します。
1. [{{< ui >}}Add a Pipeline{{< /ui >}}] をクリックします。
1. ドロップダウンメニューからフィルターを選択するか、`</>` アイコンを選択して [Event Management Explorer][2] で独自のフィルタークエリを作成します。フィルターを使用して、特定のイベントにパイプラインのプロセッサーを適用してください。**注**: パイプラインのフィルタリングは、パイプライン内のプロセッサーより前に適用されます。パイプライン自体で抽出された属性ではフィルタリングすることはできません。
1. パイプラインに名前を付けます。
1. [{{< ui >}}Create{{< /ui >}}] をクリックします。

## プロセッサーの追加 {#add-a-processor}

パイプラインを作成した後にプロセッサーを追加できます。利用可能なプロセッサーは以下の通りです。

- [Aggregation Key Processor][3]
- [Arithmetic Processor][4]
- [Date Remapper][5]
- [Category Processor][6]
- [Grok Parser][7]
- [Lookup Processor][8]
- [Remapper][9]
- [Service Remapper][10]
- [Status Remapper][11]
- [String Builder Processor][12]
- [VRL Processor][14]


## パイプラインの権限 {#pipeline-permissions}

Event Management Pipelines へのアクセスは、2 つの権限によって制御されます。

- **`events_write_pipelines`**: パイプラインの作成、編集、削除を許可します。これには、フィルタークエリやパイプラインの順序など、パイプラインの属性の変更も含まれます。
- **`events_write_processors`**: パイプライン内のプロセッサーの作成、編集、削除を許可します。

管理者は、[ロールベースのアクセス制御][13]を使用してこれらの権限をロールに割り当て、パイプラインやプロセッサーの構成を変更できるユーザーを制御できます。


## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/event/settings/pipelines
[2]: https://app.datadoghq.com/event/explorer
[3]: /ja/events/pipelines_and_processors/aggregation_key
[4]: /ja/events/pipelines_and_processors/arithmetic_processor
[5]: /ja/events/pipelines_and_processors/date_remapper
[6]: /ja/events/pipelines_and_processors/category_processor
[7]: /ja/events/pipelines_and_processors/grok_parser
[8]: /ja/events/pipelines_and_processors/lookup_processor
[9]: /ja/events/pipelines_and_processors/remapper
[10]: /ja/events/pipelines_and_processors/service_remapper
[11]: /ja/events/pipelines_and_processors/status_remapper
[12]: /ja/events/pipelines_and_processors/string_builder_processor
[13]: /ja/account_management/rbac/permissions/
[14]: /ja/events/pipelines_and_processors/vrl_processor